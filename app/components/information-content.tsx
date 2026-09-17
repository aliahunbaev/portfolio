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
              Ali Ahunbáev is a product designer and artist in New York. He
              studies computer science at NYU, currently on leave, and works
              in creative direction at Verci, a members space for creatives
              in Flatiron. He is the founder and director of Combat Créatif, a
              creative company that makes products and hosts events for
              people in the creative disciplines: clothes, an app, a print
              journal, a film, and an art exhibition so far.
            </p>
            <p>
              He believes beauty and utility belong in the same object, and
              that the best tools bring out the best in us. That is the outer
              pursuit, making beautiful things. The inner one is a life that
              feels like play. He writes about both at{" "}
              <InlineLink href="https://playfighter.substack.com">
                Playfighter
              </InlineLink>
              .
            </p>
            <p>
              He grew up in Chicago with a traditional art background, was
              rejected from every college he applied to, and went to
              community college instead, where he taught himself web design
              and started building his own things. He transferred to NYU,
              moved to New York, began creative work at Verci, and produced
              The Art Movement, an exhibition and rooftop party for 250
              people, under Combat.
            </p>
            <p>
              His work runs across disciplines because the pursuit does. He
              writes, films, illustrates, designs, and builds, and those have
              organized themselves into producing things in the world. What
              unites the work is purpose rather than medium, and a fascination
              with the place where art meets business, money, and the
              practical world, which can be the death of it or the building
              block of a more beautiful one. Combat is named for that
              struggle, and takes its spirit from hip-hop, jazz, and the
              blues, pain turned into the most influential music alive.
            </p>
            <p>
              He is looking to help build a beautiful company: a product
              design or creative role on a team committed to design, serious
              about excellence, and fun as hell to be part of, working on
              things that help people reach their highest potential. He can
              take an idea from concept to something real, and he is always
              glad to hear from brilliant people.
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
