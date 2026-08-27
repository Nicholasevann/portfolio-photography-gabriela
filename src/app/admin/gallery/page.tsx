"use client";

import { useEffect, useState, useRef } from "react";
import {
  Badge,
  Button,
  Column,
  Heading,
  Icon,
  Input,
  Row,
  Text,
  Spinner,
} from "@once-ui-system/core";
import { GalleryItem } from "@/types/portfolio";

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?_t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const json = await res.json();
      if (json.success) {
        setGallery(json.data);
      }
    } catch (err) {
      console.error("Failed to load gallery", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleUploadFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setMessage(null);

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
        const newItems: GalleryItem[] = data.files.map(
          (f: { url: string; filename: string }, idx: number) => ({
            id: `gal-${Date.now()}-${idx}`,
            src: f.url,
            alt: f.filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            orientation: "horizontal" as const,
            category: "General",
          })
        );

        const updated = [...newItems, ...gallery];
        setGallery(updated);
        await saveGalleryChanges(updated);
        setMessage({ text: `${newItems.length} photos uploaded and added to gallery!`, type: "success" });
      } else {
        setMessage({ text: data.message || "Upload failed", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error uploading photos", type: "error" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const saveGalleryChanges = async (itemsToSave: GalleryItem[]) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemsToSave),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Gallery saved successfully!", type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to save gallery", type: "error" });
      }
    } catch (e) {
      setMessage({ text: "Error saving gallery", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const toggleOrientation = async (id: string) => {
    const updated = gallery.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          orientation: item.orientation === "horizontal" ? ("vertical" as const) : ("horizontal" as const),
        };
      }
      return item;
    });
    setGallery(updated);
    await saveGalleryChanges(updated);
  };

  const updateItemAlt = (id: string, alt: string) => {
    const updated = gallery.map((item) => (item.id === id ? { ...item, alt } : item));
    setGallery(updated);
  };

  const updateItemCategory = (id: string, category: string) => {
    const updated = gallery.map((item) => (item.id === id ? { ...item, category } : item));
    setGallery(updated);
  };

  const removeItem = async (id: string) => {
    const updated = gallery.filter((item) => item.id !== id);
    setGallery(updated);
    await saveGalleryChanges(updated);
  };

  const moveItem = async (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= gallery.length) return;

    const updated = [...gallery];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setGallery(updated);
    await saveGalleryChanges(updated);
  };

  return (
    <Column maxWidth="l" fillWidth gap="l" horizontal="center" style={{ margin: "0 auto" }}>
      {/* Header */}
      <Row fillWidth horizontal="between" vertical="center" paddingY="8">
        <Column gap="4">
          <Heading variant="display-strong-s">Gallery Manager</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Manage your curated masonry photo collection, orientations, and categories.
          </Text>
        </Column>

        <Row gap="8" vertical="center">
          <Button
            variant="secondary"
            size="m"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            prefixIcon="gallery"
          >
            {uploading ? "Uploading..." : "Upload Photos"}
          </Button>
          <Button
            variant="primary"
            size="m"
            onClick={() => saveGalleryChanges(gallery)}
            disabled={saving}
          >
            {saving ? <Spinner size="s" /> : "Save All Changes"}
          </Button>
        </Row>
      </Row>

      {message && (
        <Row
          fillWidth
          padding="12"
          radius="m"
          background="surface"
          border={message.type === "success" ? "brand-alpha-medium" : "danger-alpha-medium"}
          vertical="center"
          horizontal="between"
        >
          <Text
            variant="body-default-s"
            onBackground={message.type === "success" ? "brand-strong" : "danger-strong"}
          >
            {message.text}
          </Text>
          <Button size="s" variant="tertiary" onClick={() => setMessage(null)}>
            ✕
          </Button>
        </Row>
      )}

      {/* Batch Upload Dropzone */}
      <Column
        fillWidth
        padding="24"
        radius="l"
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
            <Spinner size="m" />
            <Text variant="body-default-m">Uploading photos to Vercel Blob...</Text>
          </Row>
        ) : (
          <>
            <Icon name="gallery" onBackground="brand-medium" size="l" />
            <Heading variant="heading-strong-s">Drag & Drop or Click to Upload Multiple Photos</Heading>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Uploaded images are stored directly in your Vercel storage and displayed in the /gallery grid.
            </Text>
          </>
        )}
      </Column>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleUploadFiles(e.target.files)}
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />

      {/* Gallery Photos Grid */}
      {loading ? (
        <Column fillWidth horizontal="center" padding="48" gap="16">
          <Spinner size="m" />
          <Text variant="body-default-s" onBackground="neutral-weak">
            Loading gallery...
          </Text>
        </Column>
      ) : gallery.length === 0 ? (
        <Column
          fillWidth
          padding="48"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
          horizontal="center"
          align="center"
        >
          <Text variant="heading-strong-s">Gallery is empty</Text>
        </Column>
      ) : (
        <Column fillWidth gap="m">
          <Row horizontal="between" vertical="center">
            <Text variant="heading-strong-s">Photos ({gallery.length})</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Tip: Click orientation button to toggle between Horizontal (16:9) and Vertical (3:4)
            </Text>
          </Row>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
              width: "100%",
            }}
          >
            {gallery.map((item, idx) => (
              <Column
                key={item.id || idx}
                radius="m"
                overflow="hidden"
                background="surface"
                border="neutral-alpha-weak"
                style={{ position: "relative" }}
              >
                {/* Photo Preview */}
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "#0d0d0d",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  {/* Orientation Badge & Number */}
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        fontSize: "11px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                      }}
                    >
                      #{idx + 1}
                    </span>
                    <span
                      style={{
                        background: item.orientation === "horizontal" ? "rgba(0,180,216,0.8)" : "rgba(247,127,0,0.8)",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.orientation === "horizontal" ? "16:9 Wide" : "3:4 Tall"}
                    </span>
                  </div>
                </div>

                {/* Metadata controls */}
                <Column padding="12" gap="8">
                  <Input
                    id={`alt-${item.id}`}
                    label="Caption / Alt Text"
                    value={item.alt}
                    onChange={(e) => updateItemAlt(item.id, e.target.value)}
                    placeholder="Describe photo..."
                  />

                  <Row gap="8" vertical="center">
                    <Button
                      size="s"
                      variant="secondary"
                      onClick={() => toggleOrientation(item.id)}
                      fillWidth
                    >
                      ⟲ {item.orientation === "horizontal" ? "Make Vertical (3:4)" : "Make Horizontal (16:9)"}
                    </Button>
                  </Row>

                  <Row horizontal="between" vertical="center" paddingTop="4">
                    <Row gap="4">
                      <Button
                        size="s"
                        variant="tertiary"
                        disabled={idx === 0}
                        onClick={() => moveItem(idx, "up")}
                      >
                        ←
                      </Button>
                      <Button
                        size="s"
                        variant="tertiary"
                        disabled={idx === gallery.length - 1}
                        onClick={() => moveItem(idx, "down")}
                      >
                        →
                      </Button>
                    </Row>

                    <Button size="s" variant="danger" onClick={() => removeItem(item.id)}>
                      Remove
                    </Button>
                  </Row>
                </Column>
              </Column>
            ))}
          </div>
        </Column>
      )}
    </Column>
  );
}
