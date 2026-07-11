import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sketches",
  description: "A wall of work in progress.",
};

// Mixed aspect ratios, tight gutters, no captions. Lightbox arrives later.
const RATIOS = [
  "3 / 4",
  "1 / 1",
  "4 / 3",
  "3 / 4",
  "4 / 5",
  "1 / 1",
  "3 / 2",
  "4 / 5",
  "3 / 4",
];

/* Sketches — v1 stub: a masonry-ish grid of placeholder boxes. */
export default function Sketches() {
  return (
    <div className={styles.grid}>
      {RATIOS.map((ratio, i) => (
        <Placeholder key={i} ratio={ratio} className={styles.tile} />
      ))}
    </div>
  );
}
