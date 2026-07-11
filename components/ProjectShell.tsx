import type { ReactNode } from "react";
import PageShell from "./PageShell";
import type { Chapter } from "./ChapterRail";
import ChromeVisibility from "./ChromeVisibility";
import Placeholder from "./Placeholder";
import styles from "./ProjectShell.module.css";

/* Project page scaffold: a full-bleed hero grounds the project, then the
 * reading cluster begins — Back and the chapters stick in the rail beside
 * the body. Typography is the site's standard scale — the title is the
 * same 20px serif as a feed entry, not a hero. */
export default function ProjectShell({
  title,
  year,
  summary,
  hero,
  chapters,
  children,
}: {
  title: string;
  year: string;
  summary: string;
  /** Label for the placeholder hero; swap for a real asset when it lands. */
  hero?: { label?: string };
  chapters?: Chapter[];
  children: ReactNode;
}) {
  return (
    <>
      {/* Immersive reading: top chrome tucks away on scroll-down here only */}
      <ChromeVisibility />

      {hero ? (
        <div className={styles.hero}>
          <Placeholder className={styles.heroBox} label={hero.label ?? title} />
        </div>
      ) : null}

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
    </>
  );
}

/* A chapter — an anchor target the rail links to, opened by its own quiet
 * heading. Wrap the text/figure blocks that belong to one chapter. */
export function ProjectSection({
  id,
  heading,
  children,
}: {
  id: string;
  heading?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      {heading ? <h2 className={styles.sectionHeading}>{heading}</h2> : null}
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
