"use client";

import {
  Badge,
  Column,
  Flex,
  Heading,
  Icon,
  Media,
  Row,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  coverImage?: string;
  title: string;
  category?: string;
  location?: string;
  year?: string;
  content?: string;
  description?: string;
  avatars?: { src: string }[];
  link?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
  images = [],
  coverImage,
  title,
  category = "Property",
  location,
  year,
  description,
}) => {
  const displayImage = coverImage || images[0] || "/uploads/1787939992222-img_4507.jpg";

  return (
    <Column
      fillWidth
      gap="m"
      className={styles?.cardContainer}
      style={{
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}
    >
      <SmartLink href={href} style={{ width: "100%", textDecoration: "none", color: "inherit" }}>
        <Column fillWidth gap="s">
          <Row
            fillWidth
            radius="m"
            overflow="hidden"
            border="neutral-alpha-weak"
            style={{
              position: "relative",
              aspectRatio: "16 / 10",
              cursor: "pointer",
            }}
          >
            <Media
              priority={priority}
              sizes="(max-width: 960px) 100vw, 960px"
              aspectRatio="16 / 10"
              alt={title}
              src={displayImage}
              style={{
                transition: "transform 0.5s ease",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Row>

          <Flex
            s={{ direction: "column" }}
            fillWidth
            paddingX="xs"
            paddingTop="12"
            paddingBottom="24"
            gap="m"
            horizontal="between"
            vertical="start"
          >
            <Column flex={7} gap="8">
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
              <Heading as="h2" wrap="balance" variant="heading-strong-l">
                {title}
              </Heading>
              {description && (
                <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                  {description}
                </Text>
              )}
            </Column>

            <Row vertical="center" paddingTop="4" gap="4">
              <Text variant="label-default-s">View Project</Text>
              <Icon name="arrowRight" size="s" />
            </Row>
          </Flex>
        </Column>
      </SmartLink>
    </Column>
  );
};
