import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Gabriela",
  lastName: "Dominique",
  name: "gabriela.dominiquee",
  role: "Architectural & Hospitality Photographer",
  avatar: "/images/avatar.jpg",
  email: "gabriela.dominiquee@gmail.com",
  location: "Asia/Makassar", // Bali, Indonesia (WITA / UTC+8)
  languages: ["English", "Indonesian"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Stay in Touch</>,
  description: <>Updates on latest property shoots and travel projects</>,
};

const social: Social = [
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/gabriela.dominiquee",
    essential: true,
  },
  {
    name: "TikTok",
    icon: "tiktok",
    link: "https://www.tiktok.com/@gabriela.dominiquee",
    essential: true,
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.me/6281573027842",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/uploads/1787939992222-img_4507.jpg",
  label: "Home",
  title: "gabriela.dominiquee — Photography",
  description: "Photography portfolio focused on property, hospitality, and travel.",
  headline: <>gabriela.dominiquee</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Photography</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Property · Travel
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: <>Photography focused on spaces, places, and experiences.</>,
};

const introduction = {
  tag: "Introduction",
  headline: "Photography focused on spaces, places, and experiences.",
  description:
    "Documenting the subtle dialogue between light, material, and form. Specializing in luxury property, boutique hospitality retreats, and immersive travel narratives.",
};

const services = [
  {
    title: "Property Photography",
    tagline: "Architecture & Spaces",
    description:
      "Comprehensive architectural visual capture showcasing spatial flow, light transitions, and fine finishes of luxury villas and modern residences.",
  },
  {
    title: "Hospitality Photography",
    tagline: "Resorts & Boutique Stays",
    description:
      "Editorial atmosphere photography conveying the unique luxury, guest journey, and sensory ambiance of hotels, villas, and retreats.",
  },
  {
    title: "Travel Photography",
    tagline: "Destinations & Stories",
    description:
      "Visual documentation of breathtaking locales, cultural narratives, and landscape environments for editorial features and brands.",
  },
  {
    title: "Content Photography",
    tagline: "Editorial & Campaigns",
    description:
      "Bespoke visual asset creation for architects, interior designers, real estate developments, and design publications.",
  },
];

const contact = {
  tag: "Contact",
  headline: "Let's create something.",
  subline: "Property · Hospitality · Travel",
  description:
    "Available for commissions, private villa shoots, hospitality campaigns, and destination assignments worldwide.",
  email: "gabriela.dominiquee@gmail.com",
};

const photographyExperiences = [
  {
    company: "Ciputra Resort Askana",
    timeframe: "2026",
    role: "Architectural & Interior Photographer (Tabanan, Bali)",
    achievements: [
      "Documented contemporary two-story seaside villa architecture within the coastal Resvara cluster at Ciputra Beach Resort.",
      "Captured clean linear geometries, open living spaces, and natural daylight illumination across master suites.",
      "Delivered high-resolution architectural assets emphasizing vacation comfort and seaside resort living.",
    ],
    images: [
      {
        src: "/uploads/1790338486612-dsc05028-hdr.jpg",
        alt: "Ciputra Resort Askana",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "The Huthut",
    timeframe: "May 2026 - Present",
    role: "Architectural & Hospitality Photographer (Uluwatu, Bali)",
    achievements: [
      "Captured unique organic wooden pavilions, luxury guest villa rental units, and tranquil nature surroundings.",
      "Documented the culinary menu, dining experience, and hospitality amenities.",
      "Produced cohesive visual storytelling emphasizing tropical architecture and indoor-outdoor living flow.",
    ],
    images: [
      {
        src: "/uploads/1787940439507-img_4451.jpg",
        alt: "The Huthut",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "Ciputra Resort Svana",
    timeframe: "2026",
    role: "Architectural & Property Photographer (Tabanan, Bali)",
    achievements: [
      "Comprehensive architectural documentation of Type Svana, a spacious 125 m² luxury residence at Ciputra Beach Resort.",
      "Captured double-height ceiling volumes, functional spatial zoning, and seamless indoor-to-garden transitions.",
      "Utilized natural afternoon daylight to accentuate raw stone finishes, fine teak woodwork, and relaxed coastal aesthetics.",
    ],
    images: [
      {
        src: "/uploads/1790347905132-dsc05265-hdr.jpg",
        alt: "Ciputra Resort Svana",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "Sola",
    timeframe: "May 2026 - Present",
    role: "Property & Hospitality Photographer (Uluwatu, Bali)",
    achievements: [
      "Documented boutique hotel guest rooms and suites, capturing architectural light and minimalist spatial aesthetics.",
      "Commercial food, beverage, and ambiance photography for the on-site dining venue and bar.",
      "Produced high-resolution visual marketing assets for guest booking platforms and digital promotion.",
    ],
    images: [
      {
        src: "/uploads/1787939992222-img_4507.jpg",
        alt: "Sola",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "White Penny",
    timeframe: "September 2026 - Present",
    role: "Boutique Property & Lifestyle Photographer (Seminyak, Bali)",
    achievements: [
      "Documented bohemian-chic guest suites, custom interior woodwork, and ensuite stone vanities under ambient daylight.",
      "Captured exterior curving lagoon pool, outdoor timber sun decks, and lush tropical landscape grounds.",
      "Created vibrant culinary and beverage editorial imagery for the alfresco kitchen and bar.",
    ],
    images: [
      {
        src: "/uploads/1789127281590-dsc02061-hdr.jpg",
        alt: "White Penny",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "Bali Paradise Suites",
    timeframe: "July 2026 - Present",
    role: "Property & Architectural Photographer (Seminyak, Bali)",
    achievements: [
      "Commissioned for visual capture of luxury rental villa suites, sunlit private plunge pools, and open-plan living areas.",
      "Delivered refined interior and exterior photography for property rental listings and hospitality showcases.",
      "Balanced natural daylight with soft interior shadows to accentuate polished terrazzo floors and lush landscaping.",
    ],
    images: [
      {
        src: "/uploads/1787941062342-0.png",
        alt: "Bali Paradise Suites",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "Gracie Efata House",
    timeframe: "2026",
    role: "Residential & Property Photographer (Jimbaran, Bali)",
    achievements: [
      "Documented contemporary studio living units, private balconies, and tranquil residential interiors in Jimbaran.",
      "Captured spatial layouts, natural ventilation, and functional residential finishes tailored for rental guests.",
      "Highlighted clean neutral palettes, warm wood accents, and bright ambient lighting throughout each suite.",
    ],
    images: [
      {
        src: "/uploads/1790345017154-dsc03055-hdr.jpg",
        alt: "Gracie Efata House",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "Xcite Gym",
    timeframe: "2026",
    role: "Commercial & Architectural Photographer (Denpasar, Bali)",
    achievements: [
      "Commercial interior and architectural photography documenting the premium athletic training facility at Bali International Golf.",
      "Captured bold industrial lines, spacious training corridors, and high-contrast ambient illumination across strength machinery.",
      "Delivered energetic, focused visual assets showcasing modern workout zones, cardio areas, and club amenities.",
    ],
    images: [
      {
        src: "/uploads/1790344666356-dsc04590-hdr.jpg",
        alt: "Xcite Gym",
        width: 16,
        height: 9,
      },
    ],
  },
];


const about: About = {
  path: "/about",
  label: "About",
  title: "About – gabriela.dominiquee",
  description: "Meet Gabriela Dominique — Architectural & Hospitality Photographer.",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hi! I'm Gabriela Dominique — an Architectural & Hospitality Photographer.
        I capture architectural spaces, luxury villas, and boutique hospitality properties with a focus on clean geometry, natural illumination, and calm atmospheres.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: photographyExperiences,
  },
  studies: {
    display: false,
    title: "Education",
    institutions: [],
  },
  technical: {
    display: true,
    title: "Skills & Disciplines",
    skills: [
      {
        title: "Photography & Visual Direction",
        role: "Architectural, Property & Hospitality Photography",
        disciplines: [
          "Property & Architectural Space Documentation",
          "Natural Light, Linear Sightlines & Geometry Composition",
          "Food, Beverage & Hospitality Menu Editorial Imagery",
          "Spatial Storytelling for Luxury Boutique Villas & Eco-Resorts",
          "Professional Lightroom Color Grading & Precision Retouching",
        ],
        description: "Property & Architectural Photography, Natural Light Composition, Food & Beverage Imagery, Spatial Storytelling, Lightroom Color Grading.",
        tags: [
          { name: "Property" },
          { name: "Hospitality" },
          { name: "Travel" },
          { name: "Architecture" },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Journal",
  title: "Journal – gabriela.dominiquee",
  description: "Stories and visual field notes by gabriela.dominiquee",
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: "Selected Work — gabriela.dominiquee",
  description: "Photography portfolio showcasing property, hospitality, and travel spaces.",
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Photography Gallery — gabriela.dominiquee",
  description: "A curated photo collection by gabriela.dominiquee",
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "On The Sola Villa Courtyard",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Architectural Lines & Light",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "Modern Tropical Villa Living",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Minimalist Corridor Perspective",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Natural Materials & Teak Wood",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Bali Paradise Suites Poolside",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "The Huthut Organic Pavilion",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Serene Morning Daylight",
      orientation: "vertical",
    },
  ],
};

export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
  introduction,
  services,
  contact,
  photographyExperiences,
};
