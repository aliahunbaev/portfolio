import Link from "next/link";
import { notFound } from "next/navigation";
import { essays, wordCount } from "../../lib/all-writing";
import { pieces } from "../../lib/pieces";

type Params = { params: Promise<{ slug: string }> };

/* Essay paragraphs are flat strings; the shapes hide in their first
   characters. Consecutive "- " lines gather into one bulleted list,
   "---" is a section rule, everything else reads as a paragraph
   (with \n kept as line breaks). */
type ProseBlock =
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "rule" };

function groupParagraphs(paragraphs: string[]): ProseBlock[] {
  const blocks: ProseBlock[] = [];
  for (const p of paragraphs) {
    if (p.trim() === "---") {
      blocks.push({ kind: "rule" });
      continue;
    }
    if (p.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      const item = p.slice(2);
      if (last?.kind === "list") last.items.push(item);
      else blocks.push({ kind: "list", items: [item] });
      continue;
    }
    blocks.push({ kind: "text", text: p });
  }
  return blocks;
}

export function generateStaticParams() {
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const essay = essays.find((e) => e.slug === slug);
  if (!essay) return {};
  return { title: essay.title, description: essay.subtitle };
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
  // Month and year — the shelf's register; day precision serves no one.
  const shelfDate = (e: { date: string }) => {
    const [month, , year] = e.date.split(" ");
    return `${month} ${year}`;
  };

  return (
    <main className="px-gutter pb-24 text-body">
      {/* The piece sits in the reading column where the index list sits.
          No rail: the fixed nav already holds Writing, and the piece
          carries its own metadata. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
        <article className="md:col-span-4 md:col-start-5">
          {/* Metadata sits under the title in the site sans, so the line
              between apparatus and serif reading falls right there. The
              head clears the first line by about two paragraph gaps. */}
          <header className="pb-10">
            <h1 className="text-title font-medium leading-[1.1]">
              {essay.title}
            </h1>
            <p className="pt-3">
              {shelfDate(essay)} · {words.toLocaleString()} words · {minutes} min
            </p>
          </header>
          {/* The one place the site reads in serif: the prose itself.
              Title, rail, metadata and previous/next stay in the site
              sans, the same head as every other page. */}
          <div className="font-serif space-y-[1.4em] text-[16px] leading-[1.6]">
            {groupParagraphs(essay.paragraphs).map((block, i) =>
              block.kind === "list" ? (
                <ul key={i} className="list-disc space-y-2 pl-4">
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              ) : block.kind === "rule" ? (
                <hr key={i} className="w-10 border-neutral-300" />
              ) : (
                <p key={i} className="whitespace-pre-line">
                  {block.text}
                </p>
              ),
            )}
          </div>
          {previous && next && (
            <div className="flex items-start justify-between gap-gutter pt-24 max-md:pt-16">
              <div className="md:text-[16px] leading-[1.6]">
                <p>Previous</p>
                <Link
                  href={`/writing/${previous.slug}`}
                  className="block font-medium hover:text-neutral-400"
                >
                  {previous.title}
                </Link>
              </div>
              <div className="text-right md:text-[16px] leading-[1.6]">
                <p>Next</p>
                <Link
                  href={`/writing/${next.slug}`}
                  className="block font-medium hover:text-neutral-400"
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
