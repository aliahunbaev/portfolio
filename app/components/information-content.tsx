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
              Ali Ahunbáev is an artist and product designer based in New
              York. He works across product design, identity, film, and
              writing, with a focus on tools and stories that carry a
              philosophy. His current work spans Marble, a training journal
              for iOS, The Art Movement, a series of exhibitions and rooftop
              gatherings for artists in New York, and{" "}
              <InlineLink href="https://playfighter.substack.com">
                Playfighter
              </InlineLink>
              , a weekly writing practice.
            </p>
            <p>
              He grew up in Chicago, started college at fifteen, and moved
              to New York on a simple thesis, New York or nowhere. He
              believes philosophy and beautiful utility belong in the same
              object, and builds toward a life that feels like play.
            </p>
            <p>
              Before New York there was Combat, the clothing brand he
              started with his best friend, which grew a simple idea to
              thirty thousand dollars in revenue and a printed journal, and taught him that
              design, branding, and storytelling are one craft. It has
              since become Combat Créatif, the studio that holds everything
              he makes.
            </p>
            <p>
              He starts every project by looking for the feeling, usually
              with a name and a poster before anything is built, and he
              works in public. The films, essays, and sketches on this site
              are the record. The longer stories live in the{" "}
              <InlineLink href="/writing">writing</InlineLink> and in each
              project. He is always glad to hear from brilliant people.
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
          <div className="pt-16 md:hidden">
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
