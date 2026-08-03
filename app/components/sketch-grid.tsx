"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { sketches } from "../lib/sketches";

/* Masonry of natural-aspect sketches; tapping one opens a frosted
   full-screen gallery. Arrows / swipe navigate, Escape or any tap closes. */
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
      <div className="columns-2 gap-gutter md:columns-4">
        {sketches.map((sketch, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            className="mb-gutter block w-full break-inside-avoid"
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
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white/75 px-gutter backdrop-blur-xl backdrop-saturate-150"
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
          <Image
            src={sketches[open].image}
            alt={sketches[open].title}
            sizes="90vw"
            className="max-h-[80vh] w-auto max-w-full object-contain"
          />
          <p className="pt-4 text-body">
            {open + 1} / {sketches.length}
          </p>
        </div>
      )}
    </>
  );
}
