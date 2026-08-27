"use client";

import { useState, useRef } from "react";
import { Button, Column, Row, Text, Media, Spinner, Icon } from "@once-ui-system/core";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string;
  helpText?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = "Upload Image",
  aspectRatio = "16 / 9",
  helpText = "PNG, JPG, WebP up to 10MB (stored on Vercel)",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Column fillWidth gap="8">
      {label && <Text variant="label-default-m">{label}</Text>}

      {value ? (
        <Column
          fillWidth
          radius="m"
          overflow="hidden"
          border="neutral-alpha-medium"
          style={{ position: "relative", backgroundColor: "var(--surface-background)" }}
        >
          <div style={{ width: "100%", height: "200px", position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <Row padding="8" horizontal="between" vertical="center" background="surface" borderTop="neutral-alpha-weak">
            <Text variant="body-default-xs" onBackground="neutral-weak" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>
              {value}
            </Text>
            <Row gap="8">
              <Button
                size="s"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                Change
              </Button>
              <Button
                size="s"
                variant="danger"
                onClick={() => onChange("")}
                disabled={uploading}
              >
                Remove
              </Button>
            </Row>
          </Row>
        </Column>
      ) : (
        <Column
          fillWidth
          padding="24"
          radius="m"
          border="neutral-alpha-medium"
          horizontal="center"
          align="center"
          gap="12"
          onClick={() => fileInputRef.current?.click()}
          style={{
            cursor: "pointer",
            borderStyle: "dashed",
            backgroundColor: "var(--surface-background)",
            transition: "border-color 0.2s ease",
          }}
        >
          {uploading ? (
            <Spinner size="m" />
          ) : (
            <>
              <Icon name="gallery" onBackground="neutral-weak" size="l" />
              <Column horizontal="center" align="center" gap="4">
                <Text variant="label-default-s" onBackground="neutral-strong">
                  Click to browse or drop an image
                </Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {helpText}
                </Text>
              </Column>
            </>
          )}
        </Column>
      )}

      {error && (
        <Text variant="body-default-xs" onBackground="danger-strong">
          {error}
        </Text>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </Column>
  );
}
