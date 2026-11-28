import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const evidenceDirectory = fileURLToPath(new URL("../test-results/evidence/", import.meta.url));

test("homepage renders, image assets load and responsive widths do not overflow", async ({ page }) => {
  await mkdir(evidenceDirectory, { recursive: true });
  // Capture evidence in reduced-motion mode so scroll-reveal content is visible
  // in full-page screenshots without changing the normal-motion experience.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page).toHaveTitle(/Nusa Forma Studio/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("main")).toBeVisible();

  const images = page.locator("main img");
  await expect(images).toHaveCount(5);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(async () => image.evaluate((node) => {
      const element = node as HTMLImageElement;
      return element.complete && element.naturalWidth > 0;
    }), { timeout: 20_000 }).toBe(true);
  }
  const loadedImages = await images.evaluateAll((items) =>
    items.map((image) => ({
      src: (image as HTMLImageElement).currentSrc,
      width: (image as HTMLImageElement).naturalWidth,
    })),
  );
  expect(loadedImages.every((image) => image.width > 0), JSON.stringify(loadedImages)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 0));

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const diagnostics = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      const offenders = Array.from(document.querySelectorAll("body *"))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            className: typeof element.className === "string" ? element.className : "",
            text: (element.textContent ?? "").trim().replace(/\\s+/g, " ").slice(0, 70),
            left: Math.round(rect.left * 10) / 10,
            right: Math.round(rect.right * 10) / 10,
            width: Math.round(rect.width * 10) / 10,
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
          };
        })
        .filter((item) => item.right > viewportWidth + 0.5 || item.left < -0.5)
        .sort((a, b) => b.right - a.right)
        .slice(0, 12);
      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth,
        offenders,
      };
    });
    expect(
      diagnostics.documentWidth,
      `Unexpected horizontal overflow at ${width}px: ${JSON.stringify(diagnostics, null, 2)}`,
    ).toBeLessThanOrEqual(diagnostics.viewportWidth);

    if ([1440, 768, 390].includes(width)) {
      await page.screenshot({
        path: `${evidenceDirectory}/nusa-forma-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    }
  }
});

test("mobile navigation opens, closes with Escape and returns keyboard focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toHaveAccessibleName("Tutup navigasi");
  await expect(page.getByRole("navigation", { name: "Navigasi utama" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toHaveAccessibleName("Buka navigasi");
  await expect(toggle).toBeFocused();

  await toggle.click();
  await page.getByRole("navigation", { name: "Navigasi utama" }).getByRole("link", { name: "Layanan" }).click();
  await expect(page).toHaveURL(/#layanan$/);
  await expect(page.getByRole("navigation", { name: "Navigasi utama" })).toBeHidden();
});

test("project filter keeps the visible result count and aria-pressed in sync", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Komersial" }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Komersial" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".gallery-count strong")).toHaveText("01");
  await page.locator("#karya .filter-list").getByRole("button", { name: "Semua" }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);

  const firstStudy = page.locator(".project-card").first();
  await firstStudy.locator(".project-more summary").click();
  await expect(firstStudy.locator(".project-more")).toHaveAttribute("open", "");
  await expect(firstStudy.locator(".project-detail")).toContainText("SPATIAL RESPONSE");
  await expect(firstStudy.locator(".project-considerations li")).toHaveCount(3);
});

test("inquiry builder validates required fields and creates an explicitly local summary", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Susun ringkasan" }).click();
  await expect(page.getByLabel(/Jenis ruang/)).toHaveJSProperty("validity.valid", false);

  await page.getByLabel(/Jenis ruang/).selectOption({ label: "Hunian / rumah tinggal" });
  await page.getByLabel(/Lokasi proyek/).fill("Surabaya");
  await page.getByLabel(/Ukuran perkiraan/).fill("72 m²");
  await page.getByLabel(/Kisaran anggaran/).selectOption({ label: "Rp100–250 juta" });
  await page.getByLabel(/Kebutuhan utama/).fill("Dapur dan ruang keluarga terasa menyatu.");
  await page.getByRole("button", { name: "Susun ringkasan" }).click();

  const summary = page.locator(".summary-result");
  await expect(summary).toBeVisible();
  await expect(summary).toContainText("Surabaya");
  await expect(summary).toContainText("72 m²");
  await expect(page.getByRole("status")).toContainText("Belum ada data yang dikirim atau disimpan");
  await expect(page.getByRole("button", { name: "Salin ringkasan" })).toBeVisible();

  await page.getByLabel(/Kebutuhan utama/).fill("Mengubah layout dapur.");
  await expect(page.locator(".summary-result")).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText("Isian berubah");
});

test("FAQ topic filters and single-open disclosure stay in sync", async ({ page }) => {
  await page.goto("/");
  const items = page.locator(".faq-item");
  await expect(items).toHaveCount(8);

  await items.nth(0).locator("summary").click();
  await expect(items.nth(0)).toHaveAttribute("open", "");
  await items.nth(1).locator("summary").click();
  await expect(items.nth(1)).toHaveAttribute("open", "");
  await expect(items.nth(0)).not.toHaveAttribute("open", "");

  await page.getByRole("button", { name: "Pelaksanaan" }).click();
  await expect(items).toHaveCount(2);
  await expect(items.nth(0)).toContainText("kontraktor dan pembangunan");
  await expect(page.getByRole("button", { name: "Pelaksanaan" })).toHaveAttribute("aria-pressed", "true");
});

test("material direction selector updates image, title and selected state", async ({ page }) => {
  await page.goto("/");
  const selector = page.getByRole("group", { name: "Pilih arah palet material" });
  await expect(selector.getByRole("button")).toHaveCount(3);
  await expect(page.locator(".palette-detail h3")).toHaveText("Kayu terang, tekstur lembut.");

  await selector.getByRole("button", { name: /Mineral balance/ }).click();
  await expect(selector.getByRole("button", { name: /Mineral balance/ })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".palette-detail h3")).toHaveText("Batu matte, garis yang tenang.");
  await expect(page.locator(".palette-chip")).toHaveCount(3);

  await selector.getByRole("button", { name: /Earth in layers/ }).click();
  await expect(page.locator(".palette-detail h3")).toHaveText("Warna tanah, lapisan yang hidup.");
});

test("service architecture and process checkpoints expose clear scope information", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".service-card")).toHaveCount(3);
  await expect(page.locator(".service-card").nth(0).locator(".service-output li")).toHaveCount(3);
  await expect(page.locator(".process-step")).toHaveCount(4);
  await expect(page.locator(".process-checkpoint")).toHaveCount(4);
  await expect(page.locator(".process-step").nth(3)).toContainText("Rangkuman keputusan");
});

test("page has no axe-detected WCAG 2.1 A/AA or WCAG 2.2 AA violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const violations = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    nodes: violation.nodes.map((node) => ({
      target: node.target,
      summary: node.failureSummary,
    })),
  }));
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
});

test("browser console and page runtime stay free of errors", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("main")).toBeVisible();
  await page.waitForLoadState("networkidle");
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});


test("typography preserves readable body, control and label sizes at desktop and mobile widths", async ({ page }) => {
  await page.goto("/");
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const report = await page.evaluate(() => {
      const visible = (element: Element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" &&
          Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
      };
      const inspect = (selector: string, minimum: number) =>
        Array.from(document.querySelectorAll(selector))
          .filter((element) => visible(element) && (element.textContent ?? "").trim().length > 0)
          .map((element) => ({
            selector,
            text: (element.textContent ?? "").trim().replace(/\\s+/g, " ").slice(0, 72),
            size: Number.parseFloat(window.getComputedStyle(element).fontSize),
          }))
          .filter((item) => item.size < minimum);
      return {
        bodyCopy: inspect(
          "main p:not(.eyebrow):not(.service-kicker):not(.form-status):not(.faq-index-note p), main li, .faq-item summary strong, .inquiry-form label > span",
          14,
        ),
        controls: inspect(
          ".nav-links > a, .button, .text-link, .filter-button, .faq-filter-button, .material-option, .service-link, .copy-button, .footer-nav > a, .footer-note > a",
          13,
        ),
        labels: inspect(
          ".eyebrow, .micro-label, .project-meta, .project-category, .gallery-count, .gallery-caption, .process-phase, .faq-category, .faq-index-note p, .wordmark-sub, .hero-image-caption, .hero-bottomline, .footer-bottom, .material-index, .material-caption, .service-kicker",
          11,
        ),
      };
    });

    expect(report.bodyCopy, `Body copy fell below 14px at ${width}px: ${JSON.stringify(report.bodyCopy)}`).toEqual([]);
    expect(report.controls, `A control fell below 13px at ${width}px: ${JSON.stringify(report.controls)}`).toEqual([]);
    expect(report.labels, `A label fell below 11px at ${width}px: ${JSON.stringify(report.labels)}`).toEqual([]);
  }
});
