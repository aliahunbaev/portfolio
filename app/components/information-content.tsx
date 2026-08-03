"use client";

import Link from "next/link";
import { useState } from "react";

// All copy is placeholder in the site's voice — rewrite freely.

const more = [
  "He started college at fifteen, taking community college classes with zero bills, zero pressure, and an empty social circle — a comfortable life that made him miserable. During classes, in the car, and in the gym he listened to biographies that stretched his imagination far beyond his reality, and decided comfort was the wrong thing to optimize for.",
  "In August 2025 he moved to New York with a simple thesis: New York or nowhere. The first weeks were spent talking to strangers, walking the city, and writing about it — the beginning of a weekly practice of thinking in public that has since grown past twenty essays.",
  "Combat Créatif is the studio that holds it all together — a practice built on the conviction that pressure is a privilege, and that the work is already inside the block.",
];

const links: [string, string][] = [
  ["@alizahunbaev", "https://instagram.com/alizahunbaev"],
  ["@combatcreatif", "https://instagram.com/combatcreatif"],
];

/* Renell anatomy: dense big-text bio, a gray Read more that blacks on
   hover and expands the story inline, then the handles. */
export default function InformationContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="px-gutter pb-24 pt-30 text-body">
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="text-title font-medium leading-[1.1] md:col-span-8">
          <p>
            Ali Ahunbáev is an artist and product designer in New York —
            founder and director of{" "}
            <a
              href="https://combatcreatif.com"
              target="_blank"
              rel="noopener"
              className="whitespace-nowrap rounded-[0.25em] bg-black/[0.07] px-[0.15em] font-fraktion text-[0.92em] uppercase hover:bg-[#B7C29A]"
            >
              Combat Créatif
            </a>
            , a studio built on the belief that philosophy and beautiful
            utility belong in the same object. His current work spans Marble, a
            training app that treats the body the way philosophy treats the
            mind; The Art Movement, a series of exhibitions and rooftop
            gatherings for artists in the city; and Beau Flâneur, a fashion
            project about wandering.
          </p>
          <p className="pt-8">
            He is on leave from New York University, focused on doing great
            work and connecting with brilliant people, and writes weekly at
            PLAYFIGHTER.
          </p>
          {expanded &&
            more.map((paragraph, i) => (
              <p key={i} className="pt-8">
                {paragraph}
              </p>
            ))}
          {/* Sits flush on the next line, no paragraph gap — Renell's move. */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="block text-left text-neutral-400 hover:text-black"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-16 text-title font-medium">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener"
            className="w-fit hover:text-neutral-400"
          >
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
