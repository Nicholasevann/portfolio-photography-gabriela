"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Badge,
  Button,
  Column,
  Heading,
  Icon,
  Input,
  Line,
  Row,
  SmartLink,
  Text,
  Textarea,
  Select,
  Spinner,
} from "@once-ui-system/core";
import { ProjectItem } from "@/types/portfolio";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MultiImageUploader } from "@/components/admin/MultiImageUploader";

export default function AdminWorkPage() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const json = await res.json();
      if (json.success) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      handleCreateNew();
    }
  }, [searchParams]);

  const handleCreateNew = () => {
    setIsNew(true);
    setEditingProject({
      slug: "",
      title: "",
      category: "Property",
      location: "Bali, Indonesia",
      year: new Date().getFullYear().toString(),
      summary: "",
      description: "",
      coverImage: "/images/hero/hero-cover.jpg",
      images: ["/images/hero/hero-cover.jpg"],
      featured: true,
      publishedAt: new Date().toISOString().slice(0, 10),
      content: `## Overview\n\nDetailed narrative about this photography assignment.\n\n## Concept & Lighting\n\nHighlighting spatial geometry, ambient daylight, and material finishes.`,
    });
    setMessage(null);
  };

  const handleEdit = (project: ProjectItem) => {
    setIsNew(false);
    setEditingProject({ ...project, images: project.images || [project.coverImage] });
    setMessage(null);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete the project "${slug}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Project deleted successfully", type: "success" });
        fetchProjects();
        if (editingProject?.slug === slug) {
          setEditingProject(null);
        }
      } else {
        setMessage({ text: data.message || "Failed to delete", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Error deleting project", type: "error" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title || !editingProject.slug) {
      setMessage({ text: "Title and Slug are required", type: "error" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Project saved successfully!", type: "success" });
        setEditingProject(null);
        setIsNew(false);
        fetchProjects();
      } else {
        setMessage({ text: data.message || "Failed to save project", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Server error saving project", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleTitleChange = (val: string) => {
    if (!editingProject) return;
    const updated = { ...editingProject, title: val };
    if (isNew) {
      // Auto-generate slug from title
      updated.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }
    setEditingProject(updated);
  };

  return (
    <Column maxWidth="l" fillWidth gap="l" horizontal="center" style={{ margin: "0 auto" }}>
      {/* Header */}
      <Row fillWidth horizontal="between" vertical="center" paddingY="8">
        <Column gap="4">
          <Heading variant="display-strong-s">Work & Projects Manager</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Create, edit, and organize photography project case studies.
          </Text>
        </Column>

        {!editingProject && (
          <Button variant="primary" size="m" onClick={handleCreateNew} prefixIcon="plus">
            Add New Project
          </Button>
        )}
      </Row>

      {message && (
        <Row
          fillWidth
          padding="12"
          radius="m"
          background={message.type === "success" ? "surface" : "surface"}
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

      {/* Project Editor Form */}
      {editingProject ? (
        <Column
          fillWidth
          padding="24"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
          gap="l"
        >
          <Row horizontal="between" vertical="center">
            <Heading variant="heading-strong-m">
              {isNew ? "Create New Project" : `Edit Project: ${editingProject.title}`}
            </Heading>
            <Button size="s" variant="tertiary" onClick={() => setEditingProject(null)}>
              Cancel
            </Button>
          </Row>

          <form onSubmit={handleSave}>
            <Column fillWidth gap="l">
              <Row fillWidth gap="m" s={{ direction: "column" }}>
                <Column flex={2}>
                  <Input
                    id="project-title"
                    label="Project Title"
                    value={editingProject.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. On The Sola, The Huthut..."
                    required
                  />
                </Column>
                <Column flex={1}>
                  <Input
                    id="project-slug"
                    label="URL Slug (/work/[slug])"
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    placeholder="e.g. on-the-sola"
                    required
                  />
                </Column>
              </Row>

              <Row fillWidth gap="m" s={{ direction: "column" }}>
                <Column flex={1}>
                  <Input
                    id="project-category"
                    label="Category (e.g. Property, Hospitality, Travel)"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                  />
                </Column>
                <Column flex={1}>
                  <Input
                    id="project-location"
                    label="Location"
                    value={editingProject.location}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, location: e.target.value })
                    }
                    placeholder="e.g. Bali, Indonesia"
                  />
                </Column>
                <Column flex={1}>
                  <Input
                    id="project-year"
                    label="Year / Timeframe"
                    value={editingProject.year || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, year: e.target.value })
                    }
                    placeholder="e.g. 2024"
                  />
                </Column>
                <Column flex={1}>
                  <Input
                    id="project-publishedAt"
                    type="date"
                    label="Published Date"
                    value={editingProject.publishedAt}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, publishedAt: e.target.value })
                    }
                  />
                </Column>
              </Row>

              <Textarea
                id="project-summary"
                label="Card Summary / Subtitle"
                value={editingProject.summary}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    summary: e.target.value,
                    description: e.target.value,
                  })
                }
                placeholder="Brief 1-2 sentence description shown in portfolio cards..."
                rows={3}
              />

              {/* Cover Image Upload */}
              <ImageUploader
                label="Cover Image (Featured 16:9 Shot)"
                value={editingProject.coverImage}
                onChange={(url) => {
                  const images = editingProject.images || [];
                  const newImages = images.length === 0 ? [url] : [url, ...images.slice(1)];
                  setEditingProject({
                    ...editingProject,
                    coverImage: url,
                    images: newImages,
                  });
                }}
              />

              {/* Project Gallery Images */}
              <MultiImageUploader
                label="Project Detail Gallery Images"
                images={editingProject.images || []}
                onChange={(imgs) =>
                  setEditingProject({
                    ...editingProject,
                    images: imgs,
                    coverImage: imgs[0] || editingProject.coverImage,
                  })
                }
              />

              {/* Narrative Content (Markdown) */}
              <Column fillWidth gap="8">
                <Text variant="label-default-m">Project Narrative & Details (Markdown)</Text>
                <Textarea
                  id="project-content"
                  value={editingProject.content || ""}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, content: e.target.value })
                  }
                  placeholder="## Overview&#10;&#10;Write project details here..."
                  rows={8}
                />
              </Column>

              <Row fillWidth horizontal="end" gap="12" paddingTop="12">
                <Button
                  variant="tertiary"
                  size="m"
                  onClick={() => setEditingProject(null)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="m" type="submit" disabled={saving}>
                  {saving ? <Spinner size="s" /> : "Save Project"}
                </Button>
              </Row>
            </Column>
          </form>
        </Column>
      ) : (
        /* Projects List */
        <Column fillWidth gap="m">
          {loading ? (
            <Column fillWidth horizontal="center" padding="48" gap="16">
              <Spinner size="m" />
              <Text variant="body-default-s" onBackground="neutral-weak">
                Loading projects...
              </Text>
            </Column>
          ) : projects.length === 0 ? (
            <Column
              fillWidth
              padding="48"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
              horizontal="center"
              align="center"
              gap="16"
            >
              <Text variant="heading-strong-s">No projects found</Text>
              <Button variant="primary" size="m" onClick={handleCreateNew}>
                Create Your First Project
              </Button>
            </Column>
          ) : (
            <Column fillWidth gap="12">
              {projects.map((p, idx) => (
                <Row
                  key={p.slug}
                  fillWidth
                  padding="16"
                  radius="m"
                  background="surface"
                  border="neutral-alpha-weak"
                  horizontal="between"
                  vertical="center"
                  gap="16"
                  s={{ direction: "column", align: "start" }}
                >
                  <Row gap="16" vertical="center" flex={1} style={{ overflow: "hidden" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "56px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        flexShrink: 0,
                        backgroundColor: "#111",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <Column gap="4" style={{ overflow: "hidden" }}>
                      <Row gap="8" vertical="center">
                        <Heading variant="heading-strong-s">{p.title}</Heading>
                        <Badge background="brand-alpha-weak" onBackground="brand-strong">
                          {p.category}
                        </Badge>
                      </Row>
                      <Text
                        variant="body-default-xs"
                        onBackground="neutral-weak"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        /{p.slug} · {p.location} · {p.images?.length || 0} photos
                      </Text>
                    </Column>
                  </Row>

                  <Row gap="8" vertical="center">
                    <Button
                      size="s"
                      variant="tertiary"
                      href={`/work/${p.slug}`}
                      target="_blank"
                    >
                      Preview ↗
                    </Button>
                    <Button size="s" variant="secondary" onClick={() => handleEdit(p)}>
                      Edit
                    </Button>
                    <Button size="s" variant="danger" onClick={() => handleDelete(p.slug)}>
                      Delete
                    </Button>
                  </Row>
                </Row>
              ))}
            </Column>
          )}
        </Column>
      )}
    </Column>
  );
}
