"use client";

import Link from "next/link";
import { useState } from "react";
import { essays, type Essay } from "../lib/all-writing";

// Only finished pieces live here — writing shaped enough to stand alone.
// The running letters stay on Substack; promote one by adding its slug.
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

// Membership is the curation; the shelf itself stays chronological,
// newest first, like the archive.
const pieces = PIECES.map((slug) => essays.find((e) => e.slug === slug))
  .filter((e) => e !== undefined)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const excerpt = (essay: Essay) => {
  const first = essay.paragraphs[0] ?? "";
  return first.length > 260 ? `${first.slice(0, 260).trimEnd()}…` : first;
};

/*
 * The archive's system, borrowed whole: full-width hairline rows at title
 * scale — title left, date from col 6 — spotlight on hover. Clicking a
 * row half-opens it: the subtitle and the piece's opening lines unfold
 * beneath, with the way into the full text.
 */
export default function WritingIndex() {
  const [active, setActive] = useState<Essay | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul onMouseLeave={() => setActive(null)}>
      {pieces.map((essay, i) => (
        <li
          key={essay.slug}
          className="fade-in border-b border-black/10"
          style={{ animationDelay: `${i * 45}ms` }}
        >
          <button
            type="button"
            onClick={() =>
              setOpen(open === essay.slug ? null : essay.slug)
            }
            onMouseEnter={() => setActive(essay)}
            className={`grid w-full cursor-pointer grid-cols-12 items-baseline gap-x-gutter py-3 text-left text-title max-md:flex max-md:flex-wrap ${
              active && active !== essay ? "text-neutral-400" : ""
            }`}
          >
            <span className="col-span-5 font-medium">{essay.title}</span>
            <span className="col-span-7 max-md:ml-auto">{essay.date}</span>
          </button>
          {/* Semi-expansion: rows 0fr -> 1fr so the opening unfolds. */}
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{
              gridTemplateRows: open === essay.slug ? "1fr" : "0fr",
            }}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-12 gap-x-gutter pb-6 text-body">
                <div className="col-span-6 col-start-6 max-md:col-span-12 max-md:col-start-1">
                  {essay.subtitle && (
                    <p className="font-medium">{essay.subtitle}</p>
                  )}
                  <p className="pt-3 leading-[1.5]">{excerpt(essay)}</p>
                  <Link
                    href={`/writing/${essay.slug}`}
                    className="mt-4 inline-block hover:text-neutral-400"
                  >
                    Read piece
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
