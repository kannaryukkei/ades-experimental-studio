export const siteConfig = {
  siteName: "Fieldnote Advisory",
  siteUrl: "https://fieldnote.example",
  defaultLocale: "en",
  defaultDescription: "A fictional independent advisory practice for organizations navigating change.",
  footerNote: "An illustrative professional-services practice for engine validation.",
  navigation: [
    { label: "Approach", path: "/approach/" },
    { label: "Services", path: "/services/" },
    { label: "Perspectives", path: "/perspectives/" },
    { label: "Contact", path: "/contact/" }
  ]
};

export const pages = [
  {
    path: "/", template: "home", title: "Fieldnote Advisory | Find the useful next step",
    description: "Independent strategy and organizational advisory for teams navigating complex change.",
    heading: "Make your next move a considered one.", eyebrow: "Independent advisory",
    intro: "Fieldnote helps leadership teams turn uncertainty into a shared direction, practical choices and progress people can see.",
    primaryAction: { label: "Explore the practice", href: "/approach/" },
    secondaryAction: { label: "Talk with us", href: "/contact/" },
    highlights: [
      { title: "Strategy", text: "Clarify the choices that matter and the trade-offs behind them.", href: "/services/strategy/" },
      { title: "Organization", text: "Align roles, ways of working and decision-making.", href: "/services/organization/" },
      { title: "Transformation", text: "Translate ambition into a sequence of achievable change.", href: "/services/" }
    ]
  },
  {
    path: "/approach/", template: "standard", title: "Our approach | Fieldnote Advisory",
    description: "How the fictional Fieldnote practice works with leadership teams.",
    navPath: "/approach/", eyebrow: "How we work", heading: "Thoughtful, direct and close to the work.",
    intro: "We work alongside the people closest to the challenge, making the thinking visible and the next step practical.",
    sections: [
      { heading: "Start with the real question", paragraphs: ["We listen for the decision beneath the brief and examine the evidence already available.", "The content is fictional and exists to test a distinct professional-services voice."] },
      { heading: "Leave capability behind", paragraphs: ["Our sample engagements are designed to make teams more confident in continuing the work themselves."] }
    ]
  },
  {
    path: "/services/", template: "listing", title: "Services | Fieldnote Advisory",
    description: "An overview of the fictional practice's strategy, organization and transformation services.",
    navPath: "/services/", eyebrow: "What we help with", heading: "A clearer path through complexity.",
    intro: "Engagements are shaped around the decision, the people involved and the change that needs to happen.",
    cards: [
      { title: "Strategy", text: "Set direction, priorities and a useful definition of success.", href: "/services/strategy/" },
      { title: "Organization", text: "Connect structure, accountability and everyday practice.", href: "/services/organization/" },
      { title: "Transformation", text: "Turn a desired future into a workable change sequence.", href: "/contact/" }
    ]
  },
  {
    path: "/services/strategy/", template: "detail", title: "Strategy advisory | Fieldnote Advisory",
    description: "Fictional strategy advisory services and engagement outcomes.",
    navPath: "/services/", eyebrow: "Service / Strategy", heading: "Direction people can act on.",
    intro: "Create a focused strategy that makes priorities and difficult choices easier to understand.",
    sections: [
      { heading: "Typical questions", paragraphs: ["Where should we focus? What should change now, and what can wait? How will we know it is working?"] },
      { heading: "A useful outcome", paragraphs: ["A shared strategic narrative, clear priorities and an actionable decision framework."] }
    ],
    cta: { title: "Bring us the question", text: "Start a focused conversation about the decision ahead.", label: "Arrange a conversation", href: "/contact/" }
  },
  {
    path: "/services/organization/", template: "detail", title: "Organization advisory | Fieldnote Advisory",
    description: "Fictional organizational advisory services and engagement outcomes.",
    navPath: "/services/", eyebrow: "Service / Organization", heading: "Make the organization work with the strategy.",
    intro: "Align decision rights, roles and ways of working with the outcomes the organization needs.",
    sections: [
      { heading: "Typical questions", paragraphs: ["Where are decisions stuck? Which responsibilities are unclear? What habits need to change?"] },
      { heading: "A useful outcome", paragraphs: ["Clearer accountability, better interfaces and a practical operating rhythm."] }
    ],
    cta: { title: "Explore an organizational challenge", text: "Tell us where the current system creates friction.", label: "Talk with Fieldnote", href: "/contact/" }
  },
  {
    path: "/perspectives/", template: "listing", title: "Perspectives | Fieldnote Advisory",
    description: "Short fictional editorial perspectives from Fieldnote Advisory.",
    navPath: "/perspectives/", eyebrow: "Fieldnotes", heading: "Ideas worth taking into the room.",
    intro: "A light editorial index for testing content-led navigation and page hierarchy.",
    cards: [
      { title: "The decision behind the brief", text: "A better question can make a complex project smaller and more useful.", href: "/approach/" },
      { title: "Change happens between the boxes", text: "Operating models become real in the spaces between teams.", href: "/services/organization/" }
    ]
  },
  {
    path: "/contact/", template: "contact", title: "Contact | Fieldnote Advisory",
    description: "Contact details for the fictional Fieldnote Advisory practice.",
    navPath: "/contact/", eyebrow: "A first conversation", heading: "What are you trying to move forward?",
    intro: "No forms are submitted by this demonstration. Use the fictional contact details only as test content.",
    contactDetails: [
      { label: "Email", value: "hello@fieldnote.example", href: "mailto:hello@fieldnote.example" },
      { label: "Availability", value: "By appointment — fictional", href: null }
    ]
  }
];


// BUSINESS-05: editorial, expertise-led professional-services composition.
function compose(path, composition) {
  const page = pages.find(item => item.path === path);
  if (page) page.composition = composition;
}
compose("/", [
  { type: "hero", variant: "editorial", eyebrow: "Fieldnote Advisory / Independent practice", heading: "Make your next move a considered one.", text: "Fieldnote helps leadership teams turn uncertainty into a shared direction, practical choices and progress people can see.", actions: [{ label: "Explore the practice", href: "/approach/", primary: true }, { label: "Talk with us", href: "/contact/" }], aside: { eyebrow: "A useful starting point", title: "Clarity before momentum.", text: "Start with the real decision, understand the context and make the next step practical." } },
  { type: "story", variant: "editorial-statement", eyebrow: "A point of view", heading: "Good advice should make the work clearer — not make the language more complicated.", paragraphs: ["We work alongside the people closest to the challenge, making the thinking visible and the next step practical."] },
  { type: "features", variant: "editorial-list", eyebrow: "Where we help", heading: "Three connected areas of practice.", items: [{ number: "01", title: "Strategy", text: "Clarify the choices that matter and the trade-offs behind them.", href: "/services/strategy/", action: "Explore strategy" }, { number: "02", title: "Organization", text: "Align roles, ways of working and decision-making.", href: "/services/organization/", action: "Explore organization" }, { number: "03", title: "Transformation", text: "Translate ambition into a sequence of achievable change.", href: "/services/", action: "View services" }] },
  { type: "steps", variant: "editorial-steps", eyebrow: "How an engagement moves", heading: "A thoughtful route from question to action.", items: [{ title: "Understand", text: "Listen for the decision beneath the brief and examine the evidence already available." }, { title: "Make choices", text: "Put options, trade-offs and priorities into a shared view." }, { title: "Move the work", text: "Turn the chosen direction into a practical sequence the team can continue." }] },
  { type: "contact", variant: "editorial-contact", eyebrow: "An initial conversation", heading: "Bring us the question you're working through.", text: "This static demonstration offers an email contact route only; it does not schedule appointments or process a form.", details: [{ label: "Email", value: "hello@fieldnote.example", href: "mailto:hello@fieldnote.example" }], action: { label: "Contact Fieldnote", href: "/contact/" } }
]);
compose("/approach/", [
  { type: "hero", variant: "editorial-page", eyebrow: "How we work", heading: "Thoughtful, direct and close to the work.", text: "We work alongside the people closest to the challenge, making the thinking visible and the next step practical." },
  { type: "steps", variant: "editorial-steps", eyebrow: "The approach", heading: "Make progress people can understand.", items: [{ title: "Start with the real question", text: "Listen for the decision beneath the brief and examine the evidence already available." }, { title: "Work in the open", text: "Make assumptions, options and trade-offs visible as the work develops." }, { title: "Leave capability behind", text: "Help teams feel more confident continuing the work themselves." }] }
]);
compose("/services/", [
  { type: "hero", variant: "editorial-page", eyebrow: "What we help with", heading: "A clearer path through complexity.", text: "Engagements are shaped around the decision, the people involved and the change that needs to happen." },
  { type: "features", variant: "editorial-list", eyebrow: "Our services", heading: "Start where the question is.", items: [{ number: "01", title: "Strategy", text: "Set direction, priorities and a useful definition of success.", href: "/services/strategy/", action: "Explore service" }, { number: "02", title: "Organization", text: "Connect structure, accountability and everyday practice.", href: "/services/organization/", action: "Explore service" }, { number: "03", title: "Transformation", text: "Turn a desired future into a workable change sequence.", href: "/contact/", action: "Discuss your challenge" }] }
]);
compose("/services/strategy/", [
  { type: "hero", variant: "editorial-page", eyebrow: "Service / Strategy", heading: "Direction people can act on.", text: "Create a focused strategy that makes priorities and difficult choices easier to understand.", actions: [{ label: "Discuss a strategy question", href: "/contact/", primary: true }] },
  { type: "story", variant: "editorial-statement", eyebrow: "The work", heading: "A strategy is useful when it makes choices clearer.", paragraphs: ["Clarify where to focus, what to stop, and how to explain the trade-offs behind the direction.", "The sample service is illustrative and does not describe a real engagement."] },
  { type: "steps", variant: "editorial-steps", eyebrow: "A possible engagement", heading: "From evidence to a shared direction.", items: [{ title: "Frame the decision", text: "Identify the choices and outcomes that matter." }, { title: "Explore the options", text: "Make trade-offs and assumptions visible." }, { title: "Set priorities", text: "Create a direction people can use to guide the work." }] }
]);
compose("/services/organization/", [
  { type: "hero", variant: "editorial-page", eyebrow: "Service / Organization", heading: "Make the way of working fit the work.", text: "Connect structure, accountability and everyday practice so people can move with a clearer shared understanding." },
  { type: "story", variant: "editorial-statement", eyebrow: "The work", heading: "Organization is experienced in everyday decisions.", paragraphs: ["Roles, responsibilities and ways of working shape how a team responds to its real challenges.", "The sample service is illustrative and does not describe a real engagement."] },
  { type: "steps", variant: "editorial-steps", eyebrow: "A possible engagement", heading: "Make the system easier to work in.", items: [{ title: "Understand the current reality", text: "Listen to the people doing the work and map how decisions happen." }, { title: "Clarify responsibilities", text: "Make ownership and interfaces easier to understand." }, { title: "Support adoption", text: "Translate the agreed approach into practical team habits." }] }
]);
compose("/perspectives/", [
  { type: "hero", variant: "editorial-page", eyebrow: "Notes and perspectives", heading: "Questions worth thinking through.", text: "A small editorial index for sample perspectives. The notes below are illustrative prompts, not published research." },
  { type: "features", variant: "editorial-list", eyebrow: "Fieldnotes", heading: "Start with the decision.", items: [{ number: "01", title: "The question beneath the brief", text: "A useful first step is to understand which decision the work needs to support.", href: "/approach/", action: "Read our approach" }, { number: "02", title: "Clarity is a shared practice", text: "A direction becomes more useful when people can explain the choices behind it.", href: "/services/strategy/", action: "Explore strategy" }] }
]);
compose("/contact/", [
  { type: "contact", variant: "editorial-contact", eyebrow: "Start a conversation", heading: "Tell us what you're working through.", text: "This static demonstration provides an email route only. It does not implement a booking calendar or form processing.", details: [{ label: "Email", value: "hello@fieldnote.example", href: "mailto:hello@fieldnote.example" }, { label: "Practice", value: "Fictional independent advisory practice" }] }
]);
