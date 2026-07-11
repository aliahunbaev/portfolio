import Link from "next/link";
import Image from "next/image";
import styles from "./Stamp.module.css";

/* Stamp — top-left, always the home link. The "A勇!" seal asset carries the
   only color on the site (blue #00309F, baked into the artwork).
   Interaction: instant press-down on click. Nothing else.
   Variants (black / red / square) live in ~/Desktop/icons if we ever swap. */
export default function Stamp() {
  return (
    <Link href="/" className={styles.stamp} aria-label="Ali Ahunbáev — home">
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
