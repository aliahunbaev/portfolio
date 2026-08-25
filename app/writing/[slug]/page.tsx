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
      {/* The project-page anatomy: apparatus on the left rail, the piece
          in the reading column where the index list sits. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
        <aside className="max-md:hidden md:sticky md:top-30 md:col-span-3">
          <div className="grid gap-y-4">
            <Link href="/writing" className="hover:text-neutral-400">
              Back
            </Link>
            <p className="pt-4">
              {words.toLocaleString()} words · {minutes} min
            </p>
          </div>
        </aside>
        <article className="md:col-span-5 md:col-start-4">
          <header className="pb-8">
            <h1 className="text-title font-medium leading-[1.1]">
              {essay.title}
            </h1>
            <p className="pt-2">{essay.date}</p>
          </header>
          <div className="space-y-[1.4em] leading-[1.5]">
            {essay.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {previous && next && (
            <div className="flex items-baseline justify-between gap-gutter pt-24 max-md:pt-16">
              <div className="grid gap-y-4">
                <p>Previous Essay</p>
                <Link
                  href={`/writing/${previous.slug}`}
                  className="hover:text-neutral-400"
                >
                  {previous.title}
                </Link>
              </div>
              <div className="grid gap-y-4 text-right">
                <p>Next Essay</p>
                <Link
                  href={`/writing/${next.slug}`}
                  className="hover:text-neutral-400"
                >
                  {next.title}
                </Link>
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
