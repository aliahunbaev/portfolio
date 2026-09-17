"use client";

import InlineLink from "./inline-link";
import StripVideo from "./strip-video";
import { useState } from "react";
import { Clock, ReachLink } from "./site-footer";
import { EMAIL, contact, elsewhere } from "../lib/reach";

/* The overview spread: horizontal portrait and identity caption at the
   left, one column at the right carrying the bio in medium body text
   and the reach groups beneath it. Hierarchy by weight alone — medium
   against regular, no grays. The footer's meta closes the column; the
   monument itself stays a homepage instrument. */

function EmailLine() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(EMAIL).catch(() => {});
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
      className="block cursor-pointer text-left hover:text-neutral-400"
      title="Copy"
    >
      {copied ? "Copied" : EMAIL}
    </button>
  );
}

/* The record, in the reach rows' own format: years, role, place.
   Three short lines per entry; the bio carries the context. */
const experience = [
  {
    title: "Verci",
    years: "2026 – Now",
    role: "Creative Director & Ideation Lead",
  },
  {
    title: "Combat Créatif",
    years: "2022 – Now",
    role: "Cofounder & Creative Director",
  },
  {
    title: "Independent Practice",
    years: "2024 – 2025",
    role: "Freelance Designer & Developer",
  },
];

const education = [
  {
    title: "New York University",
    years: "2025 – Now",
    role: "B.S. Computer Science",
  },
];

function Record({
  label,
  items,
  split = false,
}: {
  label: string;
  items: typeof experience;
  split?: boolean;
}) {
  return (
    <div className={`grid gap-x-gutter ${split ? "grid-cols-2" : "gap-y-3 md:grid-cols-2"}`}>
      <p>{label}</p>
      <div className="grid gap-y-5">
        {items.map((it) => (
          <div key={it.title} className="grid gap-y-0.5 leading-[1.3]">
            <p>{it.title}</p>
            <p className="text-neutral-400">{it.role}</p>
            <p className="text-neutral-400">{it.years}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InformationContent() {
  return (
    <main className="px-gutter py-30 text-body font-medium">
      <div className="md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
        {/* The living portrait: a silent loop of him at work, lazy
            until seen, poster first. */}
        <div className="md:col-span-5">
          <div
            className="relative w-full overflow-hidden bg-black/[0.04]"
            style={{ aspectRatio: "1920 / 1080" }}
          >
            <StripVideo
              src="/images/portrait-loop.mp4"
              poster="/images/portrait-loop.jpg"
            />
          </div>
          {/* The film-still caption: where and when, nothing the nav
              and the bio's first line already say. */}
          <p className="pt-4 pb-12">
            Manhattan, New York · <Clock />
          </p>
        </div>

        {/* One column: the bio in medium body text, then the groups. */}
        <div className="max-md:pt-16 md:col-span-5 md:col-start-7 md:max-w-[32rem]">
          <div className="space-y-4 leading-[1.3]">
            <p>
              Ali Ahunbáev is a product designer in New York. He studies
              computer science at NYU, on leave this fall, and works in
              creative direction at Verci, a members space for creatives in
              Flatiron. He is the founder of Combat Créatif, a creative
              company that makes products and holds events for people who
              make things. So far that has meant clothes, a training app, a
              print journal, a short film, and an art exhibition on a roof.
            </p>
            <p>
              The idea underneath all of it is simple: beauty and utility
              belong in the same object. The tools worth making are the ones
              that bring out the best in the people who use them. That is the
              outward pursuit. The inward one is a life that feels like
              play, which he writes about weekly at{" "}
              <InlineLink href="https://playfighter.substack.com">
                Playfighter
              </InlineLink>
              .
            </p>
            <p>
              He grew up in Chicago drawing and painting, and planned on
              architecture until he read Paul Graham's Hackers and Painters
              in high school and decided on computer science instead. He
              applied to twenty schools with no experience in it and every
              one said no. He went to community college, taught himself web
              design, fell into code, and started making his own things.
              After a year he transferred to NYU, moved to New York, and
              began working in the city, where he produced The Art Movement,
              an exhibition and rooftop party for 250 people, under Combat.
            </p>
            <p>
              The work spans disciplines because the pursuit does. He writes,
              films, illustrates, designs, and builds, and at some point those
              stopped being separate hobbies and became one practice of
              putting things into the world. What holds it together is not a
              medium but a question he has carried since he was a kid with a
              sketchbook: what happens when art meets money, business, and
              the practical world.
              It can be the end of the art or the foundation of a more
              beautiful one. Combat is named for that struggle, and takes its
              spirit from hip-hop, jazz, and the blues, music born of pain
              and turned into the most influential sound of the last century.
            </p>
            <p>
              He is looking to join a company that is as committed to beauty
              as it is to growth, with a culture of excellence and a real
              love for the work, in a product design role, or any role that
              lets him learn in that direction: building beautiful products
              and experiences that bring out the best in us, with great
              people.
            </p>
          </div>

          {/* Label left, list right — the record rows. Position does
              the separating, so the whole block holds one weight. */}
          <div className="grid gap-y-10 pt-16 max-md:hidden">
            <div className="grid gap-y-3 md:grid-cols-2 md:gap-x-gutter">
              <p>Contact</p>
              <div className="grid gap-y-1">
                <EmailLine />
                {contact.map(([label, href]) => (
                  <ReachLink key={label} label={label} href={href} />
                ))}
              </div>
            </div>
            <div className="grid gap-y-3 md:grid-cols-2 md:gap-x-gutter">
              <p>Links</p>
              <div className="grid gap-y-1">
                {elsewhere.map(([label, href]) => (
                  <ReachLink key={label} label={label} href={href} />
                ))}
              </div>
            </div>
            <Record label="Experience" items={experience} />
            <Record label="Education" items={education} />
          </div>
          {/* Mobile: the reach links in the monument register — big
              thumb targets, the footer's mobile idiom. */}
          <div className="grid gap-y-10 pt-16 md:hidden">
            <Record label="Experience" items={experience} split />
            <Record label="Education" items={education} split />
          </div>
          <div className="pt-24 md:hidden">
            <p>Contact</p>
            <div className="flex flex-col gap-y-1 pt-2 text-title">
              <EmailLine />
              {contact.map(([label, href]) => (
                <ReachLink key={label} label={label} href={href} />
              ))}
            </div>
            <p className="pt-12">Links</p>
            <div className="flex flex-col gap-y-1 pt-2 text-title">
              {elsewhere.map(([label, href]) => (
                <ReachLink key={label} label={label} href={href} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
