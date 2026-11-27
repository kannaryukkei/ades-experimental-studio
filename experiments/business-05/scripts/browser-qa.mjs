import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createPreviewServer } from "../../../engine/src/preview.mjs";
import { archetypes } from "../sites/index.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const evidenceDir = path.resolve(here, "..", ".qa-screenshots");
await fs.rm(evidenceDir, { recursive: true, force: true });
await fs.mkdir(evidenceDir, { recursive: true });

const pageSets = {
  corporate: {
    routes: ["/", "/company/", "/capabilities/", "/capabilities/project-delivery/", "/industries/", "/contact/", "/responsibility/"],
    representative: ["/", "/capabilities/", "/capabilities/project-delivery/", "/contact/"]
  },
  "professional-services": {
    routes: ["/", "/approach/", "/services/", "/services/strategy/", "/services/organization/", "/perspectives/", "/contact/"],
    representative: ["/", "/services/", "/services/strategy/", "/contact/"]
  },
  "product-catalog": {
    routes: ["/", "/products/", "/products/field-kit/", "/products/desk-object/", "/about/", "/contact/", "/materials/"],
    representative: ["/", "/products/", "/products/field-kit/", "/contact/"]
  }
};

function slug(route) {
  return route === "/" ? "home" : route.split("/").filter(Boolean).join("-");
}

async function assertNoHorizontalOverflow(page, label, width) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  assert.ok(
    dimensions.document <= dimensions.viewport + 1 && dimensions.body <= dimensions.viewport + 1,
    label + " overflows at " + width + "px: " + JSON.stringify(dimensions)
  );
}

async function openRoute(page, base, route, siteId) {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, siteId + " " + route + " should return 200");
  assert.equal(await page.locator("h1").count(), 1, siteId + " " + route + " should have exactly one H1");
}

async function journey(page, base, siteId) {
  await page.goto(base + "/", { waitUntil: "networkidle" });
  if (siteId === "corporate") {
    await page.getByRole("link", { name: "Explore capabilities", exact: true }).click();
    assert.ok(page.url().endsWith("/capabilities/"));
    await page.getByRole("link", { name: "Explore capability", exact: true }).click();
    assert.ok(page.url().endsWith("/capabilities/project-delivery/"));
    await page.getByRole("link", { name: "Discuss a programme", exact: true }).click();
    assert.ok(page.url().endsWith("/contact/"));
  } else if (siteId === "professional-services") {
    await page.getByRole("link", { name: "Explore the practice", exact: true }).click();
    assert.ok(page.url().endsWith("/approach/"));
    await page.getByRole("link", { name: "Services", exact: true }).click();
    assert.ok(page.url().endsWith("/services/"));
    await page.getByRole("link", { name: "Explore service", exact: true }).first().click();
    assert.ok(page.url().endsWith("/services/strategy/"));
    await page.getByRole("link", { name: "Discuss a strategy question", exact: true }).click();
    assert.ok(page.url().endsWith("/contact/"));
  } else {
    await page.getByRole("link", { name: "Explore the collection", exact: true }).click();
    assert.ok(page.url().endsWith("/products/"));
    await page.getByRole("link", { name: "Field Kit", exact: true }).first().click();
    assert.ok(page.url().endsWith("/products/field-kit/"));
    await page.getByRole("link", { name: "Ask about the Field Kit", exact: true }).click();
    assert.ok(page.url().endsWith("/contact/"));
  }
  await page.locator("h1").waitFor({ state: "visible" });
}

const browser = await chromium.launch({ headless: true });
let totalRoutes = 0;
let totalViewportChecks = 0;
try {
  for (const site of archetypes) {
    const set = pageSets[site.id];
    if (!set) throw new Error("Missing browser-QA route set for " + site.id);

    const dist = path.join(fileURLToPath(site.root), "dist");
    const server = createPreviewServer({ rootDir: dist });
    await new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });

    try {
      const base = "http://127.0.0.1:" + server.address().port;
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const pageErrors = [];
      page.on("pageerror", error => pageErrors.push(error.message));

      for (const route of set.routes) {
        await openRoute(page, base, route, site.id);
        await assertNoHorizontalOverflow(page, site.id + " " + route, 1440);
        totalRoutes++;
      }

      for (const width of [768, 390]) {
        await page.setViewportSize({ width, height: width === 768 ? 1024 : 844 });
        for (const route of set.representative) {
          await openRoute(page, base, route, site.id);
          await assertNoHorizontalOverflow(page, site.id + " " + route, width);
          totalViewportChecks++;
          if (width === 390) {
            await page.screenshot({
              path: path.join(evidenceDir, site.id + "-" + slug(route) + "-390.png"),
              fullPage: true
            });
          }
        }
      }

      await page.setViewportSize({ width: 1440, height: 900 });
      await openRoute(page, base, "/", site.id);
      await page.screenshot({
        path: path.join(evidenceDir, site.id + "-home-1440.png"),
        fullPage: true
      });

      await page.goto(base + "/", { waitUntil: "networkidle" });
      await page.keyboard.press("Tab");
      const skipLink = page.locator("a.skip-link");
      assert.equal(await skipLink.evaluate(element => element === document.activeElement), true, site.id + " skip link should receive first keyboard focus");
      const skipBox = await skipLink.boundingBox();
      assert.ok(skipBox && skipBox.x >= 0 && skipBox.y >= 0, site.id + " skip link should become visible on focus");

      await page.emulateMedia({ reducedMotion: "reduce" });
      const scrollBehavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
      assert.equal(scrollBehavior, "auto", site.id + " should respect reduced motion");

      await journey(page, base, site.id);
      assert.deepEqual(pageErrors, [], site.id + " should not emit uncaught browser errors");
      await page.close();
      console.log("PASS " + site.id + ": " + set.routes.length + " routes, responsive checks, keyboard, reduced-motion and key journey");
    } finally {
      await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    }
  }
  console.log("Browser QA passed: " + totalRoutes + " desktop routes, " + totalViewportChecks + " tablet/mobile page checks, 3 key journeys.");
} finally {
  await browser.close();
}
