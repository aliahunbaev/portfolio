"use client";

import Link from "next/link";
import { useState } from "react";
import { essays, type Essay } from "../lib/all-writing";

// The two registers of the page. Pieces are finished work — shaped,
// standalone, the things you'd hand a stranger. Everything else is the
// letters: the running Playfighter record, kept as a dense log. Promote
// or demote by moving a slug.
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

const pieces = PIECES.map((slug) => essays.find((e) => e.slug === slug)).filter(
  (e) => e !== undefined,
);

const letters = essays.filter((e) => !PIECES.includes(e.slug));

// Year shelves for the log; row dates drop the year the shelf already owns.
const groups = letters.reduce<[string, Essay[]][]>((acc, essay) => {
  const y = essay.date.split(" ").pop() ?? "";
  const last = acc[acc.length - 1];
  if (last && last[0] === y) last[1].push(essay);
  else acc.push([y, [essay]]);
  return acc;
}, []);

const shortDate = (essay: Essay) => essay.date.split(",")[0];

/* No covers, no cards — the words are the artifact. Finished pieces at
   display scale up top; the letters underneath as the year-shelved log,
   spotlight on hover in both registers. */
export default function WritingIndex() {
  const [active, setActive] = useState<Essay | null>(null);

  return (
    <div className="text-body">
      <section className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <p className="max-md:pb-6 md:col-span-2">Pieces</p>
        <div className="flex flex-col md:col-span-8 md:col-start-5">
          {pieces.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              onMouseEnter={() => setActive(essay)}
              onMouseLeave={() => setActive(null)}
              className={`py-4 first:pt-0 ${
                active && active !== essay ? "text-neutral-400" : ""
              }`}
            >
              <span className="block text-title font-medium leading-[1.15]">
                {essay.title}
              </span>
              {essay.subtitle && (
                <span className="block pt-1 leading-[1.4]">
                  {essay.subtitle}
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>
      <div className="pt-24">
        <div className="flex flex-col gap-8">
          {groups.map(([y, list], gi) => (
            <section
              key={y}
              className="md:grid md:grid-cols-12 md:gap-x-gutter"
            >
              <p className="pt-2 max-md:pb-3 md:col-span-2">
                {gi === 0 ? `Letters, ${y}` : y}
              </p>
              <div className="flex flex-col md:col-span-8 md:col-start-5">
                {list.map((essay) => (
                  <Link
                    key={essay.slug}
                    href={`/writing/${essay.slug}`}
                    onMouseEnter={() => setActive(essay)}
                    onMouseLeave={() => setActive(null)}
                    className={`grid grid-cols-8 gap-x-gutter py-3 leading-[1.4] ${
                      active && active !== essay ? "text-neutral-400" : ""
                    }`}
                  >
                    <span className="col-span-1 max-md:col-span-2">
                      {shortDate(essay)}
                    </span>
                    <span className="col-span-7 max-md:col-span-6">
                      <span className="block font-medium">{essay.title}</span>
                      {essay.subtitle && (
                        <span className="block pt-1 leading-[1.4]">
                          {essay.subtitle}
                        </span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
