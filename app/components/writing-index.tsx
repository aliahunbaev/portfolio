"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { essays, type Essay } from "../lib/writing";
import marbleBook from "../../public/images/marble-book.png";
import panther from "../../public/images/art-movement-panther.png";
import trumpet from "../../public/images/beau-flaneur-trumpet.png";
import painting from "../../public/images/art-movement-painting.png";

// Curated, finished pieces with cover art — everything else is the raw
// journal log. Covers are placeholders until each essay gets a real one;
// making the cover is part of finishing the essay.
const FEATURED: { slug: string; cover: StaticImageData }[] = [
  { slug: "existential-courage", cover: panther },
  { slug: "a-life-that-feels-like-play", cover: marbleBook },
  { slug: "foundations", cover: trumpet },
  { slug: "build-cool-shit-in-public", cover: painting },
];

const featured = FEATURED.map(({ slug, cover }) => {
  const essay = essays.find((e) => e.slug === slug);
  return essay ? { essay, cover } : undefined;
}).filter((e) => e !== undefined);

const journal = essays.filter(
  (e) => !FEATURED.some(({ slug }) => slug === e.slug),
);

// Year shelves for the log.
const groups = journal.reduce<[string, Essay[]][]>((acc, essay) => {
  const y = essay.date.split(" ").pop() ?? "";
  const last = acc[acc.length - 1];
  if (last && last[0] === y) last[1].push(essay);
  else acc.push([y, [essay]]);
  return acc;
}, []);

/* Magazine rack above, notebook below: wide essay cover cards in a 2x2,
   then the raw journal as a year-shelved archive list with the spotlight
   (cards hover quietly; only the log dims siblings). */
export default function WritingIndex() {
  const [active, setActive] = useState<Essay | null>(null);

  return (
    <div className="text-body">
      {/* Covers use the site's cinematic frame; text stays body-size — the
          homepage law: images carry scale, text wins by contrast. Cards get
          the quiet chrome hover, never the spotlight. */}
      <div className="grid grid-cols-1 gap-x-gutter gap-y-12 md:grid-cols-2">
        {featured.map(({ essay, cover }) => (
          <Link
            key={essay.slug}
            href={`/writing/${essay.slug}`}
            className="hover:text-neutral-400"
          >
            <div className="relative aspect-[1.85/1] w-full overflow-hidden">
              <Image
                src={cover}
                alt={essay.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="pt-3 font-medium">{essay.title}</p>
            {essay.subtitle && (
              <p className="pt-1 leading-[1.4]">{essay.subtitle}</p>
            )}
            <p className="pt-2">{essay.date}</p>
          </Link>
        ))}
      </div>
      <div className="pt-24">
        <p className="pb-4">
          Journal (
          <Link
            href="https://playfighter.substack.com"
            target="_blank"
            rel="noopener"
            className="hover:text-neutral-400"
          >
            Read on Substack
          </Link>
          )
        </p>
        <div className="flex flex-col gap-8">
          {groups.map(([y, list]) => (
            <section
              key={y}
              className="md:grid md:grid-cols-12 md:gap-x-gutter"
            >
              <p className="pt-3 max-md:pb-3 md:col-span-2">{y}</p>
              <div className="flex flex-col md:col-span-6 md:col-start-3">
                {list.map((essay) => (
                  <Link
                    key={essay.slug}
                    href={`/writing/${essay.slug}`}
                    onMouseEnter={() => setActive(essay)}
                    onMouseLeave={() => setActive(null)}
                    className={`grid grid-cols-6 gap-x-gutter py-3 ${
                      active && active !== essay ? "text-neutral-400" : ""
                    }`}
                  >
                    <span className="col-span-2">{essay.date}</span>
                    <span className="col-span-4">
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
