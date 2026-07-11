import Feed from "@/components/Feed";
import styles from "./page.module.css";

/* Work — the home page. Wide screens: the blurb holds the left band
   (sticky — it never scrolls under the stamp) while the feed scrolls in
   its own column to the right, clear of the nav's air. Narrow: the blurb
   opens the page and scrolls away, the feed follows. */
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
