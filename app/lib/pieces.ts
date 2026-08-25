import { essays } from "./all-writing";

// Only finished pieces are listed on the site — writing shaped enough to
// stand alone. The running letters stay on Substack; promote one by
// adding its slug. Membership is the curation; the shelf stays
// chronological, newest first.
const PIECES = [
  "self-image",
  "nyu",
  "depth",
  "brother",
  "existential-courage",
  "a-life-that-feels-like-play",
  "foundations",
  "build-cool-shit-in-public",
];

export const pieces = PIECES.map((slug) =>
  essays.find((e) => e.slug === slug),
)
  .filter((e) => e !== undefined)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
