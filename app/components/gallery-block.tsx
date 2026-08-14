"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/* A bounded artifact — a deck, a document, a carousel — shown in the
   page as one tile at its natural proportions and opened into a
   filmstrip over a white veil. Free scrolling (trackpad, touch, or a
   vertical wheel mapped sideways) slides through it and rests anywhere;
   clicking a page or pressing an arrow key centres that page. The strip
   starts with the first page centred and its scroll range ends with the
   last page centred. Click the veil or press Escape to leave. */
export default function GalleryBlock({
  title,
  images,
  cover,
  className = "",
  style,
}: {
  title: string;
  images: { src: string; w?: number; h?: number }[];
  cover?: { w: number; h: number };
  className?: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const tile = images.find((m) => !isVideo(m.src)) ?? images[0];

  const goTo = useCallback((i: number, smooth = true) => {
    const strip = stripRef.current;
    const item = strip?.children[i] as HTMLElement | undefined;
    if (!strip || !item) return;
    const target = Math.round(
      item.offsetLeft + item.offsetWidth / 2 - strip.clientWidth / 2,
    );
    strip.scrollTo({ left: target, behavior: smooth ? "smooth" : "instant" });
  }, []);

  // Track the page nearest centre — the base the arrow keys step from.
  const onScroll = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const centre = strip.scrollLeft + strip.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    [...strip.children].forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  }, []);

  useLayoutEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  // Every page's display width is pure CSS from its known dimensions,
  // so the strip lays out correctly before any image loads and tracks
  // resizes on its own. The end paddings put the scroll range exactly
  // between first-page-centred and last-page-centred.
  const ratio = (m: { w?: number; h?: number }) =>
    m.w && m.h ? m.w / m.h : 4 / 3;
  const pageWidth = (m: { w?: number; h?: number }) =>
    `min(78vh * ${ratio(m).toFixed(4)}, 80vw)`;
  const endPad = (m: { w?: number; h?: number }) =>
    `max(0px, calc(50vw - ${pageWidth(m)} / 2))`;

  // A vertical wheel slides the strip like a horizontal one.
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
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        // Own the arrows fully — otherwise the browser also scrolls the
        // focused page into view and the two motions fight.
        e.preventDefault();
        goTo(
          e.key === "ArrowRight"
            ? Math.min(index + 1, images.length - 1)
            : Math.max(index - 1, 0),
        );
      }
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
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-pointer overflow-hidden bg-black/[0.04]"
        style={{ aspectRatio: cover ? `${cover.w} / ${cover.h}` : "1.85 / 1" }}
      >
        <Image
          draggable={false}
          src={tile.src}
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
        <div className="fixed inset-0 z-[55] bg-white/85 backdrop-blur-md">
          <div
            ref={stripRef}
            onScroll={onScroll}
            onClick={(e) => {
              // Empty veil closes; pages handle their own clicks.
              if (e.target === stripRef.current) setOpen(false);
            }}
            style={{
              paddingLeft: endPad(images[0]),
              paddingRight: endPad(images[images.length - 1]),
            }}
            className="no-scrollbar flex h-full items-center gap-gutter overflow-x-auto"
          >
            {images.map(({ src, w, h }, i) => (
              <button
                key={src}
                type="button"
                onClick={(e) => {
                  // Drop focus so no ring appears and the browser never
                  // auto-scrolls the focused page against the strip.
                  e.currentTarget.blur();
                  if (i !== index) goTo(i);
                }}
                className={`flex-none ${
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
                    className="max-h-[78vh] max-w-[80vw] w-auto"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    width={w}
                    height={h}
                    alt={`${title}, ${i + 1} of ${images.length}`}
                    draggable={false}
                    loading={Math.abs(i - index) < 3 ? "eager" : "lazy"}
                    style={{
                      width: pageWidth({ w, h }),
                      aspectRatio: w && h ? `${w} / ${h}` : undefined,
                    }}
                    className="h-auto"
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
