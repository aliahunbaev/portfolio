"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { slugify, type Project } from "../lib/projects";

/*
 * Full-width hairline rows: title left, type right. Hovering a row swaps the
 * emphasis (title greys, type darkens) and shows the project's cover in a
 * fixed slot anchored to the bottom-right of the viewport. Scrolling
 * re-checks what sits under the resting cursor (elementFromPoint, one
 * check per frame), so the spotlight follows the rows sliding past a
 * still mouse instead of freezing on the last row it entered.
 */
export default function WorkIndex({ works }: { works: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const pos = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    let queued = false;
    const onScroll = () => {
      const { x, y } = pos.current;
      if (queued || x < 0) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const row = document
          .elementFromPoint(x, y)
          ?.closest<HTMLElement>("[data-work-row]");
        setActive(row ? (works[Number(row.dataset.workRow)] ?? null) : null);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [works]);

  return (
    <div>
      {/* All rows sit black; hovering one dims the others. */}
      <ul onMouseLeave={() => setActive(null)}>
        {works.map((project, i) => (
          <li
            key={project.title}
            className="fade-in -mx-gutter border-b border-black/10"
            style={{ animationDelay: `${i * 45}ms` }}
          >
            <Link
              href={`/work/${slugify(project.title)}`}
              data-work-row={i}
              onMouseEnter={() => setActive(project)}
              className={`grid grid-cols-12 items-baseline gap-x-gutter px-gutter py-3 text-title max-md:flex max-md:flex-wrap ${
                active && active !== project ? "text-neutral-400" : ""
              }`}
            >
              {/* Title hard left, type from col 6 — everything ends before
                  the preview zone so the image never covers text. The date
                  lives in the preview caption. */}
              <span className="col-span-6 font-medium">{project.title}</span>
              <span className="col-span-6 max-md:ml-auto">
                {project.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {active && (
        <div className="pointer-events-none fixed bottom-gutter right-gutter z-30 w-[38vw] max-md:left-gutter max-md:w-auto [@media(hover:none)]:hidden">
          <div className="relative aspect-[1.85/1] w-full overflow-hidden">
            <Image
              draggable={false}
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
