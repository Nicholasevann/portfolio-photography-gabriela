"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery as fallbackGallery } from "@/resources";
import { GalleryItem } from "@/types/portfolio";
import { ScrollReveal } from "@/components/common/ScrollReveal";

interface GalleryViewProps {
  initialImages?: GalleryItem[];
}

export default function GalleryView({ initialImages }: GalleryViewProps) {
  const images =
    initialImages !== undefined
      ? initialImages
      : fallbackGallery.images.map((img, i) => ({
          id: `static-${i}`,
          src: img.src,
          alt: img.alt,
          orientation: img.orientation as "horizontal" | "vertical",
        }));

  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {images.map((image, index) => (
        <ScrollReveal
          key={image.id || `${image.src}-${index}`}
          translateY="12"
          delay={0.06 * (index % 4)}
          fillWidth
        >
          <Media
            enlarge
            priority={index < 4}
            sizes="(max-width: 560px) 100vw, 50vw"
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.src}
            alt={image.alt}
          />
        </ScrollReveal>
      ))}
    </MasonryGrid>
  );
}
