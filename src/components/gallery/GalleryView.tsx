"use client";

import { Media, MasonryGrid, Row } from "@once-ui-system/core";
import { gallery as fallbackGallery } from "@/resources";
import { GalleryItem } from "@/types/portfolio";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useLightbox } from "@/components/common/ImageLightbox";

interface GalleryViewProps {
  initialImages?: GalleryItem[];
}

export default function GalleryView({ initialImages }: GalleryViewProps) {
  const { openLightbox } = useLightbox();

  const images =
    initialImages !== undefined
      ? initialImages
      : fallbackGallery.images.map((img, i) => ({
          id: `static-${i}`,
          src: img.src,
          alt: img.alt,
          orientation: img.orientation as "horizontal" | "vertical",
        }));

  const handleImageClick = (index: number) => {
    openLightbox({
      images: images.map((img) => ({
        src: img.src,
        alt: img.alt,
        title: img.alt || "Gallery",
        orientation: img.orientation,
      })),
      initialIndex: index,
      title: "Gallery",
    });
  };

  return (
    <MasonryGrid columns={2} s={{ columns: 1 }} gap="16">
      {images.map((image, index) => (
        <ScrollReveal
          key={image.id || `${image.src}-${index}`}
          translateY="12"
          delay={0.06 * (index % 4)}
          fillWidth
        >
          <Row
            radius="m"
            overflow="hidden"
            border="neutral-alpha-weak"
            style={{
              position: "relative",
              cursor: "zoom-in",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
            }}
            onClick={() => handleImageClick(index)}
          >
            <Media
              priority={index < 4}
              sizes="(max-width: 560px) 100vw, 50vw"
              radius="m"
              aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </Row>
        </ScrollReveal>
      ))}
    </MasonryGrid>
  );
}
