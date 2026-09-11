"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ProjectRow from "./project-row";
import { slugify, type Project } from "../lib/projects";

/*
 * The strip homepage row: a caption line above (date/category in the
 * narrow track, title/description in the wide one, ProjectRow's meta
 * grammar laid horizontally), then the curated homeRow assets side by
 * side at natural proportions across the full page width — the row
 * block from the case-study pages, promoted to the homepage.
 *
 * Mobile is unchanged from ProjectRow: one square cover (or preview
 * loop), meta below. The desktop strip is display:none there, and
 * strip videos only load once actually on screen, so hidden cells
 * cost mobile nothing.
 */

/* A loop that fetches nothing until it scrolls into view — display:none
   never intersects, so the wrong viewport's copy stays cold. */
function StripVideo({
  src,
  poster,
  objectPosition,
}: {
  src: string;
  poster?: string;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.muted = true;
        if (entry.isIntersecting) {
          if (!el.src) el.src = el.dataset.src ?? "";
          el.play().catch(() => {});
        } else if (!el.paused) el.pause();
      },
      { rootMargin: "25%" },
    );
    observer.observe(el);
    // iOS Low Power Mode blocks muted autoplay; a gesture lifts it.
    const unlock = () => {
      if (el.paused && el.src) el.play().catch(() => {});
    };
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("click", unlock, { once: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
    };
  }, []);

  return (
    <video
      ref={ref}
      data-src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition }}
    />
  );
}

/** The first sentence, for the mobile card — the full blurb stays on
 *  desktop where the caption band gives it room. */
const firstSentence = (s: string) => {
  const i = s.indexOf(". ");
  return i === -1 ? s : s.slice(0, i + 1);
};

export default function ProjectStrip({ project }: { project: Project }) {
  const items = project.homeRow;
  if (!items?.length) return <ProjectRow project={project} />;

  const href = `/work/${slugify(project.title)}`;
  const ratioSum = items.reduce((sum, item) => sum + item.w / item.h, 0);

  return (
    <article>
      {/* Desktop: the caption line, then the full-width strip. */}
      <div className="grid grid-cols-12 gap-x-gutter text-body max-md:hidden">
        {/* Three columns, one job each: when · what it is + what was
            done · what happened. Disciplines interpunct-separated, the
            essay-rail metadata grammar. */}
        <div className="col-span-2 space-y-1">
          <p className="font-medium">{project.date}</p>
          <p>{project.category}</p>
        </div>
        <div className="col-span-4 col-start-3 space-y-1">
          <p className="font-medium">{project.title}</p>
          {project.disciplines && (
            <p>
              {project.disciplines
                .split(",")
                .map((d) => d.trim())
                .join(" · ")}
            </p>
          )}
        </div>
        <p className="col-span-4 col-start-7 leading-[1.4]">
          {project.description}
        </p>
      </div>
      <Link
        href={href}
        data-cursor-label="View Project"
        className="mt-8 flex cursor-none items-stretch gap-x-gutter max-md:hidden"
      >
        {items.map((item) => {
          const ratio = item.w / item.h;
          return (
            <div
              key={item.src}
              style={{ flexGrow: ratio, flexBasis: 0, minWidth: 0 }}
            >
              <div
                className="relative w-full overflow-hidden bg-black/[0.04]"
                style={{ aspectRatio: `${item.w} / ${item.h}` }}
              >
                {item.type === "video" ? (
                  <StripVideo src={item.src} poster={item.poster} />
                ) : (
                  <Image
                    draggable={false}
                    src={item.src}
                    alt={project.title}
                    fill
                    sizes={`${Math.max(10, Math.round((ratio / ratioSum) * 100))}vw`}
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}
      </Link>
      {/* Mobile: ProjectRow verbatim — square first, meta below. */}
      <Link
        href={href}
        data-cursor-label="View Project"
        className="relative block aspect-[1.85/1] cursor-none overflow-hidden md:hidden"
      >
        {project.previewVideo ? (
          <StripVideo
            src={project.previewVideo}
            poster={project.previewPoster}
            objectPosition={project.objectPosition}
          />
        ) : (
          <Image
            draggable={false}
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: project.objectPosition }}
          />
        )}
      </Link>
      <div className="grid grid-cols-3 gap-x-gutter gap-y-4 pt-4 text-body md:hidden">
        <p className="col-span-2 col-start-1 row-start-1 font-medium">
          {project.title}
        </p>
        <p className="col-start-3 row-start-1 text-right font-medium">
          {project.date}
        </p>
        {/* The disciplines ride between title and blurb, the medium
            beside them — the caption band's facts, stacked. */}
        {project.disciplines && (
          <p className="col-span-2 col-start-1 row-start-2">
            {project.disciplines
              .split(",")
              .map((d) => d.trim())
              .join(" · ")}
          </p>
        )}
        <p className="col-start-3 row-start-2 text-right">{project.category}</p>
        <p className="col-span-2 col-start-1 row-start-3 leading-[1.4]">
          {firstSentence(project.description)}
        </p>
      </div>
    </article>
  );
}
