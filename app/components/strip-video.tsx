"use client";

import { useEffect, useRef } from "react";

/* A silent loop that fetches nothing until it scrolls into view —
   display:none never intersects, so a hidden breakpoint's copy stays
   cold. Fills its positioned parent, object-cover. */
export default function StripVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
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
    />
  );
}
