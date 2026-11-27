# BUSINESS-05 — UI Resource Review

Review date: 2026-11-28. This is source-code reconnaissance, not a claim that any third-party component was copied into the experiment.

| Resource | License / technical fit observed | Decision | Reason |
|---|---|---|---|
| [HyperUI](https://github.com/markmead/hyperui) | MIT; Tailwind CSS v4 HTML components; documented copy/paste workflow. Reviewed at commit 3156608373955fff8bd0597b2040164993eec29a. | LEARN-ONLY for this dependency-free experiment | Useful reference for section hierarchy and composition, but adopting markup directly would introduce a Tailwind requirement. No source copied. |
| [Magic UI](https://github.com/magicuidesign/magicui) | MIT; React/Next/Tailwind monorepo with pnpm and modern Node requirements. Reviewed at commit 1278d872938a718a27fd026da314f3c0f48d85e6. | LEARN-ONLY | Not a fit for the dependency-free static renderer; could be evaluated for a future React project. |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | MIT; source-first React/Tailwind component system. Reviewed at commit 0e5b2e6219a9ee4cf6a604bbe6c5c0d5b70561eb4. | LEARN-ONLY | Strong for React applications, but would impose a different architecture without solving this experiment's composition problem. |
| [React Bits](https://github.com/DavidHDev/react-bits) | Repository declares MIT plus Commons Clause; React-oriented animated components. | REJECT for this experiment | Additional license conditions and React dependency; animation is not the current quality bottleneck. |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | Project describes MIT licensing; React + Motion + Tailwind components; beta. | LEARN-ONLY | Not a fit for dependency-free static output; interaction polish comes after hierarchy and task clarity. |
| [21st.dev Magic MCP](https://github.com/21st-dev/magic-mcp) | Current repository documentation points to the 21st MCP hosted service and API-key-based use. | REJECT as a required ADES dependency | Conflicts with the API-key-free operating constraint and is not necessary for this experiment. |
| [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) | Includes web-design-guidelines for UI review; redistribution license was not established in this review. | LEARN-ONLY | Use broad audit themes as review prompts; do not copy the skill into ADES or the experiment. |

## Applied conclusion

No external component package was installed and no external component source was copied. The experiment uses the existing dependency-free renderer and original semantic HTML/CSS composition primitives. Third-party libraries remain project-specific options, not mandatory stack choices.
