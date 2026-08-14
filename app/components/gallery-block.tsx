"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/* A bounded artifact — a deck, a document, a carousel — shown in the
   page as one tile and opened into the site's gallery ritual: white
   room, click halves or arrow keys to page (wrapping within the
   object), Close top-right, Escape, counter at the bottom. */
export default function GalleryBlock({
  title,
  images,
  className = "",
}: {
  title: string;
  images: string[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) => {
      setOpen((i) =>
        i === null ? i : (i + delta + images.length) % images.length,
      );
    },
    [images.length],
  );

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
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(0)}
        data-cursor-label={`View ${title}`}
        className="relative block aspect-[1.85/1] w-full cursor-none overflow-hidden bg-black/[0.04] max-md:cursor-pointer"
      >
        <Image
          draggable={false}
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 67vw"
          className="object-cover"
        />
      </button>
      <p className="pt-3">
        <span className="font-medium">{title}</span> — {images.length} pages
      </p>
      {open !== null && (
        <div className="fixed inset-0 z-30 bg-white">
          {/* The image field clears the nav line above and the counter
              line below; object-contain centers any aspect. */}
          <div className="absolute inset-x-gutter inset-y-16">
            <Image
              draggable={false}
              key={images[open]}
              src={images[open]}
              alt={`${title}, ${open + 1} of ${images.length}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => step(-1)}
            className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
          />
          <button
            type="button"
            aria-label="Next"
            onClick={() => step(1)}
            className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
          />
          {/* Same anatomy as sketches: context top-left, exit top-right,
              counter bottom. */}
          <p className="absolute left-gutter top-30 text-body max-md:top-16">
            {title}
          </p>
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-gutter top-30 z-10 cursor-pointer text-body hover:text-neutral-400 max-md:top-16"
          >
            Close
          </button>
          <p className="absolute bottom-3 text-body max-md:right-gutter md:inset-x-0 md:text-center">
            {open + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
