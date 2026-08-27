import fs from "fs";
import path from "path";
import { put, list } from "@vercel/blob";
import { PortfolioData, ProjectItem, GalleryItem, AboutData, PersonData, HomeData } from "@/types/portfolio";
import { isVercelBlobConfigured } from "./blob-storage";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const LOCAL_DATA_FILE = path.join(DATA_DIR, "portfolio-data.json");
const BLOB_DATA_KEY = "portfolio/data.json";

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
    image: "/images/hero/hero-cover.jpg",
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
    ],
    engineeringExperiences: [
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
    ],
    education: [
      {
        name: "Indonesian Computer University Bandung Indonesia",
        description: "Bachelor of Computer Engineering (Information Technology) · GPA 3.42 / 4.00 (2018 - 2022)",
      },
      {
        name: "SMAK Kolese Santo Yusup Malang Indonesia",
        description: "High School Diploma (Science) · Accumulations: 85 (2015 - 2018)",
      },
    ],
    skills: [
      {
        title: "Photography & Visual Direction",
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
      coverImage: "/images/projects/on-the-sola/cover.jpg",
      images: [
        "/images/projects/on-the-sola/cover.jpg",
        "/images/projects/on-the-sola/01.jpg",
        "/images/projects/on-the-sola/02.jpg",
        "/images/projects/on-the-sola/03.jpg",
        "/images/projects/on-the-sola/04.jpg",
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
      coverImage: "/images/projects/the-huthut/cover.jpg",
      images: [
        "/images/projects/the-huthut/cover.jpg",
        "/images/projects/the-huthut/01.jpg",
        "/images/projects/the-huthut/02.jpg",
        "/images/projects/the-huthut/03.jpg",
        "/images/projects/the-huthut/04.jpg",
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
      coverImage: "/images/projects/bali-paradise-suites/cover.jpg",
      images: [
        "/images/projects/bali-paradise-suites/cover.jpg",
        "/images/projects/bali-paradise-suites/01.jpg",
        "/images/projects/bali-paradise-suites/02.jpg",
        "/images/projects/bali-paradise-suites/03.jpg",
        "/images/projects/bali-paradise-suites/04.jpg",
      ],
      featured: true,
      publishedAt: "2024-04-18",
      content: `## Overview\n\nBali Paradise Suites represents the intersection of boutique luxury hospitality and relaxed tropical living. Situated in Canggu, each suite is oriented around private sunlit courtyards and reflection pools.\n\n## Light & Hospitality Experience\n\nThe photography captures the serene morning ambiance as soft daylight washes over custom terrazzo floors and brass architectural fixtures.\n\n- **Private Courtyards**: Turquoise plunge pools reflecting minimalist plaster facades.\n- **Material Palette**: Custom terrazzo, microcement, brass accents, and woven textiles.\n- **Guest Experience**: Editorial vignettes evoking effortless relaxation and quiet refinement.\n\n## Visual Narrative\n\nThrough balanced compositions and natural framing, the visual series highlights the spatial intimacy and luxury hospitality standards that define the property.`,
    },
  ],
  gallery: [
    {
      id: "gal-1",
      src: "/images/gallery/horizontal-1.jpg",
      alt: "On The Sola Villa Courtyard",
      orientation: "horizontal",
      category: "Property",
    },
    {
      id: "gal-2",
      src: "/images/gallery/vertical-4.jpg",
      alt: "Architectural Lines & Light",
      orientation: "vertical",
      category: "Architecture",
    },
    {
      id: "gal-3",
      src: "/images/gallery/horizontal-3.jpg",
      alt: "Modern Tropical Villa Living",
      orientation: "horizontal",
      category: "Property",
    },
    {
      id: "gal-4",
      src: "/images/gallery/vertical-1.jpg",
      alt: "Minimalist Corridor Perspective",
      orientation: "vertical",
      category: "Architecture",
    },
    {
      id: "gal-5",
      src: "/images/gallery/vertical-2.jpg",
      alt: "Natural Materials & Teak Wood",
      orientation: "vertical",
      category: "Details",
    },
    {
      id: "gal-6",
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Bali Paradise Suites Poolside",
      orientation: "horizontal",
      category: "Hospitality",
    },
    {
      id: "gal-7",
      src: "/images/gallery/horizontal-4.jpg",
      alt: "The Huthut Organic Pavilion",
      orientation: "horizontal",
      category: "Architecture",
    },
    {
      id: "gal-8",
      src: "/images/gallery/vertical-3.jpg",
      alt: "Serene Morning Daylight",
      orientation: "vertical",
      category: "Atmosphere",
    },
  ],
};

// In-memory cache for fast SSR
let inMemoryCache: { data: PortfolioData; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 5000; // 5 seconds cache

/**
 * Retrieve the current portfolio data.
 * Checks Vercel Blob if configured -> Local JSON -> Initial Default.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const now = Date.now();
  if (inMemoryCache && now - inMemoryCache.fetchedAt < CACHE_TTL_MS) {
    return inMemoryCache.data;
  }

  // 1. Try Vercel Blob if configured
  if (isVercelBlobConfigured()) {
    try {
      const { blobs } = await list({ prefix: BLOB_DATA_KEY });
      const blobItem = blobs.find((b) => b.pathname === BLOB_DATA_KEY);
      if (blobItem) {
        const urlWithBuster = `${blobItem.url}?t=${Date.now()}`;
        const response = await fetch(urlWithBuster, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        if (response.ok) {
          const blobData = (await response.json()) as PortfolioData;
          inMemoryCache = { data: blobData, fetchedAt: now };
          return blobData;
        }
      }
    } catch (err) {
      console.warn("Failed to load from Vercel Blob store, falling back to local:", err);
    }
  }

  // 2. Try Local JSON file
  try {
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const raw = fs.readFileSync(LOCAL_DATA_FILE, "utf-8");
      const localData = JSON.parse(raw) as PortfolioData;
      inMemoryCache = { data: localData, fetchedAt: now };
      return localData;
    }
  } catch (err) {
    console.warn("Failed to read local data file:", err);
  }

  // 3. Fallback: Save initial default data locally and return
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(initialDefaultData, null, 2), "utf-8");
  } catch (e) {
    // In serverless read-only environments without local disk write access
  }

  inMemoryCache = { data: initialDefaultData, fetchedAt: now };
  return initialDefaultData;
}

/**
 * Save updated portfolio data to Vercel Blob and/or local filesystem.
 */
export async function savePortfolioData(data: PortfolioData): Promise<PortfolioData> {
  const updatedData: PortfolioData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  // Update in-memory cache
  inMemoryCache = { data: updatedData, fetchedAt: Date.now() };

  // 1. Save to Vercel Blob if configured
  if (isVercelBlobConfigured()) {
    try {
      const jsonBuffer = Buffer.from(JSON.stringify(updatedData, null, 2), "utf-8");
      await put(BLOB_DATA_KEY, jsonBuffer, {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
      });
    } catch (err) {
      console.error("Failed to write data to Vercel Blob:", err);
    }
  }

  // 2. Save to local filesystem
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(updatedData, null, 2), "utf-8");
  } catch (err) {
    // Read-only filesystem warning in cloud serverless
    console.warn("Could not write to local file (expected in Vercel serverless):", err);
  }

  return updatedData;
}

// ----------------- CRUD HELPERS ----------------- //

export async function getProjects(): Promise<ProjectItem[]> {
  const data = await getPortfolioData();
  return data.projects || [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: ProjectItem): Promise<ProjectItem> {
  const data = await getPortfolioData();
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
  return data.gallery || [];
}

export async function saveGallery(gallery: GalleryItem[]): Promise<GalleryItem[]> {
  const data = await getPortfolioData();
  data.gallery = gallery;
  await savePortfolioData(data);
  return gallery;
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
