"use client";

import { useEffect, useState, useRef } from "react";
import {
  Badge,
  Button,
  Column,
  Heading,
  Icon,
  Line,
  Row,
  Text,
  Spinner,
} from "@once-ui-system/core";
import { isVercelBlobConfigured } from "@/lib/blob-storage";

interface MediaFile {
  url: string;
  pathname: string;
  size?: number;
  uploadedAt?: string;
}

export default function AdminSettingsPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [isVercelBlob, setIsVercelBlob] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const fileImportRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch(`/api/admin/media?_t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const json = await res.json();
      if (json.success) {
        setMedia(json.data);
        setIsVercelBlob(json.isVercelBlob);
      }
    } catch (err) {
      console.error("Failed to load media", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDeleteMedia = async (url: string) => {
    if (!confirm("Are you sure you want to delete this media file?")) return;

    try {
      const res = await fetch(`/api/admin/media?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage({ text: "Media deleted", type: "success" });
        fetchMedia();
      } else {
        setActionMessage({ text: data.message || "Failed to delete", type: "error" });
      }
    } catch (e) {
      setActionMessage({ text: "Error deleting media", type: "error" });
    }
  };

  const handleExportBackup = () => {
    window.location.href = "/api/admin/backup";
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "import", data: jsonData }),
      });

      const result = await res.json();
      if (result.success) {
        setActionMessage({ text: "Portfolio data restored successfully!", type: "success" });
      } else {
        setActionMessage({ text: result.message || "Import failed", type: "error" });
      }
    } catch (err) {
      setActionMessage({ text: "Invalid backup JSON file", type: "error" });
    } finally {
      if (fileImportRef.current) fileImportRef.current.value = "";
    }
  };

  const handleResetDefaults = async () => {
    if (
      !confirm(
        "Are you sure you want to reset all portfolio data to default template seed? All customized work, gallery, and about entries will be restored to initial defaults."
      )
    ) {
      return;
    }

    try {
      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });

      const result = await res.json();
      if (result.success) {
        setActionMessage({ text: "Portfolio reset to defaults successfully!", type: "success" });
      }
    } catch (err) {
      setActionMessage({ text: "Reset failed", type: "error" });
    }
  };

  return (
    <Column maxWidth="l" fillWidth gap="xl" horizontal="center" style={{ margin: "0 auto" }}>
      {/* Header */}
      <Row fillWidth horizontal="between" vertical="center" paddingY="8">
        <Column gap="4">
          <Heading variant="display-strong-s">Settings & Media Storage</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Inspect Vercel Blob storage, browse media files, and manage data backups.
          </Text>
        </Column>
      </Row>

      {actionMessage && (
        <Row
          fillWidth
          padding="12"
          radius="m"
          background="surface"
          border={actionMessage.type === "success" ? "brand-alpha-medium" : "danger-alpha-medium"}
          vertical="center"
          horizontal="between"
        >
          <Text
            variant="body-default-s"
            onBackground={actionMessage.type === "success" ? "brand-strong" : "danger-strong"}
          >
            {actionMessage.text}
          </Text>
          <Button size="s" variant="tertiary" onClick={() => setActionMessage(null)}>
            ✕
          </Button>
        </Row>
      )}

      {/* Vercel Blob Storage Status Card */}
      <Column
        fillWidth
        padding="24"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
        gap="m"
      >
        <Row horizontal="between" vertical="center">
          <Row gap="12" vertical="center">
            <Icon name="globe" onBackground="brand-strong" size="m" />
            <Heading variant="heading-strong-m">Storage & Git Sync Architecture</Heading>
          </Row>
          <Badge background="brand-alpha-weak" onBackground="brand-strong">
            Local / Git-Backed
          </Badge>
        </Row>

        <Text variant="body-default-s" onBackground="neutral-weak">
          Your portfolio uses clean local file storage (Git-backed CMS). Uploaded images are stored in <code>/public/uploads</code> and portfolio content is stored in <code>src/data/portfolio-data.json</code>.
        </Text>

        <Column
          fillWidth
          padding="16"
          radius="m"
          background="page"
          border="neutral-alpha-weak"
          gap="8"
        >
          <Text variant="label-default-s">How to publish your changes:</Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            1. Make any edits, add projects, or upload photos through this Admin Panel.
            <br />
            2. In your terminal, run: <code>git add . && git commit -m "Update portfolio content" && git push</code>
            <br />
            3. Vercel will automatically build and deploy your updated portfolio immediately without any external storage quotas or fees.
          </Text>
        </Column>
      </Column>

      {/* Backup & Restore Card */}
      <Column
        fillWidth
        padding="24"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
        gap="m"
      >
        <Heading variant="heading-strong-m">Data Backup & Migration</Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Export full JSON backups of your projects, gallery items, and about profile, or import a previously saved backup file.
        </Text>

        <Row gap="12" vertical="center" s={{ direction: "column", align: "start" }}>
          <Button variant="secondary" size="m" onClick={handleExportBackup} prefixIcon="arrowDown">
            Download JSON Backup
          </Button>

          <Button
            variant="secondary"
            size="m"
            onClick={() => fileImportRef.current?.click()}
            prefixIcon="arrowUp"
          >
            Import JSON Backup
          </Button>

          <Button variant="danger" size="m" onClick={handleResetDefaults}>
            Reset to Default Seed
          </Button>

          <input
            type="file"
            ref={fileImportRef}
            onChange={handleImportBackup}
            accept="application/json"
            style={{ display: "none" }}
          />
        </Row>
      </Column>

      {/* Media Library Viewer */}
      <Column
        fillWidth
        padding="24"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
        gap="m"
      >
        <Row horizontal="between" vertical="center">
          <Heading variant="heading-strong-m">Media Library ({media.length} files)</Heading>
          <Button size="s" variant="secondary" onClick={fetchMedia}>
            Refresh
          </Button>
        </Row>

        {loadingMedia ? (
          <Column fillWidth horizontal="center" padding="32" gap="16">
            <Spinner size="m" />
            <Text variant="body-default-s" onBackground="neutral-weak">
              Scanning uploaded media...
            </Text>
          </Column>
        ) : media.length === 0 ? (
          <Column fillWidth horizontal="center" padding="32">
            <Text variant="body-default-s" onBackground="neutral-weak">
              No uploaded media files found. Upload images through Work or Gallery managers.
            </Text>
          </Column>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "12px",
              width: "100%",
            }}
          >
            {media.map((file, idx) => (
              <Column
                key={file.url || idx}
                radius="m"
                overflow="hidden"
                border="neutral-alpha-weak"
                background="page"
                style={{ position: "relative" }}
              >
                <div style={{ height: "130px", overflow: "hidden", backgroundColor: "#111" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={file.url}
                    alt="Media file"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <Column padding="8" gap="4">
                  <Text
                    variant="body-default-xs"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {file.pathname || file.url.split("/").pop()}
                  </Text>
                  <Row horizontal="between" vertical="center" paddingTop="4">
                    <Button
                      size="s"
                      variant="secondary"
                      onClick={() => handleCopy(file.url)}
                    >
                      {copiedUrl === file.url ? "Copied!" : "Copy Link"}
                    </Button>
                    <Button
                      size="s"
                      variant="danger"
                      onClick={() => handleDeleteMedia(file.url)}
                    >
                      ✕
                    </Button>
                  </Row>
                </Column>
              </Column>
            ))}
          </div>
        )}
      </Column>
    </Column>
  );
}
