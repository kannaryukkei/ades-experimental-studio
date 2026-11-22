# BUSINESS-05 — Archetype-specific Experience Redesign

Status: **Proposed experiment / not production-approved**.

## Why this experiment exists

BUSINESS-04 proved that one dependency-free static engine can build three multi-page sites, resolve routes, emit metadata/discovery files, serve nested routes and produce deterministic output.

The human review has now raised a separate concern: all three sites are viewable, but their UI/UX quality is perceived as poor. This is a valid negative experience finding. It does not invalidate the structural test results; it shows that structural correctness and design quality are separate acceptance dimensions.

A source review also identifies a likely structural cause: the renderer currently uses a narrow set of highly generic compositions. Home pages share a hero + highlights grid; listing pages share a card grid; detail and standard pages share an intro + stacked text sections + CTA. CSS varies by archetype, but the content composition and interaction patterns remain substantially alike. This experiment must test whether archetype-specific composition improves the result.

## Objective

Produce three clearly differentiated, credible, usable multi-page experiences using the same route/build/metadata contract, without turning the static Business product into a web application.

The objective is not to make three arbitrary artistic themes. Each archetype must communicate its audience, value proposition, evidence and next action with appropriate information architecture and visual hierarchy.

## Non-goals and boundaries

- No backend, database, CMS, authentication, payment, booking engine or persistent form processing.
- No new framework requirement; retain the current dependency-free Node static build unless evidence justifies a change.
- No client-specific or real business claims; keep all content and brands synthetic.
- Do not change ADES Core or the Business Product Profile as part of this experiment.
- Do not equate a polished screenshot with accessibility, conversion or production approval.
- Do not add animation or decorative effects as a substitute for hierarchy, content structure or usability.

## Experience hypotheses

### 1. Corporate — Meridian Infrastructure

Primary audience: institutional buyers, partners and stakeholders.

The experience should prioritize:
- Clear positioning and credible proof points near the first screen.
- A deliberate corporate narrative: capability, sector relevance, delivery evidence, responsibility and contact.
- Strong information hierarchy and scannable evidence, not a generic set of equal-weight cards.
- Navigation that makes a broad organization understandable without overwhelming the visitor.

Candidate composition patterns to test: editorial hero with a meaningful secondary information rail, proof/stat band, capability feature rows, sector navigation and a strong institutional contact path. Use only claims supported by the synthetic fixture content.

### 2. Professional services — Fieldnote Advisory

Primary audience: decision-makers evaluating expertise and fit.

The experience should prioritize:
- Human credibility and a clear point of view.
- Specific service outcomes and engagement approach.
- A readable editorial rhythm with strong typography and generous but purposeful whitespace.
- A low-friction consultation journey without implying an operational booking system.

Candidate composition patterns to test: editorial statement-led hero, principal/expertise profile, structured service pathways, point-of-view feature, engagement steps and considered consultation CTA.

### 3. Product/catalog — Form & Function

Primary audience: people comparing products and deciding what to inquire about.

The experience should prioritize:
- Product discovery and fast scanning.
- Clear product differentiation and useful comparison cues.
- Product details that foreground imagery/visual placeholders, key attributes, use cases and inquiry action.
- Consistent paths between catalog, product detail and contact.

Candidate composition patterns to test: product-led hero, category navigation, asymmetric product grid, featured product module, specification/attribute blocks and related-product navigation. Do not invent product imagery or specifications; use clearly labeled placeholders where assets are absent.

## Shared quality requirements

All three experiences must:
- Preserve working internal routes, breadcrumbs, canonical metadata, sitemap, robots, noindex behavior and true preview 404 responses.
- Have a clear page-level heading and meaningful page-specific content hierarchy.
- Avoid layout shifts, clipping, overflow and horizontal page scrolling at 390px, 768px and 1440px.
- Support keyboard navigation, visible focus, skip link and reduced-motion preferences.
- Use semantic HTML and sensible link/button affordances.
- Have page-specific titles/descriptions and clear, truthful CTA wording.
- Keep header/footer consistency while allowing archetype-specific composition.
- Avoid a one-template-fits-all visual system.

## Proposed implementation sequence

1. **Baseline evidence:** retain BUSINESS-04 as the structural baseline; record user-reported visual dissatisfaction. Capture screenshots at 1440px and 390px for each archetype before changing code, if available.
2. **Design direction:** define one short visual/UX direction per archetype with a page hierarchy and key journeys before implementation.
3. **Composition model:** extend the engine only where reusable composition primitives are justified. Prefer data-driven section types/variants over hard-coded site-specific markup inside the engine.
4. **Archetype implementation:** redesign home, listing, detail and contact experiences for each archetype; preserve the route contract.
5. **Validation:** run automated tests and BUSINESS-04 visual QA protocol. Compare before/after at the same viewports.
6. **Decision:** document what improved, what remains weak and whether any engine capability is genuinely reusable for ADES Business.

## Acceptance criteria

- [ ] Three distinct design directions documented before coding.
- [ ] Each archetype has a distinct homepage information hierarchy, not only a different color/font.
- [ ] Listing and detail pages support the primary visitor task for that archetype.
- [ ] Contact journey is clear and does not imply backend functionality that does not exist.
- [ ] At least one complete key journey per archetype is browser-tested end to end.
- [ ] Desktop (1440px), tablet (768px) and mobile (390px) reviewed.
- [ ] No blocker/major visual or interaction defects remain.
- [ ] Existing route, metadata, sitemap, robots, deterministic build and 404 tests remain passing.
- [ ] Before/after evidence and a concise evaluation are recorded.
- [ ] No changes are promoted to ADES Core without separate review and approval.

## Decision gate

BUSINESS-05 is an experiment only. Passing its acceptance criteria may justify a proposal to update the Business Product Profile or reusable Core capabilities. It does not automatically approve either change or authorize production use.
