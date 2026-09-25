export interface Project {
  slug: string;
  title: string;
  category: "Property" | "Hospitality" | "Travel";
  location: string;
  year?: string;
  description: string;
  summary?: string;
  coverImage: string;
  images: string[];
  featured?: boolean;
  publishedAt: string;
  instagram?: string;
}

import portfolioData from "@/data/portfolio-data.json";

export const projects: Project[] = (portfolioData.projects || []).map((p: any) => ({
  ...p,
  images: Array.isArray(p.images)
    ? p.images.map((img: any) => (typeof img === "string" ? img : img.src))
    : [],
}));

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "property", label: "Property" },
  { id: "travel", label: "Travel" },
] as const;
