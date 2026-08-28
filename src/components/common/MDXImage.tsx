"use client";

import React from "react";
import { Media, MediaProps } from "@once-ui-system/core";
import { useLightbox } from "./ImageLightbox";

export function MDXImage({ alt, src, ...props }: MediaProps & { src: string }) {
  const { openLightbox } = useLightbox();

  if (!src) {
    return null;
  }

  const handleClick = () => {
    openLightbox({
      images: [{ src, alt: alt || "Article Image", title: alt }],
      initialIndex: 0,
      title: alt,
    });
  };

  return (
    <div style={{ cursor: "zoom-in", width: "100%" }} onClick={handleClick}>
      <Media
        marginTop="8"
        marginBottom="16"
        radius="m"
        border="neutral-alpha-medium"
        sizes="(max-width: 960px) 100vw, 960px"
        alt={alt}
        src={src}
        {...props}
      />
    </div>
  );
}

export default MDXImage;
