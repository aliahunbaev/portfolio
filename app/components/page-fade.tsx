"use client";

import { usePathname } from "next/navigation";

// Routes whose content animates itself (the archive staggers its rows in),
// so the page-level fade would double up.
const SELF_ANIMATING = ["/archive"];

/* Content fades up to full opacity on every navigation. Keyed on the
   pathname so React remounts it per route, replaying the animation; the
   nav sits outside and stays steady. */
export default function PageFade({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const selfAnimating = SELF_ANIMATING.includes(pathname);
  return (
    <div key={pathname} className={selfAnimating ? undefined : "fade-in"}>
      {children}
    </div>
  );
}
