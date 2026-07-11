"use client";

import { useEffect, useState } from "react";
import styles from "./ChapterRail.module.css";

export interface Chapter {
  id: string;
  label: string;
}

/* Chapter rail — anchor links beside a long page. Clicking scrolls to the
 * section; the link for the section currently in view sits at full ink,
 * the rest rest dimmed. Desktop margins only — on mobile this doesn't exist. */
export default function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState<string>(chapters[0]?.id ?? "");

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The active chapter is the one whose section is in the upper band
        // of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <ol className={styles.chapters}>
      {chapters.map((chapter) => (
        <li key={chapter.id}>
          <a
            href={`#${chapter.id}`}
            className={
              active === chapter.id
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            {chapter.label}
          </a>
        </li>
      ))}
    </ol>
  );
}
