/** A unit of project-page content. Width is a property of the block type:
 *  text sits in cols 6-9, image spans all 12, pair splits 6/6. */
export type Block =
  | { type: "text"; body: string }
  | { type: "image"; image: string; objectPosition?: string }
  | { type: "video"; src: string }
  | {
      type: "pair";
      images: { image: string; objectPosition?: string }[];
    };

export type Project = {
  date: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Vertical object-position matching the crop framing in the design. */
  objectPosition: string;
  /** Optional page content; without it the page falls back to description +
   *  every image associated with the work. Frontloaded pages lead with one
   *  text block; narrative pages weave text between images. */
  blocks?: Block[];
  /** Optional light background for the project page (PlayLab-style);
   *  keep tints pale enough for black body text. */
  tint?: string;
  /** Shown as a homepage row. */
  featured?: boolean;
};

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Every image associated with a work, across features and archive. */
export function workImages(title: string) {
  const seen = new Set<string>();
  return [...projects, ...works]
    .filter((p) => p.title === title && !seen.has(p.image) && seen.add(p.image))
    .map((p) => ({ image: p.image, objectPosition: p.objectPosition }));
}

/**
 * Everything, for the index archive — placeholder entries reuse the six
 * committed images until each work gets its own cover. Newest first.
 */
export const works: Project[] = [
  {
    date: "July 2026",
    title: "Marble",
    category: "iOS App",
    description:
      "Building the most beautiful training app in existence, mixing sport, philosophy, and design.",
    image: "/images/marble-book.png",
    objectPosition: "50% 50%",
    tint: "#E8E5DE",
    // Narrative mode: text woven between images.
    blocks: [
      {
        type: "text",
        body: "Marble began as a question: what would a training app look like if it treated the body the way philosophy treats the mind — as something sculpted deliberately, over years, with taste. Most fitness software is a spreadsheet wearing a neon jacket. Marble is built from the opposite instinct.",
      },
      { type: "image", image: "/images/marble-book.png" },
      {
        type: "text",
        body: "The interface strips training down to its essential rhythm. No streaks, no confetti, no gamification — a single daily surface that knows what today is for, closer to a beautiful notebook than a dashboard. Every screen is set in one type family at two sizes, because restraint is the feature.",
      },
      {
        type: "image",
        image: "/images/marble-jungle.png",
      },
      {
        type: "text",
        body: "Marble ships to beta in summer 2026. The name is the thesis: the work is already inside the block — training is just removing what isn't.",
      },
    ],
  },
  {
    date: "June 2026",
    title: "Marble Identity",
    category: "Brand Identity",
    description: "Naming, mark, and type system for Marble.",
    image: "/images/marble-jungle.png",
    objectPosition: "50% 50%",
  },
  {
    date: "May 2026",
    title: "The Art Movement",
    category: "Event",
    description:
      "Concepting, organizing, and hosting an art exhibition and rooftop party for dope artists in New York.",
    image: "/images/art-movement-painting.png",
    objectPosition: "50% 54%",
    tint: "#AFC5DE",
  },
  {
    date: "April 2026",
    title: "Training Journal",
    category: "Print",
    description: "A pocket journal for structuring training and thought.",
    image: "/images/marble-book.png",
    objectPosition: "50% 50%",
  },
  {
    date: "February 2026",
    title: "Combat Créatif",
    category: "Studio",
    description: "The studio itself — identity, site, and philosophy.",
    image: "/images/art-movement-panther.png",
    objectPosition: "50% 84%",
  },
  {
    date: "December 2025",
    title: "Winter Sketchbook",
    category: "Drawing",
    description: "A season of figure studies and street sketches.",
    image: "/images/beau-flaneur-lightbox.png",
    objectPosition: "50% 0%",
  },
  {
    date: "October 2025",
    title: "Le Flâneur Lookbook",
    category: "Photography",
    description: "Lookbook shot across Paris and Brooklyn rooftops.",
    image: "/images/beau-flaneur-trumpet.png",
    objectPosition: "50% 55%",
  },
  {
    date: "August 2025",
    title: "Beau Flâneur",
    category: "Fashion Brand",
    description:
      "The fashion design project centered around wandering, existentialism, and French - Romantic visuals.",
    image: "/images/beau-flaneur-lightbox.png",
    objectPosition: "50% 0%",
    tint: "#B7C29A",
    // Frontloaded mode: full context first, then uninterrupted visuals.
    blocks: [
      {
        type: "text",
        body: "Beau Flâneur is a fashion project about wandering — clothes for moving through cities with no destination, cut from the French-Romantic instinct that beauty is found, not scheduled. The first collection pairs structured outerwear with soft, undone layers: garments that look composed in motion and dissolve at rest.\n\nEvery piece develops from archival references — trumpet players, lightboxes, contact sheets — and is photographed the way it's meant to be worn: mid-stride, unposed, slightly out of frame.",
      },
      { type: "image", image: "/images/beau-flaneur-lightbox.png" },
      {
        type: "pair",
        images: [
          { image: "/images/beau-flaneur-trumpet.png", objectPosition: "50% 30%" },
          { image: "/images/beau-flaneur-lightbox.png", objectPosition: "50% 100%" },
        ],
      },
      { type: "image", image: "/images/beau-flaneur-trumpet.png", objectPosition: "50% 55%" },
    ],
  },
  {
    date: "June 2025",
    title: "Rooftop 001",
    category: "Event",
    description: "The first Art Movement rooftop — 60 artists, one night.",
    image: "/images/art-movement-painting.png",
    objectPosition: "50% 54%",
  },
  {
    date: "April 2025",
    title: "On Beautiful Utility",
    category: "Writing",
    description: "An essay on philosophy, function, and form.",
    image: "/images/marble-jungle.png",
    objectPosition: "50% 50%",
  },
  {
    date: "February 2025",
    title: "Panther Study",
    category: "Photography",
    description: "A study in stillness, leather, and concrete.",
    image: "/images/art-movement-panther.png",
    objectPosition: "50% 84%",
  },
  {
    date: "November 2024",
    title: "First Marks",
    category: "Drawing",
    description: "Early sketch archive — where the whole thing started.",
    image: "/images/beau-flaneur-trumpet.png",
    objectPosition: "50% 55%",
  },
];

export const projects: Project[] = [
  {
    date: "July 2026",
    title: "Marble",
    category: "iOS App",
    description:
      "Building the most beautiful training app in existence, mixing sport, philosophy, and design.",
    image: "/images/marble-book.png",
    objectPosition: "50% 50%",
  },
  {
    date: "May 2026",
    title: "The Art Movement",
    category: "Event",
    description:
      "Concepting, organizing, and hosting an art exhibition and rooftop party for dope artists in New York.",
    image: "/images/art-movement-painting.png",
    objectPosition: "50% 54%",
  },
  {
    date: "August 2025",
    title: "Beau Flâneur",
    category: "Fashion Brand",
    description:
      "The fashion design project centered around wandering, existentialism, and French - Romantic visuals.",
    image: "/images/beau-flaneur-trumpet.png",
    objectPosition: "50% 55%",
  },
  {
    date: "July 2026",
    title: "Marble",
    category: "iOS App",
    description:
      "Building the most beautiful training app in existence, mixing sport, philosophy, and design.",
    image: "/images/marble-jungle.png",
    objectPosition: "50% 50%",
  },
  {
    date: "May 2026",
    title: "The Art Movement",
    category: "Event",
    description:
      "Concepting, organizing, and hosting an art exhibition and rooftop party for dope artists in New York.",
    image: "/images/art-movement-panther.png",
    objectPosition: "50% 84%",
  },
  {
    date: "August 2025",
    title: "Beau Flâneur",
    category: "Fashion Brand",
    description:
      "The fashion design project centered around wandering, existentialism, and French - Romantic visuals.",
    image: "/images/beau-flaneur-lightbox.png",
    objectPosition: "50% 0%",
  },
];
