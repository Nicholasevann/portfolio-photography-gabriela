"use client";

import React, { useEffect, useRef, useState } from "react";
import { RevealFx } from "@once-ui-system/core";

interface ScrollRevealProps extends React.ComponentProps<typeof RevealFx> {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  once = true,
  delay = 0,
  translateY = "12",
  fillWidth = true,
  ...rest
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return (
    <div ref={containerRef} style={{ width: fillWidth ? "100%" : "auto" }}>
      <RevealFx
        trigger={isInView}
        delay={delay}
        translateY={translateY}
        fillWidth={fillWidth}
        {...rest}
      >
        {children}
      </RevealFx>
    </div>
  );
};

export default ScrollReveal;
