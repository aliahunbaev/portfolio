"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { sketches } from "../lib/sketches";

/* Strict column grid, Renell-style: fixed columns, natural image heights,
   rows bottom-aligned to a shared shelf so the white space above shorter
   images is part of the composition. Tapping opens a full-screen gallery:
   tap/click halves or arrow keys page through; nav or Escape exits. */
export default function SketchGrid() {
  const [open, setOpen] = useState<number | null>(null);

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
      <div className="grid grid-cols-2 items-end gap-x-gutter gap-y-16 md:grid-cols-4">
        {sketches.map((sketch, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            className="block w-full"
          >
            <Image
              src={sketch.image}
              alt={sketch.title}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="h-auto w-full"
            />
          </button>
        ))}
      </div>
      {open !== null && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-white px-gutter"
        >
          {/* The viewport's short axis is the constraint: landscape screens
              fix the height, portrait screens run edge-to-edge minus the
              gutter — every sketch occupies a consistent size. */}
          <Image
            src={sketches[open].image}
            alt={sketches[open].title}
            sizes="100vw"
            className="object-contain landscape:h-[78vh] landscape:w-auto landscape:max-w-[92vw] portrait:h-auto portrait:w-full portrait:max-h-[80vh]"
          />
          {/* Tapping left/right halves pages through on every device;
              exits are the nav (always visible) and Escape. */}
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
          {/* Meta rail left on desktop (SODAA), bottom-left on mobile;
              the counter anchors bottom-center everywhere. */}
          <div className="absolute left-gutter top-30 text-body max-md:hidden">
            <p>{sketches[open].title}</p>
            <p className="pt-1">{sketches[open].date}</p>
            {sketches[open].note && (
              <p className="max-w-[16rem] pt-4 leading-[1.4]">
                {sketches[open].note}
              </p>
            )}
          </div>
          <p className="absolute bottom-3 left-gutter max-w-[45%] text-body leading-[1.4] md:hidden">
            {sketches[open].title}
            {sketches[open].note ? ` — ${sketches[open].note}` : ""}
          </p>
          <p className="absolute bottom-3 text-body max-md:right-gutter md:inset-x-0 md:text-center">
            {open + 1} / {sketches.length}
          </p>
        </div>
      )}
    </>
  );
}
