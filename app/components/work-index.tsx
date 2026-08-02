"use client";

import Image from "next/image";
import { useState } from "react";
import { projects, type Project } from "../lib/projects";

// The homepage rows feature some projects more than once with different
// imagery; the index lists each work once (first occurrence wins), newest
// first.
const works = projects
  .filter((p, i, arr) => arr.findIndex((q) => q.title === p.title) === i)
  .sort(
    (a, b) =>
      (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0),
  );

/*
 * Full-width hairline rows: title left, type right. Hovering a row swaps the
 * emphasis (title greys, type darkens) and shows the project's cover in a
 * fixed slot anchored to the bottom-right of the viewport.
 */
export default function WorkIndex() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div>
      <ul onMouseLeave={() => setActive(null)}>
        {works.map((project) => (
          <li key={project.title} className="border-b border-black/10">
            <a
              href="#"
              onMouseEnter={() => setActive(project)}
              className="group flex items-baseline justify-between gap-gutter py-3"
            >
              <span className="text-xl font-medium leading-none group-hover:text-neutral-400">
                {project.title}
              </span>
              <span className="text-xl leading-none text-neutral-400 group-hover:text-black max-md:text-sm">
                {project.category}
              </span>
            </a>
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
