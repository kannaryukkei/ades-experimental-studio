import { escapeHtml } from "./html.mjs";
import { renderBreadcrumbs, renderFooter, renderHeader } from "./components.mjs";
import { renderTemplate } from "./templates.mjs";

export function renderDocument({ page, config, pages, body, noindex = false }) {
  const canonical = new URL(page.path, config.siteUrl).toString();
  const description = page.description || config.defaultDescription;
  const content = body ?? renderTemplate(page);
  return `<!doctype html>
<html lang="${escapeHtml(page.locale || config.defaultLocale || "en")}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(page.title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}">
<link rel="canonical" href="${escapeHtml(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(config.siteName)}">
<meta property="og:title" content="${escapeHtml(page.title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
${renderHeader(config, pages, page.path)}
<main id="main" class="container">
${renderBreadcrumbs(page)}
${content}
</main>
${renderFooter(config)}
</body>
</html>
`;
}
