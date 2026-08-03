import Link from "next/link";
import { essays } from "../lib/writing";

// Curated, finished pieces — everything else is the journal feed.
// Edit this list to recurate; order here is display order.
const FEATURED = [
  "existential-courage",
  "a-life-that-feels-like-play",
  "foundations",
  "build-cool-shit-in-public",
];

const featured = FEATURED.map((slug) =>
  essays.find((e) => e.slug === slug),
).filter((e) => e !== undefined);
const journal = essays.filter((e) => !FEATURED.includes(e.slug));

/* One skeleton everywhere: date column, content column with title +
   subtitle. Essays and Journal differ only in curation and spacing. */
export default function WritingIndex() {
  return (
    <div className="text-body md:grid md:grid-cols-12 md:gap-x-gutter">
      <section className="md:col-span-5">
        <p className="pb-8">Essays</p>
        <div className="flex flex-col gap-8">
          {featured.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="grid grid-cols-5 gap-x-gutter hover:text-neutral-400"
            >
              <span className="col-span-2">{essay.date}</span>
              <span className="col-span-3">
                <span className="block font-medium">{essay.title}</span>
                {essay.subtitle && (
                  <span className="block pt-1 leading-[1.4]">
                    {essay.subtitle}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-md:pt-16 md:col-span-5 md:col-start-7">
        <p className="pb-8">
          Journal (
          <Link
            href="https://playfighter.substack.com"
            target="_blank"
            rel="noopener"
            className="hover:text-neutral-400"
          >
            Read on Substack
          </Link>
          )
        </p>
        <div className="flex flex-col gap-6">
          {journal.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="grid grid-cols-5 gap-x-gutter hover:text-neutral-400"
            >
              <span className="col-span-2">{essay.date}</span>
              <span className="col-span-3">
                <span className="block font-medium">{essay.title}</span>
                {essay.subtitle && (
                  <span className="block pt-1 leading-[1.4]">
                    {essay.subtitle}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
