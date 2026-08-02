"use client";

import Link from "next/link";
import { useState } from "react";
import { essays, type Essay } from "../lib/writing";

/* Same spotlight rows as the work archive: all black at rest, hovering one
   dims the others. Title cols 1-4, subtitle cols 6-10, date cols 11-12. */
export default function WritingIndex() {
  const [active, setActive] = useState<Essay | null>(null);

  return (
    <ul onMouseLeave={() => setActive(null)}>
      {essays.map((essay) => (
        <li key={essay.slug} className="border-b border-black/10">
          <Link
            href={`/writing/${essay.slug}`}
            onMouseEnter={() => setActive(essay)}
            className={`grid grid-cols-12 items-baseline gap-x-gutter py-3 text-title max-md:flex max-md:flex-wrap ${
              active && active !== essay ? "text-neutral-400" : ""
            }`}
          >
            <span className="col-span-4 font-medium">{essay.title}</span>
            <span className="col-span-5 col-start-6 max-md:hidden">
              {essay.subtitle}
            </span>
            <span className="col-span-2 col-start-11 max-md:ml-auto">
              {essay.date.split(" ").pop()}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
