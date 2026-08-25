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
  // The Daily Charlatan posts (app/lib/charlatan.ts) and Substack essays
  // stay wired but unlisted — add a slug here to put one back.
];

export const pieces = PIECES.map((slug) =>
  essays.find((e) => e.slug === slug),
)
  .filter((e) => e !== undefined)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
