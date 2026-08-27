"use client";

import { useState, useRef } from "react";
import { Button, Column, Row, Text, Spinner, Icon, Badge } from "@once-ui-system/core";
import { ImageOrientation, ProjectImageItem } from "@/types/portfolio";

interface MultiImageUploaderProps {
  images: (string | ProjectImageItem)[];
  onChange: (images: ProjectImageItem[]) => void;
  label?: string;
  maxFiles?: number;
}

export function MultiImageUploader({
  images,
  onChange,
  label = "Project Gallery Images",
  maxFiles = 30,
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Normalize images to ProjectImageItem[]
  const normalizedImages: ProjectImageItem[] = images.map((img) => {
    if (typeof img === "string") {
      return { src: img, orientation: "horizontal" as ImageOrientation };
    }
    return {
      src: img.src,
      alt: img.alt,
      orientation: img.orientation || "horizontal",
      caption: img.caption,
    };
  });

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i]);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.files) {
        const newItems: ProjectImageItem[] = data.files.map((f: { url: string }) => ({
          src: f.url,
          orientation: "horizontal" as ImageOrientation,
        }));
        onChange([...normalizedImages, ...newItems]);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const updated = normalizedImages.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= normalizedImages.length) return;

    const updated = [...normalizedImages];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const toggleOrientation = (index: number) => {
    const current = normalizedImages[index]?.orientation || "horizontal";
    // Cycle: horizontal (16:9) -> vertical (3:4) -> auto (full natural)
    const next: ImageOrientation =
      current === "horizontal" ? "vertical" : current === "vertical" ? "auto" : "horizontal";

    const updated = normalizedImages.map((img, i) =>
      i === index ? { ...img, orientation: next } : img
    );
    onChange(updated);
  };

  return (
    <Column fillWidth gap="12">
      <Row horizontal="between" vertical="center">
        <Column gap="2">
          <Text variant="label-default-m">{label}</Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Click orientation badge to switch between Horizontal (16:9), Vertical (3:4), or Auto (Full natural size)
          </Text>
        </Column>
        <Badge background="neutral-alpha-weak" onBackground="neutral-strong">
          {normalizedImages.length} / {maxFiles} images
        </Badge>
      </Row>

      {/* Grid of uploaded images */}
      {normalizedImages.length > 0 && (
        <Row fillWidth gap="12" style={{ flexWrap: "wrap" }}>
          {normalizedImages.map((item, idx) => {
            const isVertical = item.orientation === "vertical";
            const isAuto = item.orientation === "auto";

            return (
              <Column
                key={`${item.src}-${idx}`}
                radius="m"
                overflow="hidden"
                border="neutral-alpha-weak"
                style={{
                  width: "calc(33.333% - 8px)",
                  minWidth: "160px",
                  position: "relative",
                  backgroundColor: "var(--surface-background)",
                }}
              >
                {/* Thumbnail Preview with matching Aspect Ratio */}
                <div
                  style={{
                    height: isVertical ? "160px" : isAuto ? "140px" : "110px",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "height 0.3s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={`Gallery item ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: isAuto ? "contain" : "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      left: "6px",
                      background: "rgba(0,0,0,0.75)",
                      color: "#fff",
                      fontSize: "10px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    #{idx + 1}
                  </div>

                  {/* Orientation Switcher Button */}
                  <button
                    type="button"
                    onClick={() => toggleOrientation(idx)}
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "6px",
                      background:
                        isVertical
                          ? "rgba(16, 185, 129, 0.85)"
                          : isAuto
                          ? "rgba(59, 130, 246, 0.85)"
                          : "rgba(0,0,0,0.75)",
                      color: "#fff",
                      border: "none",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    title="Click to toggle orientation between Horizontal (16:9), Vertical (3:4), or Auto"
                  >
                    {isVertical ? "⇅ Portrait (3:4)" : isAuto ? "◰ Full / Auto" : "⇄ Landscape (16:9)"}
                  </button>
                </div>

                {/* Card Controls */}
                <Row padding="8" horizontal="between" vertical="center" background="surface">
                  <Row gap="4">
                    <Button
                      size="s"
                      variant="secondary"
                      disabled={idx === 0}
                      onClick={() => moveImage(idx, "left")}
                    >
                      ←
                    </Button>
                    <Button
                      size="s"
                      variant="secondary"
                      disabled={idx === normalizedImages.length - 1}
                      onClick={() => moveImage(idx, "right")}
                    >
                      →
                    </Button>
                  </Row>
                  <Button
                    size="s"
                    variant="tertiary"
                    onClick={() => toggleOrientation(idx)}
                  >
                    {isVertical ? "Portrait" : isAuto ? "Auto" : "Landscape"}
                  </Button>
                  <Button size="s" variant="danger" onClick={() => removeImage(idx)}>
                    ✕
                  </Button>
                </Row>
              </Column>
            );
          })}
        </Row>
      )}

      {/* Upload trigger zone */}
      <Column
        fillWidth
        padding="20"
        radius="m"
        border="neutral-alpha-medium"
        horizontal="center"
        align="center"
        gap="8"
        onClick={() => fileInputRef.current?.click()}
        style={{
          cursor: "pointer",
          borderStyle: "dashed",
          backgroundColor: "var(--surface-background)",
        }}
      >
        {uploading ? (
          <Row gap="12" vertical="center">
            <Spinner size="s" />
            <Text variant="body-default-s">Uploading photos to Vercel...</Text>
          </Row>
        ) : (
          <>
            <Icon name="gallery" onBackground="neutral-weak" size="m" />
            <Text variant="label-default-s" onBackground="neutral-strong">
              Add More Photos (Select multiple files)
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              PNG, JPG, WebP supported
            </Text>
          </>
        )}
      </Column>

      {error && (
        <Text variant="body-default-xs" onBackground="danger-strong">
          {error}
        </Text>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />
    </Column>
  );
}
