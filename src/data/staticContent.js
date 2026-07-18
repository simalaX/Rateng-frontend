// Central place for content that doesn't come from the API — company
// details, the fixed services list, and FAQ copy. Keeping it here means
// pages stay focused on layout, and the client's exact wording lives in
// exactly one place.

export const COMPANY = {
  name: "Rateng Construction and Interiors",
  shortName: "Rateng",
  phone: "+254728977636",
  phoneDisplay: "+254 728 977 636",
  whatsappNumber: "254728977636",
  email: "info@ratengconstructioninteriors.co.ke",
  instagramUrl: "https://www.instagram.com/rateng_ke/",
  tiktokUrl:
    "https://vm.tiktok.com/ZS9r82UsJ3ToW-HJYUh/",
  location: "Nairobi, Kenya",
  serviceArea: "Nairobi and Upcountry, Kenya",
  mapQuery: "Nairobi, Kenya",
  googleRating: "4.9",
  googleReviewCount: "",
};

// Sheet-code prefixes borrow from real architectural drawing set
// conventions (A = Architectural, S = Structural, G/A = Glazing &
// Aluminium, I = Interiors) and double as the site's category tags.
export const CATEGORY_LABELS = {
  construction: { label: "Construction", code: "A" },
  steel_fabrication: { label: "Steel Fabrication", code: "S" },
  glass_and_aluminium: { label: "Glass and Aluminium", code: "G" },
  interior_fittings: { label: "Interior Fittings", code: "I" },
};

export const CATEGORY_ORDER = [
  "construction",
  "steel_fabrication",
  "glass_and_aluminium",
  "interior_fittings",
];

// Verbatim from the client brief — wording preserved exactly as supplied.
export const SERVICES = [
  {
    key: "construction",
    title: "Construction",
    tagline: null,
    items: [
      "Architectural Design",
      "Structural Design",
      "Mechanical, Electrical and Plumbing Design",
      "Bill of Quantities",
      "Country wide Construction",
      "Renovations and Landscaping.",
    ],
  },
  {
    key: "steel_fabrication",
    title: "Steel Fabrication",
    tagline:
      "Built for safety, styled for modern living. Engineered to last a lifetime. We offer Steel Fabrication for your home within Nairobi and upcountry.",
    items: ["Windows", "Doors", "Gates", "Pergolas", "Balcony and Staircase Grills."],
  },
  {
    key: "glass_and_aluminium",
    title: "Glass and Aluminium",
    tagline:
      "Elevate your space with our premium glass Installations. Crafted for beauty and functionality.",
    items: ["Curtain Wall", "Shower Cubicles", "Glass Balustrades", "Office Partitions"],
  },
  {
    key: "interior_fittings",
    title: "Interior Fittings",
    tagline: null,
    items: [
      "Gypsum Ceilings",
      "House Painting",
      "Kitchen Cabinets",
      "Walkin Closets",
      "Tile Installations",
    ],
  },
];

export const WHY_US = [
  {
    title: "End-to-End Delivery",
    body: "From architectural and structural design through to steel, glass, and final interior finishes — one team, one point of contact, start to finish.",
  },
  {
    title: "Countrywide Reach",
    body: "Based in Nairobi and equipped to deliver construction, fabrication, and fit-out projects upcountry.",
  },
  {
    title: "Engineered to Last",
    body: "Steel and glass work is built for safety and durability first, finished to a modern standard second.",
  },
  {
    title: "Transparent Scoping",
    body: "Every project starts with a clear Bill of Quantities, so you know what you're paying for before work begins.",
  },
  {
    title: "One Team, Every Trade",
    body: "Construction, steel fabrication, glass and aluminium, and interior fittings under a single roof — no juggling separate contractors.",
  },
  {
    title: "Craftsmanship That Shows",
    body: "From gypsum ceilings to kitchen cabinets, finishing work is treated as seriously as structural work.",
  },
];

export const FAQS = [
  {
    question: "How much does a construction or interior project cost?",
    answer:
      "Project costs vary widely depending on scope, materials, and complexity. We offer free consultations and detailed quotes after assessing your specific needs. Factors include site size, design complexity, material choices, and timeline. Contact us via WhatsApp or the quote form to get a personalized estimate.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on project scale. A residential interior fit-out typically takes 4-12 weeks, while larger commercial or construction projects may take 3-6 months. We'll provide a detailed timeline during planning and keep you updated throughout.",
  },
  {
    question: "Do you work outside Nairobi?",
    answer:
      "Yes! We serve Nairobi and upcountry Kenya. Whether you're in Kiambu, Kajiado, Nakuru, or beyond, we can handle your project. Travel and logistics are factored into the quote.",
  },
];
