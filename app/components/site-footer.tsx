"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, elsewhere, EMAIL } from "../lib/reach";

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

function Clock() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{now}</span>;
}

/* Copy email is the action; Copied is the receipt. Click puts the
   address on the clipboard without a mail-app ambush. */
function EmailAction({ className = "", onEnter }: { className?: string; onEnter?: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onClick={() => {
        navigator.clipboard?.writeText(EMAIL).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className={`w-fit cursor-pointer text-left ${className}`}
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

/* Flip to true to audition the dark footer — everything else holds. */
const DARK = false;

/* The card's content also lives on Information, embedded in the page
   flow — same monument, no full-height stage. */
export function FooterCard({ embedded = false }: { embedded?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const big = "text-title font-medium";
  const dim = (key: string) =>
    active && active !== key ? "text-neutral-400" : "";
  return (
    <footer
      className={
        embedded
          ? "text-body"
          : `flex min-h-dvh flex-col justify-end px-gutter pb-gutter text-body ${
              DARK ? "bg-black text-white" : "bg-white"
            }`
      }
    >
      {/* The monument, on the floor. Hovering a link spotlights it: the
          rest recede, Suisse's own arrow marks the departure. */}
      <div onMouseLeave={() => setActive(null)}>
        <div>
        <p className="font-medium">Contact</p>
        <div className={`flex flex-col gap-y-1 pt-2 ${big}`}>
          <EmailAction
            className={dim("email")}
            onEnter={() => setActive("email")}
          />
          {contact.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              onMouseEnter={() => setActive(href)}
              className={`w-fit ${dim(href)}`}
            >
              {label}
              <span
                className={`pl-[0.15em] ${
                  active === href ? "opacity-100" : "opacity-0"
                }`}
              >
                ↗
              </span>
            </a>
          ))}
        </div>
        </div>
        <div className="pt-12">
        <p className="font-medium">Links</p>
        <div className={`flex flex-col gap-y-1 pt-2 ${big}`}>
          {elsewhere.map(([label, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              onMouseEnter={() => setActive(href)}
              className={`w-fit ${dim(href)}`}
            >
              {label}
              <span
                className={`pl-[0.15em] ${
                  active === href ? "opacity-100" : "opacity-0"
                }`}
              >
                ↗
              </span>
            </a>
          ))}
        </div>
        </div>
      </div>
      {/* The meta closes the monument: place, time, colophon. */}
      <div className={`pt-16 text-neutral-400 ${big}`}>
        <p>
          <Clock />
        </p>
        <p>Manhattan, New York</p>
        <p>Ali Ahunbáev © 2026</p>
      </div>
    </footer>
  );
}

export default function FooterShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);
  const isHome = pathname === "/";

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const measure = () => setFooterH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isHome]);

  // The footer lives on the homepage only — every other page ends its
  // own way. Desktop gets the wipe (fixed footer, content lifts off,
  // soft seam); mobile scrolls past it in normal flow.
  if (!isHome) return <>{children}</>;

  return (
    <>
      <div
        className="relative z-10 bg-white md:pb-gutter md:mb-[var(--footer-h)] md:[mask-image:linear-gradient(to_bottom,black_calc(100%_-_14px),transparent)]"
        style={{ "--footer-h": `${footerH}px` } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        ref={footerRef}
        className="md:fixed md:inset-x-0 md:bottom-0 md:z-0"
      >
        <FooterCard />
      </div>
    </>
  );
}
