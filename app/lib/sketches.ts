import type { StaticImageData } from "next/image";
import s001 from "../../public/sketches/sketch-001.jpg";
import s002 from "../../public/sketches/sketch-002.jpg";
import s003 from "../../public/sketches/sketch-003.jpg";
import s004 from "../../public/sketches/sketch-004.jpg";
import s005 from "../../public/sketches/sketch-005.jpg";
import s006 from "../../public/sketches/sketch-006.jpg";
import s007 from "../../public/sketches/sketch-007.jpg";
import s008 from "../../public/sketches/sketch-008.jpg";
import s009 from "../../public/sketches/sketch-009.jpg";
import s010 from "../../public/sketches/sketch-010.jpg";
import s011 from "../../public/sketches/sketch-011.jpg";
import s012 from "../../public/sketches/sketch-012.jpg";
import s013 from "../../public/sketches/sketch-013.jpg";
import s014 from "../../public/sketches/sketch-014.jpg";
import s015 from "../../public/sketches/sketch-015.jpg";
import s016 from "../../public/sketches/sketch-016.jpg";
import s017 from "../../public/sketches/sketch-017.jpg";
import s018 from "../../public/sketches/sketch-018.jpg";
import s019 from "../../public/sketches/sketch-019.jpg";
import s020 from "../../public/sketches/sketch-020.jpg";
import s021 from "../../public/sketches/sketch-021.jpg";
import s022 from "../../public/sketches/sketch-022.jpg";
import s023 from "../../public/sketches/sketch-023.jpg";
import s024 from "../../public/sketches/sketch-024.jpg";
import s025 from "../../public/sketches/sketch-025.jpg";
import s026 from "../../public/sketches/sketch-026.jpg";
import s027 from "../../public/sketches/sketch-027.jpg";
import s028 from "../../public/sketches/sketch-028.jpg";
import s029 from "../../public/sketches/sketch-029.jpg";
import s030 from "../../public/sketches/sketch-030.jpg";
import s031 from "../../public/sketches/sketch-031.jpg";
import s032 from "../../public/sketches/sketch-032.jpg";
import s033 from "../../public/sketches/sketch-033.jpg";
import s034 from "../../public/sketches/sketch-034.jpg";
import s035 from "../../public/sketches/sketch-035.jpg";
import s036 from "../../public/sketches/sketch-036.jpg";
import s037 from "../../public/sketches/sketch-037.jpg";
import s038 from "../../public/sketches/sketch-038.jpg";
import s039 from "../../public/sketches/sketch-039.jpg";
import s040 from "../../public/sketches/sketch-040.jpg";
import s041 from "../../public/sketches/sketch-041.jpg";
import s042 from "../../public/sketches/sketch-042.jpg";
import s043 from "../../public/sketches/sketch-043.jpg";
import s044 from "../../public/sketches/sketch-044.jpg";
import s045 from "../../public/sketches/sketch-045.jpg";
import s046 from "../../public/sketches/sketch-046.jpg";
import s047 from "../../public/sketches/sketch-047.jpg";

export type Sketch = {
  image: StaticImageData;
  title: string;
  date: string;
  /** Optional little context line, shown in the gallery caption rail. */
  note?: string;
};

// The studio wall — unfinished and independent work, newest last.
// Titles/dates/notes are editable per entry; static imports carry each
// image's natural dimensions for the bottom-aligned grid.
export const sketches: Sketch[] = [
  { image: s001, title: "Sketch 001", date: "2026" },
  { image: s002, title: "Sketch 002", date: "2026" },
  { image: s003, title: "Sketch 003", date: "2026" },
  { image: s004, title: "Sketch 004", date: "2026" },
  { image: s005, title: "Sketch 005", date: "2026" },
  { image: s006, title: "Sketch 006", date: "2026" },
  { image: s007, title: "Sketch 007", date: "2026" },
  { image: s008, title: "Sketch 008", date: "2026" },
  { image: s009, title: "Sketch 009", date: "2026" },
  { image: s010, title: "Sketch 010", date: "2026" },
  { image: s011, title: "Sketch 011", date: "2026" },
  { image: s012, title: "Sketch 012", date: "2026" },
  { image: s013, title: "Sketch 013", date: "2026" },
  { image: s014, title: "Sketch 014", date: "2026" },
  { image: s015, title: "Sketch 015", date: "2026" },
  { image: s016, title: "Sketch 016", date: "2026" },
  { image: s017, title: "Sketch 017", date: "2026" },
  { image: s018, title: "Sketch 018", date: "2026" },
  { image: s019, title: "Sketch 019", date: "2026" },
  { image: s020, title: "Sketch 020", date: "2026" },
  { image: s021, title: "Sketch 021", date: "2026" },
  { image: s022, title: "Sketch 022", date: "2026" },
  { image: s023, title: "Sketch 023", date: "2026" },
  { image: s024, title: "Sketch 024", date: "2026" },
  { image: s025, title: "Sketch 025", date: "2026" },
  { image: s026, title: "Sketch 026", date: "2026" },
  { image: s027, title: "Sketch 027", date: "2026" },
  { image: s028, title: "Sketch 028", date: "2026" },
  { image: s029, title: "Sketch 029", date: "2026" },
  { image: s030, title: "Sketch 030", date: "2026" },
  { image: s031, title: "Sketch 031", date: "2026" },
  { image: s032, title: "Sketch 032", date: "2026" },
  { image: s033, title: "Sketch 033", date: "2026" },
  { image: s034, title: "Sketch 034", date: "2026" },
  { image: s035, title: "Sketch 035", date: "2026" },
  { image: s036, title: "Sketch 036", date: "2026" },
  { image: s037, title: "Sketch 037", date: "2026" },
  { image: s038, title: "Sketch 038", date: "2026" },
  { image: s039, title: "Sketch 039", date: "2026" },
  { image: s040, title: "Sketch 040", date: "2026" },
  { image: s041, title: "Sketch 041", date: "2026" },
  { image: s042, title: "Sketch 042", date: "2026" },
  { image: s043, title: "Sketch 043", date: "2026" },
  { image: s044, title: "Sketch 044", date: "2026" },
  { image: s045, title: "Sketch 045", date: "2026" },
  { image: s046, title: "Sketch 046", date: "2026" },
  { image: s047, title: "Sketch 047", date: "2026" },
];
