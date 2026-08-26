"use client";

import { Column, MasonryGrid, Media, RevealFx, Row } from "@once-ui-system/core";

interface ProjectGalleryProps {
  images: string[];
  title?: string;
  layout?: "masonry" | "grid" | "editorial";
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images = [],
  title = "Photography",
  layout = "editorial",
}) => {
  if (!images || images.length === 0) return null;

  return (
    <Column fillWidth gap="l">
      <MasonryGrid columns={2} s={{ columns: 1 }} gap="16">
        {images.map((src, index) => {
          // Dynamic editorial aspect ratio distribution
          const aspectRatio =
            index === 0
              ? "16 / 9"
              : index % 3 === 0
                ? "16 / 9"
                : index % 2 === 0
                  ? "4 / 3"
                  : "3 / 4";

          return (
            <RevealFx key={`gallery-img-${src}-${index}`} delay={0.1 * (index % 4)} translateY="8">
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
                  priority={index < 2}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  radius="m"
                  aspectRatio={aspectRatio}
                  src={src}
                  alt={`${title} - Visual capture ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
              </Row>
            </RevealFx>
          );
        })}
      </MasonryGrid>
    </Column>
  );
};
export default ProjectGallery;
