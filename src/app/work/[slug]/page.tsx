import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Badge,
  Column,
  Heading,
  Line,
  Media,
  Meta,
  RevealFx,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { baseURL, person, work } from "@/resources";
import { projects as staticProjects } from "@/resources/projects";
import { ScrollToHash, CustomMDX } from "@/components";
import { ProjectGallery } from "@/components/work/ProjectGallery";
import { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/data-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const dynamicProjects = await getProjects();
  if (dynamicProjects && dynamicProjects.length > 0) {
    return dynamicProjects.map((p) => ({ slug: p.slug }));
  }

  const posts = getPosts(["src", "app", "work", "projects"]);
  if (posts && posts.length > 0) {
    return posts.map((post) => ({
      slug: post.slug,
    }));
  }
  return staticProjects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  // Check dynamic store first
  const dynamicMatch = await getProjectBySlug(slugPath);
  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((p) => p.slug === slugPath);
  const staticMatch = staticProjects.find((p) => p.slug === slugPath);

  const title = dynamicMatch?.title || post?.metadata.title || staticMatch?.title || "Project";
  const description =
    dynamicMatch?.summary ||
    dynamicMatch?.description ||
    post?.metadata.summary ||
    post?.metadata.description ||
    staticMatch?.description ||
    "Photography project by ne.lens";
  const image =
    dynamicMatch?.coverImage ||
    post?.metadata.coverImage ||
    post?.metadata.image ||
    staticMatch?.coverImage ||
    "/images/hero/hero-cover.jpg";

  return Meta.generate({
    title: `${title} — ne.lens`,
    description: description,
    baseURL: baseURL,
    image: image,
    path: `${work.path}/${slugPath}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  // 1. Fetch dynamic project & list from data store
  const allDynamicProjects = await getProjects();
  const dynamicMatch = allDynamicProjects.find((p) => p.slug === slugPath);

  // 2. MDX & static fallbacks
  const allPosts = getPosts(["src", "app", "work", "projects"]);
  const post = allPosts.find((p) => p.slug === slugPath);
  const staticMatch = staticProjects.find((p) => p.slug === slugPath);

  if (!dynamicMatch && !post && !staticMatch) {
    notFound();
  }

  const title = dynamicMatch?.title || post?.metadata.title || staticMatch?.title || "";
  const category = dynamicMatch?.category || post?.metadata.category || staticMatch?.category || "Property";
  const location = dynamicMatch?.location || post?.metadata.location || staticMatch?.location || "";
  const year = dynamicMatch?.year || post?.metadata.year || staticMatch?.year || "2024";
  const description =
    dynamicMatch?.summary ||
    dynamicMatch?.description ||
    post?.metadata.summary ||
    post?.metadata.description ||
    staticMatch?.summary ||
    staticMatch?.description ||
    "";
  const coverImage =
    dynamicMatch?.coverImage ||
    post?.metadata.coverImage ||
    post?.metadata.images?.[0] ||
    staticMatch?.coverImage ||
    "/images/hero/hero-cover.jpg";
  const allImages =
    dynamicMatch?.images?.length
      ? dynamicMatch.images
      : post?.metadata.images?.length
      ? post.metadata.images
      : staticMatch?.images || [coverImage];

  const content = dynamicMatch?.content || post?.content || "";

  // Gallery images
  const primaryGallery = allImages.slice(1, 3);
  const secondaryGallery = allImages.slice(3);

  // Compute Next Project
  const allSlugs =
    allDynamicProjects.length > 0
      ? allDynamicProjects.map((p) => p.slug)
      : allPosts.length > 0
      ? allPosts.map((p) => p.slug)
      : staticProjects.map((p) => p.slug);
  const currentIndex = allSlugs.indexOf(slugPath);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextProject =
    allDynamicProjects.find((p) => p.slug === nextSlug) ||
    allPosts.find((p) => p.slug === nextSlug) ||
    staticProjects.find((p) => p.slug === nextSlug);

  return (
    <Column as="section" maxWidth="m" fillWidth horizontal="center" gap="xl" paddingX="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/${slugPath}`}
        title={`${title} — ne.lens`}
        description={description}
        image={coverImage}
        author={{
          name: person.name,
          url: `${baseURL}/work`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Back Navigation & Breadcrumb */}
      <Row fillWidth horizontal="start" paddingTop="12">
        <SmartLink href="/work" prefixIcon="arrowRight" style={{ transform: "rotate(180deg)" }}>
          <Text variant="label-default-s" style={{ transform: "rotate(180deg)", display: "inline-block" }}>
            All Projects
          </Text>
        </SmartLink>
      </Row>

      {/* 1. Project Hero & 2. Project Information */}
      <RevealFx translateY="8" fillWidth horizontal="center">
        <Column maxWidth="s" gap="16" horizontal="center" align="center" paddingBottom="16">
          <Row gap="8" vertical="center">
            <Badge
              background="brand-alpha-weak"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
            >
              {category}
            </Badge>
            {location && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {location}
              </Text>
            )}
            {year && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                · {year}
              </Text>
            )}
          </Row>

          <Heading variant="display-strong-l" align="center" wrap="balance">
            {title}
          </Heading>

          {description && (
            <Text
              variant="heading-default-m"
              onBackground="neutral-weak"
              align="center"
              wrap="balance"
            >
              {description}
            </Text>
          )}
        </Column>
      </RevealFx>

      {/* 3. Featured Cover Image */}
      <RevealFx translateY="16" delay={0.2} fillWidth>
        <Row
          fillWidth
          radius="l"
          overflow="hidden"
          border="neutral-alpha-weak"
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
          }}
        >
          <Media
            enlarge
            priority
            aspectRatio="16 / 9"
            sizes="(max-width: 960px) 100vw, 960px"
            alt={title}
            src={coverImage}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Row>
      </RevealFx>

      {/* 4. Photography Gallery (Primary Series) */}
      {primaryGallery.length > 0 && (
        <Column fillWidth marginTop="24">
          <ProjectGallery images={primaryGallery} title={title} />
        </Column>
      )}

      {/* 5. Project Narrative & Description */}
      {content ? (
        <RevealFx translateY="12" fillWidth horizontal="center">
          <Column
            style={{ margin: "auto" }}
            as="article"
            maxWidth="xs"
            paddingY="32"
            fillWidth
          >
            <CustomMDX source={content} />
          </Column>
        </RevealFx>
      ) : null}

      {/* 6. Additional Gallery / Detail Shots */}
      {secondaryGallery.length > 0 && (
        <Column fillWidth marginTop="16">
          <ProjectGallery images={secondaryGallery} title={title} />
        </Column>
      )}

      {/* 7. Next Project Navigation */}
      {nextProject && nextSlug !== slugPath && (
        <Column fillWidth gap="24" horizontal="center" marginTop="48" marginBottom="32">
          <Line maxWidth={48} />
          <Row fillWidth horizontal="between" vertical="center">
            <Column gap="4">
              <Text variant="label-default-s" onBackground="brand-medium">
                Next Project
              </Text>
              <Heading as="h2" variant="heading-strong-l">
                {"title" in nextProject
                  ? nextProject.title
                  : "metadata" in nextProject
                  ? nextProject.metadata.title
                  : ""}
              </Heading>
            </Column>
            <SmartLink href={`/work/${nextSlug}`} suffixIcon="arrowRight">
              <Text variant="label-default-s">View Project</Text>
            </SmartLink>
          </Row>

          <Row
            fillWidth
            radius="m"
            overflow="hidden"
            border="neutral-alpha-weak"
            style={{
              position: "relative",
              aspectRatio: "21 / 9",
            }}
          >
            <SmartLink
              href={`/work/${nextSlug}`}
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              <Media
                aspectRatio="21 / 9"
                sizes="(max-width: 960px) 100vw, 960px"
                alt={
                  "title" in nextProject
                    ? nextProject.title
                    : "metadata" in nextProject
                    ? nextProject.metadata.title
                    : ""
                }
                src={
                  ("coverImage" in nextProject
                    ? nextProject.coverImage
                    : "metadata" in nextProject
                    ? nextProject.metadata.coverImage || nextProject.metadata.image
                    : "") || "/images/hero/hero-cover.jpg"
                }
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </SmartLink>
          </Row>
        </Column>
      )}

      <ScrollToHash />
    </Column>
  );
}
