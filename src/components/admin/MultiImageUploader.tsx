"use client";

import { useState, useRef } from "react";
import { Button, Column, Row, Text, Spinner, Icon, Badge } from "@once-ui-system/core";

interface MultiImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  label?: string;
  maxFiles?: number;
}

export function MultiImageUploader({
  images,
  onChange,
  label = "Project Gallery Images",
  maxFiles = 20,
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        const newUrls = data.files.map((f: { url: string }) => f.url);
        onChange([...images, ...newUrls]);
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
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveImage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <Column fillWidth gap="12">
      <Row horizontal="between" vertical="center">
        <Text variant="label-default-m">{label}</Text>
        <Badge background="neutral-alpha-weak" onBackground="neutral-strong">
          {images.length} / {maxFiles} images
        </Badge>
      </Row>

      {/* Grid of uploaded images */}
      {images.length > 0 && (
        <Row fillWidth gap="12" style={{ flexWrap: "wrap" }}>
          {images.map((url, idx) => (
            <Column
              key={`${url}-${idx}`}
              radius="m"
              overflow="hidden"
              border="neutral-alpha-weak"
              style={{
                width: "calc(33.333% - 8px)",
                minWidth: "140px",
                position: "relative",
                backgroundColor: "var(--surface-background)",
              }}
            >
              <div style={{ height: "120px", position: "relative", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Gallery item ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    left: "4px",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    fontSize: "10px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                  }}
                >
                  #{idx + 1}
                </div>
              </div>
              <Row padding="4" horizontal="between" vertical="center" background="surface">
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
                    disabled={idx === images.length - 1}
                    onClick={() => moveImage(idx, "right")}
                  >
                    →
                  </Button>
                </Row>
                <Button size="s" variant="danger" onClick={() => removeImage(idx)}>
                  ✕
                </Button>
              </Row>
            </Column>
          ))}
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
            <Text variant="body-default-s">Uploading to Vercel...</Text>
          </Row>
        ) : (
          <>
            <Icon name="gallery" onBackground="neutral-weak" size="m" />
            <Text variant="label-default-s" onBackground="neutral-strong">
              Add More Images (Select multiple files)
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
