"use client";

import { useEffect, useRef } from "react";

/* Silent looping cover video. Muted autoplay is normally allowed, but
   iOS Low Power Mode (and some data-saver settings) block even that and
   paint a play glyph. A user gesture lifts the block, so the first touch
   or click anywhere retries playback. */
export default function PreviewVideo({
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
    el.muted = true;
    if (el.paused) el.play().catch(() => {});

    const unlock = () => {
      if (el.paused) el.play().catch(() => {});
    };
    window.addEventListener("touchstart", unlock, {
      once: true,
      passive: true,
    });
    window.addEventListener("click", unlock, { once: true });
    return () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition }}
    />
  );
}
