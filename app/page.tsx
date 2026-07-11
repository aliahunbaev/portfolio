import Feed from "@/components/Feed";
import styles from "./page.module.css";

/* Work — the home page. One flowing column: the blurb opens the page with
   room to breathe, then the feed begins; the blurb simply scrolls away. */
export default function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.intro}>
        <p className={styles.bio}>
          Ali Ahunbáev is an artist, product designer, founder and director of
          Combat Créatif.
        </p>
        <p className={styles.bio}>
          Currently on leave from New York University, focused on doing great
          work and connecting with brilliant people.
        </p>
      </header>

      <section className={styles.feedColumn} aria-label="Work">
        <Feed />
      </section>
    </div>
  );
}
