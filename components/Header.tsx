"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const LINKS = [
  { href: "/", label: "Work" },
  { href: "/info", label: "Info" },
  { href: "/notes", label: "Notes" },
  { href: "/sketches", label: "Sketches" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/* The one piece of chrome: a fixed full-width glass bar. Blue square mark
   on the left (the site's only color), horizontal serif nav on the right.
   On mobile the links live behind a MENU/CLOSE toggle as a full-screen
   frosted sheet, links set big and left-aligned. */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Route changes dismiss the sheet.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the sheet is open: lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={open ? `${styles.bar} ${styles.open}` : styles.bar}>
      <Link
        href="/"
        className={styles.mark}
        aria-label="Ali Ahunbáev — home"
        onClick={() => {
          setOpen(false);
          if (pathname === "/") window.scrollTo({ top: 0 });
        }}
      />

      <nav aria-label="Primary">
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <ul className={styles.list}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isActive(pathname, link.href) ? styles.current : ""}
                aria-current={
                  isActive(pathname, link.href) ? "page" : undefined
                }
                onClick={() => {
                  setOpen(false);
                  // Next scrolls to top on route change; cover the
                  // same-page click too.
                  if (link.href === pathname) window.scrollTo({ top: 0 });
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
