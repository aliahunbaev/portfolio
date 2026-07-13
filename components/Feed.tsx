import Link from "next/link";
import { work, type WorkEntry } from "@/content/work";
import styles from "./Feed.module.css";

function EntryBody({ entry }: { entry: WorkEntry }) {
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

/* The work ledger — dated, text-only entries. Entries with a destination
   are links; index cards without one are plain records. */
export default function Feed() {
  return (
    <ul className={styles.feed}>
      {work.map((entry) => (
        <li key={entry.title} className={styles.item}>
          {!entry.href ? (
            <div className={styles.block}>
              <EntryBody entry={entry} />
            </div>
          ) : entry.kind === "linkout" ? (
            <a
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              <EntryBody entry={entry} />
            </a>
          ) : (
            <Link href={entry.href} className={styles.link}>
              <EntryBody entry={entry} />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
