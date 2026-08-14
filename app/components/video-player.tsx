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
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // The file loads only once the player approaches the viewport, so a
  // page of many videos doesn't fetch them all up front.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
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
    v.muted = true;
    if (v.paused) v.play().catch(() => {});
    setPlaying(!v.paused);
  }, [near]);

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
    <div ref={wrapRef} className={`relative bg-black/[0.04] ${className}`}>
      <video
        ref={videoRef}
        src={near ? src : undefined}
        // Reserves layout space before metadata arrives; the video's own
        // proportions take over once known (that's what `auto` does).
        style={{ aspectRatio: "auto 1350 / 1080" }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-8 px-3 pb-2.5 text-body font-medium text-white">
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
            onClick={() => videoRef.current?.requestFullscreen()}
            className="cursor-pointer hover:text-neutral-300 max-md:hidden"
          >
            Fullscreen
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
