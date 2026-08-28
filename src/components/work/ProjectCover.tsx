"use client";

import React from "react";
import { Media, Row } from "@once-ui-system/core";
import { ProjectImageItem } from "@/types/portfolio";
import { useLightbox } from "@/components/common/ImageLightbox";

interface ProjectCoverProps {
  src: string;
  alt: string;
  title: string;
  allImages?: (string | ProjectImageItem)[];
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({
  src,
  alt,
  title,
  allImages = [],
}) => {
  const { openLightbox } = useLightbox();

  // Combine cover image with all other project images if not already included
  const allImagesList = React.useMemo(() => {
    const list: { src: string; alt?: string; title?: string }[] = [];

    // Add cover first
    list.push({ src, alt: `${title} — Cover`, title });

    // Add remaining images
    allImages.forEach((img, idx) => {
      const imgSrc = typeof img === "string" ? img : img.src;
      const imgAlt = typeof img === "string" ? `${title} — Image ${idx + 1}` : (img.alt || img.caption || `${title} — Image ${idx + 1}`);
      if (imgSrc !== src) {
        list.push({ src: imgSrc, alt: imgAlt, title });
      }
    });

    return list;
  }, [src, alt, title, allImages]);

  const handleClick = () => {
    openLightbox({
      images: allImagesList,
      initialIndex: 0,
      title,
    });
  };

  return (
    <Row
      fillWidth
      radius="l"
      overflow="hidden"
      border="neutral-alpha-weak"
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        cursor: "zoom-in",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
      onClick={handleClick}
    >
      <Media
        priority
        aspectRatio="16 / 9"
        sizes="(max-width: 960px) 100vw, 960px"
        alt={alt}
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </Row>
  );
};

export default ProjectCover;
