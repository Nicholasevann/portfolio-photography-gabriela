export type ImageOrientation = "horizontal" | "vertical" | "square" | "auto";

export interface ProjectImageItem {
  src: string;
  alt?: string;
  orientation?: ImageOrientation;
  caption?: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  category: "Property" | "Hospitality" | "Travel" | string;
  location: string;
  year?: string;
  summary: string;
  description: string;
  coverImage: string;
  coverOrientation?: ImageOrientation;
  images: (string | ProjectImageItem)[];
  featured?: boolean;
  publishedAt: string;
  content?: string; // Markdown / Narrative content
  order?: number;
  instagram?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  orientation: "horizontal" | "vertical";
  caption?: string;
  category?: string;
  order?: number;
}

export interface ExperienceItem {
  company: string;
  timeframe: string;
  role: string;
  achievements: string[];
  images?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
}

export interface EducationItem {
  name: string;
  timeframe?: string;
  degree?: string;
  achievements?: string[];
  description?: string;
}

export interface SkillCategory {
  title: string;
  role?: string;
  category?: string;
  disciplines?: string[];
  description?: string;
  tags?: {
    name: string;
    icon?: string;
  }[];
}

export interface PersonData {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  location: string;
  languages: string[];
  locale?: string;
}

export interface AboutData {
  title: string;
  description: string;
  headline?: string;
  introText: string;
  photographyExperiences: ExperienceItem[];
  engineeringExperiences?: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
}

export interface HomeData {
  title: string;
  description: string;
  headline: string;
  subline: string;
  image: string;
}

export interface PortfolioData {
  version: number;
  updatedAt: string;
  person: PersonData;
  home: HomeData;
  about: AboutData;
  projects: ProjectItem[];
  gallery: GalleryItem[];
}
