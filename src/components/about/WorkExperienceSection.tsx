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

interface WorkExperienceSectionProps {
  photographyExperiences?: ExperienceItem[];
  engineeringExperiences?: ExperienceItem[];
}

export function WorkExperienceSection({
  photographyExperiences = defaultPhotoExp,
  engineeringExperiences = defaultEngExp,
}: WorkExperienceSectionProps) {
  const [activeTab, setActiveTab] = useState<"photographer" | "software">("photographer");

  const currentExperiences =
    activeTab === "photographer" ? photographyExperiences : engineeringExperiences;

  return (
    <Column fillWidth gap="l" marginBottom="40">
      {/* Experience Discipline Selector */}
      <Row
        fitWidth
        gap="8"
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
          <RevealFx key={`${activeTab}-${experience.company}-${index}`} translateY="8" delay={index * 0.08}>
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
                  {experience.images.map((image, imgIndex) => (
                    <Row
                      key={`${activeTab}-${experience.company}-img-${image.src}-${imgIndex}`}
                      border="neutral-alpha-weak"
                      radius="m"
                      overflow="hidden"
                      style={{
                        position: "relative",
                        width: 240,
                        height: 135,
                      }}
                    >
                      <Media
                        enlarge
                        radius="m"
                        aspectRatio="16 / 9"
                        alt={image.alt}
                        src={image.src}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Row>
                  ))}
                </Row>
              )}
            </Column>
          </RevealFx>
        ))}
      </Column>
    </Column>
  );
}

export default WorkExperienceSection;
