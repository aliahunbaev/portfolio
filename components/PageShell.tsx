import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./PageShell.module.css";

/* Reading-page scaffold: one measure-wide column, centered on the page.
 * Utility navigation (Back now, the chapter rail in v1.1) lives in the LEFT
 * MARGIN beside the column — it never displaces the centered body.
 * Used by Info, Notes, note pages and project pages. */
export default function PageShell({
  back,
  children,
}: {
  back?: { href: string; label: string };
  children: ReactNode;
}) {
  return (
    <div className={styles.shell} data-reading-shell>
      <aside className={styles.rail}>
        {back ? (
          <Link href={back.href} className={styles.back}>
            ← {back.label}
          </Link>
        ) : null}
      </aside>
      <div className={styles.column}>{children}</div>
    </div>
  );
}
