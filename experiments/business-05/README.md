# BUSINESS-05 — Archetype-specific Experience Redesign

Status: **Implementation branch in progress / not production-approved**.

## Baseline finding

BUSINESS-04 structurally validated three seven-route static sites, route resolution, metadata, sitemap/robots, deterministic output and preview 404 behavior. Its README explicitly says that it does not prove visual, responsive or accessibility quality.

The renderer's generic home (hero + highlights), listing (card grid) and detail (intro + text + CTA) patterns were the principal source-level cause selected for this experiment. BUSINESS-05 tests whether archetype-specific composition improves task clarity without changing the static-site contract.

## Implemented in this experiment

- Three isolated archetype copies; BUSINESS-04 remains unchanged.
- Three distinct design directions and information hierarchies.
- Shared semantic composition primitives: hero, proof band, feature paths, product cards, editorial story, steps, specifications and contact panel.
- Archetype-specific HTML/CSS presentation without a new framework or runtime dependency.
- Synthetic content only. Product imagery remains labeled placeholders; corporate proof is qualitative, not fabricated metrics.
- Existing route, metadata, sitemap, robots, noindex and preview-404 contract retained.
- Automated checks added for routes, metadata, H1 uniqueness, composition output, escaping, unsafe URL rejection, stylesheet separation and preview responses.

## Run locally

Requires Node.js 20 or 24. No dependency installation is required.

From this directory:

~~~powershell
npm.cmd run build
npm.cmd run test
npm.cmd run preview -- corporate
~~~

Open http://127.0.0.1:4173. To preview the other sites, stop the server and run:

~~~powershell
npm.cmd run preview -- professional-services
npm.cmd run preview -- product-catalog
~~~

## Experience and source decisions

See DESIGN_DIRECTIONS.md for page hierarchy and RESOURCE_RESEARCH.md for third-party source, license and fit decisions.

## Acceptance state

| Requirement | State |
|---|---|
| Three differentiated design directions documented | Implemented |
| Archetype-specific home hierarchy | Implemented in source |
| Listing/detail task-oriented composition | Implemented in source |
| Truthful static contact/inquiry wording | Implemented in source |
| Route/build/metadata/sitemap/robots/404 automated checks | Passed: 8/8 tests on Node 20 and Node 24 |
| Browser-tested key journeys | Not run |
| 1440 / 768 / 390 viewport review | Not run |
| Keyboard, focus, skip link and 200% zoom review | Not run |
| Before/after screenshots | Not captured |
| Production approval / ADES Core integration | Not approved |

Do not mark visual QA complete from source inspection or automated tests alone. Record browser, operating system, viewports, issues and evidence in visual-qa/README.md.

## Decision gate

This experiment is isolated from ADES Core, the Business Product Profile and BUSINESS-04. Passing automated tests is not production approval. Only after browser review and before/after comparison should we decide whether any engine capability is reusable in ADES Business.
