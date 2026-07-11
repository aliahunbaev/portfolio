"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Stamp.module.css";

/* Stamp — top-left, always the home link. The "A勇!" seal asset carries the
   only color on the site (blue #00309F, baked into the artwork).
   Interaction: instant press-down on click. Nothing else.
   Variants (black / red / square) live in ~/Desktop/icons if we ever swap. */
export default function Stamp() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className={styles.stamp}
      aria-label="Ali Ahunbáev — home"
      onClick={() => {
        // Tell the nav to close its sheet, and cover the already-home case
        // (no route change → no automatic scroll).
        window.dispatchEvent(new Event("ah:home"));
        if (pathname === "/") window.scrollTo({ top: 0 });
      }}
    >
      {/* 110 × 62 is the SVG's native viewBox ratio */}
      <Image
        src="/stamp.svg"
        alt=""
        width={110}
        height={62}
        priority
        className={styles.seal}
      />
    </Link>
  );
}
