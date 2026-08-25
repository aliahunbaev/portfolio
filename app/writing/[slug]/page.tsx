import Link from "next/link";
import { notFound } from "next/navigation";
import { essays, wordCount } from "../../lib/all-writing";

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
  const index = essays.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();
  const essay = essays[index];
  const previous = essays[(index - 1 + essays.length) % essays.length];
  const next = essays[(index + 1) % essays.length];
  const words = wordCount(essay);

  const meta: [string, string][] = [
    ["Length", `${words.toLocaleString()} words`],
    ["Reading", `${Math.max(1, Math.round(words / 220))} min`],
  ];

  return (
    <main className="px-gutter pb-24 text-body">
      {/* Rail keeps the apparatus; the piece itself — title, date, text —
          opens at the top of the reading column. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
        <aside className="grid grid-cols-4 content-start gap-x-gutter gap-y-4 max-md:grid-cols-3 md:sticky md:top-30 md:col-span-4">
          {meta.map(([label, value]) => (
            <div
              key={label}
              className="col-span-4 grid grid-cols-subgrid max-md:col-span-3"
            >
              <p className="col-span-2 max-md:col-span-1">{label}</p>
              <p className="col-span-2 max-md:col-span-2">{value}</p>
            </div>
          ))}
          <Link
            href="/writing"
            className="col-span-4 pt-8 hover:text-neutral-400 max-md:hidden"
          >
            Back
          </Link>
        </aside>
        <div className="max-md:pt-12 md:col-span-8">
          <div className="md:grid md:grid-cols-8 md:gap-x-gutter">
            <div className="md:col-span-5">
              <h1 className="font-medium">{essay.title}</h1>
              <p className="pt-1">{essay.date}</p>
              <div className="space-y-[1.4em] pt-12 leading-[1.5]">
                {essay.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </main>
  );
}
