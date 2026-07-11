import Feed from "@/components/Feed";
import styles from "./page.module.css";

/* Work — the home page. Left rail carries the bio (identity, not chrome);
   the feed fills the rest, stopping short of the nav's column of air. */
export default function Home() {
  return (
    <div className={styles.work}>
      <aside className={styles.rail}>
        <p className={styles.bio}>
          Ali Ahunbáev is an artist, product designer, founder and director of
          Combat Créatif.
        </p>
        <p className={styles.bio}>
          Currently on leave from New York University, focused on doing great
          work and connecting with brilliant people.
        </p>
      </aside>

      <section className={styles.feedColumn} aria-label="Work">
        <Feed />
      </section>
    </div>
  );
}
