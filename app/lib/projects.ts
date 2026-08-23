/** A unit of project-page content. Images carry their pixel size so
 *  layouts can honour natural proportions without cropping. */
export type Block =
  | { type: "section"; title: string; id: string }
  | { type: "text"; body: string }
  | { type: "quote"; body: string; author?: string }
  | {
      type: "image";
      image: string;
      objectPosition?: string;
      caption?: string;
      w?: number;
      h?: number;
    }
  | { type: "video"; src: string; poster?: string; w?: number; h?: number }
  | {
      /** Two or three pieces written on one line: shown side by side at
       *  natural proportions, widths in ratio so heights match. Videos in
       *  a row play as silent loops. */
      type: "row";
      items: (
        | { type: "image"; image: string; caption?: string; w?: number; h?: number }
        | { type: "video"; src: string; poster?: string; w?: number; h?: number }
      )[];
    }
  | {
      type: "gallery";
      title: string;
      /** "reader": full-bleed page-by-page reading, hairline seams.
       *  "board": a moodboard — the whole set on one pannable, zoomable
       *  wall. */
      mode?: "reader" | "board";
      images: { src: string; w?: number; h?: number; small?: string }[];
      cover?: { w: number; h: number };
    };

export type Project = {
  date: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Vertical object-position matching the crop framing of the cover. */
  objectPosition: string;
  blocks?: Block[];
  /** Rare — only when the colour IS the work. */
  tint?: string;
  /** Shown as a homepage row. */
  featured?: boolean;
  /** Curated homepage position (1 = first); unordered rows follow,
   *  newest first. The archive stays chronological regardless. */
  order?: number;
  /** Optional silent looping video used instead of the cover image on
   *  the homepage row (frontmatter key: preview). */
  previewVideo?: string;
  /** First frame of previewVideo, shown until playback starts. */
  previewPoster?: string;
};

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
