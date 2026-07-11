import styles from "./Placeholder.module.css";

/* Temporary stand-in for images until real black & white assets exist.
 * Holds an aspect ratio so layout is correct now. When an asset arrives,
 * replace uses of <Placeholder> with next/image (see components/Feed.tsx). */
export default function Placeholder({
  ratio = "3 / 2",
  label,
  className = "",
}: {
  ratio?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`${styles.box} ${className}`}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      {label ? <span className={styles.label}>{label}</span> : null}
    </div>
  );
}
