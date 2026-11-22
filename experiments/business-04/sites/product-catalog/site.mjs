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
