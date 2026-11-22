export const siteConfig = {
  siteName: "Meridian Infrastructure",
  siteUrl: "https://meridian.example",
  defaultLocale: "en",
  defaultDescription: "A fictional infrastructure group connecting essential places and systems.",
  footerNote: "A synthetic ADES Business validation website.",
  navigation: [
    { label: "Company", path: "/company/" },
    { label: "Capabilities", path: "/capabilities/" },
    { label: "Industries", path: "/industries/" },
    { label: "Contact", path: "/contact/" }
  ]
};

export const pages = [
  {
    path: "/", template: "home", title: "Meridian Infrastructure | Building what connects us",
    description: "Discover a fictional infrastructure group working across transport, energy and essential places.",
    heading: "Infrastructure for a world in motion.", eyebrow: "Meridian Infrastructure",
    intro: "We bring complex projects, specialist teams and long-term thinking together to keep essential systems moving.",
    primaryAction: { label: "Explore capabilities", href: "/capabilities/" },
    secondaryAction: { label: "Who we are", href: "/company/" },
    highlights: [
      { title: "Transport", text: "Connecting people, goods and opportunity through resilient networks.", href: "/industries/" },
      { title: "Energy", text: "Supporting the systems that power communities and industry.", href: "/capabilities/" },
      { title: "Places", text: "Creating the infrastructure behind thriving places.", href: "/company/" }
    ]
  },
  {
    path: "/company/", template: "standard", title: "Company | Meridian Infrastructure",
    description: "The fictional group's purpose, operating principles and approach to partnership.",
    navPath: "/company/", eyebrow: "The company", heading: "Built around the long view.",
    intro: "Our work is measured not only by what gets delivered, but by what continues to work for people and places.",
    sections: [
      { heading: "One connected perspective", paragraphs: ["We connect engineering, delivery and stewardship around the outcomes a project must achieve.", "This fictional profile is designed to test an institutional corporate narrative."] },
      { heading: "Responsible by design", paragraphs: ["Safety, resilience and transparent collaboration shape every stage of our example project lifecycle."] }
    ]
  },
  {
    path: "/capabilities/", template: "listing", title: "Capabilities | Meridian Infrastructure",
    description: "An overview of the fictional group's integrated infrastructure capabilities.",
    navPath: "/capabilities/", eyebrow: "What we do", heading: "Complex work, connected disciplines.",
    intro: "A coordinated set of capabilities supports projects from early definition through delivery and operation.",
    cards: [
      { title: "Project delivery", text: "Coordinate complex programmes, partners and delivery environments.", href: "/capabilities/project-delivery/" },
      { title: "Systems engineering", text: "Bring technical interfaces and operational needs into one view.", href: "/company/" },
      { title: "Asset stewardship", text: "Plan for reliable performance beyond project completion.", href: "/contact/" }
    ]
  },
  {
    path: "/capabilities/project-delivery/", template: "detail", title: "Project delivery | Meridian Infrastructure",
    description: "How the fictional group coordinates complex infrastructure programmes.",
    navPath: "/capabilities/", eyebrow: "Capability / Project delivery", heading: "Make complexity deliverable.",
    intro: "A coordinated delivery approach connects programme controls, partners and operational readiness.",
    sections: [
      { heading: "From plan to operation", paragraphs: ["The sample capability brings sequencing, delivery assurance and transition planning into one coherent view."] },
      { heading: "A connected team", paragraphs: ["Specialist disciplines work toward shared milestones and measurable project outcomes."] }
    ],
    cta: { title: "Discuss a programme", text: "Use this synthetic inquiry path to test a cross-page journey.", label: "Contact Meridian", href: "/contact/" }
  },
  {
    path: "/industries/", template: "listing", title: "Industries | Meridian Infrastructure",
    description: "The fictional infrastructure sectors served by Meridian Infrastructure.",
    navPath: "/industries/", eyebrow: "Where we work", heading: "Essential systems. Real-world contexts.",
    intro: "Our sample portfolio focuses on sectors where continuity, safety and long-term value matter.",
    cards: [
      { title: "Mobility", text: "Transport corridors, interchanges and supporting networks.", href: "/contact/" },
      { title: "Energy", text: "Infrastructure that supports dependable energy systems.", href: "/contact/" },
      { title: "Civic environments", text: "Places and public assets designed around their communities.", href: "/contact/" }
    ]
  },
  {
    path: "/contact/", template: "contact", title: "Contact | Meridian Infrastructure",
    description: "Contact the fictional Meridian Infrastructure team.",
    navPath: "/contact/", eyebrow: "Make a connection", heading: "Start with the challenge.",
    intro: "This is a static inquiry destination for the validation fixture; no form submissions are processed.",
    contactDetails: [
      { label: "Email", value: "partnerships@meridian.example", href: "mailto:partnerships@meridian.example" },
      { label: "Office", value: "Fictional regional office", href: null }
    ]
  },
  {
    path: "/responsibility/", template: "standard", title: "Responsibility | Meridian Infrastructure",
    description: "The fictional group's approach to safety, resilience and responsible delivery.",
    indexable: false, eyebrow: "Our commitments", heading: "Responsibility is part of delivery.",
    intro: "A sample non-indexable route used to test indexability controls.",
    sections: [{ heading: "Built into the work", paragraphs: ["Safety, environmental context and operational resilience are considered together."] }]
  }
];
