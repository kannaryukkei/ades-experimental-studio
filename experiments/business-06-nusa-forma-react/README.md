# BUSINESS-06 — Nusa Forma Studio (React + Vite)

A tangible ADES output benchmark built from the merged optional React + Vite implementation kit. This is a single-page redesign experiment for the fictional Nusa Forma Studio concept, not a production claim or client case study.

## Run locally

Node.js 22.12+ is required. Windows PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run qa
npm.cmd run preview
```

Other shells may use `npm` instead of `npm.cmd`.

## Experience and section architecture

- Editorial brand system: warm paper, forest green, clay accent, serif display type and photographic compositions.
- Sticky responsive navigation with mobile menu, Escape handling, keyboard-focus return and scroll-reading progress.
- Image-led hero and project index with category filtering.
- Three editorial concept studies. Each explains the design question and offers an expandable spatial response, considerations and material notes.
- Three distinct service-scope cards. Each states the use case, potential outputs and boundaries of the engagement.
- Interactive material direction exploration with three palettes: Natural warmth, Mineral balance and Earth in layers. The selected palette updates its visual reference, description and swatches.
- Four-stage project timeline. Every stage identifies its purpose, checkpoint output and client involvement.
- FAQ scope desk with filters for Needs, Documents, Execution and Demonstration.
- Local inquiry brief composer with required-field validation and clipboard copy.

## Quality gates

CI runs:
- TypeScript check and Vite production build.
- Production-output assertions.
- Playwright Chromium checks for image loading, layout widths (1440, 768, 390 and 320px), navigation, gallery disclosure/filter, material selection, service/process structure, FAQ filters/disclosure and inquiry composition.
- axe-core scans tagged WCAG 2.1 A/AA and WCAG 2.2 AA.
- Browser console/runtime checks.
- Full-page screenshots at 1440, 768 and 390px.

Latest successful run: https://github.com/kannaryukkei/ades-experimental-studio/actions/runs/46140309802

## Truth and rights

Nusa Forma is a fictional demonstration brand. The studies are illustrative spatial concepts, not client projects, built spaces, testimonials or project outcomes. Unsplash photographs are external visual references and are credited in `ASSET_SOURCES.md`. Replace them with client-owned, commissioned or appropriately licensed assets before any real client release.

The material palettes are conceptual directions, not confirmed product availability or final project specifications. The service cards describe possible scope and deliverables; a real engagement must define the exact deliverables and responsibilities in writing. The inquiry composer only prepares a local text summary; it does not transmit, store or submit data.

## Design intent

This benchmark intentionally moves beyond the React kit's Fieldnotes showcase. It uses the same implementation foundation but a different business, visual grammar, hierarchy, content sequence, and interaction model. The goal is to demonstrate authored, task-specific design systems rather than a repeated house template.

## Deployment status

This is an isolated experiment in `ades-experimental-studio`. It has not been deployed publicly and does not change ADES Starter or Business production status.
