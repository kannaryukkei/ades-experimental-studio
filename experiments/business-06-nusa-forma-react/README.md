# BUSINESS-06 — Nusa Forma Studio (React + Vite)

A tangible ADES output benchmark built from the merged optional React + Vite implementation kit. This is a single-page redesign experiment of the fictional Nusa Forma Studio concept, not a production claim or client case study.

## Run locally

Node.js 22.12+ is required. Windows PowerShell:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run qa
npm.cmd run preview
```

Other shells may use `npm` instead of `npm.cmd`.

## What is implemented

- A distinct editorial art direction: warm paper, deep forest green, clay accent, serif display typography and large photographic moments.
- Sticky responsive navigation with mobile menu, Escape behavior, focus return and scroll reading progress.
- Image-led hero and project gallery with a live category filter.
- Visitor-led service hierarchy and four-step design process.
- FAQ disclosure and a local inquiry brief composer with validation and clipboard copy.
- Reduced-motion-aware reveal motion, semantic HTML and responsive image crops.
- Automated typecheck/build, production output verification, Playwright browser QA and axe-core accessibility checks.

## Truth and rights

Nusa Forma is a fictional demonstration brand. The work cards are illustrative spatial studies, not client projects, built spaces, testimonials or project outcomes. Unsplash images are external visual references and are credited in `ASSET_SOURCES.md`. They should be replaced by client-owned / commissioned / appropriately licensed assets before any real client release. The inquiry composer prepares a local text summary only; it does not transmit, store or submit data.

## Design intent

This benchmark is intentionally not an adaptation of the React kit's Fieldnotes demo. It uses the same engineering foundation but a different business, image grammar, hierarchy, content sequence and interaction model. The aim is to demonstrate that the kit supports authored design systems rather than imposing one house template.

## Evidence

CI saves desktop (1440px), tablet (768px) and mobile (390px) full-page screenshots in the `nusa-forma-react-browser-evidence` artifact after browser tests pass. The screenshots identify a build candidate; they are not deployment proof.
