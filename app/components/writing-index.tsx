"use client";

import Link from "next/link";
import { useState } from "react";
import { pieces } from "../lib/pieces";
import type { Essay } from "../lib/all-writing";

// Month and year for the shelf; the full date lives on the essay page.
const shelfDate = (essay: Essay) => {
  const [month, , year] = essay.date.split(" ");
  return `${month} ${year}`;
};

/* A quiet list in the middle of the page, in the site's grammar:
   apparatus left, content right — the date sits in its own column
   beside each entry, title in medium with subtitle in regular beneath,
   spotlight hover receding the rest. */
export default function WritingIndex() {
  const [active, setActive] = useState<Essay | null>(null);

  return (
    <div className="text-body md:grid md:grid-cols-12 md:gap-x-gutter">
      <ul
        onMouseLeave={() => setActive(null)}
        className="flex flex-col gap-y-10 md:col-span-6 md:col-start-4"
      >
        {pieces.map((essay) => (
          <li key={essay.slug}>
            <Link
              href={`/writing/${essay.slug}`}
              onMouseEnter={() => setActive(essay)}
              className={`grid grid-cols-6 gap-x-gutter ${
                active && active !== essay ? "text-neutral-400" : ""
              }`}
            >
              <span className="col-span-2 max-md:col-span-6 max-md:pb-1">
                {shelfDate(essay)}
              </span>
              <span className="col-span-4 max-md:col-span-6">
                <span className="block font-medium">{essay.title}</span>
                {essay.subtitle && (
                  <span className="block pt-1 leading-[1.4]">
                    {essay.subtitle}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
