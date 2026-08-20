"use client";

import { useEffect, useState } from "react";

/* Load-in on every full page load (lives in the layout, so client-side
   navigation never retriggers it): the name fades in vertically centered,
   the tagline fades in on the right, the band rises to the nav line on a
   single transform, then the overlay fades into the page.
   ?intro=slow runs it at 3x for preview. */
export default function IntroLoader() {
  const [phase, setPhase] = useState<
    "blank" | "name" | "tagline" | "rise" | "fade" | "done"
  >("blank");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("intro");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    const k = param === "slow" ? 3 : 1;
    const timers = [
      setTimeout(() => setPhase("name"), 120),
      setTimeout(() => setPhase("tagline"), 900 * k),
      setTimeout(() => setPhase("rise"), 2000 * k),
      setTimeout(() => setPhase("fade"), 2800 * k),
      setTimeout(() => setPhase("done"), 3200 * k),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "done") return null;

  const risen = phase === "rise" || phase === "fade";

  return (
    <div
      className={`fixed inset-0 z-[70] bg-white transition-opacity duration-300 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 flex items-center justify-between px-gutter py-1 text-body font-medium ${
          phase === "blank" || phase === "name"
            ? ""
            : "transition-transform duration-700 ease-in-out"
        } ${risen ? "translate-y-0" : "translate-y-[calc(50vh-50%)]"}`}
      >
        <span
          className={`transition-opacity duration-700 ${
            phase === "blank" ? "opacity-0" : "opacity-100"
          }`}
        >
          Ali Ahunbáev
        </span>
        <span
          className={`transition-opacity duration-[800ms] ${
            phase === "blank" || phase === "name" ? "opacity-0" : "opacity-100"
          }`}
        >
          Artist and Product Designer
        </span>
      </div>
    </div>
  );
}
