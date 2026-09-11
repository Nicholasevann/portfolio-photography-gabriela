"use client";

import { usePathname } from "next/navigation";
import { Row, IconButton, SmartLink, Text, Icon } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const pathname = usePathname() ?? "";
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Row vertical="center" gap="12" wrap s={{ horizontal: "center", align: "center" }}>
          <Text variant="body-default-s" onBackground="neutral-strong">
            <Text onBackground="neutral-weak">© {currentYear} /</Text>
            <Text paddingX="4">{person.name}</Text>
          </Text>
          <SmartLink
            href="https://nicholas-porto.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Row gap="4" vertical="center" style={{ opacity: 0.75 }}>
              <Icon name="code" size="xs" onBackground="neutral-weak" />
              <Text variant="body-default-xs" onBackground="neutral-weak">
                Software Developer Portfolio
              </Text>
              <Icon name="arrowUpRight" size="xs" onBackground="neutral-weak" />
            </Row>
          </SmartLink>
        </Row>
        <Row gap="16">
          {social.map(
            (item, index) =>
              item.link && (
                <IconButton
                  key={`footer-social-${item.name}-${index}`}
                  href={item.link}
                  target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
