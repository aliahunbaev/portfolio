export type Project = {
  date: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Vertical object-position matching the crop framing in the design. */
  objectPosition: string;
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
    category: "Community Gathering",
    description:
      "Concepting, organizing, and hosting an art exhibition and rooftop party for dope artists in New York.",
    image: "/images/art-movement-painting.png",
    objectPosition: "50% 54%",
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
  },
  {
    date: "June 2025",
    title: "Rooftop 001",
    category: "Community Gathering",
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
    category: "Community Gathering",
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
    category: "Community Gathering",
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
