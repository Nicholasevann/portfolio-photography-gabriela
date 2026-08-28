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
    email: "contact@nelens.photography",
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
      content: `## Overview\n\nOn The Sola is a bespoke architectural residence located in the lush landscapes of Bali. The visual brief was focused on documenting the seamless transition between monolithic brutalist concrete and warm tropical flora.\n\n## Concept & Spatial Flow\n\nNatural light sculpts each volume throughout the day. The photography highlights deep shadows during midday sun and the soft golden glow filtering through full-height minimalist glass openings during dusk.\n\n- **Architectural Geometry**: Linear sightlines, cantilevers, and raw board-formed concrete finishes.\n- **Interior Calm**: Curated minimalist furnishings, textured linen, and unpolished stone.\n- **Atmosphere**: Quiet reflective pool surfaces catching ambient reflections of the sky and surrounding greenery.\n\n## Visual Narrative\n\nThe series captures the stillness of early morning in the courtyard before opening up to the expansive open-plan living pavilions, highlighting the interplay of spatial volume and organic textures.`,
    },
    {
      slug: "the-huthut",
      title: "The Huthut",
      category: "Property",
      location: "Lombok, Indonesia",
      year: "2024",
      summary: "Editorial architectural and lifestyle photography capturing organic wooden craftsmanship, open pavilions, and tranquil nature surroundings.",
      description: "A celebration of sustainable bamboo architecture and open-air living nestled among lush coastal hills.",
      coverImage: "/uploads/1787940439507-img_4451.jpg",
      images: [
        "/uploads/1787940439507-img_4451.jpg",
      ],
      featured: true,
      publishedAt: "2024-05-22",
      content: `## Overview\n\nThe Huthut is a sustainable eco-retreat conceived as an organic cluster of bamboo and reclaimed timber pavilions nestled into the coastal hillsides of Lombok.\n\n## Craftsmanship & Architecture\n\nThe visual documentation focused on the tactile qualities of handmade joinery, curved structural bamboo columns, and high vaulted ceilings that allow natural sea breezes to circulate through the living quarters.\n\n- **Organic Structures**: Handcrafted sustainable materials with rhythmic geometric curves.\n- **Biophilic Living**: Seamless openness blurring boundary lines between the jungle and interior spaces.\n- **Warm Illumination**: Low-impact ambient lighting highlighting the warm amber hues of aged teak and rattan.\n\n## Visual Narrative\n\nFraming the tactile dialogue between traditional artisan building techniques and contemporary eco-luxury living, the photography provides an intimate exploration of form, texture, and light.`,
    },
    {
      slug: "bali-paradise-suites",
      title: "Bali Paradise Suites",
      category: "Property",
      location: "Canggu, Bali",
      year: "2024",
      summary: "Hospitality and property visual capture highlighting boutique luxury suites, sunlit private pools, and elegant interior design.",
      description: "Documenting high-end hospitality interiors, intimate plunge pools, and seamless indoor-outdoor transitions.",
      coverImage: "/uploads/1787941062342-0.png",
      images: [
        "/uploads/1787941062342-0.png",
      ],
      featured: true,
      publishedAt: "2024-04-18",
      content: `## Overview\n\nBali Paradise Suites represents the intersection of boutique luxury hospitality and relaxed tropical living. Situated in Canggu, each suite is oriented around private sunlit courtyards and reflection pools.\n\n## Light & Hospitality Experience\n\nThe photography captures the serene morning ambiance as soft daylight washes over custom terrazzo floors and brass architectural fixtures.\n\n- **Private Courtyards**: Turquoise plunge pools reflecting minimalist plaster facades.\n- **Material Palette**: Custom terrazzo, microcement, brass accents, and woven textiles.\n- **Guest Experience**: Editorial vignettes evoking effortless relaxation and quiet refinement.\n\n## Visual Narrative\n\nThrough balanced compositions and natural framing, the visual series highlights the spatial intimacy and luxury hospitality standards that define the property.`,
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
