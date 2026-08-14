"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/* A bounded artifact — a deck, a document, a carousel — shown in the
   page as one tile at its natural proportions and opened into a
   filmstrip: a white veil over the project page with every page of the
   object laid out horizontally, neighbours visible at the edges.
   Arrow keys, a click on a neighbour, or native horizontal scroll move
   through it; Close top-right and Escape leave. */
export default function GalleryBlock({
  title,
  images,
  cover,
  className = "",
  style,
}: {
  title: string;
  images: string[];
  cover?: { w: number; h: number };
  className?: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const tile = images.find((src) => !isVideo(src)) ?? images[0];

  const goTo = useCallback((i: number, smooth = true) => {
    const strip = stripRef.current;
    const item = strip?.children[i] as HTMLElement | undefined;
    item?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
      inline: "center",
      block: "nearest",
    });
  }, []);

  // Track which item sits nearest the centre as the strip scrolls.
  const onScroll = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const centre = strip.scrollLeft + strip.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    [...strip.children].forEach((child, i) => {
      const el = child as HTMLElement;
      const mid = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(mid - centre);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  }, []);

  // Vertical wheel drives the strip; mandatory snap settles it on a page.
  useEffect(() => {
    if (!open) return;
    const strip = stripRef.current;
    if (!strip) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        strip.scrollLeft += e.deltaY;
      }
    };
    strip.addEventListener("wheel", onWheel, { passive: false });
    return () => strip.removeEventListener("wheel", onWheel);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") goTo(Math.min(index + 1, images.length - 1));
      if (e.key === "ArrowLeft") goTo(Math.max(index - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, index, images.length, goTo]);

  return (
    <div className={className} style={style}>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className="group relative block w-full cursor-pointer overflow-hidden bg-black/[0.04]"
        style={{ aspectRatio: cover ? `${cover.w} / ${cover.h}` : "1.85 / 1" }}
      >
        <Image
          draggable={false}
          src={tile}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {/* Filename-style chip, Playlab-fashion, on hover. */}
        <span className="absolute left-2 top-2 bg-white px-1.5 py-0.5 text-body opacity-0 group-hover:opacity-100">
          {title}
        </span>
      </button>
      <p className="pt-3 text-center">{title}</p>
      {open && (
        <div className="fixed inset-0 z-30 bg-white/85 backdrop-blur-md">
          <div
            ref={stripRef}
            onScroll={onScroll}
            onClick={(e) => {
              // Empty veil closes; pages handle their own clicks.
              if (e.target === stripRef.current) setOpen(false);
            }}
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") return;
              drag.current = {
                down: true,
                moved: false,
                startX: e.clientX,
                startLeft: stripRef.current?.scrollLeft ?? 0,
              };
            }}
            onPointerMove={(e) => {
              const d = drag.current;
              if (!d.down || !stripRef.current) return;
              const dx = e.clientX - d.startX;
              if (Math.abs(dx) > 4) d.moved = true;
              stripRef.current.scrollLeft = d.startLeft - dx;
            }}
            onPointerUp={() => {
              drag.current.down = false;
            }}
            className="no-scrollbar flex h-full cursor-grab snap-x snap-mandatory items-center gap-gutter overflow-x-auto px-[12vw]"
          >
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  if (drag.current.moved) {
                    drag.current.moved = false;
                    return;
                  }
                  if (i !== index) goTo(i);
                }}
                className={`flex-none snap-center ${
                  i === index ? "cursor-default" : "cursor-pointer"
                }`}
              >
                {isVideo(src) ? (
                  <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="max-h-[72vh] max-w-[76vw] w-auto"
                  />
                ) : (
                  /* Natural proportions at strip height; plain img keeps
                     variable aspects simple. */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt={`${title}, ${i + 1} of ${images.length}`}
                    draggable={false}
                    loading={Math.abs(i - index) < 3 ? "eager" : "lazy"}
                    className="max-h-[72vh] max-w-[76vw] w-auto"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
