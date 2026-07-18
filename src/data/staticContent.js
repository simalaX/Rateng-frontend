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

// Scrolling stats ticker — displayed in hero section after category strip
export const STATS = [
  "12+ years in operation",
  "200+ projects completed",
  "Operating in Kenya, Uganda & South Sudan",
  "In-house steel fabrication",
];

// Verbatim from the client brief — wording preserved exactly as supplied.
export const SERVICES = [
  {
    key: "construction",
    title: "Construction — Design & Build",
    tagline: null,
    description: "Full design-build delivery for residential and commercial projects — from drawings and approvals through to handover.",
    image: "https://images.unsplash.com/photo-1504917595217-3404ee9c6601?w=600&h=400&fit=crop",
    tags: ["Residential", "Commercial", "Renovations"],
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
    title: "Steel Fabrication & Installation",
    tagline: "Built for safety, styled for modern living. Engineered to last a lifetime. We offer Steel Fabrication for your home within Nairobi and upcountry.",
    description: "Structural steelwork, gates, grills and custom fabrication produced in-house for tighter tolerances and faster turnaround.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
    tags: ["Structural Steel", "Gates & Grills", "Custom Work"],
    items: ["Windows", "Doors", "Gates", "Pergolas", "Balcony and Staircase Grills."],
  },
  {
    key: "glass_and_aluminium",
    title: "Aluminium & Glass",
    tagline: "Elevate your space with our premium glass Installations. Crafted for beauty and functionality.",
    description: "Curtain walling, glass facades, aluminium windows and partitioning — fabricated and installed by our own glazing teams.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop",
    tags: ["Facades", "Windows", "Partitions"],
    items: ["Curtain Wall", "Shower Cubicles", "Glass Balustrades", "Office Partitions"],
  },
  {
    key: "interior_fittings",
    title: "Interior Fittings",
    tagline: null,
    description: "Joinery, fit-out and soft furnishing for finished interiors — fabrics supplied through our partner, Nomad Fabrics.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    tags: ["Joinery", "Fit-Out", "Soft Furnishing"],
    items: [
      "Gypsum Ceilings",
      "House Painting",
      "Kitchen Cabinets",
      "Walkin Closets",
      "Tile Installations",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation",
    description: "Send your brief on WhatsApp or fill in the contact form. We discuss scope, site, and budget range.",
  },
  {
    number: "02",
    title: "Site Visit & Survey",
    description: "Our team visits the site to measure, assess access and confirm technical requirements before quoting.",
  },
  {
    number: "03",
    title: "Design & Quotation",
    description: "You receive drawings or specs alongside a itemised quote — materials, labour and timeline laid out clearly.",
  },
  {
    number: "04",
    title: "Build & Fabrication",
    description: "Work begins on-site or in our fabrication shop, with progress updates shared as the project moves forward.",
  },
  {
    number: "05",
    title: "Installation & Finishing",
    description: "Our own crews handle installation and finishing — no handoff to a separate, unfamiliar fitting team.",
  },
  {
    number: "06",
    title: "Handover & Warranty",
    description: "Final walkthrough, sign-off, and a workmanship warranty on completed structural and fabrication work.",
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

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Amani R.",
    title: "Hotel Owner",
    location: "Nairobi",
    quote: "The interior fit-out came together beautifully, and working with Nomad Fabrics through Rateng meant the fabrics matched the brief exactly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Peter L.",
    title: "Project Manager",
    location: "Juba",
    quote: "Steel frame for our warehouse was erected on schedule despite a tough site. Communication could have been faster early on, but the work itself was solid.",
    rating: 4,
  },
  {
    id: 3,
    name: "Jane M.",
    title: "Property Director",
    location: "Kampala",
    quote: "Rateng for both the security gates and glass partitioning. Consistent quality across every different job.",
    rating: 5,
  },
  {
    id: 4,
    name: "David K.",
    title: "Facilities Manager",
    location: "Nairobi",
    quote: "Professional team, excellent attention to detail on all finishes. They coordinated seamlessly between different trades.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sarah T.",
    title: "Office Manager",
    location: "Kigali",
    quote: "The office renovation was completed on time and within budget. Great communication throughout the entire process.",
    rating: 4,
  },
  {
    id: 6,
    name: "Michael N.",
    title: "Construction Lead",
    location: "Mombasa",
    quote: "Working with Rateng was straightforward. They understand the local market and deliver consistently.",
    rating: 5,
  },
];