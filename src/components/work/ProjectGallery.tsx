"use client";

import React from "react";
import { MasonryGrid, Media, Row } from "@once-ui-system/core";
import { ProjectImageItem } from "@/types/portfolio";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useLightbox } from "@/components/common/ImageLightbox";

interface ProjectGalleryProps {
  images: (string | ProjectImageItem)[];
  title?: string;
  layout?: "masonry" | "grid" | "editorial";
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images = [],
  title = "Photography",
}) => {
  const { openLightbox } = useLightbox();

  if (!images || images.length === 0) return null;

  // Normalize image inputs
  const normalizedImages: ProjectImageItem[] = images.map((img) => {
    if (typeof img === "string") {
      return { src: img, orientation: "horizontal" };
    }
    return img;
  });

  const handleImageClick = (index: number) => {
    openLightbox({
      images: normalizedImages.map((img, i) => ({
        src: img.src,
        alt: img.alt || img.caption || `${title} — Capture ${i + 1}`,
        title: title,
        orientation: img.orientation,
      })),
      initialIndex: index,
      title: title,
    });
  };

  return (
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

        const altText = image.alt || image.caption || `${title} — Capture ${index + 1}`;

        return (
          <ScrollReveal
            key={`gallery-img-${src}-${index}`}
            delay={0.06 * (index % 4)}
            translateY="12"
            fillWidth
          >
            <Row
              radius="m"
              overflow="hidden"
              border="neutral-alpha-weak"
              style={{
                position: "relative",
                width: "100%",
                cursor: "zoom-in",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
              }}
              onClick={() => handleImageClick(index)}
            >
              <Media
                priority={index < 4}
                sizes="(max-width: 768px) 100vw, 50vw"
                radius="m"
                aspectRatio={aspectRatio}
                src={src}
                alt={altText}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </Row>
          </ScrollReveal>
        );
      })}
    </MasonryGrid>
  );
};

export default ProjectGallery;
