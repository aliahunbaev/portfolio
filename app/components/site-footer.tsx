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

/* Contact = the ways Ali actually gets reached; Elsewhere = the rest
   of the constellation. X joins when he starts using it. */
const contact: [string, string][] = [
  ["Instagram", "https://instagram.com/alizahunbaev"],
  ["Resume", "/Ali_Ahunbaev_CV.pdf"],
];
const elsewhere: [string, string][] = [
  ["YouTube", "https://youtube.com/@playfighter"],
  ["Substack", "https://playfighter.substack.com"],
  ["Playfighter", "https://instagram.com/play.fighter"],
  ["Studio", "https://instagram.com/combatcreatif"],
  ["LinkedIn", "https://linkedin.com/in/aliahunbaev"],
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

/* The address is the button: click copies, the hint answers. No mail
   app ambush — the address stays readable for anyone who'd rather type. */
function EmailAction({ muted }: { muted: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <p className="flex items-baseline gap-x-4">
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText("alizahunbaev@gmail.com").then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          });
        }}
        className={`cursor-pointer text-left font-medium ${muted}`}
      >
        alizahunbaev@gmail.com
      </button>
      <span className="text-body font-normal">
        {copied ? "Copied" : "Copy"}
      </span>
    </p>
  );
}

/* Flip to true to audition the dark footer — everything else holds. */
const DARK = false;

function FooterCard() {
  const muted = DARK ? "hover:text-neutral-500" : "hover:text-neutral-400";
  return (
    <footer
      className={`flex min-h-[70vh] flex-col justify-end px-gutter pb-gutter text-body ${
        DARK ? "bg-black text-white" : "bg-white"
      }`}
    >
      {/* The monument: grouped links at title scale, pinned to the
          bottom-left edge, the air above doing the design. */}
      <div>
        <p>Contact</p>
        <div className="flex flex-col gap-y-1 pt-3 text-title font-medium leading-[1.15]">
          <EmailAction muted={muted} />
          {contact.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              className={`w-fit ${muted}`}
            >
              {label}
            </a>
          ))}
        </div>
        <p className="pt-12">Elsewhere</p>
        <div className="flex flex-col gap-y-1 pt-3 text-title font-medium leading-[1.15]">
          {elsewhere.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              className={`w-fit ${muted}`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      {/* One baseline closes the page: name left, coordinates right. */}
      <div className="flex items-baseline justify-between pt-24">
        <p>© 2026 Ali Ahunbáev</p>
        <p>
          Manhattan, New York · <Clock />
        </p>
      </div>
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
      <div
        className="relative z-10 bg-white"
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
