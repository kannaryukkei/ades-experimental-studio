import { escapeHtml, safeUrl } from "./html.mjs";
import { renderCards, renderCta } from "./components.mjs";

function variant(value = "default") { return String(value).toLowerCase().replace(/[^a-z0-9-]/g, "") || "default"; }
function actionLink(action = {}, primary = false) {
  if (!action?.label || !action?.href) return "";
  return '<a class="' + (primary || action.primary ? "button" : "text-link") + '" href="' + escapeHtml(safeUrl(action.href)) + '">' + escapeHtml(action.label) + "</a>";
}
function heading(block, tag = "h2") {
  return (block.eyebrow ? '<p class="eyebrow">' + escapeHtml(block.eyebrow) + "</p>" : "") +
    (block.heading ? "<" + tag + ">" + escapeHtml(block.heading) + "</" + tag + ">" : "") +
    (block.text ? '<p class="section-lede">' + escapeHtml(block.text) + "</p>" : "");
}
function hero(block) {
  const aside = block.aside ? '<aside class="hero-note"><p class="eyebrow">' + escapeHtml(block.aside.eyebrow || "") + "</p><h2>" + escapeHtml(block.aside.title || "") + "</h2><p>" + escapeHtml(block.aside.text || "") + "</p></aside>" : "";
  const visual = block.visual ? '<div class="hero-visual product-visual product-visual--' + variant(block.visual.variant) + '" role="img" aria-label="' + escapeHtml(block.visual.label || "Illustrative product image placeholder") + '><span class="product-visual__mark" aria-hidden="true"></span><span class="product-visual__label">' + escapeHtml(block.visual.note || "Product image placeholder") + "</span></div>" : "";
  const actions = (block.actions || []).map(item => actionLink(item)).join("");
  return '<section class="experience-hero experience-hero--' + variant(block.variant) + '"><div class="experience-hero__main"><p class="eyebrow">' + escapeHtml(block.eyebrow || "") + "</p><h1>" + escapeHtml(block.heading || "") + "</h1>" + (block.text ? '<p class="lede">' + escapeHtml(block.text) + "</p>" : "") + '<div class="actions">' + actions + "</div></div>" + (aside || visual) + "</section>";
}
function proof(block) {
  const items = (block.items || []).map(item => '<div class="proof-item"><span class="proof-value">' + escapeHtml(item.value) + '</span><span class="proof-label">' + escapeHtml(item.label) + "</span></div>").join("");
  return '<section class="proof-band">' + (block.eyebrow ? '<p class="eyebrow">' + escapeHtml(block.eyebrow) + "</p>" : "") + '<div class="proof-grid">' + items + "</div></section>";
}
function features(block) {
  const items = (block.items || []).map((item, index) => {
    const number = item.number || String(index + 1).padStart(2, "0");
    const link = item.href ? '<a class="feature-link" href="' + escapeHtml(safeUrl(item.href)) + '">' + escapeHtml(item.action || "Explore") + ' <span aria-hidden="true">↗</span></a>' : "";
    return '<article class="feature-row"><span class="feature-number">' + escapeHtml(number) + '</span><div class="feature-copy"><h3>' + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.text) + "</p></div>" + link + "</article>";
  }).join("");
  return '<section class="feature-section feature-section--' + variant(block.variant) + '><header class="section-heading">' + heading(block) + '</header><div class="feature-list">' + items + "</div></section>";
}
function products(block) {
  const items = (block.items || []).map((item, index) => {
    const visual = variant(item.visual);
    const href = escapeHtml(safeUrl(item.href));
    return '<article class="product-card"><a class="product-card__visual product-visual product-visual--' + visual + '" href="' + href + '" aria-label="View ' + escapeHtml(item.title) + '"><span class="product-visual__mark" aria-hidden="true"></span><span class="product-visual__label">Product image placeholder</span></a><div class="product-card__body"><p class="eyebrow">' + escapeHtml(item.meta || item.number || String(index + 1).padStart(2, "0")) + "</p><h3><a href=\"" + href + "\">" + escapeHtml(item.title) + "</a></h3><p>" + escapeHtml(item.text) + '</p><a class="feature-link" href="' + href + '">View object <span aria-hidden="true">↗</span></a></div></article>';
  }).join("");
  return '<section class="product-section"><header class="section-heading">' + heading(block) + '</header><div class="product-grid">' + items + "</div></section>";
}
function story(block) {
  const paragraphs = (block.paragraphs || []).map(value => "<p>" + escapeHtml(value) + "</p>").join("");
  const action = actionLink(block.action);
  return '<section class="story-block story-block--' + variant(block.variant) + '><div class="story-block__label">' + (block.eyebrow ? '<p class="eyebrow">' + escapeHtml(block.eyebrow) + "</p>" : "") + '</div><div class="story-block__content"><h2>' + escapeHtml(block.heading || "") + "</h2>" + paragraphs + (action ? '<div class="actions">' + action + "</div>" : "") + "</div></section>";
}
function steps(block) {
  const items = (block.items || []).map((item, index) => '<article class="step-item"><span class="step-number">' + String(index + 1).padStart(2, "0") + '</span><div><h3>' + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.text) + "</p></div></article>").join("");
  return '<section class="steps-section steps-section--' + variant(block.variant) + '><header class="section-heading">' + heading(block) + '</header><div class="steps-grid">' + items + "</div></section>";
}
function specs(block) {
  const items = (block.items || []).map(item => '<div class="spec-row"><dt>' + escapeHtml(item.label) + "</dt><dd>" + escapeHtml(item.value) + "</dd></div>").join("");
  return '<section class="spec-section"><div class="spec-intro"><header class="section-heading">' + heading(block) + '</header></div><dl class="spec-list">' + items + "</dl>" + (block.note ? '<p class="spec-note">' + escapeHtml(block.note) + "</p>" : "") + "</section>";
}
function contact(block) {
  const details = (block.details || []).map(item => '<div class="contact-detail"><span>' + escapeHtml(item.label) + "</span>" + (item.href ? '<a href="' + escapeHtml(safeUrl(item.href)) + '">' + escapeHtml(item.value) + "</a>" : "<strong>" + escapeHtml(item.value) + "</strong>") + "</div>").join("");
  const action = block.action ? actionLink(block.action, true) : "";
  return '<section class="contact-panel contact-panel--' + variant(block.variant) + '><div class="contact-panel__copy"><p class="eyebrow">' + escapeHtml(block.eyebrow || "") + "</p><h2>" + escapeHtml(block.heading || "") + "</h2>" + (block.text ? "<p>" + escapeHtml(block.text) + "</p>" : "") + (action ? '<div class="actions">' + action + "</div>" : "") + "</div>" + (details ? '<div class="contact-panel__details">' + details + "</div>" : "") + "</section>";
}
function renderComposition(block) {
  switch (block.type) {
    case "hero": return hero(block);
    case "proof": return proof(block);
    case "features": return features(block);
    case "products": return products(block);
    case "story": return story(block);
    case "steps": return steps(block);
    case "specs": return specs(block);
    case "contact": return contact(block);
    default: throw new Error("Unknown composition block: " + block.type);
  }
}
function renderSections(sections = []) {
  return sections.map(section => '<section class="content-section"><h2>' + escapeHtml(section.heading) + "</h2>" + (section.paragraphs || []).map(value => "<p>" + escapeHtml(value) + "</p>").join("") + "</section>").join("");
}
export function renderTemplate(page) {
  if (Array.isArray(page.composition) && page.composition.length) return page.composition.map(renderComposition).join("\\n");
  const intro = page.intro ? '<p class="lede">' + escapeHtml(page.intro) + "</p>" : "";
  if (page.template === "home") return '<section class="hero"><p class="eyebrow">' + escapeHtml(page.eyebrow || "") + "</p><h1>" + escapeHtml(page.heading) + "</h1>" + intro + '<div class="actions"><a class="button" href="' + escapeHtml(safeUrl(page.primaryAction.href)) + '">' + escapeHtml(page.primaryAction.label) + '</a><a class="text-link" href="' + escapeHtml(safeUrl(page.secondaryAction.href)) + '">' + escapeHtml(page.secondaryAction.label) + "</a></div></section><section class=\"content-section\"><h2>How we can help</h2>" + renderCards(page.highlights) + "</section>";
  if (page.template === "listing") return '<header class="page-intro"><p class="eyebrow">' + escapeHtml(page.eyebrow || "") + "</p><h1>" + escapeHtml(page.heading) + "</h1>" + intro + "</header>" + renderCards(page.cards);
  if (page.template === "detail" || page.template === "standard") return '<header class="page-intro"><p class="eyebrow">' + escapeHtml(page.eyebrow || "") + "</p><h1>" + escapeHtml(page.heading) + "</h1>" + intro + "</header>" + renderSections(page.sections) + renderCta(page.cta);
  if (page.template === "contact") {
    const details = (page.contactDetails || []).map(item => "<li><strong>" + escapeHtml(item.label) + "</strong><span>" + (item.href ? '<a href="' + escapeHtml(safeUrl(item.href)) + '">' + escapeHtml(item.value) + "</a>" : escapeHtml(item.value)) + "</span></li>").join("");
    return '<header class="page-intro"><p class="eyebrow">' + escapeHtml(page.eyebrow || "") + "</p><h1>" + escapeHtml(page.heading) + "</h1>" + intro + '</header><ul class="contact-list">' + details + "</ul>";
  }
  throw new Error("No renderer for template: " + page.template);
}
