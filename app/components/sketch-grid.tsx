"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { sketches } from "../lib/sketches";

/* Strict column grid, Renell-style: fixed columns, natural image heights,
   rows bottom-aligned to a shared shelf so the white space above shorter
   images is part of the composition. Tapping opens a frosted full-screen
   gallery: arrows / swipe navigate, Escape or any tap closes. */
export default function SketchGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

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
          onClick={() => setOpen(null)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            if (start === null) return;
            const delta = e.changedTouches[0].clientX - start;
            if (Math.abs(delta) > 40) {
              e.preventDefault();
              step(delta < 0 ? 1 : -1);
            }
          }}
        >
          {/* The viewport's short axis is the constraint: landscape screens
              fix the height, portrait screens fix the width — every sketch
              occupies a consistent size while keeping its aspect. */}
          <Image
            src={sketches[open].image}
            alt={sketches[open].title}
            sizes="100vw"
            className="object-contain landscape:h-[78vh] landscape:w-auto landscape:max-w-[92vw] portrait:w-[88vw] portrait:h-auto portrait:max-h-[80vh]"
          />
          {/* Renell-style framing: nav above, fixed caption rail below. */}
          <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-gutter px-gutter pb-3 text-body">
            <p>
              {sketches[open].title}
              {sketches[open].note ? ` — ${sketches[open].note}` : ""}
            </p>
            <p>
              {open + 1} / {sketches.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
