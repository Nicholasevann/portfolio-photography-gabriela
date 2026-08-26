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
import { projects } from "@/resources/projects";

type CategoryType = "all" | "property" | "travel";

export function WorkFilterView() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");

  const propertyProjects = projects.filter(
    (p) => activeCategory === "all" || p.category.toLowerCase() === activeCategory,
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

      {/* Content Rendering based on Category */}
      {activeCategory === "travel" ? (
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
              Travel Photography
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
                A collection of travel photography and destination narratives is coming soon.
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
          {propertyProjects.map((post, index) => (
            <RevealFx key={post.slug} translateY="8" delay={index * 0.1}>
              <ProjectCard
                priority={index < 2}
                href={`/work/${post.slug}`}
                images={post.images}
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
