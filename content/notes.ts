/* Notes — dated writing. Reverse-chronological.
 *
 * For the skeleton these live as data (body = paragraphs) so there are zero
 * extra dependencies and you can start writing immediately. When you want
 * real Markdown/MDX authoring, swap this array for files under /content/notes
 * and a loader — the Notes pages read from getNotes()/getNote() only, so the
 * pages won't change.
 */

export interface Note {
  slug: string;
  title: string;
  /** Machine date for <time datetime>. */
  datetime: string;
  /** Display date, e.g. "June 2026". */
  date: string;
  /** Body paragraphs. */
  body: string[];
}

const notes: Note[] = [
  {
    slug: "on-beginning-again",
    title: "On beginning again",
    datetime: "2026-06-20",
    date: "June 2026",
    body: [
      "Placeholder. A note is a small, finished thought — dated, titled, set in a single comfortable measure, and left alone.",
      "This one exists to prove the reading page: the leading, the width, the date at the top. Replace it with something true.",
    ],
  },
  {
    slug: "the-coat",
    title: "The coat",
    datetime: "2025-11-14",
    date: "November 2025",
    body: [
      "Placeholder. One wool coat, cut once. The whole argument for doing less, better.",
      "Notes can be linked to from the Work feed as index cards — this is one of them.",
    ],
  },
  {
    slug: "combat-issue-one",
    title: "Combat, Issue One",
    datetime: "2026-02-02",
    date: "February 2026",
    body: [
      "Placeholder. On printing the first issue: what it cost, what it taught, what comes next.",
    ],
  },
];

export function getNotes(): Note[] {
  return [...notes].sort((a, b) => (a.datetime < b.datetime ? 1 : -1));
}

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
