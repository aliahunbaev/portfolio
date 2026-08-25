import Link from "next/link";
import { notFound } from "next/navigation";
import { essays, wordCount } from "../../lib/all-writing";
import { pieces } from "../../lib/pieces";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug);
  return { title: "Ali Ahunbáev", description: essay?.subtitle };
}

export default async function EssayPage({ params }: Params) {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug);
  if (!essay) notFound();
  // Previous/next walk the listed pieces only, never the unlisted letters.
  const pi = pieces.findIndex((e) => e.slug === slug);
  const previous = pi === -1 ? null : pieces[(pi - 1 + pieces.length) % pieces.length];
  const next = pi === -1 ? null : pieces[(pi + 1) % pieces.length];
  const words = wordCount(essay);

  const minutes = Math.max(1, Math.round(words / 220));

  return (
    <main className="px-gutter pb-24 text-body">
      {/* Nothing beside the piece — reading gets the whole page. The
          column sits where the index list sits, so nothing jumps. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:gap-x-gutter">
        <article className="md:col-span-5 md:col-start-4">
          <h1 className="font-medium">{essay.title}</h1>
          <p className="pt-1 text-neutral-400">
            {essay.date} · {minutes} min
          </p>
          <div className="space-y-[1.4em] pt-12 leading-[1.5]">
            {essay.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {previous && next && (
            <div className="flex items-baseline justify-between gap-gutter pt-24 max-md:pt-16">
              <Link
                href={`/writing/${previous.slug}`}
                className="hover:text-neutral-400"
              >
                ← {previous.title}
              </Link>
              <Link
                href={`/writing/${next.slug}`}
                className="text-right hover:text-neutral-400"
              >
                {next.title} →
              </Link>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
