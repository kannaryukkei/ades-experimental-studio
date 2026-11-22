import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig, pages, notFoundPage } from "./site.mjs";
import { normalizeRoute, validatePages, routeToFile } from "./lib/routes.mjs";
import { renderDocument } from "./lib/shell.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(here, "..");

function xmlEscape(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  })[character]);
}

function validateNavigation(config, pageList) {
  const routes = new Set(pageList.map(page => page.path));
  for (const item of config.navigation || []) {
    const route = normalizeRoute(item.path);
    if (!routes.has(route)) throw new Error("Navigation points to an unknown route: " + route);
    if (!item.label?.trim()) throw new Error("Every navigation item requires a label: " + route);
  }
}

function validateInternalLinks(pageList) {
  const routes = new Set(pageList.map(page => page.path));
  function visit(value, key = "") {
    if (Array.isArray(value)) return value.forEach(item => visit(item));
    if (!value || typeof value !== "object") {
      if (key === "href" && typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
        const route = value.split(/[?#]/, 1)[0];
        if (route && !routes.has(route)) throw new Error("Internal link points to an unknown route: " + value);
      }
      return;
    }
    for (const [childKey, childValue] of Object.entries(value)) visit(childValue, childKey);
  }
  pageList.forEach(page => visit(page));
}

export async function buildSite({ rootDir = defaultRoot, outDir = path.join(rootDir, "dist"), config = siteConfig, pageList = pages } = {}) {
  validatePages(pageList);
  validateNavigation(config, pageList);
  validateInternalLinks(pageList);
  const root = path.resolve(rootDir);
  const output = path.resolve(outDir);
  const relative = path.relative(root, output);
  if (!relative || relative === ".." || relative.startsWith(".." + path.sep) || path.isAbsolute(relative)) {
    throw new Error("Build output must be a child directory of the engine root.");
  }
  const parsedSiteUrl = new URL(config.siteUrl);
  if (!["http:", "https:"].includes(parsedSiteUrl.protocol) || parsedSiteUrl.pathname !== "/" || parsedSiteUrl.search || parsedSiteUrl.hash) {
    throw new Error("siteUrl must be an origin URL with no path, query or fragment.");
  }

  await fs.rm(output, { recursive: true, force: true });
  await fs.mkdir(output, { recursive: true });
  const sortedPages = [...pageList].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  for (const page of sortedPages) {
    const destination = path.join(output, routeToFile(page.path));
    await fs.mkdir(path.dirname(destination), { recursive: true });
    const html = renderDocument({ page, config, pages: sortedPages, noindex: page.indexable === false });
    await fs.writeFile(destination, html, "utf8");
  }

  const notFound = {
    ...notFoundPage,
    path: "/404/",
    template: "standard",
    locale: config.defaultLocale
  };
  const notFoundHtml = renderDocument({
    page: notFound,
    config,
    pages: sortedPages,
    body: `<header class="page-intro"><p class="eyebrow">${notFound.eyebrow}</p><h1>${notFound.heading}</h1><p class="lede">${notFound.intro}</p><a class="button" href="/">Return home</a></header>`,
    noindex: true
  });
  await fs.writeFile(path.join(output, "404.html"), notFoundHtml, "utf8");

  const routeManifest = sortedPages.map(page => ({
    path: page.path,
    template: page.template,
    title: page.title,
    description: page.description,
    indexable: page.indexable !== false
  }));
  await fs.writeFile(path.join(output, "routes.json"), JSON.stringify(routeManifest, null, 2) + "\n", "utf8");

  const sitemapEntries = sortedPages
    .filter(page => page.indexable !== false)
    .map(page => `<url><loc>${xmlEscape(new URL(page.path, config.siteUrl).toString())}</loc></url>`)
    .join("");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>\n`;
  await fs.writeFile(path.join(output, "sitemap.xml"), sitemap, "utf8");
  await fs.writeFile(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${new URL("/sitemap.xml", config.siteUrl).toString()}\n`, "utf8");

  const publicDir = path.join(root, "public");
  try {
    await fs.cp(publicDir, output, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return { output, routes: sortedPages.map(page => page.path), sitemapEntries: sortedPages.filter(page => page.indexable !== false).length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  buildSite().then(result => {
    console.log(`Built ${result.routes.length} routes to ${result.output}`);
  }).catch(error => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  });
}
