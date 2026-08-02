"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "../lib/projects";

/*
 * Meta uses a 3-column grid: the wide (2-col) track holds title/description,
 * the narrow (1-col) track holds date/category.
 * Desktop: narrow track left (cols 1-4 of the page grid), image right.
 * Mobile: image first, then meta below with the wide track on the left and
 * date/category right-aligned on the right.
 */
export default function ProjectRow({ project }: { project: Project }) {
  const labelRef = useRef<HTMLSpanElement>(null);

  function moveLabel(e: React.MouseEvent<HTMLAnchorElement>) {
    const label = labelRef.current;
    if (!label) return;
    label.style.left = `${e.clientX}px`;
    label.style.top = `${e.clientY}px`;
  }

  return (
    <article className="max-md:flex max-md:flex-col md:grid md:grid-cols-12 md:gap-x-gutter">
      {/* Starts 48px above the image on desktop and stays sticky while the
          row scrolls. */}
      <div className="max-md:order-2 md:col-span-4 md:-mt-12 md:self-stretch">
        <div className="grid grid-cols-3 gap-x-gutter gap-y-4 text-sm leading-none max-md:pt-4 md:sticky md:top-0 md:pt-12">
          <p className="col-span-2 row-start-1 font-medium max-md:col-start-1 md:col-start-2">
            {project.title}
          </p>
          <p className="row-start-1 font-medium max-md:col-start-3 max-md:text-right md:col-start-1">
            {project.date}
          </p>
          <p className="col-span-2 row-start-2 max-md:col-start-1 md:col-start-2">
            {project.description}
          </p>
          <p className="row-start-2 max-md:col-start-3 max-md:text-right md:col-start-1">
            {project.category}
          </p>
        </div>
      </div>
      <a
        href="#"
        className="group relative block aspect-[1.85/1] cursor-none overflow-hidden max-md:order-1 md:col-span-8"
        onMouseMove={moveLabel}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 67vw"
          className="object-cover"
          style={{ objectPosition: project.objectPosition }}
        />
        {/* Follows the cursor via onMouseMove; visibility is pure CSS :hover.
            Fixed positioning keeps it pinned to the cursor while scrolling
            (the cursor doesn't move relative to the viewport on scroll). */}
        <span
          ref={labelRef}
          className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium leading-none text-white opacity-0 mix-blend-exclusion transition-opacity duration-150 group-hover:opacity-100"
        >
          View Project
        </span>
      </a>
    </article>
  );
}
