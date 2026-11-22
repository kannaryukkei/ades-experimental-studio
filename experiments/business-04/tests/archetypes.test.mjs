import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSite } from "../../../engine/src/build.mjs";
import { createPreviewServer } from "../../../engine/src/preview.mjs";
import { archetypes } from "../sites/index.mjs";
import { escapeHtml } from "../../../engine/src/lib/html.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

for (const site of archetypes) {
  test(`${site.label}: builds every route with complete metadata and discovery files`, async () => {
    const root = fileURLToPath(site.root);
    const out = path.join(root, ".test-output");
    try {
      const result = await buildSite({ rootDir: root, outDir: out, config: site.config, pageList: site.pages });
      assert.equal(result.routes.length, site.pages.length);
      assert.equal(result.sitemapEntries, site.pages.filter(page => page.indexable !== false).length);
      for (const page of site.pages) {
        const html = await fs.readFile(path.join(out, page.path === "/" ? "index.html" : page.path.slice(1) + "index.html"), "utf8");
        assert.ok(html.includes(`<title>${escapeHtml(page.title)}</title>`), `${page.path}: title metadata missing or differs`);
        assert.ok(html.includes(`<meta name="description" content="${escapeHtml(page.description)}">`), `${page.path}: description metadata missing or differs`);
        assert.ok(html.includes(`<meta property="og:description" content="${escapeHtml(page.description)}">`), `${page.path}: Open Graph description missing or differs`);
        assert.match(html, /rel="canonical"/);
        assert.match(html, /property="og:title"/);
      }
      const manifest = JSON.parse(await fs.readFile(path.join(out, "routes.json"), "utf8"));
      assert.equal(manifest.length, site.pages.length);
      const sitemap = await fs.readFile(path.join(out, "sitemap.xml"), "utf8");
      assert.equal((sitemap.match(/<url>/g) || []).length, result.sitemapEntries);
      for (const page of site.pages.filter(item => item.indexable === false)) {
        const file = path.join(out, page.path === "/" ? "index.html" : page.path.slice(1) + "index.html");
        assert.match(await fs.readFile(file, "utf8"), /noindex, nofollow/);
        assert.ok(!sitemap.includes(new URL(page.path, site.config.siteUrl).toString()), `${page.path}: noindex route must not appear in sitemap`);
      }
      const robots = await fs.readFile(path.join(out, "robots.txt"), "utf8");
      assert.ok(robots.includes(new URL("/sitemap.xml", site.config.siteUrl).toString()));
      assert.match(await fs.readFile(path.join(out, "404.html"), "utf8"), /noindex, nofollow/);
      const css = await fs.readFile(path.join(out, "styles.css"), "utf8");
      assert.ok(css.length > 1500);
    } finally {
      await fs.rm(out, { recursive: true, force: true });
    }
  });

  test(`${site.label}: preview serves a nested page and a true HTTP 404`, async () => {
    const root = fileURLToPath(site.root);
    const out = path.join(root, ".test-preview");
    await buildSite({ rootDir: root, outDir: out, config: site.config, pageList: site.pages });
    const server = createPreviewServer({ rootDir: out });
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    try {
      const base = `http://127.0.0.1:${server.address().port}`;
      const nested = site.pages.find(page => page.path.split("/").filter(Boolean).length > 1);
      assert.ok(nested, "fixture must include a nested route");
      const response = await fetch(base + nested.path);
      assert.equal(response.status, 200);
      const missing = await fetch(base + "/this-route-is-not-real/");
      assert.equal(missing.status, 404);
      assert.match(await missing.text(), /This page is not here/);
    } finally {
      await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
      await fs.rm(out, { recursive: true, force: true });
    }
  });

  test(`${site.label}: repeat build is byte-identical`, async () => {
    const root = fileURLToPath(site.root);
    const first = path.join(root, ".test-first");
    const second = path.join(root, ".test-second");
    try {
      await buildSite({ rootDir: root, outDir: first, config: site.config, pageList: site.pages });
      await buildSite({ rootDir: root, outDir: second, config: site.config, pageList: site.pages });
      for (const file of ["index.html", "sitemap.xml", "routes.json", "robots.txt", "404.html"]) {
        assert.equal(await fs.readFile(path.join(first, file), "utf8"), await fs.readFile(path.join(second, file), "utf8"), file);
      }
    } finally {
      await fs.rm(first, { recursive: true, force: true });
      await fs.rm(second, { recursive: true, force: true });
    }
  });
}

test("archetypes retain distinct art direction rather than sharing one generic stylesheet", async () => {
  const css = await Promise.all(archetypes.map(site =>
    fs.readFile(path.join(fileURLToPath(site.root), "public/styles.css"), "utf8")
  ));
  assert.equal(new Set(css).size, 3);
  assert.ok(css[0].includes("--accent:#b76d42"));
  assert.ok(css[1].includes("font-family:Georgia"));
  assert.ok(css[2].includes("--accent:#e34d27"));
});
