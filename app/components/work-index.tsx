"use client";

import Image from "next/image";
import { useState } from "react";
import { works, type Project } from "../lib/projects";

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
            <a
              href="#"
              onMouseEnter={() => setActive(project)}
              className={`flex items-baseline justify-between gap-x-gutter py-3 text-title max-md:flex-wrap ${
                active && active !== project ? "text-neutral-400" : ""
              }`}
            >
              <span className="font-medium">{project.title}</span>
              {/* ml-auto keeps the type right-aligned even when it wraps to
                  its own line on narrow screens. */}
              <span className="ml-auto">{project.category}</span>
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
