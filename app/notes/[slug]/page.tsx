import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNote, getNotes } from "@/content/notes";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return { title: note.title, description: note.body[0] };
}

/* Notes/[slug] — a clean reading page. One measure, generous leading. */
export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <article className={styles.note}>
      <time dateTime={note.datetime} className={styles.date}>
        {note.date}
      </time>
      <h1 className={styles.title}>{note.title}</h1>
      <div className={styles.body}>
        {note.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
