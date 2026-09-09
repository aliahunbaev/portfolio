"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/*
 * The footer lab. Three candidates in the site's grammar — no boxes, no
 * strokes, the 12-column grid and weight doing the differentiation:
 *
 *   A  The rest      — voice line + email left, vertical links closing
 *                      the right page edge, meta line beneath.
 *   B  Coordinates   — the Information label+value table on the left,
 *                      Ali's own line from Combat Journal on the right.
 *   C  The statement — his mission line at title size, links in one
 *                      horizontal row, meta line beneath.
 *
 * R toggles the wipe reveal: the page content sits above the fixed
 * footer and scrolls up to uncover it — scroll-driven, no timing.
 */

const reach: [string, string][] = [
  ["Email", "mailto:alizahunbaev@gmail.com"],
  ["Instagram", "https://instagram.com/alizahunbaev"],
  ["Studio", "https://instagram.com/combatcreatif"],
  ["YouTube", "https://youtube.com/@playfighter"],
  ["Substack", "https://playfighter.substack.com"],
  ["LinkedIn", "https://linkedin.com/in/aliahunbaev"],
  ["Resume", "/Ali_Ahunbaev_CV.pdf"],
];

const reachValues: Record<string, string> = {
  Email: "alizahunbaev@gmail.com",
  Instagram: "@alizahunbaev",
  Studio: "@combatcreatif",
  YouTube: "@playfighter",
  Substack: "playfighter",
  LinkedIn: "aliahunbaev",
  Resume: "PDF",
};

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{now}</span>;
}

function ReachLink({
  label,
  href,
  children,
  className = "",
}: {
  label: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener"
      className={`w-fit font-medium hover:text-neutral-400 ${className}`}
    >
      {children ?? label}
    </a>
  );
}

function MetaLine() {
  return (
    <div className="flex items-baseline justify-between pt-24 text-body">
      <p className="font-medium">Ali Ahunbáev</p>
      <p>Manhattan, New York</p>
      <p>
        <Clock />
      </p>
    </div>
  );
}

/* A — the site grammar at rest: a line in his voice and the one action
   on the left, the vertical links closing the right page edge. */
function FooterA() {
  return (
    <footer className="px-gutter pb-gutter pt-40 text-body">
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="md:col-span-4">
          <p className="leading-[1.5]">
            Working from New York, on a mix of philosophy and beautiful
            utility. If you&apos;re building something great, say hello.
          </p>
          <ReachLink
            label="Email"
            href="mailto:alizahunbaev@gmail.com"
            className="mt-4 block"
          >
            alizahunbaev@gmail.com
          </ReachLink>
        </div>
        <div className="flex flex-col items-end gap-y-2 max-md:items-start max-md:pt-12 md:col-span-3 md:col-start-10">
          {reach.slice(1).map(([label, href]) => (
            <ReachLink key={href} label={label} href={href} />
          ))}
        </div>
      </div>
      <MetaLine />
    </footer>
  );
}

/* B — coordinates: the Information table, left-justified, with Ali's
   own line from the journal keeping it company on the right. */
function FooterB() {
  return (
    <footer className="px-gutter pb-gutter pt-40 text-body">
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="grid gap-y-2 md:col-span-5">
          {reach.map(([label, href]) => (
            <div key={href} className="grid grid-cols-5 gap-x-gutter">
              <p className="col-span-2">{label}</p>
              <ReachLink label={label} href={href} className="col-span-3">
                {reachValues[label]}
              </ReachLink>
            </div>
          ))}
        </div>
        <div className="max-md:pt-12 md:col-span-4 md:col-start-9">
          <p className="leading-[1.5]">
            <em>True beauty can only be created through combat.</em>
          </p>
          <p className="pt-2 text-neutral-400">Combat Journal, Vol. I</p>
        </div>
      </div>
      <MetaLine />
    </footer>
  );
}

/* C — the statement: the mission at title size, then the links in one
   quiet row. The closest to a manifesto close. */
function FooterC() {
  return (
    <footer className="px-gutter pb-gutter pt-40 text-body">
      <p className="text-title font-medium leading-[1.1] md:w-2/3">
        To create products and art that carry the excitement we felt as
        kids: playing, fighting, and building.
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-16">
        {reach.map(([label, href]) => (
          <ReachLink key={href} label={label} href={href} />
        ))}
      </div>
      <MetaLine />
    </footer>
  );
}

/* Click-to-copy beside the mailto — the "just give me the address"
   path. Plain text, flips to Copied for a beat. */
function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText("alizahunbaev@gmail.com").then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className={`cursor-pointer text-neutral-400 hover:text-black ${className}`}
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

/* The purely aesthetic band across the very bottom: one full-bleed
   sliver of the sculptor still. Swap the src to audition others. */
function ArtBand() {
  return (
    <div className="relative mt-20 h-28 w-full overflow-hidden">
      <Image
        draggable={false}
        src="/work/marble/sculptor-cover.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 30%" }}
      />
    </div>
  );
}

/* D — the center axis: location and time up top, the email as the one
   huge action, links in a centered row, a light line, art at the foot. */
function FooterD() {
  return (
    <footer className="pt-40 text-body">
      <div className="flex flex-col items-center px-gutter text-center">
        <p>
          Manhattan, New York · <Clock />
        </p>
        <a
          href="mailto:alizahunbaev@gmail.com"
          className="mt-10 text-title font-medium leading-[1.1] hover:text-neutral-400"
        >
          alizahunbaev@gmail.com
        </a>
        <CopyEmail className="mt-3" />
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-14 font-medium">
          {reach.slice(1).map(([label, href]) => (
            <ReachLink key={href} label={label} href={href} />
          ))}
        </div>
        <p className="pt-16 text-neutral-400">
          You scrolled all the way here. Say hello.
        </p>
      </div>
      <ArtBand />
    </footer>
  );
}

/* E — the same ingredients, left-anchored in the site grammar: voice
   line and big email left, coordinates right, links spread across one
   row above the art. */
function FooterE() {
  return (
    <footer className="pt-40 text-body">
      <div className="px-gutter md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="md:col-span-6">
          <p className="leading-[1.5]">
            Working from New York, on a mix of philosophy and beautiful
            utility. If you&apos;re building something great, say hello.
          </p>
          <a
            href="mailto:alizahunbaev@gmail.com"
            className="mt-6 block w-fit text-title font-medium leading-[1.1] hover:text-neutral-400"
          >
            alizahunbaev@gmail.com
          </a>
          <CopyEmail className="mt-3" />
        </div>
        <div className="text-right max-md:hidden md:col-span-3 md:col-start-10">
          <p className="font-medium">Manhattan, New York</p>
          <p className="pt-1">
            <Clock />
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-y-2 px-gutter pt-24 font-medium max-md:justify-start max-md:gap-x-6">
        {reach.slice(1).map(([label, href]) => (
          <ReachLink key={href} label={label} href={href} />
        ))}
      </div>
      <ArtBand />
    </footer>
  );
}

const variants = {
  a: FooterA,
  b: FooterB,
  c: FooterC,
  d: FooterD,
  e: FooterE,
} as const;
type Variant = keyof typeof variants;

export default function FooterLab() {
  const [variant, setVariant] = useState<Variant>("a");
  const [reveal, setReveal] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "1") setVariant("a");
      if (e.key === "2") setVariant("b");
      if (e.key === "3") setVariant("c");
      if (e.key === "4") setVariant("d");
      if (e.key === "5") setVariant("e");
      if (e.key.toLowerCase() === "r") setReveal((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The reveal needs the content to end exactly one footer-height above
  // the document bottom, so the fixed footer is uncovered, never overlapped.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const measure = () => setFooterH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [variant, reveal]);

  const Footer = variants[variant];

  return (
    <div>
      {/* Stand-in page: the statement plus filler mass to scroll through. */}
      <main
        className={reveal ? "relative z-10 bg-white" : undefined}
        style={reveal ? { marginBottom: footerH } : undefined}
      >
        <div className="px-gutter pt-30">
          <h1 className="text-title font-medium leading-[1.1] md:w-2/3">
            Ali Ahunbáev is an artist, product designer, founder and director
            of Combat Créatif. This page exists to audition footers — scroll
            to the bottom.
          </h1>
          <div className="mt-40 flex flex-col gap-40 pb-40">
            <div className="aspect-[1.85/1] w-full bg-black/[0.04]" />
            <div className="aspect-[1.85/1] w-full bg-black/[0.04]" />
          </div>
        </div>
      </main>
      <div
        ref={footerRef}
        className={reveal ? "fixed inset-x-0 bottom-0 z-0" : undefined}
      >
        <Footer />
      </div>
      {/* The lab switcher — not part of any candidate. */}
      <div className="fixed right-gutter top-12 z-40 flex gap-x-3 text-body">
        {(Object.keys(variants) as Variant[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setVariant(k)}
            className={`uppercase ${
              variant === k ? "font-medium" : "text-neutral-400"
            }`}
          >
            {k}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setReveal((v) => !v)}
          className={reveal ? "font-medium" : "text-neutral-400"}
        >
          Reveal
        </button>
      </div>
    </div>
  );
}
