"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

const SWAP_MS = 200;
const FADE_MS = 560;

/* The Favorite-style opening (mechanics borrowed from its IntroOverlay):
   a handful of images flash one per beat at the centre of a white veil —
   the first wipes in — then the veil holds a beat and fades away, so the
   page arrives through the fade rather than snapping in. Runs once per
   session; skipped under reduced motion. The veil is server-rendered so
   a first visit never shows the page before the shuffle. */
export default function FlashIntro({
  images,
  sessionKey = "flash-intro-seen",
}: {
  images: StaticImageData[];
  sessionKey?: string;
}) {
  const [phase, setPhase] = useState<"veil" | "flash" | "fading" | "done">(
    "veil",
  );
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  // Once this mount claims the intro, StrictMode's dev double-invoke must
  // re-arm instead of bailing on the session guard (Favorite's trick).
  const claimed = useRef(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (!claimed.current && sessionStorage.getItem(sessionKey))
    ) {
      setPhase("done");
      return;
    }
    claimed.current = true;
    sessionStorage.setItem(sessionKey, "1");
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
      if (!alive) return;
      setPhase("flash");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setRevealed(true)),
      );
    });
    return () => {
      alive = false;
    };
  }, [images, sessionKey]);

  useEffect(() => {
    if (phase !== "flash") return;
    const t = window.setTimeout(() => {
      if (idx < images.length - 1) setIdx(idx + 1);
      else setPhase("fading");
    }, SWAP_MS);
    return () => window.clearTimeout(t);
  }, [phase, idx, images.length]);

  useEffect(() => {
    if (phase !== "fading") return;
    const t = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-white"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-out`,
      }}
    >
      {phase !== "veil" && (
        <div
          className="flex items-center justify-center"
          style={{
            clipPath: revealed ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
            transition: "clip-path 280ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          <Image
            src={images[idx]}
            alt=""
            priority
            // The originals are what the preloader warmed — serve exactly
            // those, so every beat of the shuffle lands with pixels ready.
            unoptimized
            className="max-h-[44vh] w-auto max-w-[70vw] object-contain"
          />
        </div>
      )}
    </div>
  );
}
