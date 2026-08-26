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
}

export const projects: Project[] = [
  {
    slug: "on-the-sola",
    title: "On The Sola",
    category: "Property",
    location: "Bali, Indonesia",
    year: "2024",
    description:
      "Property photography showcasing the architecture, minimalist interiors, and serene atmosphere of the space.",
    summary:
      "Capturing the tropical brutalist forms, natural textures, and sunlit corridors of a contemporary private sanctuary in Bali.",
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
  },
  {
    slug: "the-huthut",
    title: "The Huthut",
    category: "Property",
    location: "Lombok, Indonesia",
    year: "2024",
    description:
      "Editorial architectural and lifestyle photography capturing organic wooden craftsmanship, open pavilions, and tranquil nature surroundings.",
    summary:
      "A celebration of sustainable bamboo architecture and open-air living nestled among lush coastal hills.",
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
  },
  {
    slug: "bali-paradise-suites",
    title: "Bali Paradise Suites",
    category: "Property",
    location: "Canggu, Bali",
    year: "2024",
    description:
      "Hospitality and property visual capture highlighting boutique luxury suites, sunlit private pools, and elegant interior design.",
    summary:
      "Documenting high-end hospitality interiors, intimate plunge pools, and seamless indoor-outdoor transitions.",
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
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "property", label: "Property" },
  { id: "travel", label: "Travel" },
] as const;
