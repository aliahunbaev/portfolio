"use client";

import { usePathname } from "next/navigation";

/* Content fades up to full opacity on every navigation. Keyed on the
   pathname so React remounts it per route, replaying the animation; the
   nav sits outside and stays steady. */
export default function PageFade({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="fade-in">
      {children}
    </div>
  );
}
