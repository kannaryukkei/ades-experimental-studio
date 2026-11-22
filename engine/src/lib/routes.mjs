export function normalizeRoute(route) {
  if (typeof route !== "string" || !route.startsWith("/") || route.startsWith("//")) {
    throw new Error("Route must be an absolute local path: " + route);
  }
  if (/[?#\\\\%]/.test(route) || !/^\/(?:[a-z0-9-]+\/)*$/.test(route)) {
    throw new Error("Route must use lowercase kebab-case segments and end with '/': " + route);
  }
  return route;
}

export function validatePages(pages) {
  const seen = new Set();
  const titles = new Set();
  const descriptions = new Set();
  for (const page of pages) {
    const route = normalizeRoute(page.path);
    if (route === "/404/") throw new Error("/404/ is reserved for generated not-found output.");
    if (seen.has(route)) throw new Error("Duplicate route: " + route);
    seen.add(route);
    if (!page.title?.trim() || !page.description?.trim()) {
      throw new Error("Every route requires a title and description: " + route);
    }
    if (titles.has(page.title.trim())) throw new Error("Page titles must be unique: " + page.title);
    titles.add(page.title.trim());
    if (descriptions.has(page.description.trim())) throw new Error("Page descriptions must be unique: " + page.description);
    descriptions.add(page.description.trim());
    if (!["home", "standard", "listing", "detail", "contact"].includes(page.template)) {
      throw new Error("Unknown page template on " + route + ": " + page.template);
    }
  }
  if (!seen.has("/")) throw new Error("Route inventory must include the home route '/'.");
  return pages;
}

export function routeToFile(route) {
  const normalized = normalizeRoute(route);
  return normalized === "/" ? "index.html" : normalized.slice(1) + "index.html";
}
