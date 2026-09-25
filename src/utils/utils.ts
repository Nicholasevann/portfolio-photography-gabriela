import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type PostMetadata = {
  title: string;
  subtitle?: string;
  category?: string;
  location?: string;
  year?: string;
  publishedAt: string;
  summary: string;
  description?: string;
  coverImage?: string;
  image?: string;
  images: string[];
  tag?: string;
  team?: Team[];
  link?: string;
  featured?: boolean;
  instagram?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: PostMetadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    category: data.category || "Property",
    location: data.location || "",
    year: data.year || "",
    publishedAt: data.publishedAt || "",
    summary: data.summary || data.description || "",
    description: data.description || data.summary || "",
    coverImage: data.coverImage || data.image || (data.images && data.images[0]) || "",
    image: data.image || data.coverImage || (data.images && data.images[0]) || "",
    images: data.images || [],
    tag: data.tag || "",
    team: data.team || [],
    link: data.link || "",
    featured: data.featured ?? true,
    instagram: data.instagram || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(/*turbopackIgnore: true*/ process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
