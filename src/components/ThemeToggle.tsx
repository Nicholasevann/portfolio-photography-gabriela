"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton, useTheme } from "@once-ui-system/core";

export const ThemeToggle: React.FC = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    const syncTheme = () => {
      const active = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
      setCurrentTheme(active);
    };
    syncTheme();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          syncTheme();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    const next = currentTheme === "light" ? "dark" : "light";
    try {
      setTheme(next);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("data-theme", next);
    } catch {
      // ignore
    }
    setCurrentTheme(next);
  };

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  if (!mounted) {
    return (
      <ToggleButton
        prefixIcon="dark"
        aria-label="Switch to dark mode"
      />
    );
  }

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={handleToggle}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};

