import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { getNotes } from "@/content/notes";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Notes",
  description: "Dated writing.",
};

/* Notes — a dated list, reverse-chron, nothing else. */
export default function Notes() {
  const notes = getNotes();

  return (
    <PageShell>
      <ul className={styles.list}>
        {notes.map((note) => (
          <li key={note.slug} className={styles.item}>
            <Link href={`/notes/${note.slug}`} className={styles.link}>
              <time dateTime={note.datetime} className={styles.date}>
                {note.date}
              </time>
              <span className={styles.title}>{note.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
