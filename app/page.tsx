import Feed from "@/components/Feed";
import styles from "./page.module.css";

/* Work — the home page. A short hero statement opens the page, set inward
   and scrolling away with the page; the work follows as visual-first cards,
   indented further still. Nothing approaches the fixtures on either side. */
export default function Home() {
  return (
    <div className={styles.work}>
      <h1 className={styles.hero}>
        Ali Ahunbáev is an artist, product designer, founder and director of{" "}
        <a
          href="https://combatcreatif.com"
          target="_blank"
          rel="noreferrer"
          className={styles.heroLink}
        >
          Combat Créatif
        </a>
        . <br></br><br></br> Currently on leave from New York University, focused on doing great work and connecting with brilliant people.
      </h1>
      <section className={styles.feedColumn} aria-label="Work">
        <Feed />
      </section>
    </div>
  );
}
