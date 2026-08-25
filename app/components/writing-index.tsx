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

// Membership is the curation; the shelf stays chronological, newest first.
const pieces = PIECES.map((slug) => essays.find((e) => e.slug === slug))
  .filter((e) => e !== undefined)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/*
 * A reading room, not an index. The rail lists the pieces small — title
 * in medium, subtitle receded beneath — and the selected piece sits open
 * in the reading column, newest first so the page lands mid-sentence.
 * Swaps are instant; the URL follows so deep links keep working. On
 * mobile the room collapses to the list, and a tap reads the piece on
 * its own page.
 */
export default function WritingIndex() {
  const [current, setCurrent] = useState<Essay>(pieces[0]);

  const openInPlace = (essay: Essay) => (e: React.MouseEvent) => {
    // Desktop reads in place; mobile follows the link to the essay page.
    if (window.matchMedia("(min-width: 768px)").matches) {
      e.preventDefault();
      setCurrent(essay);
      history.replaceState(null, "", `/writing/${essay.slug}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="text-body md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
      <aside className="md:sticky md:top-30 md:col-span-4">
        <ul className="flex flex-col gap-y-6">
          {pieces.map((essay) => (
            <li key={essay.slug}>
              <Link
                href={`/writing/${essay.slug}`}
                onClick={openInPlace(essay)}
                className={
                  current.slug === essay.slug
                    ? ""
                    : "text-neutral-400 hover:text-black"
                }
              >
                <span className="block font-medium">{essay.title}</span>
                {essay.subtitle && (
                  <span
                    className={`block pt-1 leading-[1.4] ${
                      current.slug === essay.slug ? "text-neutral-400" : ""
                    }`}
                  >
                    {essay.subtitle}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <article className="max-md:hidden md:col-span-8">
        <div className="md:grid md:grid-cols-8 md:gap-x-gutter">
          <div className="md:col-span-5">
            <h1 className="font-medium">{current.title}</h1>
            <p className="pt-1">{current.date}</p>
            <div className="space-y-[1.4em] pt-12 leading-[1.5]">
              {current.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
