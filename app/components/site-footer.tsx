"use client";

import { useEffect, useState } from "react";

// The places off the site, spread the way the nav spreads the places on
// it. X and LinkedIn join when their handles land.
const LINKS: [string, string][] = [
  ["Email", "mailto:alizahunbaev@gmail.com"],
  ["Instagram", "https://instagram.com/alizahunbaev"],
  ["YouTube", "https://youtube.com/@playfighter"],
];

/* The footer is a place, not a line: a final band opening with the
   outbound links high enough to hit comfortably, then the name at
   monumental scale — the site opens with it small in the nav corner and
   closes with it huge — over a base line carrying the city, the hour,
   and the year. */
export default function SiteFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <footer className="mt-auto border-t border-black/10 px-gutter pb-gutter text-body">
      <div className="flex items-baseline justify-between py-1 font-medium max-md:flex-wrap max-md:gap-x-6">
        {LINKS.map(([label, href]) => (
          <a
            key={href}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="hover:text-neutral-400"
          >
            {label}
          </a>
        ))}
      </div>
      <p className="select-none whitespace-nowrap pt-16 text-center text-[11vw] font-medium leading-[0.9] tracking-[-0.02em]">
        Ali Ahunbáev
      </p>
      <div className="flex items-baseline justify-between pt-10">
        <p>New York{time ? ` · ${time}` : ""}</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
