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

import { ScrollReveal } from "@/components/common/ScrollReveal";

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
          label="All Projects"
        />
        <ToggleButton
          selected={activeCategory === "property"}
          onClick={() => setActiveCategory("property")}
          label="Property"
        />
        <ToggleButton
          selected={activeCategory === "hospitality"}
          onClick={() => setActiveCategory("hospitality")}
          label="Hospitality"
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
            padding="48"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            horizontal="center"
            align="center"
            gap="16"
          >
            <Badge background="brand-alpha-weak" onBackground="brand-strong">
              {activeCategory}
            </Badge>
            <Heading variant="heading-strong-m">No projects in this category yet</Heading>
            <Text variant="body-default-s" onBackground="neutral-weak" align="center">
              New property shoots and travel captures will be added here soon.
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
          {filteredProjects.map((post, index) => (
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
