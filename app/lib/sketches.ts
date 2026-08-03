import type { StaticImageData } from "next/image";
import marbleBook from "../../public/images/marble-book.png";
import artPainting from "../../public/images/art-movement-painting.png";
import trumpet from "../../public/images/beau-flaneur-trumpet.png";
import jungle from "../../public/images/marble-jungle.png";
import panther from "../../public/images/art-movement-panther.png";
import lightbox from "../../public/images/beau-flaneur-lightbox.png";

export type Sketch = {
  image: StaticImageData;
  title: string;
  date: string;
};

// Placeholder set — the six project images standing in until real sketch
// scans land in public/images (import them above and list them here;
// natural aspect ratios come from the static imports).
export const sketches: Sketch[] = [
  { image: marbleBook, title: "Sketch 001", date: "2026" },
  { image: panther, title: "Sketch 002", date: "2026" },
  { image: trumpet, title: "Sketch 003", date: "2026" },
  { image: artPainting, title: "Sketch 004", date: "2025" },
  { image: lightbox, title: "Sketch 005", date: "2025" },
  { image: jungle, title: "Sketch 006", date: "2025" },
  { image: trumpet, title: "Sketch 007", date: "2025" },
  { image: panther, title: "Sketch 008", date: "2024" },
  { image: artPainting, title: "Sketch 009", date: "2024" },
  { image: marbleBook, title: "Sketch 010", date: "2024" },
];
