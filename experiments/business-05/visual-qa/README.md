# BUSINESS-05 — Visual QA & Experience Validation

Status: **Not yet executed in a real browser.** Build and automated checks are separate from responsive and human experience review.

## Build and preview

From this directory:

~~~powershell
npm.cmd run build
npm.cmd run test
npm.cmd run preview -- corporate
~~~

Open http://127.0.0.1:4173. Stop the current preview with Ctrl+C before switching archetypes:

~~~powershell
npm.cmd run preview -- professional-services
npm.cmd run preview -- product-catalog
~~~

## Viewports

| Viewport | Dimensions | Review |
|---|---:|---|
| Desktop | 1440 × 900 | Every route |
| Tablet | 768 × 1024 | Home, listing, detail, contact |
| Mobile | 390 × 844 | Home, listing, detail, contact, 404 |
| Zoom | 200% | Reflow and readability |

## Journey review

- Corporate: Home → Capabilities → Project delivery → Contact.
- Professional services: Home → Services → Strategy or Organization → Contact.
- Product/catalog: Home → Collection → Product detail → Specifications → Contact.

## Checklist

- [ ] No horizontal page-level overflow or clipping at all three viewport widths.
- [ ] Header, wordmark and navigation remain readable and reachable.
- [ ] Exactly one meaningful H1 per page and coherent heading order.
- [ ] Keyboard-only navigation, visible focus and skip-link behavior.
- [ ] Text and control contrast manually measured.
- [ ] 200% zoom remains usable.
- [ ] All key journeys work from start to finish.
- [ ] Contact language does not imply a form, booking, checkout or backend.
- [ ] Product placeholders are obvious and never mistaken for real photography.
- [ ] Reduced-motion preference is respected.
- [ ] Every route reviewed at desktop; representative routes at tablet and mobile.

## Results record

| Archetype | 1440px | 768px | 390px | 200% zoom | Keyboard | Result |
|---|---|---|---|---|---|---|
| Corporate | Not run | Not run | Not run | Not run | Not run | Pending |
| Professional services | Not run | Not run | Not run | Not run | Not run | Pending |
| Product/catalog | Not run | Not run | Not run | Not run | Not run | Pending |

For every issue record: route, viewport, browser/version, reproduction steps, expected/actual result, severity and screenshot evidence. Passing automated tests does not establish accessibility conformance, conversion performance or production readiness.
