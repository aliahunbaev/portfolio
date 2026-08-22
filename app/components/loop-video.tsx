import PreviewVideo from "./preview-video";

/* A small silent loop — a micro-interaction shown the way a still is:
   at its own proportions on the plate, no chrome, playing on its own.
   Its frame comes from the first-frame poster so the layout holds
   before the file arrives. */
export default function LoopVideo({
  src,
  poster,
  w,
  h,
  className = "",
  style,
}: {
  src: string;
  poster?: string;
  w?: number;
  h?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      <div
        className="relative w-full overflow-hidden bg-black/[0.04]"
        style={{ aspectRatio: `${w ?? 4} / ${h ?? 5}` }}
      >
        <PreviewVideo src={src} poster={poster} />
      </div>
    </div>
  );
}
