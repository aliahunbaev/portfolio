"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Index", href: "/archive" },
  { label: "Writing", href: "/writing" },
  { label: "Sketches", href: "/sketches" },
  { label: "Information", href: "/information" },
];

const glass = "bg-white/75 backdrop-blur-xl backdrop-saturate-150";
// Desktop-only glass, for when the mobile overlay owns the frost below md.
const glassDesktop =
  "md:bg-white/75 md:backdrop-blur-xl md:backdrop-saturate-150";

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
          className="font-medium md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div className={`fixed inset-0 z-40 md:hidden ${glass}`}>
          <ul className="flex flex-col gap-1 px-gutter pt-28 text-display font-medium">
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
        </div>
      )}
    </>
  );
}
