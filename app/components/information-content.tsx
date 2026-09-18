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
    years: "2026 – Now",
    role: "Creative Direction",
  },
  {
    title: "Combat Créatif",
    years: "2022 – Now",
    role: "Cofounder",
  },
  {
    title: "Independent Practice",
    years: "2024 – 2025",
    role: "Freelance Design & Development",
  },
];

const education = [
  {
    title: "New York University",
    years: "2025 – Now",
    role: "Computer Science",
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
            <p className="text-neutral-400">
              {it.role}, <span className="whitespace-nowrap">{it.years}</span>
            </p>
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
              Ali Ahunbáev is a product designer and artist based in New
              York. His work moves between software, print, film, and
              events, held together by a single conviction: that beauty and
              utility belong in the same object, and that the tools worth
              making are the ones that bring out the best in the people who
              use them. He is the founder of Combat Créatif, a studio for
              people who treat their craft with discipline, whose output so
              far includes a clothing line, a training app, a print journal,
              a short film, and an art exhibition on a rooftop in Flatiron.
              He works in creative direction at Verci, a members space for
              creatives, and studies computer science at New York
              University.
            </p>
            <p>
              He grew up in Chicago drawing and painting, and intended to
              study architecture until Paul Graham's Hackers and Painters,
              read in high school, turned him toward computer science. With
              no experience in the field, he applied to the top twenty
              programs in the country and was rejected by all of them. He
              enrolled at a community college, taught himself web design,
              and began building his own things. A year later he transferred
              to NYU and moved to New York, where he produced The Art
              Movement, an exhibition and rooftop party for 250 people.
            </p>
            <p>
              Across mediums, his practice is organized less by discipline
              than by a question he has carried since childhood: what
              becomes of art when it meets money, business, and the practical
              world. That meeting can be the end of the art or the ground of
              something more beautiful than either, and Combat is named for
              the struggle between the two. It takes its spirit from hip-hop,
              jazz, and the blues, music made from pain that became the most
              influential sound of the last century. He writes weekly at{" "}
              <InlineLink href="https://playfighter.substack.com">
                Playfighter
              </InlineLink>{" "}
              on discipline, creativity, and building a life that feels like
              play.
            </p>
            <p>
              He is drawn to companies as committed to beauty as they are to
              growth, with a culture of excellence and a real love for the
              work, and hopes to spend the coming years designing products
              and experiences that bring out the best in people, alongside
              people who do the same for him.
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
