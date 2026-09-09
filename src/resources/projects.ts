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

export const projects: Project[] = [
  {
    slug: "sola",
    title: "Sola",
    category: "Property",
    location: "Bali, Indonesia",
    year: "2026",
    description:
      "Editorial hotel photography capturing tropical architecture, warm interiors, refined material details, and relaxed outdoor spaces.",
    summary:
      "A cohesive visual story highlighting the property's design, atmosphere, and overall guest experience.",
    coverImage: "/uploads/1787939992222-img_4507.jpg",
    images: [
      "/uploads/1787939992222-img_4507.jpg",
    ],
    featured: true,
    publishedAt: "2026-08-27",
    instagram: "https://www.instagram.com/sola.uluwatu/",
  },
  {
    slug: "the-huthut",
    title: "The Huthut",
    category: "Property",
    location: "Bali, Indonesia",
    year: "2024",
    description:
      "Editorial villa photography capturing tropical architecture, private pool living, natural textures, and serene outdoor spaces in bright, relaxed daylight.",
    summary:
      "Editorial villa photography capturing tropical architecture, private pool living, natural textures, and serene outdoor spaces.",
    coverImage: "/uploads/1787940439507-img_4451.jpg",
    images: [
      "/uploads/1787940439507-img_4451.jpg",
    ],
    featured: true,
    publishedAt: "2024-05-22",
    instagram: "https://www.instagram.com/thehuthutbali/",
  },
  {
    slug: "bali-paradise-suites",
    title: "Bali Paradise Suites",
    category: "Property",
    location: "Canggu, Bali",
    year: "2024",
    description:
      "Editorial private villa photography capturing intimate poolside living, tropical greenery, clean interiors, and relaxed kitchen and lounge spaces.",
    summary:
      "Editorial private villa photography capturing intimate poolside living, tropical greenery, clean interiors, and relaxed spaces.",
    coverImage: "/uploads/1787941062342-0.png",
    images: [
      "/uploads/1787941062342-0.png",
    ],
    featured: true,
    publishedAt: "2024-04-18",
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "property", label: "Property" },
  { id: "travel", label: "Travel" },
] as const;
