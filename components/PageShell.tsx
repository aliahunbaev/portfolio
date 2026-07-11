import Link from "next/link";
import type { ReactNode } from "react";
import ChapterRail, { type Chapter } from "./ChapterRail";
import styles from "./PageShell.module.css";

/* Reading-page scaffold: one measure-wide column, centered on the page.
 * Utility navigation (Back, chapters on long pages) lives in the LEFT
 * MARGIN beside the column — it never displaces the centered body.
 * On mobile the chapters simply don't exist; Back becomes an inline line.
 * Used by Info, Notes, note pages and project pages. */
export default function PageShell({
  back,
  chapters,
  children,
}: {
  back?: { href: string; label: string };
  chapters?: Chapter[];
  children: ReactNode;
}) {
  return (
    <div className={styles.shell} data-reading-shell>
      <aside className={styles.rail}>
        {back ? (
          <Link href={back.href} className={styles.back}>
            {back.label}
          </Link>
        ) : null}
        {chapters && chapters.length > 0 ? (
          <div className={styles.chapters}>
            <ChapterRail chapters={chapters} />
          </div>
        ) : null}
      </aside>
      <div className={styles.column}>{children}</div>
    </div>
  );
}
