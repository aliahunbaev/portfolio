"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* The project page's left rail: Back on top, then one anchor per
   section. The section currently in view holds black; the rest recede
   to gray — the site's standard state language. Clicking scrolls (CSS
   scroll-behavior handles the motion). */
export default function AnchorRail({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    if (!sections.length) return;
    const onScroll = () => {
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 200) current = s.id;
      }
      // Pinned to the end of the page counts as the last section.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4)
        current = sections[sections.length - 1].id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <nav className="flex flex-col gap-2">
      <Link href="/archive" className="w-fit pb-6 hover:text-neutral-400">
        Back
      </Link>
      {sections.map(({ id, title }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`w-fit ${
            active === id ? "text-black" : "text-black/40 hover:text-black"
          }`}
        >
          {title}
        </a>
      ))}
    </nav>
  );
}
