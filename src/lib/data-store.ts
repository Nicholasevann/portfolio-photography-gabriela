import fs from "fs";
import path from "path";
import { PortfolioData, ProjectItem, GalleryItem, AboutData, PersonData, HomeData } from "@/types/portfolio";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const LOCAL_DATA_FILE = path.join(DATA_DIR, "portfolio-data.json");

export const initialDefaultData: PortfolioData = {
  version: 1,
  updatedAt: new Date().toISOString(),
  person: {
    firstName: "Nicholas",
    lastName: "Evan L",
    name: "Nicholas Evan L",
    role: "Photographer & Software Developer",
    avatar: "/images/avatar.png",
    email: "nnicholasevan@gmail.com",
    location: "Asia/Makassar", // Bali (WITA)
    languages: ["English", "Indonesian"],
    locale: "en",
  },
  home: {
    title: "ne.lens — Photography",
    description: "Photography portfolio focused on property, hospitality, and travel.",
    headline: "ne.lens",
    subline: "Photography focused on spaces, places, and experiences.",
    image: "/uploads/1787939992222-img_4507.jpg",
  },
  about: {
    title: "About – Nicholas Evan L (ne.lens)",
    description: "Meet Nicholas Evan Lindartono — Architectural Photographer & Software Developer.",
    headline: "Introduction",
    introText:
      "Hi! I'm Nicholas Evan Lindartono — an Architectural Photographer and Software Developer. I capture architectural spaces, luxury villas, and boutique hospitality properties with a focus on clean geometry, natural illumination, and calm atmospheres.",
    photographyExperiences: [
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
            src: "/uploads/1787939992222-img_4507.jpg",
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
            src: "/uploads/1787940439507-img_4451.jpg",
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
            src: "/uploads/1787941062342-0.png",
            alt: "Bali Paradise Suites",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "White Penny Bali",
        timeframe: "September 2026 - Present",
        role: "Boutique Property & Lifestyle Photographer (Seminyak, Bali)",
        achievements: [
          "Documented bohemian-chic guest suites, custom interior woodwork, and ensuite stone vanities under ambient daylight.",
          "Captured exterior curving lagoon pool, outdoor timber sun decks, and lush tropical landscape grounds.",
          "Created vibrant culinary and beverage editorial imagery for the alfresco kitchen and bar.",
        ],
        images: [
          {
            src: "/uploads/1789127197934-dsc01278-hdr.jpg",
            alt: "White Penny Bali",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
    education: [
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
  projects: [
    {
      slug: "on-the-sola",
      title: "On The Sola",
      category: "Property",
      location: "Bali, Indonesia",
      year: "2024",
      summary: "Property photography showcasing the architecture, minimalist interiors, and serene atmosphere of the space.",
      description: "Capturing the tropical brutalist forms, natural textures, and sunlit corridors of a contemporary private sanctuary in Bali.",
      coverImage: "/uploads/1787939992222-img_4507.jpg",
      images: [
        "/uploads/1787939992222-img_4507.jpg",
      ],
      featured: true,
      publishedAt: "2024-06-10",
      instagram: "https://www.instagram.com/sola.uluwatu/",
      content: `## Overview\n\nAn architectural and hospitality photography assignment documenting Sola, an intimate boutique retreat in Pecatu, Uluwatu. The series presents a cohesive visual narrative of the property, capturing its central swimming pool, minimalist guest suites, architectural daybeds, and relaxed open-air dining atmosphere near Bali's southern coast.\n\n## Concept & Lighting\n\nHighlighting Mediterranean-inspired arches, clean brutalist geometry, and warm tactile finishes under ambient daylight. Natural tropical sunlight was composed to cast striking geometric shadows along cantilevered corridors during the day, softening into a warm golden glow across textured linen, limestone, and timber details at dusk.`,
    },
    {
      slug: "the-huthut",
      title: "The Huthut",
      category: "Property",
      location: "Uluwatu, Bali",
      year: "2026",
      summary: "Editorial villa photography capturing tropical architecture, pool living, natural textures, and serene outdoor spaces in bright, relaxed daylight.",
      description: "Editorial villa photography capturing tropical architecture, pool living, natural textures, and serene outdoor spaces in bright, relaxed daylight.",
      coverImage: "/uploads/1787940439507-img_4451.jpg",
      images: [
        "/uploads/1787940439507-img_4451.jpg",
      ],
      featured: true,
      publishedAt: "2026-08-27",
      instagram: "https://www.instagram.com/thehuthutbali/",
      content: `## Overview\n\nA boutique hospitality and property photography assignment documenting The Hut Hut, a secluded retreat nestled in Bingin, Uluwatu. The visual series captures the intimate cluster of six handcrafted wooden bungalows, the central turquoise swimming pool, open-air communal living spaces, and tranquil garden pathways tailored for peaceful coastal stays.\n\n## Concept & Lighting\n\nHighlighting the organic geometry of sustainable bamboo joinery, high-vaulted thatched ceilings, and fluid transitions between private suites and tropical outdoor living. Soft ambient daylight filtering through the surrounding canopy illuminates warm weathered teak surfaces, while low-angle morning sun accentuates tactile craftsmanship and serene island living.`,
    },
    {
      slug: "bali-paradise-suites",
      title: "Bali Paradise Suites",
      category: "Property",
      location: "Seminyak, Bali",
      year: "2026",
      summary: "Editorial private villa photography capturing intimate poolside living, tropical greenery, clean interiors, and relaxed kitchen and lounge spaces.",
      description: "Editorial private villa photography capturing intimate poolside living, tropical greenery, clean interiors, and relaxed kitchen and lounge spaces.",
      coverImage: "/uploads/1787941062342-0.png",
      images: [
        "/uploads/1787941062342-0.png",
      ],
      featured: true,
      publishedAt: "2026-08-27",
      content: `## Overview\n\nProperty and hospitality visual documentation for Bali Paradise Suites, located on Jalan Eka Laweya in the Nakula area of Seminyak. The photography assignment highlights each suite as a private tropical sanctuary, capturing intimate plunge pools, sun-drenched timber decking, full-height glass openings, and relaxed open-plan living spaces.\n\n## Concept & Lighting\n\nHighlighting clean linear symmetry, private courtyard geometries, and deep ambient reflections across still plunge pool waters. High-key natural morning daylight was balanced with subtle interior shadows to accentuate polished terrazzo floors, woven textiles, and lush perimeter garden landscaping without artificial glare.`,
    },
    {
      slug: "white-penny",
      title: "White Penny",
      category: "Property",
      location: "Seminyak, Bali",
      year: "2026",
      summary: "Editorial boutique property photography capturing bohemian-chic suites, lagoon pool living, lush tropical gardens, and relaxed poolside dining.",
      description: "Editorial boutique property photography capturing bohemian-chic suites, lagoon pool living, lush tropical gardens, and relaxed poolside dining.",
      coverImage: "/uploads/1789127197934-dsc01278-hdr.jpg",
      images: [
        "/uploads/1789127197934-dsc01278-hdr.jpg",
      ],
      featured: true,
      publishedAt: "2026-09-11",
      instagram: "https://www.instagram.com/whitepennybali/",
      content: `## Overview\n\nAn editorial hospitality photography commission capturing White Penny, a boutique lifestyle destination and social hub on Jalan Pura Telaga Waja in Petitenget, Seminyak. The coverage showcases the property's vibrant island aesthetic across its curving lagoon swimming pool, bohemian-chic private guest suites, lush tropical gardens, and the lively White Penny Kitchen & Bar.\n\n## Concept & Lighting\n\nHighlighting textural contrast between rustic macrame accents, warm distressed teak woodwork, and crisp white Mediterranean-inspired facades. Luminous natural daylight was harnessed to enhance turquoise water reflections across the pool deck, while soft interior accent lighting illuminates cozy guest corners and artisanal craftsmanship.`,
    },
  ],
  gallery: [
    {
      id: "gal-1",
      src: "/uploads/1787940118299-img_4529.jpg",
      alt: "On The Sola Villa Courtyard",
      orientation: "horizontal",
      category: "Property",
    },
    {
      id: "gal-2",
      src: "/uploads/1787940066992-img_4480.jpg",
      alt: "Architectural Lines & Light",
      orientation: "vertical",
      category: "Architecture",
    },
    {
      id: "gal-3",
      src: "/uploads/1787940584325-img_4399.jpg",
      alt: "Modern Tropical Villa Living",
      orientation: "horizontal",
      category: "Property",
    },
    {
      id: "gal-4",
      src: "/uploads/1787940584322-img_4381.jpg",
      alt: "Minimalist Corridor Perspective",
      orientation: "vertical",
      category: "Architecture",
    },
    {
      id: "gal-5",
      src: "/uploads/1787940066995-img_4558.jpg",
      alt: "Natural Materials & Teak Wood",
      orientation: "vertical",
      category: "Details",
    },
    {
      id: "gal-6",
      src: "/uploads/1787941067715-2.png",
      alt: "Bali Paradise Suites Poolside",
      orientation: "horizontal",
      category: "Hospitality",
    },
    {
      id: "gal-7",
      src: "/uploads/1787940265033-img_4587.jpg",
      alt: "The Huthut Organic Pavilion",
      orientation: "horizontal",
      category: "Architecture",
    },
    {
      id: "gal-8",
      src: "/uploads/1787940265035-img_4604.jpg",
      alt: "Serene Morning Daylight",
      orientation: "vertical",
      category: "Atmosphere",
    },
  ],
};

/**
 * Retrieve the current portfolio data from the normalized local JSON store.
 */
export function normalizePortfolioData(raw: Partial<PortfolioData> | null | undefined): PortfolioData {
  if (!raw) return initialDefaultData;
  return {
    version: raw.version || initialDefaultData.version,
    updatedAt: raw.updatedAt || new Date().toISOString(),
    person: { ...initialDefaultData.person, ...(raw.person || {}) },
    home: { ...initialDefaultData.home, ...(raw.home || {}) },
    about: {
      ...initialDefaultData.about,
      ...(raw.about || {}),
      photographyExperiences: Array.isArray(raw.about?.photographyExperiences)
        ? raw.about.photographyExperiences
        : initialDefaultData.about.photographyExperiences || [],
      education: Array.isArray(raw.about?.education)
        ? raw.about.education
        : initialDefaultData.about.education || [],
      skills: Array.isArray(raw.about?.skills)
        ? raw.about.skills
        : initialDefaultData.about.skills || [],
    },
    projects: Array.isArray(raw.projects)
      ? raw.projects
      : (initialDefaultData.projects || []),
    gallery: Array.isArray(raw.gallery)
      ? raw.gallery
      : (initialDefaultData.gallery || []),
  };
}

/**
 * Get portfolio data directly from local JSON file (Git-backed storage).
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  // 1. Try Local JSON file
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, "utf-8");
      const localData = JSON.parse(raw) as Partial<PortfolioData>;
      return normalizePortfolioData(localData);
    }
  } catch (err) {
    console.warn("Failed to read local data file:", err);
  }

  // 2. Fallback: Save initial default data locally and return
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(initialDefaultData, null, 2), "utf-8");
  } catch (e) {
    // In serverless read-only environments without local disk write access
  }

  return initialDefaultData;
}

/**
 * Save updated portfolio data directly to the local JSON file.
 * Changes are saved locally and deployed to production upon git push.
 */
export async function savePortfolioData(data: PortfolioData): Promise<PortfolioData> {
  const updatedData: PortfolioData = normalizePortfolioData({
    ...data,
    updatedAt: new Date().toISOString(),
  });

  // Save to local filesystem
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(updatedData, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write data to local filesystem:", err);
  }

  return updatedData;
}

// ----------------- CRUD HELPERS ----------------- //

export async function getProjects(): Promise<ProjectItem[]> {
  const data = await getPortfolioData();
  return Array.isArray(data.projects) ? data.projects : [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: ProjectItem): Promise<ProjectItem> {
  const data = await getPortfolioData();
  if (!Array.isArray(data.projects)) {
    data.projects = [];
  }
  const existingIndex = data.projects.findIndex((p) => p.slug === project.slug);

  if (existingIndex >= 0) {
    data.projects[existingIndex] = project;
  } else {
    data.projects.unshift(project);
  }

  await savePortfolioData(data);
  return project;
}

export async function deleteProject(slug: string): Promise<boolean> {
  const data = await getPortfolioData();
  if (!Array.isArray(data.projects)) {
    data.projects = [];
  }
  const initialLength = data.projects.length;
  data.projects = data.projects.filter((p) => p.slug !== slug);

  if (data.projects.length !== initialLength) {
    await savePortfolioData(data);
    return true;
  }
  return false;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const data = await getPortfolioData();
  return Array.isArray(data.gallery) ? data.gallery : [];
}

export async function saveGallery(gallery: GalleryItem[]): Promise<GalleryItem[]> {
  const data = await getPortfolioData();
  data.gallery = Array.isArray(gallery) ? gallery : [];
  await savePortfolioData(data);
  return data.gallery;
}

export async function getAbout(): Promise<AboutData> {
  const data = await getPortfolioData();
  return data.about;
}

export async function saveAbout(about: AboutData): Promise<AboutData> {
  const data = await getPortfolioData();
  data.about = about;
  await savePortfolioData(data);
  return about;
}

export async function getPerson(): Promise<PersonData> {
  const data = await getPortfolioData();
  return data.person;
}

export async function savePerson(person: PersonData): Promise<PersonData> {
  const data = await getPortfolioData();
  data.person = person;
  await savePortfolioData(data);
  return person;
}

export async function resetToDefaultData(): Promise<PortfolioData> {
  return await savePortfolioData(initialDefaultData);
}
