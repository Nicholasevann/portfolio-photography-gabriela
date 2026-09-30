"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Fade, Flex, Line, Row, SmartLink, Text, ToggleButton } from "@once-ui-system/core";
import { routes, display, person as staticPerson, about, blog, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

function parseLocationAndTimezone(locationInput: string): { timeZone: string; label: string } {
  const loc = (locationInput || "Asia/Jakarta").trim();

  let timeZone = "Asia/Jakarta";
  let label = "Bali";

  const lower = loc.toLowerCase();
  if (lower.includes("bali") || lower.includes("makassar") || lower.includes("denpasar") || lower.includes("wita")) {
    timeZone = "Asia/Makassar";
    label = "Bali";
  } else if (lower.includes("jakarta") || lower.includes("bandung") || lower.includes("wib") || lower.includes("surabaya")) {
    timeZone = "Asia/Jakarta";
    label = "Jakarta";
  } else if (lower.includes("london") || lower.includes("uk") || lower.includes("gmt")) {
    timeZone = "Europe/London";
    label = "London";
  } else if (lower.includes("tokyo") || lower.includes("japan")) {
    timeZone = "Asia/Tokyo";
    label = "Tokyo";
  } else if (lower.includes("singapore")) {
    timeZone = "Asia/Singapore";
    label = "Singapore";
  } else if (lower.includes("new york") || lower.includes("nyc") || lower.includes("est")) {
    timeZone = "America/New_York";
    label = "New York";
  } else if (lower.includes("los angeles") || lower.includes("la") || lower.includes("pst")) {
    timeZone = "America/Los_Angeles";
    label = "Los Angeles";
  } else if (loc.includes("/")) {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: loc });
      timeZone = loc;
      const city = loc.split("/")[1] || loc;
      label = city.replace(/_/g, " ");
      if (label === "Makassar") label = "Bali";
    } catch (e) {
      timeZone = "Asia/Jakarta";
      label = "Bali";
    }
  } else {
    label = loc.split(",")[0].trim();
    timeZone = "Asia/Jakarta";
  }

  return { timeZone, label };
}

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let resolvedTz = timeZone;
      try {
        Intl.DateTimeFormat(undefined, { timeZone: resolvedTz });
      } catch (e) {
        resolvedTz = "Asia/Jakarta";
      }

      const options: Intl.DateTimeFormatOptions = {
        timeZone: resolvedTz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [currentLocation, setCurrentLocation] = useState<string>(staticPerson.location || "Asia/Makassar");

  useEffect(() => {
    async function loadDynamicLocation() {
      try {
        const res = await fetch("/api/portfolio");
        const json = await res.json();
        if (json.success && json.data?.person?.location) {
          setCurrentLocation(json.data.person.location);
        }
      } catch (e) {
        // Use static fallback
      }
    }
    loadDynamicLocation();
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const { timeZone, label: locationLabel } = parseLocationAndTimezone(currentLocation);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{
          position: "fixed",
        }}
      >
        <Row paddingLeft="16" fillWidth vertical="center" textVariant="body-default-s">
          <SmartLink href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Text variant="heading-strong-s" style={{ letterSpacing: "-0.02em" }}>
              gabriela.dominiquee
            </Text>
          </SmartLink>
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              {routes["/work"] && (
                <ToggleButton
                  prefixIcon="grid"
                  href="/work"
                  label={work.label}
                  selected={pathname.startsWith("/work")}
                />
              )}
              {routes["/about"] && (
                <ToggleButton
                  prefixIcon="person"
                  href="/about"
                  label={about.label}
                  selected={pathname === "/about"}
                />
              )}
              {routes["/blog"] && (
                <ToggleButton
                  prefixIcon="book"
                  href="/blog"
                  label={blog.label}
                  selected={pathname.startsWith("/blog")}
                />
              )}
              {routes["/gallery"] && (
                <ToggleButton
                  prefixIcon="gallery"
                  href="/gallery"
                  label={gallery.label}
                  selected={pathname.startsWith("/gallery")}
                />
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="16"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="16"
          >
            <Flex s={{ hide: true }} style={{ opacity: 0.85 }}>
              {display.location && (
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {locationLabel}
                </Text>
              )}
              {display.time && (
                <Text variant="body-default-xs" onBackground="neutral-weak" marginLeft="8">
                  · <TimeDisplay timeZone={timeZone} />
                </Text>
              )}
            </Flex>
            <Row s={{ hide: true }}>
              <Button
                href="https://wa.me/6281573027842"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="s"
                weight="default"
                prefixIcon="whatsapp"
                suffixIcon="arrowUpRight"
              >
                WhatsApp
              </Button>
            </Row>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
