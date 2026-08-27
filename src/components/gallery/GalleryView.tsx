"use client";

import { Media, MasonryGrid, RevealFx } from "@once-ui-system/core";
import { gallery as fallbackGallery } from "@/resources";
import { GalleryItem } from "@/types/portfolio";

interface GalleryViewProps {
  initialImages?: GalleryItem[];
}

export default function GalleryView({ initialImages }: GalleryViewProps) {
  const images =
    initialImages && initialImages.length > 0
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
        <RevealFx key={image.id || `${image.src}-${index}`} translateY="12" delay={index * 0.06} fillWidth>
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 100vw, 50vw"
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.src}
            alt={image.alt}
          />
        </RevealFx>
      ))}
    </MasonryGrid>
  );
}
