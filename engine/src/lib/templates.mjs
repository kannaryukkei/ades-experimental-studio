import { escapeHtml, safeUrl } from "./html.mjs";
import { renderCards, renderCta } from "./components.mjs";

function renderSections(sections = []) {
  return sections.map(section => `<section class="content-section"><h2>${escapeHtml(section.heading)}</h2>${(section.paragraphs || []).map(text => `<p>${escapeHtml(text)}</p>`).join("")}</section>`).join("");
}

export function renderTemplate(page) {
  const intro = page.intro ? `<p class="lede">${escapeHtml(page.intro)}</p>` : "";
  if (page.template === "home") {
    return `<section class="hero"><p class="eyebrow">${escapeHtml(page.eyebrow || "")}</p><h1>${escapeHtml(page.heading)}</h1>${intro}<div class="actions"><a class="button" href="${escapeHtml(safeUrl(page.primaryAction.href))}">${escapeHtml(page.primaryAction.label)}</a><a class="text-link" href="${escapeHtml(safeUrl(page.secondaryAction.href))}">${escapeHtml(page.secondaryAction.label)}</a></div></section><section class="content-section"><h2>How we can help</h2>${renderCards(page.highlights)}</section>`;
  }
  if (page.template === "listing") {
    return `<header class="page-intro"><p class="eyebrow">${escapeHtml(page.eyebrow || "")}</p><h1>${escapeHtml(page.heading)}</h1>${intro}</header>${renderCards(page.cards)}`;
  }
  if (page.template === "detail" || page.template === "standard") {
    return `<header class="page-intro"><p class="eyebrow">${escapeHtml(page.eyebrow || "")}</p><h1>${escapeHtml(page.heading)}</h1>${intro}</header>${renderSections(page.sections)}${renderCta(page.cta)}`;
  }
  if (page.template === "contact") {
    const details = (page.contactDetails || []).map(item =>
      `<li><strong>${escapeHtml(item.label)}</strong><span>${item.href ? `<a href="${escapeHtml(safeUrl(item.href))}">${escapeHtml(item.value)}</a>` : escapeHtml(item.value)}</span></li>`
    ).join("");
    return `<header class="page-intro"><p class="eyebrow">${escapeHtml(page.eyebrow || "")}</p><h1>${escapeHtml(page.heading)}</h1>${intro}</header><ul class="contact-list">${details}</ul>`;
  }
  throw new Error("No renderer for template: " + page.template);
}
