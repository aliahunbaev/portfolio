import Link from "next/link";
import styles from "./Stamp.module.css";

/* Stamp — top-left, always the home link. The "A勇!" seal mark carries the
   only color on the site (--accent). Interaction: instant press-down on click.
   This SVG is a placeholder for the final seal asset; keep it in --accent. */
export default function Stamp() {
  return (
    <Link href="/" className={styles.stamp} aria-label="Ali Ahunbáev — home">
      <svg
        className={styles.seal}
        viewBox="0 0 100 100"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="10"
          fill="var(--accent)"
        />
        <text
          x="50"
          y="54"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--serif)"
          fontSize="46"
          fontWeight="700"
          fill="var(--paper)"
        >
          A勇
        </text>
      </svg>
    </Link>
  );
}
