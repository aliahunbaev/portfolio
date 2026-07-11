import Link from "next/link";
import { work, type WorkEntry } from "@/content/work";
import Placeholder from "./Placeholder";
import styles from "./Feed.module.css";

function EntryInner({ entry }: { entry: WorkEntry }) {
  return (
    <>
      {/* On wide screens the card is the image alone; this block fades in
          on hover/focus as the card's caption. Below 1100px it simply sits
          above the image. */}
      <div className={styles.info}>
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
      </div>

      {/* Image is optional and only carried by monuments. Left edge is flush
          with the text's left edge because it lives in the same block. When a
          real asset exists, swap <Placeholder> for:
            <Image src={entry.image.src} alt={entry.image.alt}
                   width={entry.image.width} height={entry.image.height}
                   className={styles.image} /> */}
      {entry.image ? (
        <Placeholder
          className={styles.image}
          label={entry.title}
          ratio={`${entry.image.width} / ${entry.image.height}`}
        />
      ) : null}
    </>
  );
}

export default function Feed() {
  return (
    <ul className={styles.feed}>
      {work.map((entry) => {
        const external = entry.kind === "linkout";
        return (
          <li key={entry.href} className={styles.item}>
            {external ? (
              <a
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                <EntryInner entry={entry} />
              </a>
            ) : (
              <Link href={entry.href} className={styles.link}>
                <EntryInner entry={entry} />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
