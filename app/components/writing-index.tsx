import Link from "next/link";
import { essays } from "../lib/writing";

// Curated, finished pieces — everything else is the raw blog feed.
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
const blog = essays.filter((e) => !FEATURED.includes(e.slug));

/* Two-zone split: roomy curated essays left, compact raw feed right,
   pointing home to Substack. Everything body-size. */
export default function WritingIndex() {
  return (
    <div className="text-body md:grid md:grid-cols-12 md:gap-x-gutter">
      <section className="md:col-span-5">
        <p className="pb-8">Essays</p>
        <div className="flex flex-col gap-8 md:max-w-[80%]">
          {featured.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="hover:text-neutral-400"
            >
              <span className="block font-medium">{essay.title}</span>
              <span className="block pt-1 leading-[1.4]">{essay.subtitle}</span>
              <span className="block pt-1">{essay.date}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-md:pt-16 md:col-span-6 md:col-start-7">
        <p className="flex justify-between pb-8">
          <span>Blog</span>
          <Link
            href="https://playfighter.substack.com"
            target="_blank"
            rel="noopener"
            className="hover:text-neutral-400"
          >
            PLAYFIGHTER
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          {blog.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="grid grid-cols-6 gap-x-gutter hover:text-neutral-400"
            >
              <span className="col-span-2">{essay.date}</span>
              <span className="col-span-4 font-medium">{essay.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
