export type Project = {
  date: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Vertical object-position matching the crop framing in the design. */
  objectPosition: string;
};

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
