# ADES Business — Static Multi-page Engine

A dependency-free reference implementation for Business-eligible public websites. It turns a frozen route inventory and page/template model into a deterministic static build.

> **Synthetic demonstration only.** The included company, services, copy and contact details are fictional. This engine is an implementation capability proof, not a production approval or a client-ready theme.

## Requirements and commands

- Node.js 20.x (see `.nvmrc`)
- No runtime or build dependencies; no `npm install` required

From this directory:

```powershell
node .\src\build.mjs
node .\src\preview.mjs
node --test
```

Then open http://127.0.0.1:4173. The preview server serves `dist/`, returns the generated 404 page with HTTP 404 for unknown paths, and is for local review only.

## Structure

- `src/site.mjs`: explicit site configuration and route/page inventory.
- `src/lib/routes.mjs`: route normalization, collision detection and output mapping.
- `src/lib/components.mjs`: shared navigation, breadcrumbs, cards, CTA and footer.
- `src/lib/templates.mjs`: distinct home, standard, listing, detail and contact page templates.
- `src/build.mjs`: deterministic static output, metadata, sitemap, robots and 404.
- `src/preview.mjs`: local static preview with real 404 status.
- `public/styles.css`: shared visual foundations; replace per approved project design system.
- `tests/`: Node built-in tests for route safety, output completeness and deterministic output.

## Project adaptation

1. Freeze the approved sitemap and page inventory in the active project PRD/Brief.
2. Map every approved route to a template in `src/site.mjs`; the inventory is the route source of truth.
3. Replace all synthetic content, metadata, visual foundations and navigation with client-approved material.
4. Add project-specific components/templates only where a distinct page purpose requires them.
5. Set the real canonical `siteUrl` before release. Do not deploy the example domain.
6. Run `node --test`, build, preview, configure the ADES Quality Harness with every approved route, and complete human design/content/SEO review.

## Production behaviour

- One explicit route registry generates one HTML document per route.
- Shared shell and reusable components are composed with page-specific templates.
- Each indexable page receives a unique title, description, canonical and Open Graph metadata.
- Sitemap includes only indexable canonical routes; robots.txt points to that sitemap.
- A dedicated `404.html` is generated. The included preview server returns HTTP 404 for unknown routes. Production hosting must be configured to serve `404.html` as its not-found document; static-host fallback configuration is provider-specific.
- Output is rebuilt from source and public assets. Generated timestamps and filesystem traversal order do not enter output.
- No server-side data, database, authentication, CMS, form processing or third-party runtime is introduced.

## Boundaries and known limitations

This is a static-site foundation, not a full static-site framework. It intentionally does not implement dynamic parameters, content collections, localization, redirects, image optimization, CMS, server rendering, form delivery, analytics, structured data or automatic SEO strategy. Add these only when approved requirements justify them and acceptance/ownership are defined.

The HTML helper escapes plain text and attributes; template content is authored as HTML only through the small trusted component/template layer. Do not pass client-authored raw HTML into templates. The preview server is a local reviewer utility, not a hardened production server.

A successful build or unit test does not establish visual quality, accessibility conformance, content truth, asset rights, link destination validity, conversion behaviour or production readiness. Those remain subject to the Business Profile, ADES governance and full project QA.
