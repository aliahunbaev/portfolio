"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
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

// Year shelves for the log; row dates drop the year the shelf already owns.
const groups = journal.reduce<[string, Essay[]][]>((acc, essay) => {
  const y = essay.date.split(" ").pop() ?? "";
  const last = acc[acc.length - 1];
  if (last && last[0] === y) last[1].push(essay);
  else acc.push([y, [essay]]);
  return acc;
}, []);

const shortDate = (essay: Essay) => essay.date.split(",")[0];

function EssayCard({
  essay,
  cover,
}: {
  essay: Essay;
  cover: StaticImageData;
}) {
  const labelRef = useRef<HTMLSpanElement>(null);

  // Same cursor-label pattern as the homepage's View Project.
  function moveLabel(e: React.MouseEvent) {
    const label = labelRef.current;
    if (!label) return;
    label.style.left = `${e.clientX}px`;
    label.style.top = `${e.clientY}px`;
  }

  return (
    <Link href={`/writing/${essay.slug}`}>
      <div
        className="group relative aspect-[1.85/1] w-full cursor-none overflow-hidden"
        onMouseMove={moveLabel}
      >
        <Image
          draggable={false}
          src={cover}
          alt={essay.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <span
          ref={labelRef}
          className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-medium text-white opacity-0 mix-blend-exclusion group-hover:opacity-100"
        >
          Read Essay
        </span>
      </div>
      <p className="pt-3 font-medium">{essay.title}</p>
      {essay.subtitle && <p className="pt-1 leading-[1.4]">{essay.subtitle}</p>}
      <p className="pt-2">{essay.date}</p>
    </Link>
  );
}

/* Magazine rack above, notebook below: wide essay cover cards in a 2x2
   with the homepage's cursor label, then the raw journal as a dense
   year-shelved log — one line per entry, spotlight on hover. */
export default function WritingIndex() {
  const [active, setActive] = useState<Essay | null>(null);

  return (
    <div className="text-body">
      <div className="grid grid-cols-1 gap-x-gutter gap-y-12 md:grid-cols-2">
        {featured.map(({ essay, cover }) => (
          <EssayCard key={essay.slug} essay={essay} cover={cover} />
        ))}
      </div>
      <div className="pt-24">
        <div className="flex flex-col gap-8">
          {groups.map(([y, list]) => (
            <section key={y} className="md:grid md:grid-cols-12 md:gap-x-gutter">
              <p className="pt-2 max-md:pb-3 md:col-span-2">{y}</p>
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
