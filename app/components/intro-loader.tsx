"use client";

import { useEffect, useState } from "react";

/* Load-in: the name appears vertically centered, the tagline fades in on
   the right, the band rises to the nav line, then the overlay fades and
   the page appears. Homepage only, once per session.
   ?intro replays it; ?intro=slow runs it at 3x length. */
export default function IntroLoader() {
  const [phase, setPhase] = useState<
    "name" | "tagline" | "rise" | "fade" | "done"
  >("name");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("intro");
    const replay = new URLSearchParams(window.location.search).has("intro");
    if (
      (!replay && sessionStorage.getItem("introSeen")) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("introSeen", "1");
    const k = param === "slow" ? 3 : 1;
    const timers = [
      setTimeout(() => setPhase("tagline"), 500 * k),
      setTimeout(() => setPhase("rise"), 1500 * k),
      setTimeout(() => setPhase("fade"), 2300 * k),
      setTimeout(() => setPhase("done"), 2700 * k),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[70] bg-white transition-opacity duration-300 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`absolute inset-x-0 flex items-center justify-between px-gutter py-1 text-body font-medium transition-[top,transform] duration-700 ease-in-out ${
          phase === "rise" || phase === "fade"
            ? "top-0 translate-y-0"
            : "top-1/2 -translate-y-1/2"
        }`}
      >
        <span>Ali Ahunbáev</span>
        <span
          className={`transition-opacity duration-500 ${
            phase === "name" ? "opacity-0" : "opacity-100"
          }`}
        >
          Artist &amp; Product Designer
        </span>
      </div>
    </div>
  );
}
