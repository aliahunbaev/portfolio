"use client";

import { useEffect, useRef } from "react";

/* One label for the whole site; any element claims it with
   data-cursor-label="…". The label tracks what is truly under the
   cursor: mouse movement updates it directly, and scrolling re-checks
   the resting cursor's point (elementFromPoint, one check per frame) —
   so scrolling a strip out from under the cursor drops the label in
   the gap, and the next strip arriving picks it back up. */
export default function CursorLabel() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = -1;
    let y = -1;

    const apply = (target: Element | null) => {
      const text = target
        ?.closest?.("[data-cursor-label]")
        ?.getAttribute("data-cursor-label");
      if (text) {
        el.textContent = text;
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      apply(e.target as Element | null);
    };

    // During scroll no mouse events fire, so ask what sits under the
    // resting cursor instead. rAF-gated: one hit test per frame.
    let queued = false;
    const onScroll = () => {
      if (queued || x < 0) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        apply(document.elementFromPoint(x, y));
      });
    };

    const hide = () => {
      x = -1;
      y = -1;
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[60] ml-2 -translate-y-1/2 whitespace-nowrap text-body font-medium text-white opacity-0 mix-blend-exclusion [@media(hover:none)]:hidden"
    />
  );
}
