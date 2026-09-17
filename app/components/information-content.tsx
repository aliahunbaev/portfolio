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

/* The record: what the résumé says, in the page's own rows. Name,
   then role and years. The bio tells the story; these prove it. */
const experience = [
  {
    title: "Verci",
    role: "Creative Director & Ideation Lead, 2026 to present",
    note: "A creative members space in Flatiron. Content strategy, a weekly publishing rhythm, and a short-film format; grew Instagram by 10,000 with an editorial series on the creative communities of the past.",
  },
  {
    title: "Combat Créatif",
    role: "Cofounder & Creative Director, 2022 to present",
    note: "A studio and brand: apparel, print, community events, and software. $30,000 in the first year, a 68-page print journal, and The Art Movement.",
  },
  {
    title: "Independent Practice",
    role: "Freelance Designer & Developer, 2024 to 2025",
    note: "Brands, websites, and online stores for clients, including the e-commerce and editorial site for Hardtokill after it crossed 400K followers.",
  },
];

const education = [
  {
    title: "New York University",
    role: "B.S. Computer Science, 2025 to present",
    note: "Transferred from Harper College with a 4.0 and a full-tuition merit scholarship after a year of independent building and freelance work. On leave for Fall 2026.",
  },
];

function Record({ label, items }: { label: string; items: typeof experience }) {
  return (
    <div className="grid gap-y-3 md:grid-cols-2 md:gap-x-gutter">
      <p className="font-normal">{label}</p>
      <div className="grid gap-y-5">
        {items.map((it) => (
          <div key={it.title} className="grid leading-[1.3]">
            <p>{it.title}</p>
            <p className="font-normal">{it.role}</p>
            <p className="pt-1 font-normal">{it.note}</p>
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
          <div className="font-serif font-normal space-y-[1.4em] text-[16px] leading-[1.6]">
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
            <Record label="Experience" items={experience} />
            <Record label="Education" items={education} />
            <div className="grid gap-y-3 md:grid-cols-2 md:gap-x-gutter">
              <p className="font-normal">Contact</p>
              <div className="grid gap-y-1">
                <EmailLine />
                {contact.map(([label, href]) => (
                  <ReachLink key={label} label={label} href={href} />
                ))}
              </div>
            </div>
            <div className="grid gap-y-3 md:grid-cols-2 md:gap-x-gutter">
              <p className="font-normal">Links</p>
              <div className="grid gap-y-1">
                {elsewhere.map(([label, href]) => (
                  <ReachLink key={label} label={label} href={href} />
                ))}
              </div>
            </div>
          </div>
          {/* Mobile: the reach links in the monument register — big
              thumb targets, the footer's mobile idiom. */}
          <div className="grid gap-y-10 pt-16 md:hidden">
            <Record label="Experience" items={experience} />
            <Record label="Education" items={education} />
          </div>
          <div className="pt-16 md:hidden">
            <p className="font-normal">Contact</p>
            <div className="flex flex-col gap-y-1 pt-2 text-title">
              <EmailLine />
              {contact.map(([label, href]) => (
                <ReachLink key={label} label={label} href={href} />
              ))}
            </div>
            <p className="pt-12 font-normal">Links</p>
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
