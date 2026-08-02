"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { slugify, works, type Project } from "../lib/projects";

/*
 * Full-width hairline rows: title left, type right. Hovering a row swaps the
 * emphasis (title greys, type darkens) and shows the project's cover in a
 * fixed slot anchored to the bottom-right of the viewport.
 */
export default function WorkIndex() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div>
      {/* All rows sit black; hovering one dims the others. */}
      <ul onMouseLeave={() => setActive(null)}>
        {works.map((project) => (
          <li key={project.title} className="border-b border-black/10">
            <Link
              href={`/work/${slugify(project.title)}`}
              onMouseEnter={() => setActive(project)}
              className={`grid grid-cols-12 items-baseline gap-x-gutter py-3 text-title max-md:flex max-md:flex-wrap ${
                active && active !== project ? "text-neutral-400" : ""
              }`}
            >
              {/* Title hard left, type from col 6 — everything ends before
                  the preview zone so the image never covers text. The date
                  lives in the preview caption. */}
              <span className="col-span-5 font-medium">{project.title}</span>
              <span className="col-span-7 max-md:ml-auto">
                {project.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {active && (
        <div className="pointer-events-none fixed bottom-gutter right-gutter z-30 w-[38vw] max-md:hidden">
          <div className="relative aspect-[1.85/1] w-full overflow-hidden">
            <Image
              key={active.image}
              src={active.image}
              alt={active.title}
              fill
              sizes="38vw"
              className="object-cover"
              style={{ objectPosition: active.objectPosition }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
