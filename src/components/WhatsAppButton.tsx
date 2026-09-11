"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { social } from "@/resources";
import styles from "./WhatsAppButton.module.scss";

export function WhatsAppButton() {
  const pathname = usePathname() ?? "";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not render in admin CMS routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Find whatsapp link or use default
  const whatsappSocial = social.find((s) => s.name?.toLowerCase() === "whatsapp");
  const rawLink = whatsappSocial?.link || "https://wa.me/6281236155717";

  // Append inquiry message if not already present
  const message = "Hi Nicholas, I'd like to inquire about your photography services.";
  const href = rawLink.includes("?")
    ? rawLink
    : `${rawLink}?text=${encodeURIComponent(message)}`;

  return (
    <aside
      className={styles.whatsappWrapper}
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
      aria-label="Direct WhatsApp Contact"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <span className={styles.pulseRing} aria-hidden="true" />
        <span className={styles.iconContainer}>
          <FaWhatsapp aria-hidden="true" />
        </span>
      </a>
    </aside>
  );
}

export default WhatsAppButton;
