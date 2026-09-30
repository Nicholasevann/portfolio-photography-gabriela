"use client";

import {
  Column,
  Heading,
  RevealFx,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectItem } from "@/types/portfolio";
import { projects as fallbackProjects } from "@/resources/projects";

import { ScrollReveal } from "@/components/common/ScrollReveal";

interface WorkFilterViewProps {
  initialProjects?: ProjectItem[];
}

export function WorkFilterView({ initialProjects }: WorkFilterViewProps) {
  const projectList: ProjectItem[] =
    initialProjects !== undefined
      ? initialProjects
      : fallbackProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        publishedAt: p.publishedAt,
        summary: p.description,
        description: p.description,
        coverImage: p.coverImage,
        images: p.images,
        instagram: p.instagram,
      }));

  return (
    <Column fillWidth gap="l" horizontal="center">
      {/* Content Rendering */}
      {projectList.length === 0 ? (
        <RevealFx translateY="12" fillWidth horizontal="center">
          <Column
            fillWidth
            padding="48"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            horizontal="center"
            align="center"
            gap="16"
          >
            <Heading variant="heading-strong-m">No projects yet</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak" align="center">
              New property shoots and photography captures will be added here soon.
            </Text>
            <Row paddingTop="8">
              <SmartLink href="/" suffixIcon="arrowRight">
                <Text variant="label-default-s">Return to Home</Text>
              </SmartLink>
            </Row>
          </Column>
        </RevealFx>
      ) : (
        <Column fillWidth gap="xl">
          {projectList.map((post, index) => (
            <ScrollReveal key={post.slug} translateY="12" delay={0.06 * (index % 3)} fillWidth>
              <ProjectCard
                priority={index < 2}
                href={`/work/${post.slug}`}
                images={post.images?.length ? post.images.map((img) => (typeof img === "string" ? img : img.src)) : [post.coverImage]}
                coverImage={post.coverImage}
                title={post.title}
                category={post.category}
                location={post.location}
                year={post.year}
                description={post.summary || post.description}
              />
            </ScrollReveal>
          ))}
        </Column>
      )}
    </Column>
  );
}

export default WorkFilterView;

