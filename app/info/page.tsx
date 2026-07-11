import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Info",
  description:
    "Extended biography, currents, influences, and recommendations.",
};

/* Info — the most literary page. No repeated blurb (home owns that): a
   portrait, then an extended bio and lists, all in one ~65ch serif measure. */
export default function Info() {
  return (
    <div className={styles.info}>
      <Placeholder className={styles.portrait} ratio="4 / 5" label="Portrait" />

      <div className={styles.prose}>
        <p>
          Placeholder. This is the extended biography — a single comfortable
          serif measure, generous leading, the most literary page on the site.
          Write it long and true; the layout will hold it.
        </p>
        <p>
          A second paragraph, to establish the rhythm of the measure and the
          space between thoughts.
        </p>

        <h2 className={styles.heading}>Currents</h2>
        <p>
          <em>Reading</em> — placeholder. <br />
          <em>Listening</em> — placeholder. <br />
          <em>Watching</em> — placeholder.
        </p>

        <h2 className={styles.heading}>Influences</h2>
        <p>Placeholder list of the people and works that set the compass.</p>

        <h2 className={styles.heading}>Recommendations</h2>
        <p>Placeholder — things worth your attention.</p>
      </div>
    </div>
  );
}
