import { underlay } from "@/content/underlay";
import styles from "./Underlay.module.css";

/* The sheet beneath the page — ghost text pinned behind everything, as if
 * the home screen were drafting paper laid over an earlier draft. Purely
 * decorative: hidden from the accessibility tree, the pointer, and
 * selection. The glass bar and the paper menu frost it further. */
export default function Underlay() {
  return (
    <div className={styles.underlay} aria-hidden="true">
      {underlay.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}
