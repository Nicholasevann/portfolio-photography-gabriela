import fs from "fs";
import path from "path";
import { PortfolioData, ProjectItem, GalleryItem, AboutData, PersonData, HomeData } from "@/types/portfolio";
import bundledPortfolioData from "@/data/portfolio-data.json";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const LOCAL_DATA_FILE = path.join(DATA_DIR, "portfolio-data.json");

export const initialDefaultData: PortfolioData = bundledPortfolioData as unknown as PortfolioData;

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
