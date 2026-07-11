/* The Work feed. Add an entry here — layout never gets touched.
 *
 * Every entry carries a visual — same width in the feed, heights vary with
 * the image's aspect ratio. Weighting is about where the entry LEADS:
 *   monument — has a dedicated project page on this site
 *   index    — smaller work; links to a note (or nowhere grand)
 *   linkout  — title opens an external site in a new tab (↗)
 */

export type WorkKind = "monument" | "index" | "linkout";

export interface WorkImage {
  /* Black & white, treated in the asset (not via CSS filters). */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface WorkEntry {
  /** Machine date for <time datetime>, e.g. "2026-07". */
  datetime: string;
  /** Display eyebrow, e.g. "July 2026". Omit for undated entries. */
  eyebrow?: string;
  /** Serif sentence up to the em-dash. */
  title: string;
  /** Italic clause after the em-dash. */
  description?: string;
  /** Internal route ("/marble") or external URL for link-outs. */
  href: string;
  kind: WorkKind;
  image?: WorkImage;
}

export const work: WorkEntry[] = [
  {
    datetime: "2026-07",
    eyebrow: "July 2026",
    title: "Marble",
    description:
      "an attempt at making the most beautiful training journal in existence.",
    href: "/marble",
    kind: "monument",
    image: {
      src: "/images/marble.jpg",
      alt: "Marble — training journal app",
      width: 1600,
      height: 900,
    },
  },
  {
    datetime: "2026-05",
    eyebrow: "May 2026",
    title: "The Art Movement",
    description: "a gathering, and an argument for making things seriously.",
    href: "/art-movement",
    kind: "monument",
    image: {
      src: "/images/art-movement.jpg",
      alt: "The Art Movement",
      width: 1600,
      height: 1200,
    },
  },
  {
    datetime: "2025",
    eyebrow: "Ongoing",
    title: "Combat Créatif",
    description: "the studio.",
    href: "https://combatcreatif.com",
    kind: "linkout",
    image: {
      src: "/images/combat-creatif.jpg",
      alt: "Combat Créatif",
      width: 1600,
      height: 1000,
    },
  },
  {
    datetime: "2026-03",
    eyebrow: "March 2026",
    title: "Beau Flâneur",
    description: "a wandering, dressed well.",
    href: "/beau-flaneur",
    kind: "monument",
    image: {
      src: "/images/beau-flaneur.jpg",
      alt: "Beau Flâneur",
      width: 1600,
      height: 1067,
    },
  },
  {
    datetime: "2026-02",
    eyebrow: "February 2026",
    title: "Combat, Issue One",
    description: "a magazine, printed.",
    href: "/notes/combat-issue-one",
    kind: "index",
    image: {
      src: "/images/combat-issue-one.jpg",
      alt: "Combat, Issue One",
      width: 1280,
      height: 1600,
    },
  },
  {
    datetime: "2025-11",
    eyebrow: "November 2025",
    title: "A single wool coat",
    description: "cut once, cut right.",
    href: "/notes/the-coat",
    kind: "index",
    image: {
      src: "/images/the-coat.jpg",
      alt: "A single wool coat",
      width: 1600,
      height: 1280,
    },
  },
];
