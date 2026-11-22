import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSite } from "../src/build.mjs";
import { createPreviewServer } from "../src/preview.mjs";
import { pages, siteConfig } from "../src/site.mjs";
import { routeToFile, validatePages } from "../src/lib/routes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("route registry rejects duplicate, unsafe and incomplete routes", () => {
  assert.throws(() => validatePages([...pages, { ...pages[1] }]), /Duplicate route/);
  assert.throws(() => routeToFile("/../private/"), /lowercase kebab-case/);
  assert.throws(() => validatePages(pages.filter(page => page.path !== "/")), /home route/);
  assert.throws(() => validatePages([...pages, { ...pages[1], path: "/duplicate-title/" }]), /titles must be unique/);
  assert.throws(() => validatePages([...pages, { ...pages[1], path: "/duplicate-description/", title: "Different title" }]), /descriptions must be unique/);
  assert.equal(routeToFile("/"), "index.html");
  assert.equal(routeToFile("/services/design/"), "services/design/index.html");
});

test("build rejects navigation and internal links outside the approved route registry", async () => {
  await assert.rejects(
    buildSite({
      rootDir: root,
      outDir: path.join(root, ".test-invalid-navigation"),
      config: { ...siteConfig, navigation: [...siteConfig.navigation, { label: "Missing", path: "/missing/" }] }
    }),
    /unknown route/
  );
  await assert.rejects(
    buildSite({
      rootDir: root,
      outDir: path.join(root, ".test-invalid-link"),
      pageList: pages.map(page => page.path === "/" ? { ...page, primaryAction: { label: "Missing", href: "/missing/" } } : page)
    }),
    /Internal link points to an unknown route/
  );
});

test("build emits every route, unique metadata, sitemap, robots and noindex 404", async () => {
  const out = path.join(root, ".test-output");
  try {
    const result = await buildSite({ rootDir: root, outDir: out });
    assert.equal(result.routes.length, pages.length);
    for (const page of pages) {
      const html = await fs.readFile(path.join(out, routeToFile(page.path)), "utf8");
      assert.ok(html.includes(`<title>${page.title}</title>`), page.path);
      assert.match(html, /rel="canonical"/);
      assert.match(html, /name="description"/);
    }
    const manifest = JSON.parse(await fs.readFile(path.join(out, "routes.json"), "utf8"));
    assert.deepEqual(manifest.map(route => route.path), [...pages].map(page => page.path).sort());
    const sitemap = await fs.readFile(path.join(out, "sitemap.xml"), "utf8");
    assert.equal((sitemap.match(/<url>/g) || []).length, pages.length);
    const nonIndexableOut = path.join(root, ".test-noindex");
    try {
      await buildSite({ rootDir: root, outDir: nonIndexableOut, pageList: pages.map(page => page.path === "/insights/" ? { ...page, indexable: false } : page) });
      const hiddenPage = await fs.readFile(path.join(nonIndexableOut, "insights/index.html"), "utf8");
      const hiddenSitemap = await fs.readFile(path.join(nonIndexableOut, "sitemap.xml"), "utf8");
      assert.match(hiddenPage, /noindex, nofollow/);
      assert.doesNotMatch(hiddenSitemap, /https:\/\/example\.com\/insights\//);
    } finally {
      await fs.rm(nonIndexableOut, { recursive: true, force: true });
    }
    assert.match(sitemap, /https:\/\/example\.com\/services\/design\//);
    const robots = await fs.readFile(path.join(out, "robots.txt"), "utf8");
    assert.match(robots, /Sitemap: https:\/\/example\.com\/sitemap\.xml/);
    const notFound = await fs.readFile(path.join(out, "404.html"), "utf8");
    assert.match(notFound, /404 \/ Not found/);
    assert.match(notFound, /noindex, nofollow/);
    const server = createPreviewServer({ rootDir: out });
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    try {
      const address = server.address();
      const baseUrl = `http://127.0.0.1:${address.port}`;
      const known = await fetch(baseUrl + "/services/research/");
      assert.equal(known.status, 200);
      assert.match(await known.text(), /See the situation more clearly/);
      const missing = await fetch(baseUrl + "/route-that-does-not-exist/");
      assert.equal(missing.status, 404);
      assert.match(await missing.text(), /This page is not here/);
    } finally {
      await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    }
    assert.equal(await fs.readFile(path.join(out, "styles.css"), "utf8"), await fs.readFile(path.join(root, "public/styles.css"), "utf8"));
  } finally {
    await fs.rm(out, { recursive: true, force: true });
  }
});

test("same source produces byte-identical HTML and sitemap across builds", async () => {
  const first = path.join(root, ".test-first");
  const second = path.join(root, ".test-second");
  try {
    await buildSite({ rootDir: root, outDir: first, config: siteConfig, pageList: pages });
    await buildSite({ rootDir: root, outDir: second, config: siteConfig, pageList: pages });
    for (const relative of ["index.html", "about/index.html", "services/index.html", "routes.json", "sitemap.xml", "robots.txt", "404.html"]) {
      assert.equal(await fs.readFile(path.join(first, relative), "utf8"), await fs.readFile(path.join(second, relative), "utf8"), relative);
    }
  } finally {
    await fs.rm(first, { recursive: true, force: true });
    await fs.rm(second, { recursive: true, force: true });
  }
});
