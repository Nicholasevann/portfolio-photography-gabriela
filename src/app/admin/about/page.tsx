"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Column,
  Heading,
  Icon,
  Input,
  Line,
  Row,
  Text,
  Textarea,
  Spinner,
} from "@once-ui-system/core";
import { AboutData, PersonData, ExperienceItem } from "@/types/portfolio";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [person, setPerson] = useState<PersonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchAboutData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/about");
      const json = await res.json();
      if (json.success) {
        setAbout(json.data.about);
        setPerson(json.data.person);
      }
    } catch (err) {
      console.error("Failed to load about data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about || !person) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ about, person }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "About profile saved successfully!", type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to save about data", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Server error while saving", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // Experience management helpers
  const handleAddExperience = () => {
    if (!about) return;
    const newExp: ExperienceItem = {
      company: "New Boutique Resort / Client",
      timeframe: `${new Date().getFullYear()} - Present`,
      role: "Property & Architectural Photographer",
      achievements: [
        "Documented interior suites and exterior spaces.",
        "Delivered high-resolution visual marketing assets.",
      ],
      images: [
        {
          src: "/images/projects/on-the-sola/cover.jpg",
          alt: "Experience Cover",
          width: 16,
          height: 9,
        },
      ],
    };

    setAbout({
      ...about,
      photographyExperiences: [newExp, ...(about.photographyExperiences || [])],
    });
  };

  const handleUpdateExperience = (index: number, updatedExp: ExperienceItem) => {
    if (!about) return;
    const updated = [...(about.photographyExperiences || [])];
    updated[index] = updatedExp;
    setAbout({ ...about, photographyExperiences: updated });
  };

  const handleDeleteExperience = (index: number) => {
    if (!about) return;
    const updated = (about.photographyExperiences || []).filter((_, i) => i !== index);
    setAbout({ ...about, photographyExperiences: updated });
  };

  if (loading || !about || !person) {
    return (
      <Column fillWidth horizontal="center" align="center" padding="64" gap="16">
        <Spinner size="m" />
        <Text variant="body-default-s" onBackground="neutral-weak">
          Loading about profile...
        </Text>
      </Column>
    );
  }

  return (
    <Column maxWidth="l" fillWidth gap="l" horizontal="center" style={{ margin: "0 auto" }}>
      {/* Header */}
      <Row fillWidth horizontal="between" vertical="center" paddingY="8">
        <Column gap="4">
          <Heading variant="display-strong-s">About & Bio Manager</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Edit your introduction, contact information, avatar, and photography timeline experiences.
          </Text>
        </Column>

        <Button variant="primary" size="m" onClick={handleSave} disabled={saving}>
          {saving ? <Spinner size="s" /> : "Save Changes"}
        </Button>
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

      <form onSubmit={handleSave} style={{ width: "100%" }}>
        <Column fillWidth gap="xl">
          {/* Personal Info Card */}
          <Column
            fillWidth
            padding="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            gap="l"
          >
            <Heading variant="heading-strong-m">Personal & Contact Details</Heading>

            <Row fillWidth gap="m" s={{ direction: "column" }}>
              <Column flex={1}>
                <Input
                  id="person-name"
                  label="Full Name"
                  value={person.name}
                  onChange={(e) =>
                    setPerson({
                      ...person,
                      name: e.target.value,
                      firstName: e.target.value.split(" ")[0] || "",
                      lastName: e.target.value.split(" ").slice(1).join(" ") || "",
                    })
                  }
                />
              </Column>
              <Column flex={1}>
                <Input
                  id="person-role"
                  label="Professional Role"
                  value={person.role}
                  onChange={(e) => setPerson({ ...person, role: e.target.value })}
                  placeholder="e.g. Architectural Photographer & Developer"
                />
              </Column>
            </Row>

            <Row fillWidth gap="m" s={{ direction: "column" }}>
              <Column flex={1}>
                <Input
                  id="person-email"
                  label="Contact Email"
                  value={person.email}
                  onChange={(e) => setPerson({ ...person, email: e.target.value })}
                />
              </Column>
              <Column flex={1}>
                <Input
                  id="person-location"
                  label="Time Zone / Location Identifier"
                  value={person.location}
                  onChange={(e) => setPerson({ ...person, location: e.target.value })}
                  placeholder="e.g. Asia/Jakarta"
                />
              </Column>
            </Row>

            {/* Avatar Uploader */}
            <ImageUploader
              label="Avatar / Profile Photo"
              value={person.avatar}
              onChange={(url) => setPerson({ ...person, avatar: url })}
            />
          </Column>

          {/* Bio & Intro Card */}
          <Column
            fillWidth
            padding="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            gap="l"
          >
            <Heading variant="heading-strong-m">Introduction & Bio</Heading>

            <Input
              id="about-headline"
              label="Section Headline"
              value={about.headline || "Introduction"}
              onChange={(e) => setAbout({ ...about, headline: e.target.value })}
            />

            <Textarea
              id="about-intro"
              label="Introduction Text (Shown prominently on /about)"
              value={about.introText}
              onChange={(e) => setAbout({ ...about, introText: e.target.value })}
              rows={5}
            />
          </Column>

          {/* Photography Experiences Timeline Card */}
          <Column
            fillWidth
            padding="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            gap="l"
          >
            <Row horizontal="between" vertical="center">
              <Heading variant="heading-strong-m">Photography Experiences</Heading>
              <Button size="s" variant="secondary" onClick={handleAddExperience} prefixIcon="plus">
                Add Experience
              </Button>
            </Row>

            <Column fillWidth gap="l">
              {about.photographyExperiences?.map((exp, idx) => (
                <Column
                  key={idx}
                  fillWidth
                  padding="16"
                  radius="m"
                  background="page"
                  border="neutral-alpha-weak"
                  gap="m"
                >
                  <Row horizontal="between" vertical="center">
                    <Text variant="heading-strong-s">Experience #{idx + 1}</Text>
                    <Button size="s" variant="danger" onClick={() => handleDeleteExperience(idx)}>
                      Delete
                    </Button>
                  </Row>

                  <Row fillWidth gap="m" s={{ direction: "column" }}>
                    <Column flex={1}>
                      <Input
                        id={`exp-company-${idx}`}
                        label="Client / Venue / Property"
                        value={exp.company}
                        onChange={(e) =>
                          handleUpdateExperience(idx, { ...exp, company: e.target.value })
                        }
                      />
                    </Column>
                    <Column flex={1}>
                      <Input
                        id={`exp-timeframe-${idx}`}
                        label="Timeframe"
                        value={exp.timeframe}
                        onChange={(e) =>
                          handleUpdateExperience(idx, { ...exp, timeframe: e.target.value })
                        }
                        placeholder="e.g. May 2026 - Present"
                      />
                    </Column>
                    <Column flex={1}>
                      <Input
                        id={`exp-role-${idx}`}
                        label="Role / Location"
                        value={exp.role}
                        onChange={(e) =>
                          handleUpdateExperience(idx, { ...exp, role: e.target.value })
                        }
                        placeholder="e.g. Property Photographer (Bali)"
                      />
                    </Column>
                  </Row>

                  <Textarea
                    id={`exp-achievements-${idx}`}
                    label="Bullet Points (One item per line)"
                    value={exp.achievements?.join("\n") || ""}
                    onChange={(e) =>
                      handleUpdateExperience(idx, {
                        ...exp,
                        achievements: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                      })
                    }
                    rows={3}
                  />

                  <ImageUploader
                    label="Experience Preview Photo"
                    value={exp.images?.[0]?.src || ""}
                    onChange={(url) =>
                      handleUpdateExperience(idx, {
                        ...exp,
                        images: url ? [{ src: url, alt: exp.company, width: 16, height: 9 }] : [],
                      })
                    }
                  />
                </Column>
              ))}
            </Column>
          </Column>

          {/* Action save bar */}
          <Row fillWidth horizontal="end" gap="12">
            <Button variant="primary" size="m" type="submit" disabled={saving}>
              {saving ? <Spinner size="s" /> : "Save All Changes"}
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
}
