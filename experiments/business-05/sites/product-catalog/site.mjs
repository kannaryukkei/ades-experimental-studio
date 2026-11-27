export const siteConfig = {
  siteName: "Form & Function",
  siteUrl: "https://formfunction.example",
  defaultLocale: "en",
  defaultDescription: "A fictional product studio making useful objects for everyday work.",
  footerNote: "Synthetic product catalogue. No products are available for purchase.",
  navigation: [
    { label: "Shop the range", path: "/products/" },
    { label: "Our thinking", path: "/about/" },
    { label: "Contact", path: "/contact/" }
  ]
};

export const pages = [
  {
    path: "/", template: "home", title: "Form & Function | Objects for the everyday",
    description: "Explore a fictional collection of considered tools and objects for work and home.",
    heading: "Useful things. Thoughtfully made.", eyebrow: "Form & Function / Object studio",
    intro: "A small collection of practical objects shaped by material, proportion and the rituals of everyday use.",
    primaryAction: { label: "Explore the collection", href: "/products/" },
    secondaryAction: { label: "Our point of view", href: "/about/" },
    highlights: [
      { title: "Field Kit", text: "A modular carry system for the tools you use every day.", href: "/products/field-kit/" },
      { title: "Desk Objects", text: "Small forms that bring order to a working surface.", href: "/products/desk-object/" },
      { title: "Considered materials", text: "A clear look at the choices behind each object.", href: "/about/" }
    ]
  },
  {
    path: "/products/", template: "listing", title: "Collection | Form & Function",
    description: "Browse the fictional Field Kit and Desk Object products.",
    navPath: "/products/", eyebrow: "The collection", heading: "Made to earn its place.",
    intro: "Browse the sample range. Product cards lead to detail pages with specifications and inquiry actions.",
    cards: [
      { title: "Field Kit", text: "A modular carry system with adaptable internal organization.", href: "/products/field-kit/" },
      { title: "Desk Object", text: "A compact desktop organizer for everyday essentials.", href: "/products/desk-object/" }
    ]
  },
  {
    path: "/products/field-kit/", template: "detail", title: "Field Kit | Form & Function",
    description: "Details and specifications for the fictional Field Kit carry system.",
    navPath: "/products/", eyebrow: "Collection / 01", heading: "Field Kit",
    intro: "A flexible carry system designed around the tools that move with you.",
    sections: [
      { heading: "Designed for movement", paragraphs: ["Modular internal dividers, durable woven fabric and a low-profile silhouette make the sample product adaptable."] },
      { heading: "Specifications", paragraphs: ["Dimensions: 320 × 220 × 90 mm. Material: recycled woven textile. Colour: graphite. All specifications are fictional."] }
    ],
    cta: { title: "Ask about the Field Kit", text: "This is a demonstration inquiry path, not a checkout flow.", label: "Make an inquiry", href: "/contact/" }
  },
  {
    path: "/products/desk-object/", template: "detail", title: "Desk Object | Form & Function",
    description: "Details and specifications for the fictional Desk Object organizer.",
    navPath: "/products/", eyebrow: "Collection / 02", heading: "Desk Object",
    intro: "A simple landing place for the small things that keep a workday moving.",
    sections: [
      { heading: "Quiet utility", paragraphs: ["A weighted base and divided compartments create a stable home for everyday desk tools."] },
      { heading: "Specifications", paragraphs: ["Dimensions: 180 × 110 × 35 mm. Material: anodized aluminium. Finish: natural. All specifications are fictional."] }
    ],
    cta: { title: "Ask about the Desk Object", text: "No commerce or payment processing is part of this synthetic site.", label: "Make an inquiry", href: "/contact/" }
  },
  {
    path: "/about/", template: "standard", title: "About the studio | Form & Function",
    description: "The fictional product studio's design principles and material approach.",
    navPath: "/about/", eyebrow: "The studio", heading: "Form follows the everyday.",
    intro: "We believe useful objects should feel considered without demanding attention.",
    sections: [
      { heading: "A smaller, clearer range", paragraphs: ["Each sample object starts with a specific use and a reason to exist.", "The studio, products and claims on this page are entirely fictional."] },
      { heading: "Materials with a purpose", paragraphs: ["Material decisions are evaluated for function, repairability and the experience of use."] }
    ]
  },
  {
    path: "/contact/", template: "contact", title: "Contact | Form & Function",
    description: "Contact details for the fictional Form & Function product studio.",
    navPath: "/contact/", eyebrow: "Questions about an object", heading: "Let's talk about what you need.",
    intro: "This catalogue supports inquiry links only. It does not implement carts, orders or payments.",
    contactDetails: [
      { label: "Email", value: "studio@formfunction.example", href: "mailto:studio@formfunction.example" },
      { label: "Studio", value: "Fictional design studio", href: null }
    ]
  },
  {
    path: "/materials/", template: "standard", title: "Materials | Form & Function",
    description: "A fictional overview of materials used in the sample collection.",
    indexable: false, eyebrow: "Material notes", heading: "Know what goes into an object.",
    intro: "A non-indexable support page used to test catalogue content and sitemap exclusions.",
    sections: [{ heading: "Material notes", paragraphs: ["Every claim in a real catalogue must be supported by verified supplier and product documentation."] }]
  }
];


// BUSINESS-05: product-led catalogue composition. Product media remains explicitly illustrative.
function compose(path, composition) {
  const page = pages.find(item => item.path === path);
  if (page) page.composition = composition;
}
compose("/", [
  { type: "hero", variant: "catalog", eyebrow: "Form & Function / Object studio", heading: "Useful things. Thoughtfully made.", text: "A small collection of practical objects shaped by material, proportion and the rituals of everyday use.", actions: [{ label: "Explore the collection", href: "/products/", primary: true }, { label: "Our point of view", href: "/about/" }], visual: { variant: "field-kit", label: "Featured object / Field Kit", note: "Product image placeholder" } },
  { type: "features", variant: "catalog-categories", eyebrow: "The collection", heading: "A considered range for everyday work.", items: [{ number: "01", title: "Field Kit", text: "A modular carry system for the tools you use every day.", href: "/products/field-kit/", action: "View object" }, { number: "02", title: "Desk Object", text: "Small forms that bring order to a working surface.", href: "/products/desk-object/", action: "View object" }] },
  { type: "story", eyebrow: "The studio", heading: "Useful objects should earn their place.", paragraphs: ["Each sample object starts with a specific use and a reason to exist.", "The studio, products and specifications on this site are entirely fictional. Product visuals are placeholders, not product photography."], action: { label: "Read our thinking", href: "/about/" } }
]);
compose("/products/", [
  { type: "hero", variant: "catalog-page", eyebrow: "The collection", heading: "Made to earn its place.", text: "Browse the sample range. Each object links to a detail page with specifications and an inquiry route." },
  { type: "products", eyebrow: "Explore the range", heading: "Two objects. Different everyday needs.", items: [{ number: "01", title: "Field Kit", text: "A modular carry system with adaptable internal organization.", meta: "Carry / Organization", visual: "field-kit", href: "/products/field-kit/" }, { number: "02", title: "Desk Object", text: "A compact desktop organizer for everyday essentials.", meta: "Workspace / Storage", visual: "desk-object", href: "/products/desk-object/" }] }
]);
compose("/products/field-kit/", [
  { type: "hero", variant: "product-detail", eyebrow: "Collection / 01", heading: "Field Kit", text: "A flexible carry system designed around the tools that move with you.", visual: { variant: "field-kit", label: "Field Kit / Product image placeholder", note: "Replace with verified product photography" }, actions: [{ label: "Ask about the Field Kit", href: "/contact/", primary: true }] },
  { type: "specs", eyebrow: "Product information", heading: "At a glance", items: [{ label: "Dimensions", value: "320 × 220 × 90 mm" }, { label: "Material", value: "Recycled woven textile" }, { label: "Colour", value: "Graphite" }, { label: "Format", value: "Modular carry system" }], note: "All product specifications are fictional sample content." },
  { type: "story", eyebrow: "Designed for movement", heading: "A flexible home for everyday tools.", paragraphs: ["Modular internal dividers, durable woven fabric and a low-profile silhouette make the sample product adaptable.", "The description is illustrative and must not be treated as a real product claim."] },
  { type: "contact", eyebrow: "Have a question?", heading: "Ask about the Field Kit.", text: "This is a demonstration inquiry path, not a checkout or payment flow.", action: { label: "Make an inquiry", href: "/contact/" } }
]);
compose("/products/desk-object/", [
  { type: "hero", variant: "product-detail", eyebrow: "Collection / 02", heading: "Desk Object", text: "A simple landing place for the small things that keep a workday moving.", visual: { variant: "desk-object", label: "Desk Object / Product image placeholder", note: "Replace with verified product photography" }, actions: [{ label: "Ask about the Desk Object", href: "/contact/", primary: true }] },
  { type: "specs", eyebrow: "Product information", heading: "At a glance", items: [{ label: "Dimensions", value: "180 × 110 × 35 mm" }, { label: "Material", value: "Anodized aluminium" }, { label: "Finish", value: "Natural" }, { label: "Format", value: "Desktop organizer" }], note: "All product specifications are fictional sample content." },
  { type: "story", eyebrow: "Quiet utility", heading: "A clear place for everyday essentials.", paragraphs: ["A weighted base and divided compartments create a stable home for everyday desk tools.", "The description is illustrative and must not be treated as a real product claim."] },
  { type: "contact", eyebrow: "Have a question?", heading: "Ask about the Desk Object.", text: "This catalogue supports inquiry links only. It does not implement carts, orders or payments.", action: { label: "Make an inquiry", href: "/contact/" } }
]);
compose("/about/", [
  { type: "hero", variant: "catalog-page", eyebrow: "The studio", heading: "Form follows the everyday.", text: "We believe useful objects should feel considered without demanding attention." },
  { type: "story", eyebrow: "A smaller, clearer range", heading: "Start with a specific use and a reason to exist.", paragraphs: ["Each sample object starts with a specific use and a reason to exist.", "The studio, products and claims on this page are entirely fictional."] },
  { type: "steps", eyebrow: "Material thinking", heading: "Consider the whole life of an object.", items: [{ title: "Purpose", text: "Start with the use an object needs to support." }, { title: "Material", text: "Evaluate material for function and the experience of use." }, { title: "Care", text: "Consider repairability and long-term usefulness." }] }
]);
compose("/materials/", [
  { type: "hero", variant: "catalog-page", eyebrow: "Material notes", heading: "Know what goes into an object.", text: "A non-indexable support page used to test catalogue content and sitemap exclusions." },
  { type: "story", heading: "Evidence before claims.", paragraphs: ["Every material claim on a real catalogue must be supported by verified supplier and product documentation.", "No certification, sustainability or sourcing claim is being made by this fictional example."] }
]);
compose("/contact/", [
  { type: "contact", variant: "catalog-contact", eyebrow: "Questions about an object", heading: "Let's talk about what you need.", text: "This catalogue supports inquiry links only. It does not implement carts, orders or payments.", details: [{ label: "Email", value: "studio@formfunction.example", href: "mailto:studio@formfunction.example" }, { label: "Studio", value: "Fictional design studio" }] }
]);
