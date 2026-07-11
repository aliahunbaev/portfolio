"use client";

import Link from "next/link";
import { useRef } from "react";
import { work, type WorkEntry } from "@/content/work";
import Placeholder from "./Placeholder";
import styles from "./Feed.module.css";

function EntryText({ entry }: { entry: WorkEntry }) {
  return (
    <>
      {entry.eyebrow ? (
        <time dateTime={entry.datetime} className={styles.eyebrow}>
          {entry.eyebrow}
        </time>
      ) : null}

      <p className={styles.title}>
        {entry.title}
        {entry.kind === "linkout" ? (
          <span aria-hidden="true" className={styles.arrow}>
            {" ↗"}
          </span>
        ) : null}
      </p>

      {entry.description ? (
        <p className={styles.description}>{entry.description}</p>
      ) : null}
    </>
  );
}

function Entry({ entry }: { entry: WorkEntry }) {
  // The cursor tag trails the pointer like a catalog label; position is
  // written straight to the node — no re-renders.
  const tag = useRef<HTMLDivElement>(null);
  const onMouseMove = (e: React.MouseEvent) => {
    if (tag.current) {
      tag.current.style.transform = `translate(${e.clientX + 18}px, ${
        e.clientY + 20
      }px)`;
    }
  };

  const inner = (
    <>
      {/* Caption: in flow above the image on narrow screens; on wide it is
          invisible at rest and appears pinned to the card on keyboard
          focus (the mouse gets the cursor tag instead). */}
      <div className={styles.info}>
        <EntryText entry={entry} />
      </div>

      {entry.image ? (
        <Placeholder
          className={styles.image}
          label={entry.title}
          ratio={`${entry.image.width} / ${entry.image.height}`}
        />
      ) : null}

      <div ref={tag} className={styles.cursorTag} aria-hidden="true">
        <EntryText entry={entry} />
      </div>
    </>
  );

  return entry.kind === "linkout" ? (
    <a
      href={entry.href}
      target="_blank"
      rel="noreferrer"
      className={styles.link}
      onMouseMove={onMouseMove}
    >
      {inner}
    </a>
  ) : (
    <Link href={entry.href} className={styles.link} onMouseMove={onMouseMove}>
      {inner}
    </Link>
  );
}

export default function Feed() {
  return (
    <ul className={styles.feed}>
      {work.map((entry) => (
        <li key={entry.href} className={styles.item}>
          <Entry entry={entry} />
        </li>
      ))}
    </ul>
  );
}
