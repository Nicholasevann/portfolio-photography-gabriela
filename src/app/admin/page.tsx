"use client";

import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  Line,
  Row,
  SmartLink,
  Text,
  Spinner,
} from "@once-ui-system/core";
import { PortfolioData } from "@/types/portfolio";

export default function AdminDashboardPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isVercelBlob, setIsVercelBlob] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/data");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
          setIsVercelBlob(json.isVercelBlobConfigured);
        }
      } catch (err) {
        console.error("Failed to load admin overview data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <Column fillWidth horizontal="center" align="center" padding="64" gap="16">
        <Spinner size="m" />
        <Text variant="body-default-s" onBackground="neutral-weak">
          Loading portfolio overview...
        </Text>
      </Column>
    );
  }

  const projectCount = data?.projects?.length || 0;
  const galleryCount = data?.gallery?.length || 0;
  const expCount = (data?.about?.photographyExperiences?.length || 0) + (data?.about?.engineeringExperiences?.length || 0);

  return (
    <Column maxWidth="l" fillWidth gap="xl" horizontal="center" style={{ margin: "0 auto" }}>
      {/* Header Banner */}
      <Row
        fillWidth
        horizontal="between"
        vertical="center"
        padding="24"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
        s={{ direction: "column", align: "start", gap: "16" }}
      >
        <Column gap="4">
          <Row gap="8" vertical="center">
            <Heading variant="display-strong-s">CMS Dashboard</Heading>
            {isVercelBlob ? (
              <Badge background="brand-alpha-weak" onBackground="brand-strong">
                ● Vercel Blob Connected
              </Badge>
            ) : (
              <Badge background="accent-alpha-weak" onBackground="accent-strong">
                ● Local Dev Storage Mode
              </Badge>
            )}
          </Row>
          <Text variant="body-default-m" onBackground="neutral-weak">
            Manage your photography projects, gallery showcase, and about information.
          </Text>
        </Column>

        <Row gap="8" vertical="center">
          <Button variant="primary" size="m" href="/admin/work?action=new" prefixIcon="plus">
            New Project
          </Button>
          <Button variant="secondary" size="m" href="/admin/gallery" prefixIcon="gallery">
            Upload Photos
          </Button>
        </Row>
      </Row>

      {/* Stats Overview */}
      <Row fillWidth gap="m" s={{ direction: "column" }}>
        <Column
          flex={1}
          padding="20"
          radius="m"
          background="surface"
          border="neutral-alpha-weak"
          gap="8"
        >
          <Row horizontal="between" vertical="center">
            <Text variant="label-default-s" onBackground="neutral-weak">
              WORK PROJECTS
            </Text>
            <Icon name="grid" onBackground="brand-medium" />
          </Row>
          <Heading variant="display-strong-m">{projectCount}</Heading>
          <SmartLink href="/admin/work" suffixIcon="arrowRight">
            <Text variant="body-default-xs">Manage Projects</Text>
          </SmartLink>
        </Column>

        <Column
          flex={1}
          padding="20"
          radius="m"
          background="surface"
          border="neutral-alpha-weak"
          gap="8"
        >
          <Row horizontal="between" vertical="center">
            <Text variant="label-default-s" onBackground="neutral-weak">
              GALLERY PHOTOS
            </Text>
            <Icon name="gallery" onBackground="brand-medium" />
          </Row>
          <Heading variant="display-strong-m">{galleryCount}</Heading>
          <SmartLink href="/admin/gallery" suffixIcon="arrowRight">
            <Text variant="body-default-xs">Manage Gallery Grid</Text>
          </SmartLink>
        </Column>

        <Column
          flex={1}
          padding="20"
          radius="m"
          background="surface"
          border="neutral-alpha-weak"
          gap="8"
        >
          <Row horizontal="between" vertical="center">
            <Text variant="label-default-s" onBackground="neutral-weak">
              EXPERIENCES & BIO
            </Text>
            <Icon name="person" onBackground="brand-medium" />
          </Row>
          <Heading variant="display-strong-m">{expCount}</Heading>
          <SmartLink href="/admin/about" suffixIcon="arrowRight">
            <Text variant="body-default-xs">Edit About Page</Text>
          </SmartLink>
        </Column>
      </Row>

      {/* Quick Action Navigation Grid */}
      <Column fillWidth gap="m">
        <Heading variant="heading-strong-m">Content Management</Heading>

        <Row fillWidth gap="m" s={{ direction: "column" }}>
          {/* Work Card */}
          <Column
            flex={1}
            padding="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            gap="12"
            style={{ transition: "transform 0.2s ease" }}
          >
            <Row gap="12" vertical="center">
              <Icon name="grid" onBackground="brand-strong" size="m" />
              <Heading variant="heading-strong-s">Work & Projects</Heading>
            </Row>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Add new photography assignments, upload cover shots & galleries, and customize project descriptions.
            </Text>
            <Line fillWidth background="neutral-alpha-weak" />
            <Row horizontal="between" vertical="center">
              <Button size="s" variant="secondary" href="/admin/work">
                View All Projects
              </Button>
              <Button size="s" variant="primary" href="/admin/work?action=new">
                + Create
              </Button>
            </Row>
          </Column>

          {/* Gallery Card */}
          <Column
            flex={1}
            padding="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            gap="12"
          >
            <Row gap="12" vertical="center">
              <Icon name="gallery" onBackground="brand-strong" size="m" />
              <Heading variant="heading-strong-s">Photo Gallery</Heading>
            </Row>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Upload single or bulk photos, toggle horizontal (16:9) vs vertical (3:4) orientation, and reorder grid.
            </Text>
            <Line fillWidth background="neutral-alpha-weak" />
            <Row horizontal="between" vertical="center">
              <Button size="s" variant="secondary" href="/admin/gallery">
                Open Gallery Manager
              </Button>
            </Row>
          </Column>

          {/* About Card */}
          <Column
            flex={1}
            padding="24"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            gap="12"
          >
            <Row gap="12" vertical="center">
              <Icon name="person" onBackground="brand-strong" size="m" />
              <Heading variant="heading-strong-s">About & Profile</Heading>
            </Row>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Update biography text, photography experience timeline, skills, and avatar image.
            </Text>
            <Line fillWidth background="neutral-alpha-weak" />
            <Row horizontal="between" vertical="center">
              <Button size="s" variant="secondary" href="/admin/about">
                Edit Profile Info
              </Button>
            </Row>
          </Column>
        </Row>
      </Column>

      {/* Storage & Vercel Format Info Banner */}
      <Column
        fillWidth
        padding="20"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
        gap="8"
      >
        <Row gap="8" vertical="center">
          <Icon name="info" onBackground="brand-medium" />
          <Text variant="heading-strong-s">Vercel Storage Architecture</Text>
        </Row>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Your photography images and portfolio data are managed in Vercel format with high-performance edge caching. All changes made in this dashboard automatically trigger instant live site cache revalidation.
        </Text>
      </Column>
    </Column>
  );
}
