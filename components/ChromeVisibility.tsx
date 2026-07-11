"use client";

import { useEffect } from "react";

/* Scrolling down past the opening hides the top chrome (stamp + nav) so the
 * page can be read immersed; any scroll upward brings it back. The state
 * lives as a body attribute the fixtures' CSS reacts to. */
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
