"use client";

import Image from "next/image";
import Link from "next/link";
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
      <div className="grid grid-cols-2 items-end gap-gutter md:grid-cols-5">
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
        <div className="fixed inset-0 z-[55] bg-white">
          {/* The site chrome yields: name home-link left, Close right. */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-gutter py-1 text-body font-medium">
            <Link href="/" className="hover:text-neutral-400">
              Ali Ahunbáev
            </Link>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="cursor-pointer hover:text-neutral-400"
            >
              Close
            </button>
          </div>
          {/* The stage: wide on desktop, vertical on mobile. The work
              expands to hit whichever edges its ratio reaches first. */}
          <div className="absolute inset-x-gutter top-[10vh] bottom-[14vh] md:inset-x-[8vw]">
            <Image
              draggable={false}
              src={sketches[open].image}
              alt={sketches[open].title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            aria-label="Previous sketch"
            onClick={(e) => {
              e.currentTarget.blur();
              step(-1);
            }}
            className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize outline-none"
          />
          <button
            type="button"
            aria-label="Next sketch"
            onClick={(e) => {
              e.currentTarget.blur();
              step(1);
            }}
            className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize outline-none"
          />
          {/* The wall label — fixed to the bottom, centred, Renell-wise. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-body">
            <p>
              {sketches[open].title}, {sketches[open].date}
            </p>
            {sketches[open].note && (
              <p className="pt-1">{sketches[open].note}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
