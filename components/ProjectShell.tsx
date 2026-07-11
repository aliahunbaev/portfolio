import type { ReactNode } from "react";
import Placeholder from "./Placeholder";
import styles from "./ProjectShell.module.css";

/* Project page scaffold. Full width — the fixtures are the only chrome.
 * The left column is deliberately reserved (empty) so a chapter rail (small
 * sans, fades in, tracks scroll) can drop into v1.1 without restructuring. */
export default function ProjectShell({
  title,
  year,
  summary,
  children,
}: {
  title: string;
  year: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.project}>
      {/* reserved for the v1.1 chapter rail — leave it be */}
      <div className={styles.rail} aria-hidden="true" />

      <div className={styles.body}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.meta}>{year}</p>
          <p className={styles.summary}>{summary}</p>
        </header>
        {children}
      </div>
    </article>
  );
}

/* A text section — sans utility voice, comfortable measure. */
export function ProjectText({ children }: { children: ReactNode }) {
  return <section className={styles.text}>{children}</section>;
}

/* A large image block. Swap Placeholder for next/image when assets land. */
export function ProjectFigure({
  label,
  ratio = "16 / 9",
  caption,
}: {
  label?: string;
  ratio?: string;
  caption?: string;
}) {
  return (
    <figure className={styles.figure}>
      <Placeholder ratio={ratio} label={label} />
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
