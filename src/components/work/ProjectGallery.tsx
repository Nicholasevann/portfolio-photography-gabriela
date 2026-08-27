"use client";

import { Column, MasonryGrid, Media, Row } from "@once-ui-system/core";
import { ProjectImageItem } from "@/types/portfolio";
import { ScrollReveal } from "@/components/common/ScrollReveal";

interface ProjectGalleryProps {
  images: (string | ProjectImageItem)[];
  title?: string;
  layout?: "masonry" | "grid" | "editorial";
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images = [],
  title = "Photography",
}) => {
  if (!images || images.length === 0) return null;

  // Normalize image inputs
  const normalizedImages: ProjectImageItem[] = images.map((img) => {
    if (typeof img === "string") {
      return { src: img, orientation: "horizontal" };
    }
    return img;
  });

  return (
    <Column fillWidth gap="l">
      <MasonryGrid columns={2} s={{ columns: 1 }} gap="16">
        {normalizedImages.map((image, index) => {
          const src = image.src;
          const orientation = image.orientation || "horizontal";

          // Calculate precise aspect ratio based on user's orientation setting
          let aspectRatio: "16 / 9" | "3 / 4" | "1 / 1" | undefined = "16 / 9";
          if (orientation === "vertical") {
            aspectRatio = "3 / 4";
          } else if (orientation === "square") {
            aspectRatio = "1 / 1";
          } else if (orientation === "horizontal") {
            aspectRatio = "16 / 9";
          } else if (orientation === "auto") {
            aspectRatio = undefined;
          }

          return (
            <ScrollReveal key={`gallery-img-${src}-${index}`} delay={0.06 * (index % 4)} translateY="12" fillWidth>
              <Row
                radius="m"
                overflow="hidden"
                border="neutral-alpha-weak"
                style={{
                  position: "relative",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <Media
                  enlarge
                  priority={index < 4}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  radius="m"
                  aspectRatio={aspectRatio}
                  src={src}
                  alt={image.alt || `${title} - Capture ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
              </Row>
            </ScrollReveal>
          );
        })}
      </MasonryGrid>
    </Column>
  );
};

export default ProjectGallery;
