"use client";

import InlineLink from "./inline-link";
import { useState } from "react";
import { FooterCard } from "./site-footer";

// All copy is placeholder in the site's voice — rewrite freely. Two dense
// sections: what shows always, and what Read more reveals.

/* Renell anatomy: one dense big-text block, Read more continues it inline
   with no paragraph gaps, then the handles. */
export default function InformationContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="flex min-h-dvh flex-col justify-between gap-y-24 px-gutter pb-gutter pt-30 text-body">
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="text-title font-medium leading-[1.1] md:col-span-10">
          <p>
            Ali Ahunbáev is an artist and product designer in New York —
            founder and director of{" "}
            <InlineLink href="https://combatcreatif.com">Combat Créatif</InlineLink>
            , a studio built on the belief that philosophy and beautiful
            utility belong in the same object. His current work spans Marble, a
            training app that treats the body the way philosophy treats the
            mind; The Art Movement, a series of exhibitions and rooftop
            gatherings for artists in New York; and Beau Flâneur, a fashion
            project about wandering. He is on leave from New York University,
            focused on doing great work and connecting with brilliant people,
            and writes weekly at{" "}
            <InlineLink href="https://playfighter.substack.com">Playfighter</InlineLink>
            .
          </p>
          {expanded && (
            <p>
              He started college at fifteen, taking community college classes
              with zero bills, zero pressure, and an empty social circle — a
              comfortable life that made him miserable. During classes, in the
              car, and in the gym he listened to biographies that stretched his
              imagination far beyond his reality, and decided comfort was the
              wrong thing to optimize for. In August 2025 he moved to New York
              with a simple thesis: New York or nowhere. The first weeks were
              spent talking to strangers, walking the city, and writing about
              it — the beginning of a weekly practice of thinking in public
              that has since grown past twenty essays, alongside a sketchbook
              that never closes and a camera that films the work as it
              happens. Everything he makes runs on the same conviction: that
              pressure is a privilege, that the work is already inside the
              block, and that training the body and training the mind are one
              discipline. Combat Créatif is the studio that holds it all
              together. He is always glad to hear from brilliant people — the
              fastest way to reach him is Instagram.
            </p>
          )}
          {/* Sits flush on the next line, no paragraph gap — Renell's move. */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="block cursor-pointer text-left text-neutral-400 hover:text-black"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </div>
      </div>
      <FooterCard embedded />
    </main>
  );
}
