"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "00:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

/* Renell-style player: autoplays muted (the only autoplay browsers
   allow), loops, and carries its own text controls — Pause / Fullscreen
   / Unmute and a time readout bottom-left, a hairline scrubber with a
   square thumb bottom-right. No native chrome. */
export default function VideoPlayer({
  src,
  className = "",
  eager = false,
  sound = false,
  fill = false,
}: {
  src: string;
  className?: string;
  /** Attach the file at once instead of waiting for the viewport. */
  eager?: boolean;
  /** Start with sound. Only honoured when the player is opened by a
   *  click; if the browser refuses, it falls back to muted. */
  sound?: boolean;
  /** Fill the parent like fullscreen does: black, contained, controls
   *  fading when idle. Used by the film lightbox. */
  fill?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(eager);
  const [fs, setFs] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(!sound);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // The file loads only once the player approaches the viewport, so a
  // page of many videos doesn't fetch them all up front.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || eager) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Once the source is attached, sync state and start muted playback.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !near) return;
    if (v.duration) setDuration(v.duration);
    v.muted = !sound;
    if (v.paused)
      v.play().catch(() => {
        // Sound refused without a gesture: play silently instead.
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    setPlaying(!v.paused);
  }, [near, sound]);

  // Fullscreen wraps the whole player, not the bare video element, so
  // the text controls and scrubber stay ours instead of the browser's.
  useEffect(() => {
    const onChange = () => setFs(document.fullscreenElement === wrapRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const immersive = fs || fill;

  // In fullscreen the controls step aside: they fade after a still
  // moment and any pointer movement brings them back. A paused film
  // keeps them up.
  useEffect(() => {
    if (!immersive) {
      setIdle(false);
      return;
    }
    const wake = () => {
      setIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        if (!videoRef.current?.paused) setIdle(true);
      }, 2500);
    };
    wake();
    const el = wrapRef.current;
    el?.addEventListener("pointermove", wake);
    el?.addEventListener("pointerdown", wake);
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      el?.removeEventListener("pointermove", wake);
      el?.removeEventListener("pointerdown", wake);
    };
  }, [immersive]);

  // In fullscreen the film answers the keyboard: space toggles play,
  // Escape is the browser's own exit.
  useEffect(() => {
    if (!immersive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [immersive]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else wrapRef.current?.requestFullscreen().catch(() => {});
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seekTo = (clientX: number) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !duration) return;
    const r = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    v.currentTime = ratio * duration;
    setTime(v.currentTime);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative ${immersive ? "flex items-center justify-center bg-black" : "bg-black/[0.04]"} ${immersive && idle ? "cursor-none" : ""} ${className}`}
    >
      <video
        ref={videoRef}
        src={near ? src : undefined}
        // Reserves layout space before metadata arrives; the video's own
        // proportions take over once known (that's what `auto` does).
        style={immersive ? undefined : { aspectRatio: "auto 1350 / 1080" }}
        autoPlay
        muted={!sound}
        loop
        playsInline
        preload="metadata"
        className={`${immersive ? "h-full w-full object-contain" : "w-full"} ${immersive && idle ? "" : "cursor-pointer"}`}
        // The picture itself is the biggest play/pause button.
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      {/* White through mix-blend-difference: the controls invert
          whatever plays behind them, so they read on any frame. In
          fullscreen they fade with the idle cursor. */}
      <div
        className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-8 px-3 pb-2.5 text-body font-medium text-white mix-blend-difference transition-opacity duration-300 ${immersive && idle ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <div className="flex items-baseline gap-4">
          <button
            type="button"
            onClick={togglePlay}
            className="cursor-pointer hover:text-neutral-300"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="cursor-pointer hover:text-neutral-300 max-md:hidden"
          >
            {fs ? "Exit" : "Fullscreen"}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="cursor-pointer hover:text-neutral-300"
          >
            {muted ? "Unmute" : "Mute"}
          </button>
          <span>
            {fmt(time)}/{fmt(duration)}
          </span>
        </div>
        {/* Hairline scrubber, square thumb; the touch target is taller
            than the line it draws. */}
        <div
          ref={barRef}
          onPointerDown={(e) => {
            // Capture can throw for pointers the browser considers gone
            // (e.g. a pen lifting); the click-seek must still land.
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch {}
            seekTo(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.currentTarget.hasPointerCapture(e.pointerId))
              seekTo(e.clientX);
          }}
          className="relative h-4 w-1/3 max-w-64 cursor-pointer"
        >
          <div className="absolute top-1/2 h-px w-full bg-white" />
          <div
            className="absolute top-1/2 size-1.5 -translate-y-1/2 bg-white"
            style={{
              left: `calc(${duration ? (time / duration) * 100 : 0}% - 3px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
