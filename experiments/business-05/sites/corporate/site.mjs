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


// BUSINESS-05: institutional, proof-led corporate composition.
function compose(path, composition) {
  const page = pages.find(item => item.path === path);
  if (page) page.composition = composition;
}
compose("/", [
  { type: "hero", variant: "corporate", eyebrow: "Meridian Infrastructure / Integrated delivery", heading: "Infrastructure for a world in motion.", text: "We bring complex projects, specialist teams and long-term thinking together to keep essential systems moving.", actions: [{ label: "Explore capabilities", href: "/capabilities/", primary: true }, { label: "Who we are", href: "/company/" }], aside: { eyebrow: "A connected perspective", title: "From first definition to long-term operation", text: "A coordinated view of engineering, delivery and stewardship helps keep essential systems moving." } },
  { type: "proof", eyebrow: "How the work connects", items: [{ value: "01", label: "Define the challenge" }, { value: "02", label: "Coordinate disciplines" }, { value: "03", label: "Plan for operation" }] },
  { type: "features", eyebrow: "Capabilities", heading: "Complex work, connected disciplines.", text: "A coordinated set of capabilities supports projects from early definition through delivery and operation.", items: [{ number: "01", title: "Project delivery", text: "Coordinate complex programmes, partners and delivery environments.", href: "/capabilities/project-delivery/", action: "Explore capability" }, { number: "02", title: "Systems engineering", text: "Bring technical interfaces and operational needs into one view.", href: "/capabilities/", action: "View capabilities" }, { number: "03", title: "Asset stewardship", text: "Plan for reliable performance beyond project completion.", href: "/responsibility/", action: "Our commitments" }] },
  { type: "story", eyebrow: "The Meridian perspective", heading: "Infrastructure is a system, not a collection of assets.", paragraphs: ["The decisions made during definition, delivery and operation shape how well essential systems serve the people and places around them.", "This synthetic example is designed to demonstrate an institutional, proof-led corporate narrative."], action: { label: "Understand our approach", href: "/company/" } }
]);
compose("/company/", [
  { type: "hero", variant: "corporate-page", eyebrow: "The company", heading: "Built around the long view.", text: "Our work is measured not only by what gets delivered, but by what continues to work for people and places.", actions: [{ label: "Explore capabilities", href: "/capabilities/", primary: true }] },
  { type: "story", eyebrow: "One connected perspective", heading: "Engineering, delivery and stewardship in one view.", paragraphs: ["We connect specialist disciplines around the outcomes a project must achieve.", "This fictional profile tests an institutional corporate voice."] },
  { type: "steps", eyebrow: "A considered project lifecycle", heading: "Think beyond the handover.", items: [{ title: "Define", text: "Make the intended outcome, constraints and interfaces clear." }, { title: "Deliver", text: "Coordinate partners, disciplines and delivery decisions." }, { title: "Steward", text: "Keep operational needs and long-term performance in view." }] }
]);
compose("/capabilities/", [
  { type: "hero", variant: "corporate-page", eyebrow: "What we do", heading: "Complex work, connected disciplines.", text: "A coordinated set of capabilities supports projects from early definition through delivery and operation." },
  { type: "features", eyebrow: "Our capabilities", heading: "Bring the moving parts together.", items: [{ number: "01", title: "Project delivery", text: "Coordinate complex programmes, partners and delivery environments.", href: "/capabilities/project-delivery/", action: "Explore capability" }, { number: "02", title: "Systems engineering", text: "Bring technical interfaces and operational needs into one view.", href: "/company/", action: "Company approach" }, { number: "03", title: "Asset stewardship", text: "Plan for reliable performance beyond project completion.", href: "/responsibility/", action: "Responsibility" }] }
]);
compose("/capabilities/project-delivery/", [
  { type: "hero", variant: "corporate-page", eyebrow: "Capability / Project delivery", heading: "Make complexity deliverable.", text: "A coordinated delivery approach connects programme controls, partners and operational readiness.", actions: [{ label: "Discuss a programme", href: "/contact/", primary: true }] },
  { type: "steps", eyebrow: "Delivery approach", heading: "Keep the whole programme in view.", items: [{ title: "Set the frame", text: "Align scope, outcomes, constraints and decision ownership." }, { title: "Coordinate interfaces", text: "Make dependencies between disciplines and partners visible." }, { title: "Prepare for operation", text: "Consider transition, readiness and the needs beyond completion." }] },
  { type: "story", eyebrow: "A connected team", heading: "Shared milestones. Clear responsibilities.", paragraphs: ["Specialist disciplines work toward shared milestones and measurable project outcomes.", "This is illustrative content, not a claim about a real project."] },
  { type: "contact", eyebrow: "Start a conversation", heading: "Discuss a programme.", text: "Use the contact route to explore a project challenge. This static demonstration does not process submissions.", details: [{ label: "Email", value: "partnerships@meridian.example", href: "mailto:partnerships@meridian.example" }], action: { label: "Contact Meridian", href: "/contact/" } }
]);
compose("/industries/", [
  { type: "hero", variant: "corporate-page", eyebrow: "Where we work", heading: "Essential systems. Real-world contexts.", text: "Our sample portfolio focuses on sectors where continuity, safety and long-term value matter." },
  { type: "features", eyebrow: "Sector context", heading: "Different environments. Connected needs.", items: [{ number: "01", title: "Mobility", text: "Transport corridors, interchanges and supporting networks.", href: "/contact/", action: "Discuss a project" }, { number: "02", title: "Energy", text: "Infrastructure that supports dependable energy systems.", href: "/contact/", action: "Discuss a project" }, { number: "03", title: "Civic environments", text: "Places and public assets designed around their communities.", href: "/contact/", action: "Discuss a project" }] }
]);
compose("/contact/", [
  { type: "contact", eyebrow: "Make a connection", heading: "Start with the challenge.", text: "This is a static inquiry destination for the synthetic Meridian Infrastructure example; no form submissions are processed.", details: [{ label: "Email", value: "partnerships@meridian.example", href: "mailto:partnerships@meridian.example" }, { label: "Office", value: "Fictional regional office" }] }
]);
compose("/responsibility/", [
  { type: "hero", variant: "corporate-page", eyebrow: "Our commitments", heading: "Responsibility is part of delivery.", text: "A sample page for safety, resilience and responsible delivery. It is intentionally non-indexable." },
  { type: "steps", eyebrow: "Areas of consideration", heading: "Built into the work.", items: [{ title: "Safety", text: "Consider people and working environments throughout delivery." }, { title: "Resilience", text: "Keep continuity and operational context visible." }, { title: "Stewardship", text: "Consider how decisions affect long-term use and care." }] }
]);
