import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Nicholas",
  lastName: "Evan L",
  name: "Nicholas Evan L",
  role: "Photographer & Software Developer",
  avatar: "/images/avatar.png",
  email: "contact@nelens.photography",
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
    link: "https://instagram.com",
    essential: true,
  },
  {
    name: "Software Portfolio",
    icon: "globe",
    link: "https://my-porto-nine-livid.vercel.app/portfolio",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com",
    essential: false,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com",
    essential: false,
  },
];

const home: Home = {
  path: "/",
  image: "/images/hero/hero-cover.jpg",
  label: "Home",
  title: "ne.lens — Photography",
  description: "Photography portfolio focused on property, hospitality, and travel.",
  headline: <>ne.lens</>,
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
  email: "contact@nelens.photography",
};

const photographyExperiences = [
  {
    company: "On The Sola Boutique Hotel",
    timeframe: "May 2026 - Present",
    role: "Property & Hospitality Photographer (Bali)",
    achievements: [
      "Documented boutique hotel guest rooms and suites, capturing architectural light and minimalist spatial aesthetics.",
      "Commercial food, beverage, and ambiance photography for the on-site mini restaurant and dining menu.",
      "Produced high-resolution visual marketing assets for guest booking platforms and digital promotion.",
    ],
    images: [
      {
        src: "/images/projects/on-the-sola/cover.jpg",
        alt: "On The Sola",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "The Huthut Villa",
    timeframe: "May 2026 - Present",
    role: "Architectural & Hospitality Photographer (Lombok)",
    achievements: [
      "Captured unique organic wooden pavilions, luxury guest villa rental units, and tranquil nature surroundings.",
      "Documented the culinary menu, dining experience, and hospitality amenities.",
      "Produced cohesive visual storytelling emphasizing tropical architecture and indoor-outdoor living flow.",
    ],
    images: [
      {
        src: "/images/projects/the-huthut/cover.jpg",
        alt: "The Huthut",
        width: 16,
        height: 9,
      },
    ],
  },
  {
    company: "Bali Paradise Suites",
    timeframe: "May 2026 (Single Commission)",
    role: "Property & Architectural Photographer (Canggu, Bali)",
    achievements: [
      "Commissioned for single-visit visual capture of luxury rental villa suites and private plunge pools.",
      "Delivered refined interior and exterior photography for property rental listings and hospitality showcases.",
    ],
    images: [
      {
        src: "/images/projects/bali-paradise-suites/cover.jpg",
        alt: "Bali Paradise Suites",
        width: 16,
        height: 9,
      },
    ],
  },
];

const engineeringExperiences = [
  {
    company: "PT B One Consulting",
    timeframe: "September 2025 - Present",
    role: "Fullstack Website & Mobile Developer (Bali)",
    achievements: [
      "Built full-stack web applications using Next.js, Vue.js, Nest.js and Express.js with TypeScript.",
      "Developed cross-platform mobile apps using Flutter and React Native.",
      "Designed and implemented RESTful APIs and microservices with Node.js/Express and Flask.",
      "Integrated third-party services (payments, analytics, auth) and optimized CI/CD pipelines.",
    ],
    images: [],
  },
  {
    company: "PT B One Consulting",
    timeframe: "September 2024 - September 2025",
    role: "Senior Frontend & Mobile Developer (Bali)",
    achievements: [
      "Lead front-end and mobile development projects, ensuring high-quality deliverables.",
      "Develop and optimize web and mobile applications according to client specifications.",
      "Collaborate with cross-functional teams to troubleshoot and solve complex technical challenges.",
    ],
    images: [],
  },
  {
    company: "PT Supernova Palapa Indonesia",
    timeframe: "April 2023 - August 2024",
    role: "Front-End & Mobile Developer (Bandung)",
    achievements: [
      "Designed and implemented scalable web and mobile applications for company projects.",
      "Handled end-to-end mobile app deployment for Google Play Store and Apple App Store.",
    ],
    images: [],
  },
  {
    company: "PT Layanan Cerdas Indonesia",
    timeframe: "July 2022 - March 2023",
    role: "Mobile Developer (Bandung)",
    achievements: [
      "Developed and maintained mobile applications, improving user experience and performance.",
      "Managed version control and application deployments to app stores.",
    ],
    images: [],
  },
];

const about: About = {
  path: "/about",
  label: "About",
  title: "About – Nicholas Evan L (ne.lens)",
  description: "Meet Nicholas Evan Lindartono — Architectural Photographer & Software Developer.",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://my-porto-nine-livid.vercel.app/portfolio",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hi! I'm Nicholas Evan Lindartono — an Architectural Photographer and Software Developer.
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
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Indonesian Computer University Bandung Indonesia",
        timeframe: "2018 - 2022",
        degree: "Bachelor of Computer Engineering (Information Technology)",
        achievements: [
          "Graduated with GPA 3.42 / 4.00 in Computer Engineering (Information Technology).",
          "Specialized in Software Engineering, Web & Mobile Systems Development, and Distributed Architectures.",
          "Developed full-stack application capstones with emphasis on clean user interfaces and system performance.",
        ],
        description: "Bachelor of Computer Engineering (Information Technology) · GPA 3.42 / 4.00 (2018 - 2022)",
      },
      {
        name: "SMAK Kolese Santo Yusup Malang Indonesia",
        timeframe: "2015 - 2018",
        degree: "High School Diploma (Science & Mathematics)",
        achievements: [
          "Graduated with Science major and Cumulative Accumulation Score of 85.",
          "Active in visual arts, computer science clubs, and multimedia campus documentation.",
        ],
        description: "High School Diploma (Science) · Accumulations: 85 (2015 - 2018)",
      },
    ],
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
      {
        title: "Web & Mobile Development",
        role: "Full-Stack Engineering & Cross-Platform Development",
        disciplines: [
          "Modern Frontend Applications with Next.js, React.js, and TypeScript",
          "Cross-Platform Mobile Development using Flutter and React Native",
          "Scalable Backend Services & RESTful APIs with Nest.js, Express.js, and Node.js",
          "Design Systems & High-Fidelity UI/UX Prototyping with Figma",
          "Headless E-Commerce Solutions & Supabase / Firebase Cloud Integrations",
        ],
        description: "Next.js, React.js, React Native, Flutter, Vue.js, Nest.js, Express.js, TypeScript, and Shopify.",
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Figma", icon: "figma" },
          { name: "Supabase", icon: "supabase" },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Journal",
  title: "Journal – ne.lens",
  description: "Stories and visual field notes by ne.lens",
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: "Selected Work — ne.lens",
  description: "Photography portfolio showcasing property, hospitality, and travel spaces.",
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Photography Gallery — ne.lens",
  description: "A curated photo collection by ne.lens",
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
  engineeringExperiences,
};
