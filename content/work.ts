/* The Work ledger. Add an entry here — layout never gets touched.
 *
 * The home feed is text-only; images belong to the project pages (each
 * cover is the hero of its page). Weighting is about where an entry LEADS:
 *   monument — has a dedicated project page on this site
 *   index    — smaller work; links to a note, or (href: "") nowhere yet
 *   linkout  — title opens an external site in a new tab (↗)
 */

export type WorkKind = "monument" | "index" | "linkout";

export interface WorkImage {
  /** Treated in the asset (not via CSS filters). Empty string = no asset
      yet. */
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
  title: string;
  description?: string;
  /** Internal route ("/marble"), external URL for link-outs, or "" for a
      plain record with no destination. */
  href: string;
  kind: WorkKind;
  /** The project's cover — used on its page, not in the home ledger. */
  image?: WorkImage;
}

export const work: WorkEntry[] = [
  {
    datetime: "2026-07",
    eyebrow: "July 2026",
    title: "Marble",
    description:
      "Building the most beautiful training journal in existence. First software project.",
    href: "/marble",
    kind: "monument",
    image: {
      src: "/images/marble.png",
      alt: "Marble — training journal app",
      width: 1600,
      height: 800,
    },
  },
  {
    datetime: "2026-05",
    eyebrow: "May 2026",
    title: "The Art Movement",
    description:
      "Conceptualized, organized, then hosted an art exhibition and rooftop party for the creative youth.",
    href: "/art-movement",
    kind: "monument",
    image: {
      src: "/images/art-movement.png",
      alt: "The Art Movement",
      width: 1600,
      height: 800,
    },
  },
  {
    datetime: "2026-04",
    eyebrow: "April 2026",
    title: "Verci Marketing",
    description:
      "Wrote and designed stories about New York City's famous spaces for artists. Grew 10,000 followers.",
    href: "",
    kind: "index",
  },
  {
    datetime: "2026-03",
    eyebrow: "March 2026",
    title: "Beau Flâneur",
    description: "A wandering, dressed well.",
    href: "/beau-flaneur",
    kind: "monument",
    image: {
      src: "/images/beau-flaneur.png",
      alt: "Beau Flâneur",
      width: 1600,
      height: 800,
    },
  },
  {
    datetime: "2026-01",
    eyebrow: "January 2026",
    title: "Neighborhood Tee",
    description: "A classic garment designed to honor the neighborhood.",
    href: "/notes/the-coat",
    kind: "index",
  },
  {
    datetime: "2025-04",
    eyebrow: "April 2025",
    title: "Combat Journal, Vol I",
    description: "The first print publication for my studio, Combat Créatif.",
    href: "/notes/combat-issue-one",
    kind: "index",
    image: {
      src: "/images/combat-issue-one.png",
      alt: "Combat Journal, Vol I",
      width: 1600,
      height: 800,
    },
  },
  {
    datetime: "2025",
    eyebrow: "Ongoing",
    title: "Combat Créatif",
    description: "The studio.",
    href: "https://combatcreatif.com",
    kind: "linkout",
  },
];
