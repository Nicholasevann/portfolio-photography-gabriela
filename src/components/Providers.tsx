"use client";

import { useEffect } from "react";
import {
  BorderStyle,
  ChartMode,
  ChartVariant,
  DataThemeProvider,
  IconProvider,
  LayoutProvider,
  NeutralColor,
  ScalingSize,
  Schemes,
  SolidStyle,
  SolidType,
  SurfaceStyle,
  ThemeProvider,
  ToastProvider,
  TransitionStyle,
} from "@once-ui-system/core";
import { style, dataStyle } from "../resources";
import { iconLibrary } from "../resources/icons";

import { LightboxProvider } from "@/components/common/ImageLightbox";

// Suppress key prop warnings in console
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Each child in a list should have a unique \"key\" prop") ||
        args[0].includes("warning-keys") ||
        args[0].includes("unique \"key\" prop"))
    ) {
      return;
    }
    originalError.apply(console, args);
  };

  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Each child in a list should have a unique \"key\" prop") ||
        args[0].includes("warning-keys") ||
        args[0].includes("unique \"key\" prop"))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Client-side safety filter for key warnings
    const handleError = (event: ErrorEvent) => {
      if (
        event.message &&
        (event.message.includes("Each child in a list should have a unique \"key\" prop") ||
          event.message.includes("warning-keys"))
      ) {
        event.preventDefault();
      }
    };

    // Global image protection: prevent right click saving & dragging of photos
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "PICTURE" ||
          target.tagName === "VIDEO" ||
          target.closest("figure") ||
          target.closest("[data-protected-image]") ||
          target.style.backgroundImage)
      ) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "PICTURE" ||
          target.tagName === "VIDEO" ||
          target.closest("figure"))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("error", handleError);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      window.removeEventListener("error", handleError);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <LayoutProvider>
      <ThemeProvider
        brand={style.brand as Schemes}
        accent={style.accent as Schemes}
        neutral={style.neutral as NeutralColor}
        solid={style.solid as SolidType}
        solidStyle={style.solidStyle as SolidStyle}
        border={style.border as BorderStyle}
        surface={style.surface as SurfaceStyle}
        transition={style.transition as TransitionStyle}
        scaling={style.scaling as ScalingSize}
      >
        <DataThemeProvider
          variant={dataStyle.variant as ChartVariant}
          mode={dataStyle.mode as ChartMode}
          height={dataStyle.height}
          axis={{
            stroke: dataStyle.axis.stroke,
          }}
          tick={{
            fill: dataStyle.tick.fill,
            fontSize: dataStyle.tick.fontSize,
            line: dataStyle.tick.line,
          }}
        >
          <ToastProvider>
            <IconProvider icons={iconLibrary}>
              <LightboxProvider>{children}</LightboxProvider>
            </IconProvider>
          </ToastProvider>
        </DataThemeProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
