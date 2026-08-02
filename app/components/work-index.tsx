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
 * Text-first archive: a typographic list of titles on the left, and a fixed
 * preview slot on the right (cols 8-12) where the hovered project's cover,
 * date/type, and description appear. The preview persists until another row
 * is hovered so the slot never sits empty.
 */
export default function WorkIndex() {
  const [active, setActive] = useState<Project>(works[0]);

  return (
    <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
      <ul className="flex flex-col gap-2 md:col-span-7">
        {works.map((project) => (
          <li key={project.title}>
            <a
              href="#"
              onMouseEnter={() => setActive(project)}
              className="group flex items-baseline justify-between gap-gutter"
            >
              <span className="text-2xl font-medium leading-none group-hover:text-neutral-400 max-md:text-xl">
                {project.title}
              </span>
              <span className="text-sm leading-none text-neutral-400 md:hidden">
                {project.date}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="max-md:hidden md:col-span-5 md:col-start-8">
        <div className="sticky top-12">
          <div className="relative aspect-[1.85/1] w-full overflow-hidden">
            <Image
              key={active.image}
              src={active.image}
              alt={active.title}
              fill
              sizes="(max-width: 768px) 0px, 42vw"
              className="object-cover"
              style={{ objectPosition: active.objectPosition }}
            />
          </div>
          <div className="grid grid-cols-5 gap-x-gutter pt-4 text-sm leading-none">
            <p className="col-span-2 font-medium">{active.date}</p>
            <p className="col-span-3 font-medium">{active.category}</p>
            <p className="col-span-3 col-start-3 pt-4">{active.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
