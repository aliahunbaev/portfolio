"use client";

import Link from "next/link";
import { useState } from "react";
import { pieces } from "../lib/pieces";
import type { Essay } from "../lib/all-writing";

/* A quiet list in the middle of the page: title in medium, subtitle in
   regular beneath — weight does the differentiating, like everywhere
   else — with the site's spotlight hover: the entry under the cursor
   stays black while the rest recede. */
export default function WritingIndex() {
  const [active, setActive] = useState<Essay | null>(null);

  return (
    <div className="text-body md:grid md:grid-cols-12 md:gap-x-gutter">
      <ul
        onMouseLeave={() => setActive(null)}
        className="flex flex-col gap-y-10 md:col-span-5 md:col-start-4"
      >
        {pieces.map((essay) => (
          <li key={essay.slug}>
            <Link
              href={`/writing/${essay.slug}`}
              onMouseEnter={() => setActive(essay)}
              className={`block ${
                active && active !== essay ? "text-neutral-400" : ""
              }`}
            >
              <span className="block font-medium">{essay.title}</span>
              {essay.subtitle && (
                <span className="block pt-1 leading-[1.4]">
                  {essay.subtitle}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
