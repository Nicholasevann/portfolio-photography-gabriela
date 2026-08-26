import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { projects as fallbackProjects } from "@/resources/projects";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  category?: string;
  paddingX?: "l" | "m" | "s" | "none";
}

export function Projects({ range, exclude, category, paddingX = "l" }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Fallback to static project dataset if MDX lookup is empty
  if (!allProjects || allProjects.length === 0) {
    allProjects = fallbackProjects.map((p) => ({
      slug: p.slug,
      content: "",
      metadata: {
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        publishedAt: p.publishedAt,
        summary: p.description,
        description: p.description,
        coverImage: p.coverImage,
        image: p.coverImage,
        images: p.images,
        featured: p.featured,
      },
    }));
  }

  // Filter by category if specified
  if (category && category.toLowerCase() !== "all") {
    allProjects = allProjects.filter(
      (post) => post.metadata.category?.toLowerCase() === category.toLowerCase(),
    );
  }

  // Exclude by slug
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX={paddingX === "none" ? undefined : paddingX}>
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          coverImage={post.metadata.coverImage || post.metadata.image}
          title={post.metadata.title}
          category={post.metadata.category || "Property"}
          location={post.metadata.location}
          year={post.metadata.year}
          description={post.metadata.summary || post.metadata.description}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
