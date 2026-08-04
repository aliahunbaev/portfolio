"use client";

import { useEffect, useRef } from "react";

/* One label for the whole site. Position, text and visibility update only
   on mouse movement — never on scroll — so the label holds steady while
   the page moves under a resting cursor, instead of flickering as each
   row's own :hover state changes. Any element can claim it with
   data-cursor-label="…". */
export default function CursorLabel() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      const host = (e.target as Element | null)?.closest?.(
        "[data-cursor-label]",
      );
      const text = host?.getAttribute("data-cursor-label");
      if (text) {
        el.textContent = text;
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
      }
    };
    const hide = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[60] ml-2 mt-2 whitespace-nowrap text-body font-medium text-white opacity-0 mix-blend-exclusion [@media(hover:none)]:hidden"
    />
  );
}
