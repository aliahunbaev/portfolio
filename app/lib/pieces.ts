import { essays } from "./all-writing";

// Only finished pieces are listed on the site — writing shaped enough to
// stand alone. The running letters stay on Substack; promote one by
// adding its slug. Membership is the curation; the shelf stays
// chronological, newest first.
const PIECES = [
  // The early essays
  "self-image",
  "nyu",
  "depth",
  "brother",
  // The Daily Charlatan — the ten most recent posts
  "accept-your-experiences",
  "how-to-practice-antifragility",
  "big-dreams-small-steps",
  "what-are-friends-for",
  "bounce-back",
  "enjoying-goals",
  "the-cost-of-knowing",
  "fck-around-find-out",
  "feelin-lonesome",
  "mindradio",
];

export const pieces = PIECES.map((slug) =>
  essays.find((e) => e.slug === slug),
)
  .filter((e) => e !== undefined)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
