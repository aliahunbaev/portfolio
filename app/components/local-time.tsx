"use client";

import { useEffect, useState } from "react";

const ZONE = "America/New_York";

/* Ali's local date and time, so a visitor anywhere knows where he is.
   Rendered only after mount — the server's clock and zone would differ
   from the browser's and mismatch on hydration. Isolated in its own
   component so the per-second tick doesn't re-render the whole nav. */
export default function LocalTime() {
  const [stamp, setStamp] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", {
        timeZone: ZONE,
        month: "long",
        day: "numeric",
      });
      const time = now.toLocaleTimeString("en-US", {
        timeZone: ZONE,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      });
      setStamp(`${date}, ${time}, Manhattan, New York`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Reserve the row so the nav doesn't shift when the clock arrives.
  return <span className="max-md:hidden">{stamp ?? " "}</span>;
}
