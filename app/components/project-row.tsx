"use client";

import Image from "next/image";
import { useRef } from "react";

export type Project = {
  date: string;
  title: string;
  category: string;
  description: string;
  image: string;
  /** Vertical object-position matching the crop framing in the design. */
  objectPosition: string;
};

export default function ProjectRow({ project }: { project: Project }) {
  const labelRef = useRef<HTMLSpanElement>(null);

  function moveLabel(e: React.MouseEvent<HTMLAnchorElement>) {
    const label = labelRef.current;
    if (!label) return;
    const rect = e.currentTarget.getBoundingClientRect();
    label.style.left = `${e.clientX - rect.left}px`;
    label.style.top = `${e.clientY - rect.top}px`;
  }

  return (
    <article className="md:grid md:grid-cols-12 md:gap-x-gutter">
      {/* Meta: columns 1-4, starting 2 gutters above the image and sticky
          while the row scrolls. Inner 2-col grid stays on the outer 12-col
          rhythm because both use the same gutter gap. */}
      <div className="md:col-span-4 md:-mt-12 md:self-stretch">
        <div className="grid grid-cols-2 gap-x-gutter gap-y-4 text-sm leading-none max-md:pb-5 md:sticky md:top-0 md:pt-12">
          <p className="font-medium">{project.date}</p>
          <p className="font-medium">{project.title}</p>
          <p>{project.category}</p>
          <p>{project.description}</p>
        </div>
      </div>
      <a
        href="#"
        className="group relative block aspect-[1.85/1] cursor-none overflow-hidden md:col-span-8"
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
        {/* Follows the cursor via onMouseMove; visibility is pure CSS :hover. */}
        <span
          ref={labelRef}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium leading-none text-white opacity-0 mix-blend-exclusion transition-opacity duration-150 group-hover:opacity-100"
        >
          View Project
        </span>
      </a>
    </article>
  );
}
