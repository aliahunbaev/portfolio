"use client";

import { useEffect } from "react";

/* Project pages only: scrolling down past the hero hides the top chrome
 * (stamp + nav) so the case study reads immersed; any scroll upward brings
 * it back. The state lives as a body attribute the fixtures' CSS reacts
 * to, and unmounting (leaving the page) always restores the chrome. */
export default function ChromeVisibility() {
  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > last + 6 && y > 240) {
        document.body.setAttribute("data-chrome-hidden", "");
      } else if (y < last - 6 || y <= 240) {
        document.body.removeAttribute("data-chrome-hidden");
      }
      last = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.removeAttribute("data-chrome-hidden");
    };
  }, []);

  return null;
}
