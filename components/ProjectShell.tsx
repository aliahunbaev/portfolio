import type { ReactNode } from "react";
import PageShell from "./PageShell";
import type { Chapter } from "./ChapterRail";
import Placeholder from "./Placeholder";
import styles from "./ProjectShell.module.css";

/* Project page scaffold: a centered reading column with Back and the
 * chapter rail in the left margin. Typography is the site's standard
 * scale — the title is the same 20px serif as a feed entry, not a hero. */
export default function ProjectShell({
  title,
  year,
  summary,
  chapters,
  children,
}: {
  title: string;
  year: string;
  summary: string;
  chapters?: Chapter[];
  children: ReactNode;
}) {
  return (
    <PageShell back={{ href: "/", label: "Back" }} chapters={chapters}>
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

/* A chapter — an anchor target the rail links to. Wrap the text/figure
 * blocks that belong to one chapter. */
export function ProjectSection({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      {children}
    </section>
  );
}

/* A text block — sans utility voice, comfortable measure. */
export function ProjectText({ children }: { children: ReactNode }) {
  return <div className={styles.text}>{children}</div>;
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
