import { PersonalInfo, Project, ServiceItem, ProcessStep, TestimonialItem } from '../types';

export const personalInfo: PersonalInfo = {
  name: "YOUR NAME",
  role: "Digital Designer",
  tagline: "From Concept to Creation, Let’s Build Your Brand.",
  location: "Kathmandu, Nepal",
  status: "Available for freelance / collaboration",
  isAvailable: true,
  intro: "I create thoughtful digital experiences, visual identities, websites, and creative systems that balance clarity, usability, and visual impact.",
  email: "hello@example.com",
  portraitImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop",
  aboutImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
  experienceYears: "5+ Years",
  focus: "Digital / Brand / UI/UX",
  availability: "Freelance / Collaboration",
  socials: [
    { name: "Instagram", url: "https://instagram.com", handle: "@yourname.design" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "Your Name" },
    { name: "Behance", url: "https://behance.net", handle: "yourname" },
    { name: "Dribbble", url: "https://dribbble.com", handle: "yourname" },
  ],
};

export const projects: Project[] = [
  {
    id: "proj-1",
    number: "01",
    title: "Magicboox",
    slug: "magicboox",
    category: "E-Commerce / Art Direction",
    year: "2026",
    tagline: "A tactile digital storefront redefining contemporary indie publishing.",
    description: "End-to-end digital flagship experience, editorial art direction, and modular design system for an independent art book publisher and curatorial imprint.",
    client: "Magicboox Editions",
    role: "Lead Product Designer & Art Director",
    duration: "10 Weeks",
    deliverables: ["E-Commerce Architecture", "Editorial Art Direction", "Design System", "Interactive Prototype"],
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1400&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
    challenge: "Traditional online book retail prioritizes sterile catalogs over the sensory, tactile romance of printed monographs. Magicboox needed an interface that respects the quiet majesty of paper stock, typography, and binding while maintaining high conversion checkout flows.",
    approach: "We stripped away typical marketing banners and intrusive popups in favor of full-bleed cover compositions, archival metadata tables, and smooth physical page-turn previews. Every title receives a bespoke digital spread showcasing photography, weight, and paper provenance.",
    solution: "A bespoke headless Shopify storefront featuring an ultra-fast book previewer, customizable typeface size tester for readers, and curated reading lists curated by guest artists and critics.",
    results: "+142% average time spent browsing titles, 38% increase in multi-book basket size, and featured in multiple design publications as a benchmark for indie retail.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1400&auto=format&fit=crop",
        caption: "Tactile book spreads and typographic rhythm designed for contemplative reading.",
        aspect: "aspect-[16/10]"
      },
      {
        url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
        caption: "Monochrome packaging specs and unboxing editorial documentation.",
        aspect: "aspect-[4/3]"
      },
      {
        url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
        caption: "Curated catalog indexing system with custom filtering parameters.",
        aspect: "aspect-[4/3]"
      }
    ]
  },
  {
    id: "proj-2",
    number: "02",
    title: "Beauty Campaign",
    slug: "beauty-campaign",
    category: "Campaign / Visual Design",
    year: "2026",
    tagline: "Botanical formulation meets high-fashion visual purity.",
    description: "Creative direction and global launch campaign for a conscious skincare line grounded in high-altitude Himalayan botanical extracts.",
    client: "Aura Skincare Lab",
    role: "Visual Designer & Creative Direction",
    duration: "8 Weeks",
    deliverables: ["Campaign Visuals", "Packaging System", "Digital Lookbook", "Motion Teasers"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1400&auto=format&fit=crop",
    aspectRatio: "aspect-[16/11]",
    challenge: "The beauty category is saturated with synthetic neon branding or faux-rustic apothecary tropes. Aura needed a stark, elevated identity that felt clinically rigorous yet spiritually organic.",
    approach: "Inspired by raw mineral textures and frosted glass, we developed a luminous visual language focusing on macro photography of water droplets, stone surfaces, and natural skin textures without airbrushing.",
    solution: "A cohesive cross-platform campaign featuring an interactive ingredients dictionary, minimalist glass bottle typography, and clean digital landing pages tailored for mobile immersion.",
    results: "Initial batch sold out within 48 hours of launch, generating over 1.2M organic impressions across design and beauty communities.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1400&auto=format&fit=crop",
        caption: "Glass vessel form study and ambient lighting reflections.",
        aspect: "aspect-[16/10]"
      },
      {
        url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
        caption: "Himalayan herbal extract documentation and macro photography.",
        aspect: "aspect-[4/3]"
      },
      {
        url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200&auto=format&fit=crop",
        caption: "Minimalist secondary carton packaging with debossed typography.",
        aspect: "aspect-[4/3]"
      }
    ]
  },
  {
    id: "proj-3",
    number: "03",
    title: "Brand Identity",
    slug: "brand-identity",
    category: "Branding / Identity",
    year: "2025",
    tagline: "Dynamic identity system for an architectural lighting practice.",
    description: "Comprehensive identity overhaul, custom wordmark, variable typographic system, and portfolio experience for an international architectural lighting studio.",
    client: "Kinetic Architectural Lighting",
    role: "Identity Designer & Web Art Director",
    duration: "12 Weeks",
    deliverables: ["Brand Identity", "Custom Type Treatment", "Collateral & Print", "Web Platform"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
    challenge: "Lighting is ethereal—it transforms physical space through shadows and gradients that are notoriously difficult to convey on static screens and stationery.",
    approach: "We built a responsive identity where letterforms and contrast shift dynamically based on ambient lighting conditions, mirroring how the studio's physical installations interact with daylight and nightfall.",
    solution: "A restrained, brutalist-inspired identity pairing Swiss modernist grid discipline with stark high-contrast imagery, alongside an interactive portfolio that lets clients toggle day/night lighting modes on each case study.",
    results: "Won bronze at the Tokyo TDC Annual Awards, leading to three major museum commissions in Zurich, Tokyo, and London.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop",
        caption: "Stark interior architectural lighting studies and scale models.",
        aspect: "aspect-[16/10]"
      },
      {
        url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop",
        caption: "Monograph booklet and foil-stamped business stationery.",
        aspect: "aspect-[4/3]"
      },
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
        caption: "Light temperature scale and luminance chart documentation.",
        aspect: "aspect-[4/3]"
      }
    ]
  },
  {
    id: "proj-4",
    number: "04",
    title: "E-commerce Experience",
    slug: "ecommerce-experience",
    category: "UI/UX / Web Design",
    year: "2025",
    tagline: "Digital catalog for contemporary Scandinavian furniture makers.",
    description: "Minimalist web platform, 3D material configurator interface, and architect specification portal for a sustainable furniture manufacturer.",
    client: "Form & Matter Copenhagen",
    role: "Lead UI/UX Designer",
    duration: "9 Weeks",
    deliverables: ["User Research", "Wireframing & Prototyping", "CAD & Material Viewer", "Design System"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop",
    aspectRatio: "aspect-[16/10]",
    challenge: "Architects and interior designers need fast access to technical cut sheets, sustainability certifications, and high-res CAD files without getting bogged down in consumer e-commerce friction.",
    approach: "Designed a split-screen workspace allowing specifiers to inspect furniture joins, timber finishes, and textile swatches side-by-side with dimensional blueprints.",
    solution: "A whisper-quiet web experience built around generous whitespace, rapid search keyboard shortcuts, and instant one-click BIM/DWG asset downloading.",
    results: "Specifier inquiries jumped by 210% in the first quarter, with average sample request processing reduced from 5 days to 24 hours.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1400&auto=format&fit=crop",
        caption: "Solid white oak joinery detailing and acoustic wool textures.",
        aspect: "aspect-[16/10]"
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
        caption: "Living room curation and modular seating system layout.",
        aspect: "aspect-[4/3]"
      },
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
        caption: "Technical dimensional drawings and material finish swatches.",
        aspect: "aspect-[4/3]"
      }
    ]
  },
  {
    id: "proj-5",
    number: "05",
    title: "Social Campaign",
    slug: "social-campaign",
    category: "Creative Direction / Social",
    year: "2025",
    tagline: "An online cultural quarterly celebrating slow journalism and essays.",
    description: "Art direction, interactive editorial reading layout, custom typographic pairings, and digital campaign assets for an independent cultural journal.",
    client: "Solstice Media Foundation",
    role: "Creative Director & Editorial Designer",
    duration: "7 Weeks",
    deliverables: ["Editorial Design", "Responsive Reader", "Audio Essay Player", "Social Kit"],
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1400&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
    challenge: "Long-form journalism struggles on the modern web due to distracting banner ads, cluttered sidebars, and poor typographic rhythm that induces digital fatigue.",
    approach: "We treated the browser screen like a beautifully bound volume. Generous margins, optical kerning, footnotes that slide out gently in the gutter, and ambient soundscapes paired with specific narrative arcs.",
    solution: "A distraction-free reading experience that automatically calculates estimated reading time and enables readers to highlight and export curated quotes into typographic postcards.",
    results: "Over 80,000 active monthly readers and an average reader session duration of 14.4 minutes per essay.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1400&auto=format&fit=crop",
        caption: "Editorial headline treatments and dynamic pull-quote layouts.",
        aspect: "aspect-[16/10]"
      },
      {
        url: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=1200&auto=format&fit=crop",
        caption: "Typeface comparison and vertical grid harmony.",
        aspect: "aspect-[4/3]"
      },
      {
        url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
        caption: "Minimalist mobile reader interface with customizable contrast themes.",
        aspect: "aspect-[4/3]"
      }
    ]
  },
  {
    id: "proj-6",
    number: "06",
    title: "Digital Product",
    slug: "digital-product",
    category: "UI/UX / Product Design",
    year: "2024",
    tagline: "Next-generation spatial canvas for distributed creative teams.",
    description: "Design system, multi-cursor canvas mechanics, and windowing framework for an infinite workspace application built for remote design directors.",
    client: "Horizon Labs San Francisco",
    role: "Principal Product Designer",
    duration: "14 Weeks",
    deliverables: ["Product Architecture", "Design System (Figma & Code)", "Micro-interactions", "User Testing"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
    aspectRatio: "aspect-[16/10]",
    challenge: "Creative directors spend up to 40% of their time jumping between communication channels, file storage, and visual whiteboards, losing contextual memory in the process.",
    approach: "Designed a unified spatial canvas where moodboards, high-resolution video streams, vector nodes, and voice huddles coexist in one unified, zoomable universe.",
    solution: "A lightweight desktop and web application with zero visual clutter when idle, surfacing contextual editing toolbars only when a creative asset is actively selected.",
    results: "Acquired over 45,000 beta users in 6 months and raised an $8M Series A from premier Silicon Valley design-led venture firms.",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop",
        caption: "Multi-window canvas architecture and low-latency cursor tracking.",
        aspect: "aspect-[16/10]"
      },
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
        caption: "Component hierarchy and semantic color tokens for dark/light transitions.",
        aspect: "aspect-[4/3]"
      },
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        caption: "Hardware-accelerated viewport rendering controls.",
        aspect: "aspect-[4/3]"
      }
    ]
  }
];

export const services: ServiceItem[] = [
  {
    number: "01",
    title: "UI / UX DESIGN",
    description: "Designing clear, intuitive and visually engaging digital products, platforms, and interfaces rooted in human empathy and user intent.",
    deliverables: ["Product Architecture", "User Research & Flows", "Wireframes & Interactive Prototypes", "Design Systems & Token Libraries"]
  },
  {
    number: "02",
    title: "WEB DESIGN & BUILD",
    description: "Crafting bespoke, high-performance websites with editorial typography, responsive layouts, and smooth, purposeful interactions.",
    deliverables: ["Art Direction", "Responsive Front-End", "E-Commerce Experiences", "Headless CMS Integration"]
  },
  {
    number: "03",
    title: "BRAND IDENTITY",
    description: "Developing cohesive visual identities, logomarks, typography rules, and guidelines that establish enduring brand recognition.",
    deliverables: ["Visual Identity Systems", "Brand Guidelines & Books", "Custom Typography Direction", "Print & Packaging Systems"]
  },
  {
    number: "04",
    title: "CREATIVE DIRECTION",
    description: "Guiding the holistic aesthetic vision across products, campaigns, and photography to maintain unmistakable consistency.",
    deliverables: ["Campaign Concepts", "Photography & Film Direction", "Storyboards & Visual Narratives", "Editorial Styling Guidelines"]
  },
  {
    number: "05",
    title: "DIGITAL CAMPAIGNS",
    description: "Conceptualizing and producing digital launches, visual assets, interactive microsites, and social storytelling that command attention.",
    deliverables: ["Launch Microsites", "Motion & Social Kits", "Interactive Experiences", "Visual Content Strategy"]
  },
  {
    number: "06",
    title: "ART DIRECTION",
    description: "Crafting the visual soul of projects through curated typography, physical packaging details, print production, and sensory textures.",
    deliverables: ["Monographs & Lookbooks", "Print Finishes & Paper Stock", "Exhibition Visuals", "Spatial Installations"]
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understanding the problem, audience and goals.",
    detail: "Deep dive into business objectives, brand heritage, target psychology, and competitive whitespace through interviews and visual audits."
  },
  {
    number: "02",
    title: "Define",
    description: "Turning insights into a clear creative direction.",
    detail: "Synthesizing research into sharp creative territories, moodboards, typographic frameworks, and functional user journeys."
  },
  {
    number: "03",
    title: "Design",
    description: "Creating, testing and refining the visual solution.",
    detail: "Iterative exploration of high-fidelity layouts, micro-interactions, responsive states, and design system components."
  },
  {
    number: "04",
    title: "Deliver",
    description: "Preparing polished final assets and systems.",
    detail: "Flawless handoff with production-ready asset libraries, interactive design systems, developer specifications, and launch support."
  }
];

export const testimonials: TestimonialItem[] = [
  {
    quote: "Working with [Name] was incredibly smooth. The final result was thoughtful, strategic and visually strong.",
    author: "Client Name",
    role: "Founder / Marketing Director",
    company: "Nordic Ventures"
  },
  {
    quote: "A rare designer who understands both the nuance of fine editorial typography and the rigorous engineering required for modern e-commerce conversion.",
    author: "Marcus Lindqvist",
    role: "Head of Product",
    company: "Form & Matter Copenhagen"
  },
  {
    quote: "Their ability to translate intangible architectural light concepts into a dynamic digital identity was extraordinary. The results exceeded all expectations.",
    author: "Sora Tanaka",
    role: "Partner",
    company: "Kinetic Studio Tokyo"
  }
];
