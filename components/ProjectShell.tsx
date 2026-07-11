import type { ReactNode } from "react";
import PageShell from "./PageShell";
import Placeholder from "./Placeholder";
import styles from "./ProjectShell.module.css";

/* Project page scaffold: a centered reading column with Back in the left
 * margin (the v1.1 chapter rail will join it there). Typography is the
 * site's standard scale — the title is the same 20px serif as a feed
 * entry, not a hero. */
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
    <PageShell back={{ href: "/", label: "Back" }}>
      <article>
        <header className={styles.header}>
          <p className={styles.meta}>{year}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.summary}>{summary}</p>
        </header>
        {children}
      </article>
    </PageShell>
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
