"use client";

import { useState } from "react";
import {
  Badge,
  Column,
  Heading,
  RevealFx,
  Row,
  SmartLink,
  Text,
  ToggleButton,
} from "@once-ui-system/core";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectItem } from "@/types/portfolio";
import { projects as fallbackProjects } from "@/resources/projects";

type CategoryType = "all" | "property" | "hospitality" | "travel";

interface WorkFilterViewProps {
  initialProjects?: ProjectItem[];
}

export function WorkFilterView({ initialProjects }: WorkFilterViewProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");

  const projectList: ProjectItem[] =
    initialProjects && initialProjects.length > 0
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
        }));

  const filteredProjects = projectList.filter(
    (p) => activeCategory === "all" || p.category?.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <Column fillWidth gap="l" horizontal="center">
      {/* Category Tabs */}
      <Row
        gap="8"
        padding="4"
        background="surface"
        border="neutral-alpha-weak"
        radius="full"
        horizontal="center"
        marginBottom="m"
      >
        <ToggleButton
          selected={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          label="All"
        />
        <ToggleButton
          selected={activeCategory === "property"}
          onClick={() => setActiveCategory("property")}
          label="Property"
        />
        <ToggleButton
          selected={activeCategory === "travel"}
          onClick={() => setActiveCategory("travel")}
          label="Travel"
        />
      </Row>

      {/* Content Rendering based on Filter */}
      {filteredProjects.length === 0 ? (
        <RevealFx translateY="12" fillWidth horizontal="center">
          <Column
            fillWidth
            maxWidth="s"
            padding="40"
            margin="24"
            radius="l"
            border="neutral-alpha-weak"
            background="page"
            horizontal="center"
            align="center"
            gap="m"
            style={{
              textAlign: "center",
            }}
          >
            <Badge
              background="brand-alpha-weak"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
            >
              {activeCategory.toUpperCase()} Photography
            </Badge>
            <Heading as="h2" variant="display-strong-s">
              Coming Soon
            </Heading>
            <Column maxWidth="xs" horizontal="center" align="center">
              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
                wrap="balance"
                align="center"
              >
                A curated collection of {activeCategory} photography projects is coming soon.
              </Text>
            </Column>
            <Row paddingTop="8">
              <SmartLink href="/" suffixIcon="arrowRight">
                <Text variant="label-default-s">Return to Home</Text>
              </SmartLink>
            </Row>
          </Column>
        </RevealFx>
      ) : (
        <Column fillWidth gap="xl">
          {filteredProjects.map((post, index) => (
            <RevealFx key={post.slug} translateY="8" delay={index * 0.1}>
              <ProjectCard
                priority={index < 2}
                href={`/work/${post.slug}`}
                images={post.images?.length ? post.images : [post.coverImage]}
                coverImage={post.coverImage}
                title={post.title}
                category={post.category}
                location={post.location}
                year={post.year}
                description={post.summary || post.description}
              />
            </RevealFx>
          ))}
        </Column>
      )}
    </Column>
  );
}

export default WorkFilterView;
