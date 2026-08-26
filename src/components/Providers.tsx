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
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
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
            <IconProvider icons={iconLibrary}>{children}</IconProvider>
          </ToastProvider>
        </DataThemeProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
