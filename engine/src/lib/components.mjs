import { escapeHtml, safeUrl } from "./html.mjs";

export function renderHeader(config, pages, currentPath) {
  const links = config.navigation.map(item => {
    const active = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
    return `<a href="${escapeHtml(safeUrl(item.path))}"${active ? ' aria-current="page"' : ""}>${escapeHtml(item.label)}</a>`;
  }).join("");
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="container header-inner">
<a class="wordmark" href="/" aria-label="${escapeHtml(config.siteName)} home">${escapeHtml(config.siteName)}</a>
<nav class="primary-nav" aria-label="Primary navigation">${links}</nav>
</div></header>`;
}

export function renderFooter(config) {
  return `<footer class="site-footer"><div class="container footer-inner">
<p>${escapeHtml(config.siteName)}</p><p>${escapeHtml(config.footerNote || "")}</p>
</div></footer>`;
}

export function renderBreadcrumbs(page) {
  if (page.path === "/") return "";
  const segments = page.path.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }];
  let current = "";
  for (const segment of segments.slice(0, -1)) {
    current += "/" + segment;
    const known = page.breadcrumbs?.find(item => item.href === current + "/");
    crumbs.push({ label: known?.label || segment.replace(/-/g, " "), href: current + "/" });
  }
  crumbs.push({ label: page.breadcrumbLabel || page.navLabel || segments.at(-1).replace(/-/g, " ") });
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${crumbs.map((crumb, index) =>
    `<li>${crumb.href ? `<a href="${escapeHtml(safeUrl(crumb.href))}">${escapeHtml(crumb.label)}</a>` : `<span aria-current="page">${escapeHtml(crumb.label)}</span>`}</li>`
  ).join("")}</ol></nav>`;
}

export function renderCards(cards = []) {
  return `<div class="card-grid">${cards.map(card =>
    `<article class="card"><h3><a href="${escapeHtml(safeUrl(card.href))}">${escapeHtml(card.title)}</a></h3><p>${escapeHtml(card.text)}</p></article>`
  ).join("")}</div>`;
}

export function renderCta(cta) {
  if (!cta) return "";
  return `<aside class="cta-panel"><h2>${escapeHtml(cta.title)}</h2><p>${escapeHtml(cta.text)}</p><a class="button" href="${escapeHtml(safeUrl(cta.href))}">${escapeHtml(cta.label)}</a></aside>`;
}
