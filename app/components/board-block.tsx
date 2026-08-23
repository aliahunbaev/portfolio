"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Img = { src: string; w?: number; h?: number; small?: string };

/* A moodboard — a field, not a sequence. On the page it's a small mosaic
   of the wall; opened, it fills the screen edge to edge like a Pinterest
   grid and you wander: drag or trackpad to pan, pinch or ⌘-wheel to
   zoom around the cursor, click an image to bring it forward, click
   again or Escape to drop back. The wall never leaves the frame — you
   can't pan into white or zoom out past the point where it fills the
   screen. No order, no numbering. */
export default function BoardBlock({
  title,
  images,
  className = "",
  style,
}: {
  title: string;
  images: Img[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const preview = images.slice(0, 8);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <div className={className} style={style}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full cursor-pointer"
      >
        <span className="grid grid-cols-4 gap-[3px]">
          {preview.map((m) => (
            <span
              key={m.src}
              className="relative block aspect-square overflow-hidden border border-black/10 bg-black/[0.04]"
            >
              <Image
                draggable={false}
                src={m.src}
                alt={title}
                fill
                sizes="(max-width: 768px) 25vw, 16vw"
                className="object-cover"
              />
            </span>
          ))}
        </span>
        <span className="absolute left-2 top-2 bg-white px-1.5 py-0.5 text-body opacity-0 group-hover:opacity-100">
          {title}
        </span>
      </button>
      <p className="pt-3 text-center">{title}</p>
      {open &&
        createPortal(
          <Board title={title} images={images} onClose={() => setOpen(false)} />,
          document.body,
        )}
    </div>
  );
}

const COL_W = 320;
const GAP = 28;
const MARGIN = 48;

type View = { x: number; y: number; s: number };

function Board({
  title,
  images,
  onClose,
}: {
  title: string;
  images: Img[];
  onClose: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [view, setView] = useState<View>({ x: 0, y: 0, s: 1 });
  const [focused, setFocused] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);
  const viewRef = useRef(view);
  viewRef.current = view;
  // Where you were before an image came forward, to return there.
  const beforeFocus = useRef<View | null>(null);

  // The wall: fixed-width columns, natural heights, each image dropped
  // into the shortest column — a loose grid, never a strip.
  const layout = useMemo(() => {
    const n = images.length;
    const cols = Math.max(2, Math.min(30, Math.round(Math.sqrt(n * 1.6))));
    const heights = new Array(cols).fill(0);
    const items = images.map((m) => {
      const col = heights.indexOf(Math.min(...heights));
      const h = COL_W * ((m.h ?? 4) / (m.w ?? 3));
      const item = { x: col * (COL_W + GAP), y: heights[col], w: COL_W, h };
      heights[col] += h + GAP;
      return item;
    });
    return {
      items,
      w: cols * COL_W + (cols - 1) * GAP,
      h: Math.max(...heights) - GAP,
    };
  }, [images]);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The floor of the zoom range: the wall exactly covers the screen.
  const minScale = useCallback(
    () => Math.max(size.w / layout.w, size.h / layout.h),
    [size, layout],
  );

  // The wall never leaves the frame: no panning into white, and on an
  // axis with slack the wall sits centred.
  const clampView = useCallback(
    (v: View): View => {
      const bw = layout.w * v.s;
      const bh = layout.h * v.s;
      return {
        s: v.s,
        x:
          bw <= size.w
            ? (size.w - bw) / 2
            : Math.min(0, Math.max(size.w - bw, v.x)),
        y:
          bh <= size.h
            ? (size.h - bh) / 2
            : Math.min(0, Math.max(size.h - bh, v.y)),
      };
    },
    [layout, size],
  );

  // Step back to the widest allowed view — the wall filling the screen.
  const zoomOut = useCallback(() => {
    const s = minScale();
    setAnimate(true);
    setFocused(null);
    setView(clampView({ s, x: (size.w - layout.w * s) / 2, y: 0 }));
  }, [minScale, clampView, size, layout]);

  const unfocus = useCallback(() => {
    setAnimate(true);
    setFocused(null);
    if (beforeFocus.current) setView(clampView(beforeFocus.current));
    beforeFocus.current = null;
  }, [clampView]);

  const focus = useCallback(
    (i: number) => {
      const it = layout.items[i];
      const s = Math.min(
        (size.w - 2 * MARGIN) / it.w,
        (size.h - 2 * MARGIN) / it.h,
        3,
      );
      if (beforeFocus.current === null) beforeFocus.current = viewRef.current;
      setAnimate(true);
      setFocused(i);
      setView(
        clampView({
          s,
          x: size.w / 2 - (it.x + it.w / 2) * s,
          y: size.h / 2 - (it.y + it.h / 2) * s,
        }),
      );
    },
    [layout, size, clampView],
  );

  // First sight: the wall at Pinterest density, from the top.
  const opened = useRef(false);
  useLayoutEffect(() => {
    if (!size.w || !size.h || opened.current) return;
    opened.current = true;
    const targetTile = size.w < 768 ? size.w / 2.3 : size.w / 6.5;
    const s = Math.max(minScale(), targetTile / (COL_W + GAP));
    setView(clampView({ s, x: (size.w - layout.w * s) / 2, y: 0 }));
  }, [size, layout, minScale, clampView]);

  // Wheel: plain scroll pans, pinch (ctrl) or ⌘ zooms around the cursor.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setAnimate(false);
      setFocused(null);
      beforeFocus.current = null; // wandering cancels the return point
      const rect = el.getBoundingClientRect();
      const v = viewRef.current;
      if (e.ctrlKey || e.metaKey) {
        // Trackpad pinches arrive as many small deltas; a mouse wheel as
        // ±100 chunks — cap each step so neither runs away.
        const k = Math.min(1.25, Math.max(0.8, Math.exp(-e.deltaY * 0.01)));
        const s = Math.min(4, Math.max(minScale(), v.s * k));
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const ratio = s / v.s;
        setView(
          clampView({ s, x: px - (px - v.x) * ratio, y: py - (py - v.y) * ratio }),
        );
      } else {
        setView(clampView({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [minScale, clampView]);

  // Pointer drag pans; two pointers pinch.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const dragged = useRef(false);
  const pinch = useRef<{ d: number; s: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    // No pointer capture: a click must still land on the image under it.
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
    setAnimate(false);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = {
        d: Math.hypot(a.x - b.x, a.y - b.y),
        s: viewRef.current.s,
      };
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, cur);
    const v = viewRef.current;
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const s = Math.min(
        4,
        Math.max(minScale(), pinch.current.s * (d / pinch.current.d)),
      );
      const rect = stageRef.current!.getBoundingClientRect();
      const px = (a.x + b.x) / 2 - rect.left;
      const py = (a.y + b.y) / 2 - rect.top;
      const ratio = s / v.s;
      dragged.current = true;
      setFocused(null);
      beforeFocus.current = null;
      setView(
        clampView({ s, x: px - (px - v.x) * ratio, y: py - (py - v.y) * ratio }),
      );
      return;
    }
    const dx = cur.x - prev.x;
    const dy = cur.y - prev.y;
    if (dx === 0 && dy === 0) return;
    if (Math.abs(dx) + Math.abs(dy) > 2) dragged.current = true;
    setView(clampView({ ...v, x: v.x + dx, y: v.y + dy }));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    // Let the click that follows see whether this was a drag, then reset.
    setTimeout(() => {
      dragged.current = false;
    }, 0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (focused !== null) unfocus();
        else onClose();
      }
      if (e.key === "0") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused, unfocus, zoomOut, onClose]);

  return (
    <div className="flash-in fixed inset-0 z-[55] flex flex-col bg-white">
      <div className="flex items-center justify-between px-gutter py-1 text-body font-medium">
        <Link href="/" className="hover:text-neutral-400">
          Ali Ahunbáev
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer hover:text-neutral-400"
        >
          Close
        </button>
      </div>
      <div
        ref={stageRef}
        className="relative flex-1 cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        onClick={() => {
          // The wall covers the stage, so a background click only means
          // stepping out of a focused image.
          if (dragged.current) return;
          if (focused !== null) unfocus();
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: layout.w,
            height: layout.h,
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
            transition: animate
              ? "transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "none",
            pointerEvents: "none",
          }}
        >
          {images.map((m, i) => {
            const it = layout.items[i];
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={m.src}
                src={m.small ?? m.src}
                srcSet={m.small ? `${m.small} 480w, ${m.src} 1400w` : undefined}
                sizes={
                  m.small
                    ? focused === i
                      ? "92vw"
                      : view.s > 0.7
                        ? "25vw"
                        : "6vw"
                    : undefined
                }
                alt={`${title}, ${i + 1}`}
                width={m.w}
                height={m.h}
                draggable={false}
                decoding="async"
                onClick={(e) => {
                  e.stopPropagation();
                  if (dragged.current) return;
                  if (focused === i) unfocus();
                  else focus(i);
                }}
                className={`absolute border border-black/10 bg-black/[0.04] ${
                  focused === i ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                style={{
                  left: it.x,
                  top: it.y,
                  width: it.w,
                  height: it.h,
                  pointerEvents: "auto",
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between px-gutter py-1 text-body">
        <p>{title}</p>
        <p>
          {focused !== null
            ? `${focused + 1} / ${images.length}`
            : `${images.length} images`}
        </p>
      </div>
    </div>
  );
}
