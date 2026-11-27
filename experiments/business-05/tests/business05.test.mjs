import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSite } from "../../../engine/src/build.mjs";
import { createPreviewServer } from "../../../engine/src/preview.mjs";
import { escapeHtml } from "../../../engine/src/lib/html.mjs";
import { renderTemplate } from "../../../engine/src/lib/templates.mjs";
import { archetypes } from "../sites/index.mjs";

for (const site of archetypes) {
  test(site.label + ": builds every route with complete metadata", async () => {
    const root = fileURLToPath(site.root);
    const out = path.join(root, ".business-05-test");
    try {
      const result = await buildSite({ rootDir: root, outDir: out, config: site.config, pageList: site.pages });
      assert.equal(result.routes.length, site.pages.length);
      assert.equal(result.sitemapEntries, site.pages.filter(page => page.indexable !== false).length);
      for (const page of site.pages) {
        const file = path.join(out, page.path === "/" ? "index.html" : page.path.slice(1) + "index.html");
        const html = await fs.readFile(file, "utf8");
        assert.ok(html.includes("<title>" + escapeHtml(page.title) + "</title>"), page.path + ": title missing");
        assert.ok(html.includes('<meta name="description" content="' + escapeHtml(page.description) + '">'), page.path + ": description missing");
        assert.match(html, /rel="canonical"/);
        assert.match(html, /property="og:title"/);
        assert.equal((html.match(/<h1\b/g) || []).length, 1, page.path + ": expected exactly one h1");
        if (page.composition) {
          assert.ok(html.includes("experience-hero") || html.includes("contact-panel"), page.path + ": composition not rendered");
          assert.ok(!html.includes("How we can help"), page.path + ": generic home template leaked into composition");
        }
      }
      const sitemap = await fs.readFile(path.join(out, "sitemap.xml"), "utf8");
      assert.equal((sitemap.match(/<url>/g) || []).length, result.sitemapEntries);
      for (const page of site.pages.filter(item => item.indexable === false)) {
        const file = path.join(out, page.path === "/" ? "index.html" : page.path.slice(1) + "index.html");
        assert.match(await fs.readFile(file, "utf8"), /noindex, nofollow/);
        assert.ok(!sitemap.includes(new URL(page.path, site.config.siteUrl).toString()));
      }
      assert.match(await fs.readFile(path.join(out, "404.html"), "utf8"), /noindex, nofollow/);
      const css = await fs.readFile(path.join(out, "styles.css"), "utf8");
      assert.ok(css.length > 5000, "redesigned stylesheet is missing");
      assert.ok(css.includes("prefers-reduced-motion"));
    } finally {
      await fs.rm(out, { recursive: true, force: true });
    }
  });

  test(site.label + ": preview serves nested routes and a true HTTP 404", async () => {
    const root = fileURLToPath(site.root);
    const out = path.join(root, ".business-05-preview");
    await buildSite({ rootDir: root, outDir: out, config: site.config, pageList: site.pages });
    const server = createPreviewServer({ rootDir: out });
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    try {
      const base = "http://127.0.0.1:" + server.address().port;
      const nested = site.pages.find(page => page.path.split("/").filter(Boolean).length > 1);
      assert.ok(nested);
      assert.equal((await fetch(base + nested.path)).status, 200);
      const missing = await fetch(base + "/not-a-real-route/");
      assert.equal(missing.status, 404);
      assert.match(await missing.text(), /This page is not here/);
    } finally {
      await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
      await fs.rm(out, { recursive: true, force: true });
    }
  });
}

test("the three archetypes have distinct visual systems and page compositions", async () => {
  const css = await Promise.all(archetypes.map(site => fs.readFile(path.join(fileURLToPath(site.root), "public/styles.css"), "utf8")));
  assert.equal(new Set(css).size, 3);
  assert.match(css[0], /--ink:#102b43/);
  assert.match(css[1], /Georgia/);
  assert.match(css[2], /--accent:#e2532e/);
  assert.ok(archetypes.every(site => site.pages.some(page => page.composition?.some(block => block.type === "hero"))));
});

test("composition renderer escapes text and rejects unsafe destinations", () => {
  const html = renderTemplate({ template: "home", path: "/", composition: [{ type: "hero", heading: "<script>alert(1)</script>", actions: [{ label: "Open", href: "/contact/" }] }] });
  assert.ok(html.includes("&lt;script&gt;alert(1)&lt;/script&gt;"));
  assert.ok(!html.includes("<script>alert(1)</script>"));
  assert.throws(() => renderTemplate({ template: "home", path: "/", composition: [{ type: "hero", heading: "Bad", actions: [{ label: "Run", href: "javascript:alert(1)" }] }] }), /Unsupported URL/);
});
