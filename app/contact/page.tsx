import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email, Instagram, Substack.",
};

const LINKS = [
  { label: "Email", value: "hello@ahunbaev.com", href: "mailto:hello@ahunbaev.com" },
  { label: "Instagram", value: "@play.fighter", href: "https://instagram.com/play.fighter" },
  { label: "Instagram", value: "@combatcreatif", href: "https://instagram.com/combatcreatif" },
  { label: "Substack", value: "Read the Substack", href: "https://substack.com" },
];

/* Contact — one screen. Serif list, left-anchored. Done. */
export default function Contact() {
  return (
    <div className={styles.contact}>
      <ul className={styles.list}>
        {LINKS.map((link) => (
          <li key={link.value} className={styles.item}>
            <span className={styles.label}>{link.label}</span>
            <a
              href={link.href}
              className={styles.value}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {link.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
