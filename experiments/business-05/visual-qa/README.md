# BUSINESS-05 — Visual QA & Experience Validation

Status: **Automated Chromium browser QA passed; manual design review remains pending.** Run: [GitHub Actions #14](https://github.com/kannaryukkei/ades-experimental-studio/actions/runs/46055513025).

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

## Automated browser results

- 21/21 routes returned HTTP 200 and exactly one H1 at desktop width (1440 px).
- 24 representative tablet/mobile checks passed at 768 px and 390 px with no horizontal overflow.
- All three end-to-end paths passed: corporate capabilities → project delivery → contact; advisory approach → services → strategy → contact; catalogue → collection → Field Kit → inquiry.
- Keyboard first-focus skip link and reduced-motion behavior passed for all archetypes.
- No uncaught browser page errors.
- Browser: Chromium via Playwright 1.56.1, Node.js 24, Ubuntu 24.04.
- 15 screenshots (desktop home and mobile representative pages) are captured and uploaded as the `business-05-browser-evidence` workflow artifact.

This is automated smoke coverage, not a human visual design review or a formal accessibility audit. Contrast measurement, manual 200% zoom, detailed typography/composition review, and before/after comparison remain outstanding.

## Results record

| Archetype | 1440px | 768px | 390px | 200% zoom | Keyboard | Result |
|---|---|---|---|---|---|---|
| Corporate | Automated pass | Automated pass | Automated pass | Pending manual | Skip link pass | Manual review pending |
| Professional services | Automated pass | Automated pass | Automated pass | Pending manual | Skip link pass | Manual review pending |
| Product/catalog | Automated pass | Automated pass | Automated pass | Pending manual | Skip link pass | Manual review pending |

For every issue record: route, viewport, browser/version, reproduction steps, expected/actual result, severity and screenshot evidence. Passing automated tests does not establish accessibility conformance, conversion performance or production readiness.
