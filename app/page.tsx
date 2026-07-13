import Feed from "@/components/Feed";
import Underlay from "@/components/Underlay";
import styles from "./page.module.css";

/* Work — the home page. Split view: the bio holds the left band while the
   work reads as a dated ledger on the right. One column below ~1100px. */
export default function Home() {
  return (
    <div className={styles.work}>
      <Underlay />
      <aside className={styles.rail}>
        <p className={styles.bio}>
          Ali Ahunbáev is an artist, product designer, founder and director
          of{" "}
          <a
            href="https://combatcreatif.com"
            target="_blank"
            rel="noreferrer"
            className={styles.bioLink}
          >
            Combat Créatif
          </a>
          .
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
