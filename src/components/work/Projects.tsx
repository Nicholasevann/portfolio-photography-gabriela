import { getProjects } from "@/lib/data-store";
import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { ScrollReveal } from "@/components/common/ScrollReveal";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  category?: string;
  paddingX?: "l" | "m" | "s" | "none";
}

export async function Projects({ range, exclude, category, paddingX = "l" }: ProjectsProps) {
  // 1. Fetch dynamic projects from data store
  let projectsList = await getProjects();

  // 2. If data store is empty, fallback to MDX files
  if (!projectsList || projectsList.length === 0) {
    const mdxPosts = getPosts(["src", "app", "work", "projects"]);
    if (mdxPosts && mdxPosts.length > 0) {
      projectsList = mdxPosts.map((post) => ({
        slug: post.slug,
        title: post.metadata.title,
        category: post.metadata.category || "Property",
        location: post.metadata.location || "",
        year: post.metadata.year || "2024",
        publishedAt: post.metadata.publishedAt,
        summary: post.metadata.summary,
        description: post.metadata.description || post.metadata.summary,
        coverImage: post.metadata.coverImage || post.metadata.image || "/uploads/1787939992222-img_4507.jpg",
        images: post.metadata.images || [],
        featured: post.metadata.featured ?? true,
        content: post.content,
      }));
    }
  }

  // Filter by category if specified
  if (category && category.toLowerCase() !== "all") {
    projectsList = projectsList.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // Exclude by slug
  if (exclude && exclude.length > 0) {
    projectsList = projectsList.filter((p) => !exclude.includes(p.slug));
  }

  const displayedProjects = range
    ? projectsList.slice(range[0] - 1, range[1] ?? projectsList.length)
    : projectsList;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX={paddingX === "none" ? undefined : paddingX}>
      {displayedProjects.map((post, index) => (
        <ScrollReveal key={post.slug} translateY="12" delay={0.06 * (index % 3)} fillWidth>
          <ProjectCard
            priority={index < 2}
            href={`/work/${post.slug}`}
            images={post.images?.length ? post.images.map((img) => (typeof img === "string" ? img : img.src)) : [post.coverImage]}
            coverImage={post.coverImage}
            title={post.title}
            category={post.category || "Property"}
            location={post.location}
            year={post.year}
            description={post.summary || post.description}
            content={post.content}
          />
        </ScrollReveal>
      ))}
    </Column>
  );
}
