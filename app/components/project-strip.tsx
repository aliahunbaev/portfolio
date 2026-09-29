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

export default function ProjectStrip({
  project,
  align = "left",
}: {
  project: Project;
  /** Which half of the grid the caption occupies on desktop. */
  align?: "left" | "right";
}) {
  const items = project.homeRow;
  if (!items?.length) return <ProjectRow project={project} />;

  const href = `/work/${slugify(project.title)}`;
  // True proportions, no crop: widths in ratio so one height is shared.
  const shaped = (item: { w: number; h: number }) => item.w / item.h;
  const ratioSum = items.reduce((sum, item) => sum + shaped(item), 0);
  const half = project.homeSpan === "half";
  const disciplines = project.disciplines
    ?.split(",")
    .map((d) => d.trim())
    .join(" · ");

  return (
    <article>
      {/* Desktop caption: title and disciplines, then one line. It sits
          in the left or right half of the grid so rows alternate; a
          half-width project's caption fills its own column. */}
      <div
        className={`grid gap-x-gutter text-body max-md:hidden ${
          half
            ? "grid-cols-6"
            : `grid-cols-12 ${align === "right" ? "[&>*]:col-start-7" : ""}`
        }`}
      >
        <div className={`${half ? "col-span-6" : "col-span-6"} grid grid-cols-6 gap-x-gutter`}>
          <div className="col-span-2 space-y-1">
            <p className="font-medium">{project.title}</p>
            {disciplines && <p>{disciplines}</p>}
          </div>
          <p className="col-span-4 leading-[1.4]">{project.description}</p>
        </div>
      </div>
      {/* Half-width strips share one fixed shape so a pair sits level;
          tiles fill the height and trim a sliver if their sum differs. */}
      <Link
        href={href}
        data-cursor-label="View Project"
        className="mt-8 flex cursor-none items-stretch gap-x-gutter max-md:hidden"
        style={half ? { aspectRatio: "2.2 / 1" } : undefined}
      >
        {items.map((item) => {
          const ratio = shaped(item);
          return (
            <div
              key={item.src}
              style={{ flexGrow: ratio, flexBasis: 0, minWidth: 0 }}
            >
              <div
                className="relative w-full overflow-hidden bg-black/[0.04]"
                style={half ? { height: "100%" } : { aspectRatio: `${ratio} / 1` }}
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
      <div className="pt-4 text-body md:hidden">
        <p className="font-medium">{project.title}</p>
        <p className="pt-2 leading-[1.4]">{firstSentence(project.description)}</p>
      </div>
    </article>
  );
}
