"use client";

import { useState } from "react";
import {
  Column,
  Media,
  RevealFx,
  Row,
  Text,
  ToggleButton,
} from "@once-ui-system/core";
import {
  photographyExperiences as defaultPhotoExp,
  engineeringExperiences as defaultEngExp,
} from "@/resources/content";
import { ExperienceItem } from "@/types/portfolio";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useLightbox } from "@/components/common/ImageLightbox";

interface WorkExperienceSectionProps {
  photographyExperiences?: ExperienceItem[];
  engineeringExperiences?: ExperienceItem[];
}

export function WorkExperienceSection({
  photographyExperiences = defaultPhotoExp,
  engineeringExperiences = defaultEngExp,
}: WorkExperienceSectionProps) {
  const [activeTab, setActiveTab] = useState<"photographer" | "software">("photographer");
  const { openLightbox } = useLightbox();

  const currentExperiences =
    activeTab === "photographer" ? photographyExperiences : engineeringExperiences;

  const handleImageClick = (images: { src: string; alt: string }[], clickedIndex: number, company: string) => {
    openLightbox({
      images: images.map((img) => ({
        src: img.src,
        alt: img.alt || `${company} visual capture`,
        title: company,
      })),
      initialIndex: clickedIndex,
      title: company,
    });
  };

  return (
    <Column fillWidth gap="m" marginBottom="40">
      {/* Experience Category Switcher */}
      <Row
        fitWidth
        gap="4"
        padding="4"
        background="surface"
        border="neutral-alpha-weak"
        radius="full"
        marginBottom="s"
      >
        <ToggleButton
          selected={activeTab === "photographer"}
          onClick={() => setActiveTab("photographer")}
          label="Photographer"
        />
        <ToggleButton
          selected={activeTab === "software"}
          onClick={() => setActiveTab("software")}
          label="Software Engineer"
        />
      </Row>

      {/* Experience Items */}
      <Column fillWidth gap="l">
        {currentExperiences.map((experience, index) => (
          <ScrollReveal key={`${activeTab}-${experience.company}-${index}`} translateY="12" delay={index * 0.08} fillWidth>
            <Column fillWidth gap="8">
              <Row fillWidth horizontal="between" vertical="end" wrap gap="8">
                <Text id={experience.company} variant="heading-strong-l">
                  {experience.company}
                </Text>
                <Text variant="heading-default-xs" onBackground="neutral-weak">
                  {experience.timeframe}
                </Text>
              </Row>
              <Text variant="body-default-s" onBackground="brand-weak" marginBottom="s">
                {experience.role}
              </Text>
              <Column as="ul" gap="12" style={{ paddingLeft: "1.25rem" }}>
                {experience.achievements.map((achievement, i) => (
                  <Text as="li" variant="body-default-m" key={`${activeTab}-${experience.company}-achievement-${i}`}>
                    {achievement}
                  </Text>
                ))}
              </Column>
              {experience.images && experience.images.length > 0 && (
                <Row fillWidth paddingTop="m" gap="12" wrap>
                  {experience.images.map((image, imgIdx) => (
                    <Row
                      key={`exp-img-${experience.company}-${image.src}-${imgIdx}`}
                      border="neutral-medium"
                      radius="m"
                      minWidth={image.width}
                      height={image.height}
                      style={{ cursor: "zoom-in" }}
                      onClick={() =>
                        handleImageClick(
                          experience.images || [],
                          imgIdx,
                          experience.company,
                        )
                      }
                    >
                      <Media
                        radius="m"
                        sizes={image.width ? image.width.toString() : "100%"}
                        alt={image.alt}
                        src={image.src}
                      />
                    </Row>
                  ))}
                </Row>
              )}
            </Column>
          </ScrollReveal>
        ))}
      </Column>
    </Column>
  );
}

export default WorkExperienceSection;
