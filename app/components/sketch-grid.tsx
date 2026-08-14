"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { sketches, type Sketch } from "../lib/sketches";

// Hash slug per sketch (SODAA-style deep links): /sketches#sketch-004
// opens the gallery at that sketch.
const slugFor = (sketch: Sketch) =>
  sketch.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* Strict column grid, Renell-style: fixed columns, natural image heights,
   rows bottom-aligned to a shared shelf so the white space above shorter
   images is part of the composition. Tapping opens a full-screen gallery:
   tap/click halves or arrow keys page through; nav or Escape exits. */
export default function SketchGrid() {
  const [open, setOpen] = useState<number | null>(null);

  // Arriving with a hash opens the gallery at that sketch.
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!slug) return;
    const i = sketches.findIndex((sk) => slugFor(sk) === slug);
    if (i >= 0) setOpen(i);
  }, []);

  // The hash tracks the open sketch and clears on close.
  useEffect(() => {
    if (open !== null) {
      history.replaceState(null, "", `#${slugFor(sketches[open])}`);
    } else if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, [open]);

  const step = useCallback((delta: number) => {
    setOpen((i) =>
      i === null ? i : (i + delta + sketches.length) % sketches.length,
    );
  }, []);

  // A vertical wheel pages through, one work per swipe-worth of scroll.
  useEffect(() => {
    if (open === null) return;
    let acc = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      acc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      clearTimeout(idle);
      idle = setTimeout(() => {
        acc = 0;
      }, 200);
      if (Math.abs(acc) > 120) {
        step(acc > 0 ? 1 : -1);
        acc = 0;
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(idle);
    };
  }, [open, step]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, step]);

  return (
    <>
      <div className="grid grid-cols-2 items-end gap-x-gutter gap-y-16 md:grid-cols-4">
        {sketches.map((sketch, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            className="block w-full cursor-pointer"
          >
            <Image
              draggable={false}
              src={sketch.image}
              alt={sketch.title}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="h-auto w-full"
            />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-white px-gutter">
          {/* The viewport's short axis is the constraint: landscape screens
              fix the height, portrait screens run edge-to-edge minus the
              gutter — every sketch occupies a consistent size. */}
          <Image
            draggable={false}
            src={sketches[open].image}
            alt={sketches[open].title}
            sizes="100vw"
            className="object-contain landscape:h-[74vh] landscape:w-auto landscape:max-w-[92vw] portrait:h-auto portrait:w-full portrait:max-h-[74vh]"
          />
          {/* The wall label, centred under the work. */}
          <div className="pt-4 text-center text-body">
            <p>
              {sketches[open].title}, {sketches[open].date}
            </p>
            {sketches[open].note && (
              <p className="pt-1">{sketches[open].note}</p>
            )}
          </div>
          {/* Tapping left/right halves pages through on every device;
              exits are Close and Escape. */}
          <button
            type="button"
            aria-label="Previous sketch"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
          />
          <button
            type="button"
            aria-label="Next sketch"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
          />
          {/* The nav contracts to one word while inside a work. */}
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-gutter top-0 z-10 cursor-pointer py-1 text-body font-medium hover:text-neutral-400"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
