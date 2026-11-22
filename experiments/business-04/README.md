# BUSINESS-04 — Three Synthetic Website Archetypes

This is a disposable validation fixture for the ADES Business static multi-page engine. It is intentionally isolated from the product engine and is not a client deliverable.

## Archetypes

| Archetype | Site | Route count | Experience hypothesis |
|---|---|---:|---|
| Corporate | Meridian Infrastructure | 7 | Institutional trust, broad capability discovery, proof-led corporate narrative |
| Professional services | Fieldnote Advisory | 7 | Expertise, human credibility, service clarity and consultation journey |
| Product/catalog | Form & Function | 7 | Product discovery, comparison, product detail and inquiry |

Each archetype owns its route inventory, page metadata, navigation, CSS design tokens and page content. They share only the engine's rendering and build contract.

## Run

Requires Node.js 20.x. No dependency installation is required.

From this directory:

```powershell
node .\scripts\build-all.mjs
node --test
```

Generated sites are written to each archetype's ignored `dist/` directory. Preview one at a time on http://127.0.0.1:4173; stop with Ctrl+C before switching archetypes.

## What is tested

- All route registries validate and all navigation/internal links resolve against the route inventory.
- Distinct page templates, unique metadata and canonical URLs are emitted.
- Sitemap and robots files contain the correct indexable routes.
- A route manifest and 404 document are generated for each site.
- The preview server returns 200 for a known nested route and 404 for an unknown route.
- Repeated builds produce byte-identical representative outputs.
- Each archetype ships its own stylesheet, and the three CSS files are materially distinct.

## Evaluation limits

This is a structural and build-behaviour validation. It does not prove visual quality, responsive quality, accessibility conformance, content truth, conversion performance, hosting-specific 404 behaviour or production readiness. Human browser review remains required.

No generated output, screenshot, temporary dependency, client data or asset download is committed. This experiment is disposable; its findings should be summarized in ADES only after review.
