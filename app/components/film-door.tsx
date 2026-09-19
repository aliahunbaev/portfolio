"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import VideoPlayer from "./video-player";

/* A silent preview tile that is also the door to the film. Hovering
   claims the site cursor label ("Watch Film"); a click opens the full
   film over the page, with sound, in the site's own player. Escape or
   Close returns to the page. Nothing of the film loads until then. */
export default function FilmDoor({
  film,
  children,
}: {
  film: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // While the browser is fullscreen, Escape belongs to it.
      if (e.key === "Escape" && !document.fullscreenElement) setOpen(false);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor-label="Watch Film"
        aria-label="Watch the film"
        className="absolute inset-0 block h-full w-full cursor-none"
      >
        {children}
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] bg-black">
            <VideoPlayer src={film} eager sound fill className="h-dvh w-full" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-2.5 cursor-pointer text-body font-medium text-white mix-blend-difference hover:text-neutral-300"
            >
              Close
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
