"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

/* The Favorite-style opening: a handful of images flash one at a time
   at the centre of a white veil — a deck being shuffled — then the veil
   lifts and the page reveals itself. The veil is server-rendered so the
   page never shows before the flash. Skipped under reduced motion. */
export default function FlashIntro({
  images,
  interval = 110,
}: {
  images: StaticImageData[];
  interval?: number;
}) {
  // -1: preloading behind the veil; images.length: done, veil lifted.
  const [i, setI] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(images.length);
      return;
    }
    let alive = true;
    const preloads = images.map(
      (m) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = m.src;
        }),
    );
    // Start once the deck is ready — or after 2s, whichever comes first.
    Promise.race([
      Promise.all(preloads),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]).then(() => {
      if (alive) setI(0);
    });
    return () => {
      alive = false;
    };
  }, [images]);

  useEffect(() => {
    if (i < 0 || i >= images.length) return;
    const t = window.setTimeout(() => setI(i + 1), interval);
    return () => window.clearTimeout(t);
  }, [i, images.length, interval]);

  if (i >= images.length) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-white">
      {i >= 0 && (
        <Image
          src={images[i]}
          alt=""
          priority
          // The originals are what the preloader warmed — serve exactly
          // those, so every beat of the shuffle lands with pixels ready.
          unoptimized
          className="max-h-[44vh] w-auto max-w-[70vw] object-contain"
        />
      )}
    </div>
  );
}
