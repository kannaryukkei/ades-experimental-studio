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
