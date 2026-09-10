"use client";

import { useEffect, useRef, useState } from "react";

/*
 * The site footer: an information card as a band, revealed by the wipe —
 * the page content sits above it and scrolls up to uncover it, so the
 * card feels like it was there all along. One top hairline (the archive
 * rows' stroke) marks the edge the page peels away from.
 *
 * FooterShell wraps the page content: it measures the fixed footer and
 * gives the content that much bottom margin, so the wipe uncovers the
 * card exactly and pages shorter than the viewport just show it resting
 * at the bottom.
 *
 * Contact lives here and only here — photo, bio line, email with copy,
 * the reach table, resume. Information holds the story.
 */

const reach: [string, string][] = [
  ["Instagram", "https://instagram.com/alizahunbaev"],
  ["Studio", "https://instagram.com/combatcreatif"],
  ["YouTube", "https://youtube.com/@playfighter"],
  ["Substack", "https://playfighter.substack.com"],
  ["LinkedIn", "https://linkedin.com/in/aliahunbaev"],
  ["Resume", "/Ali_Ahunbaev_CV.pdf"],
];

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

function CopyEmail({ dark = false }: { dark?: boolean }) {
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
      className={`cursor-pointer ${
        dark
          ? "text-neutral-500 hover:text-white"
          : "text-neutral-400 hover:text-black"
      }`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

/* Flip to true to audition the dark footer — everything else holds. */
const DARK = false;

function FooterCard() {
  const muted = DARK ? "hover:text-neutral-500" : "hover:text-neutral-400";
  return (
    <footer
      className={`px-gutter pb-gutter pt-12 text-body ${
        DARK ? "bg-black text-white" : "bg-white"
      }`}
    >
      {/* Coordinates, centered at the very top of the card. */}
      <p className="text-center">
        Manhattan, New York · <Clock />
      </p>
      {/* The card: photo, the person, the contacts. */}
      <div className="pt-20 md:grid md:grid-cols-12 md:gap-x-gutter">
        {/* The photo slot — swap in a real one. */}
        <div className="md:col-span-2">
          <div
            className={`aspect-square w-full ${
              DARK ? "bg-white/[0.08]" : "bg-black/[0.04]"
            }`}
          />
        </div>
        <div className="max-md:pt-8 md:col-span-4 md:col-start-4">
          <p className="font-medium">Ali Ahunbáev</p>
          <p className="pt-4 leading-[1.5]">
            I&apos;m Ali, an artist and product designer in New York, founder
            and director of Combat Créatif. If you&apos;re building something
            great, say hello.
          </p>
          <p className="pt-4">
            <a
              href="mailto:alizahunbaev@gmail.com"
              className={`font-medium ${muted}`}
            >
              alizahunbaev@gmail.com
            </a>
            <span className="pl-3">
              <CopyEmail dark={DARK} />
            </span>
          </p>
        </div>
        {/* Just the names, vertical, a column in from the edge. */}
        <div className="flex flex-col gap-y-2 max-md:pt-8 md:col-span-2 md:col-start-9">
          {reach.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              className={`w-fit font-medium ${muted}`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      {/* The baseline — the band closes instead of stopping. */}
      <p className="pt-20">© 2026 Ali Ahunbáev</p>
    </footer>
  );
}

export default function FooterShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const measure = () => setFooterH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* The stroke belongs to the page, not the card — it rides the
          bottom edge of the content through the whole wipe. */}
      <div
        className="relative z-10 border-b border-black bg-white"
        style={{ marginBottom: footerH }}
      >
        {children}
      </div>
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        <FooterCard />
      </div>
    </>
  );
}
