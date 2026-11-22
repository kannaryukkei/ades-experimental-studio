# BUSINESS-04 — Visual QA & Experience Validation

Status: **Not yet executed**. This document defines the human browser review required after the structural/build tests. A completed checklist is evidence of review, not production approval.

## Purpose

Validate that the three synthetic Business archetypes remain usable and visually coherent across desktop, tablet and mobile. Review the experience produced by the shared engine without collapsing the three distinct art directions into one generic design.

## Start the previews

From this directory:

```powershell
npm.cmd run build
npm.cmd run preview -- corporate
```

Open `http://127.0.0.1:4173`. Stop the server with Ctrl+C before starting another archetype:

```powershell
npm.cmd run preview -- professional-services
npm.cmd run preview -- product-catalog
```

The preview server serves the generated `dist/` output. Re-run the build after changing source files.

## Browser and viewport matrix

Use a current Chromium-based browser for the baseline review. Record browser/version and operating system in the results below.

| Viewport | Dimensions | Review scope |
|---|---:|---|
| Desktop | 1440 × 900 | Every route in each archetype |
| Tablet | 768 × 1024 | Home, one listing, one detail, contact |
| Mobile | 390 × 844 | Home, one listing, one detail, contact, 404 |

Also inspect at 200% browser zoom on desktop for reflow and readability. These are review sizes, not claims of device coverage.

## Route inventory

Visit every route at desktop width. At tablet/mobile widths, use the representative page types listed above.

### Corporate — Meridian Infrastructure

- [ ] `/` — Home
- [ ] `/company/` — Standard
- [ ] `/capabilities/` — Listing
- [ ] `/capabilities/project-delivery/` — Detail
- [ ] `/industries/` — Listing
- [ ] `/contact/` — Contact
- [ ] `/responsibility/` — Non-indexable standard page
- [ ] `/this-route-is-not-real/` — Not-found experience

### Professional services — Fieldnote Advisory

- [ ] `/` — Home
- [ ] `/approach/` — Standard
- [ ] `/services/` — Listing
- [ ] `/services/strategy/` — Detail
- [ ] `/services/organization/` — Detail
- [ ] `/perspectives/` — Listing
- [ ] `/contact/` — Contact
- [ ] `/this-route-is-not-real/` — Not-found experience

### Product/catalog — Form & Function

- [ ] `/` — Home
- [ ] `/products/` — Listing
- [ ] `/products/field-kit/` — Detail
- [ ] `/products/desk-object/` — Detail
- [ ] `/about/` — Standard
- [ ] `/contact/` — Contact
- [ ] `/materials/` — Non-indexable standard page
- [ ] `/this-route-is-not-real/` — Not-found experience

## Review criteria

For each archetype, check the following at all three viewports where applicable.

### Layout and responsive behavior

- [ ] No horizontal page-level scrolling at 390px, 768px or 1440px.
- [ ] Header, wordmark and navigation remain readable and do not overlap.
- [ ] Main content has a clear hierarchy; headings and body copy do not collide or clip.
- [ ] Cards and card grids reflow without narrow columns, overlap or awkward gaps.
- [ ] CTA panels, contact details, breadcrumbs and footer remain inside the viewport.
- [ ] Long headings, long links and multi-line navigation wrap safely.
- [ ] 200% zoom remains usable without loss of content or functionality.

### Navigation and journeys

- [ ] Wordmark returns to the home page.
- [ ] Every visible primary navigation item opens the intended page.
- [ ] Active navigation state is clear on the current section/page.
- [ ] Breadcrumbs (where present) lead to the expected parent route.
- [ ] Cards and CTA links lead to the intended internal route.
- [ ] Contact links use the expected email/telephone protocol where present.
- [ ] Browser back/forward navigation behaves as expected.
- [ ] Unknown route displays the not-found page, not a blank page or a misleading success page.

### Readability and interaction

- [ ] Text/background contrast appears sufficient for normal reading; record any uncertain combinations for a dedicated contrast measurement.
- [ ] Links are distinguishable from surrounding text.
- [ ] Buttons and links have visible hover and keyboard-focus states.
- [ ] Keyboard-only navigation can reach all interactive elements in a logical order.
- [ ] Skip link becomes visible when focused and moves focus to main content.
- [ ] No control appears interactive when it has no action.
- [ ] Contact/inquiry wording does not imply a working form, checkout or backend where none exists.

### Archetype distinction

- [ ] Corporate reads as institutional and proof-led, not as the product catalogue.
- [ ] Professional services reads as editorial, human and expertise-led.
- [ ] Product/catalog prioritizes product discovery and product-detail scanning.
- [ ] Each archetype retains its own typography, color, spacing and component treatment.
- [ ] Shared shell elements are consistent without erasing the archetype's art direction.

## Results record

Record findings rather than marking an item complete from source inspection alone.

| Archetype | Desktop 1440 | Tablet 768 | Mobile 390 | 200% zoom | Keyboard review | Result |
|---|---|---|---|---|---|---|
| Corporate | Not run | Not run | Not run | Not run | Not run | Pending |
| Professional services | Not run | Not run | Not run | Not run | Not run | Pending |
| Product/catalog | Not run | Not run | Not run | Not run | Not run | Pending |

For every issue, record: archetype, route, viewport, browser, reproduction steps, expected behavior, actual behavior, severity (Blocker / Major / Minor), and screenshot filename if available.

Suggested local evidence names: `<archetype>-<route>-<viewport>-<issue-or-pass>.png`. Keep screenshots and browser captures local; do not commit generated output or synthetic-site screenshots unless explicitly requested.

## Exit criteria

Visual QA is complete only when:

1. Every route in the inventory has been opened and reviewed at desktop width.
2. Representative page types have been reviewed at tablet and mobile widths.
3. Keyboard navigation and 200% zoom have been checked for each archetype.
4. All Blocker and Major findings are fixed and re-reviewed; Minor findings are recorded with an explicit disposition.
5. The final results record includes reviewer, date, browser/version, and evidence references.

Passing this review does **not** establish accessibility conformance, SEO performance, conversion performance, content truth, hosting-specific 404 behavior or production readiness. Those require their own evidence and acceptance gates.
