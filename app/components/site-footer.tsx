"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, elsewhere, EMAIL } from "../lib/reach";

/*
 * The site footer: the link monument at the floor of a white room,
 * revealed by the wipe on desktop — the page content sits above it and
 * scrolls up to uncover it. Homepage only; mobile scrolls past it in
 * normal flow with a modest gap instead of a full-screen stage.
 *
 * Contact lives here and only here (plus Information's embedded copy).
 */

export function Clock() {
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
function EmailAction() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(EMAIL).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      className="w-fit cursor-pointer text-left hover:text-neutral-400"
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

/* A departing link: gray on hover, Suisse's arrow marking the exit. */
function ReachLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group w-fit hover:text-neutral-400"
    >
      {label}
      <span className="pl-[0.15em] opacity-0 group-hover:opacity-100">↗</span>
    </a>
  );
}

/* Flip to true to audition the dark footer — everything else holds. */
const DARK = false;

/* The card's content also lives on Information, embedded in the page
   flow — same monument, no full-height stage. */
export function FooterCard({ embedded = false }: { embedded?: boolean }) {
  const big = "text-title font-medium";
  return (
    <footer
      className={
        embedded
          ? "text-body"
          : `flex flex-col justify-end px-gutter pb-gutter pt-24 text-body md:min-h-dvh md:pt-0 ${
              DARK ? "bg-black text-white" : "bg-white"
            }`
      }
    >
      {/* The monument, on the floor — opened by the availability line,
          the footer's one sentence. */}
      <div>
        <div>
          <p className="font-medium">Contact</p>
          <div className={`flex flex-col gap-y-1 pt-2 ${big}`}>
            <EmailAction />
            {contact.map(([label, href]) => (
              <ReachLink key={href} label={label} href={href} />
            ))}
          </div>
        </div>
        {/* The availability, in the monument's gray register, flowing. */}
        <p
          className={`max-w-[34rem] pt-12 leading-[1.2] text-neutral-400 ${big}`}
        >
          Open to product design and design-engineer roles in New York.
          Highly interested in working with cool people.
        </p>
        <div className="pt-12">
          <p className="font-medium">Links</p>
          <div className={`flex flex-col gap-y-1 pt-2 ${big}`}>
            {elsewhere.map(([label, href]) => (
              <ReachLink key={href} label={label} href={href} />
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
