export const siteConfig = {
  siteName: "Northstar Studio",
  siteUrl: "https://example.com",
  defaultLocale: "en",
  defaultDescription: "A fictional studio website used to demonstrate the ADES Business static multi-page engine.",
  footerNote: "Synthetic demonstration content — not a real business.",
  navigation: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about/" },
    { label: "Services", path: "/services/" },
    { label: "Insights", path: "/insights/" },
    { label: "Contact", path: "/contact/" }
  ]
};

// Replace this demonstration registry with the frozen, approved route inventory.
// Every route is explicit; each page declares its template and unique metadata.
export const pages = [
  {
    path: "/",
    template: "home",
    title: "Northstar Studio — Clear thinking, useful digital work",
    description: "A fictional studio helping organizations make complex ideas easier to understand.",
    navPath: "/",
    eyebrow: "Independent strategy and design studio",
    heading: "Make the complex feel clear.",
    intro: "Northstar Studio brings research, strategy and thoughtful design together to help teams move with confidence.",
    primaryAction: { label: "Explore our services", href: "/services/" },
    secondaryAction: { label: "Meet the studio", href: "/about/" },
    highlights: [
      { title: "Understand the real problem", text: "Start with evidence, context and the people a service needs to support.", href: "/services/research/" },
      { title: "Shape a useful direction", text: "Turn insight into a clear plan, language and experience.", href: "/services/strategy/" },
      { title: "Make it tangible", text: "Build a coherent system that teams can use and improve.", href: "/services/design/" }
    ]
  },
  {
    path: "/about/",
    template: "standard",
    title: "About Northstar Studio",
    description: "The fictional studio's principles, working approach and team.",
    navPath: "/about/",
    eyebrow: "About the studio",
    heading: "Good work begins with listening.",
    intro: "We make space to understand the context before deciding what should change.",
    sections: [
      { heading: "A clear point of view", paragraphs: ["Useful work is grounded in evidence, honest trade-offs and a shared understanding of the outcome.", "This sample content is synthetic and must be replaced with approved client facts."] },
      { heading: "A collaborative practice", paragraphs: ["The work is shaped with the people who know the organization and the people who use its services."] }
    ],
    cta: { title: "Have a question about the work?", text: "Start a conversation about the challenge you are trying to solve.", label: "Contact the studio", href: "/contact/" }
  },
  {
    path: "/services/",
    template: "listing",
    title: "Services — Northstar Studio",
    description: "An overview of the fictional studio's research, strategy and design services.",
    navPath: "/services/",
    eyebrow: "What we do",
    heading: "A connected set of capabilities.",
    intro: "Choose a starting point. The right combination depends on the challenge, context and people involved.",
    cards: [
      { title: "Research", text: "Understand needs, behaviour and the context around a service.", href: "/services/research/" },
      { title: "Strategy", text: "Set a direction and make the choices behind it explicit.", href: "/services/strategy/" },
      { title: "Design", text: "Translate a clear direction into useful digital experiences.", href: "/services/design/" }
    ]
  },
  {
    path: "/services/research/",
    template: "detail",
    title: "Research — Northstar Studio",
    description: "How the fictional studio frames research and discovery work.",
    navPath: "/services/",
    eyebrow: "Service / 01",
    heading: "See the situation more clearly.",
    intro: "Research helps teams understand what people need, where friction appears and which assumptions deserve attention.",
    sections: [
      { heading: "What this can include", paragraphs: ["Stakeholder conversations, content review, journey mapping and synthesis of available evidence."] },
      { heading: "A useful outcome", paragraphs: ["A shared view of the problem, evidence gaps and the next questions to resolve."] }
    ],
    cta: { title: "Discuss a research question", text: "Tell us what you need to understand.", label: "Get in touch", href: "/contact/" }
  },
  {
    path: "/services/strategy/",
    template: "detail",
    title: "Strategy — Northstar Studio",
    description: "How the fictional studio turns evidence into a focused direction.",
    navPath: "/services/",
    eyebrow: "Service / 02",
    heading: "Choose a direction with intent.",
    intro: "Strategy makes priorities, trade-offs and desired outcomes understandable to the people doing the work.",
    sections: [
      { heading: "What this can include", paragraphs: ["Positioning synthesis, experience principles, service propositions and prioritized recommendations."] },
      { heading: "A useful outcome", paragraphs: ["A practical direction that connects organizational goals with visitor and customer needs."] }
    ],
    cta: { title: "Clarify the next decision", text: "Share the decision your team is working through.", label: "Start a conversation", href: "/contact/" }
  },
  {
    path: "/services/design/",
    template: "detail",
    title: "Design — Northstar Studio",
    description: "How the fictional studio creates coherent digital design systems.",
    navPath: "/services/",
    eyebrow: "Service / 03",
    heading: "Make the direction real.",
    intro: "Design brings content, structure and interaction together in an experience people can navigate.",
    sections: [
      { heading: "What this can include", paragraphs: ["Information architecture, visual systems, reusable interface patterns and responsive page design."] },
      { heading: "A useful outcome", paragraphs: ["A coherent experience system with clear rules and purposeful page-level variation."] }
    ],
    cta: { title: "Explore a design challenge", text: "Describe the experience you want to improve.", label: "Contact the studio", href: "/contact/" }
  },
  {
    path: "/insights/",
    template: "listing",
    title: "Insights — Northstar Studio",
    description: "A sample index of fictional studio notes and perspectives.",
    navPath: "/insights/",
    eyebrow: "Notes and perspectives",
    heading: "Ideas for better decisions.",
    intro: "A simple editorial listing pattern. Add article detail routes only when content ownership and publishing scope are approved.",
    cards: [
      { title: "Start with the visitor's question", text: "A useful page answers a real question before asking for attention.", href: "/about/" },
      { title: "Consistency needs a purpose", text: "Shared patterns help people orient themselves; page hierarchy should still reflect its task.", href: "/services/design/" }
    ]
  },
  {
    path: "/contact/",
    template: "contact",
    title: "Contact — Northstar Studio",
    description: "Contact information for the fictional Northstar Studio demonstration.",
    navPath: "/contact/",
    eyebrow: "Start a conversation",
    heading: "Tell us what you are working through.",
    intro: "This demonstration provides contact information as static content only. Replace it with verified, authorized client details and an approved inquiry destination.",
    contactDetails: [
      { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
      { label: "Location", value: "Example City — fictional", href: null }
    ]
  }
];

export const notFoundPage = {
  title: "Page not found — Northstar Studio",
  description: "The requested page could not be found.",
  eyebrow: "404 / Not found",
  heading: "This page is not here.",
  intro: "The address may have changed, or the page may no longer be available."
};
