"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, elsewhere, EMAIL } from "../lib/reach";
import { Clock } from "./site-footer";

const links = [
  { label: "Archive", href: "/archive" },
  { label: "Writing", href: "/writing" },
  { label: "Sketches", href: "/sketches" },
  { label: "Information", href: "/information" },
];

const glass = "bg-white/75 backdrop-blur-xl backdrop-saturate-150";
// Desktop-only glass, for when the mobile overlay owns the frost below md.
const glassDesktop =
  "md:bg-white/75 md:backdrop-blur-xl md:backdrop-saturate-150";

/* Copy email inside the menu — same receipt as the footer's. */
function MenuCopyEmail() {
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
      className="cursor-pointer text-left"
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu on navigation and keep the page from scrolling behind it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      {/* When the menu is open the overlay supplies the glass for the whole
          screen, bar included — the bar goes transparent so there's no seam
          (mobile only; desktop keeps its glass). */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-gutter py-1 text-body font-medium ${open ? glassDesktop : glass}`}
      >
        {/* Spread evenly, so the bar reads as a ruler across the page —
            the same measured logic as the grid below it. */}
        <Link href="/" className="hover:text-neutral-400">
          Ali Ahunbáev
        </Link>
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-neutral-400 max-md:hidden"
          >
            {label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="cursor-pointer font-medium md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div
          className={`fixed inset-0 z-40 overflow-y-auto md:hidden ${glass}`}
        >
          {/* The menu is the site in miniature: pages up top by the
              name, reach and meta at the floor where the footer lives. */}
          <div className="flex min-h-full flex-col justify-between px-gutter pb-gutter">
            <ul className="flex flex-col gap-1 pt-16 text-title font-medium">
              <li>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={pathname === "/" ? "text-neutral-400" : ""}
                >
                  Ali Ahunbáev
                </Link>
              </li>
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={pathname === href ? "text-neutral-400" : ""}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-body font-medium">Contact</p>
              <ul className="flex flex-col gap-1 pt-2 text-title font-medium">
                <li>
                  <MenuCopyEmail />
                </li>
                {contact.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="pt-8 text-body font-medium">Links</p>
              <ul className="flex flex-col gap-1 pt-2 text-title font-medium">
                {elsewhere.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pt-16 text-title font-medium text-neutral-400">
                <p>
                  <Clock />
                </p>
                <p>Manhattan, New York</p>
                <p>Ali Ahunbáev © 2026</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
