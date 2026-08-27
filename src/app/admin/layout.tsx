"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Column,
  Flex,
  Heading,
  Row,
  SmartLink,
  Text,
  ToggleButton,
  Line,
  Spinner,
  Badge,
} from "@once-ui-system/core";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    async function checkAuth() {
      if (isLoginPage) {
        setIsAuthenticated(true);
        return;
      }

      try {
        const res = await fetch("/api/check-auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/admin/login");
        }
      } catch (err) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setLoggingOut(false);
    }
  };

  if (isAuthenticated === null && !isLoginPage) {
    return (
      <Column fillWidth fillHeight horizontal="center" align="center" padding="64" gap="16">
        <Spinner size="m" />
        <Text variant="body-default-s" onBackground="neutral-weak">
          Verifying admin session...
        </Text>
      </Column>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <Column fillWidth style={{ minHeight: "100vh" }} gap="l" paddingBottom="64">
      {/* Admin Top Navigation */}
      <Row
        fillWidth
        horizontal="between"
        vertical="center"
        padding="12"
        paddingX="24"
        background="surface"
        borderBottom="neutral-alpha-weak"
        radius="l"
        gap="16"
        style={{
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: "12px",
          zIndex: 50,
        }}
      >
        <Row vertical="center" gap="12">
          <SmartLink href="/admin" style={{ textDecoration: "none" }}>
            <Row vertical="center" gap="8">
              <Heading variant="heading-strong-s">ne.lens</Heading>
              <Badge background="brand-alpha-weak" onBackground="brand-strong">
                CMS
              </Badge>
            </Row>
          </SmartLink>
        </Row>

        {/* Navigation Tabs */}
        <Row gap="4" vertical="center" background="page" padding="4" radius="full" border="neutral-alpha-weak">
          <ToggleButton
            prefixIcon="home"
            href="/admin"
            label="Overview"
            selected={pathname === "/admin"}
          />
          <ToggleButton
            prefixIcon="grid"
            href="/admin/work"
            label="Work"
            selected={pathname.startsWith("/admin/work")}
          />
          <ToggleButton
            prefixIcon="gallery"
            href="/admin/gallery"
            label="Gallery"
            selected={pathname.startsWith("/admin/gallery")}
          />
          <ToggleButton
            prefixIcon="person"
            href="/admin/about"
            label="About"
            selected={pathname.startsWith("/admin/about")}
          />
          <ToggleButton
            prefixIcon="settings"
            href="/admin/settings"
            label="Settings"
            selected={pathname.startsWith("/admin/settings")}
          />
        </Row>

        {/* Action buttons */}
        <Row gap="8" vertical="center">
          <Button
            size="s"
            variant="secondary"
            href="/"
            target="_blank"
          >
            Live Site ↗
          </Button>
          <Button
            size="s"
            variant="tertiary"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            Logout
          </Button>
        </Row>
      </Row>

      {/* Main Content Area */}
      <Column fillWidth paddingX="12">
        {children}
      </Column>
    </Column>
  );
}
