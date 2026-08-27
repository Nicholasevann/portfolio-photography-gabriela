"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Column,
  Heading,
  Input,
  Row,
  Text,
  Badge,
  Spinner,
} from "@once-ui-system/core";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your admin password");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Column
      fillWidth
      style={{ minHeight: "80vh" }}
      horizontal="center"
      align="center"
      padding="24"
      gap="l"
    >
      <Column
        maxWidth="xs"
        fillWidth
        padding="32"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
        gap="l"
        horizontal="center"
        align="center"
        style={{
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Column horizontal="center" align="center" gap="8">
          <Badge background="brand-alpha-weak" onBackground="brand-strong">
            ne.lens Portfolio
          </Badge>
          <Heading variant="heading-strong-l" align="center">
            Admin Access
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            Enter your password to manage Work, Gallery, and About content.
          </Text>
        </Column>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <Column fillWidth gap="m">
            <Input
              id="admin-password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password..."
              autoFocus
            />

            {error && (
              <Text variant="body-default-xs" onBackground="danger-strong">
                {error}
              </Text>
            )}

            <Button
              id="login-submit-btn"
              fillWidth
              variant="primary"
              size="m"
              weight="default"
              disabled={loading}
              type="submit"
            >
              {loading ? <Spinner size="s" /> : "Sign In to Admin"}
            </Button>
          </Column>
        </form>

        <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
          Default password is configured in your environment as <code style={{ color: "var(--brand-strong)" }}>ADMIN_PASSWORD</code> or <code style={{ color: "var(--brand-strong)" }}>PAGE_ACCESS_PASSWORD</code>.
        </Text>
      </Column>
    </Column>
  );
}
