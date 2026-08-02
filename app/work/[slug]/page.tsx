import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { slugify, workImages, works } from "../../lib/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((work) => ({ slug: slugify(work.title) }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const work = works.find((w) => slugify(w.title) === slug);
  return { title: work ? `${work.title} — Ali Ahunbáev` : "Ali Ahunbáev" };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const index = works.findIndex((w) => slugify(w.title) === slug);
  if (index === -1) notFound();
  const work = works[index];
  const next = works[(index + 1) % works.length];
  const images = workImages(work.title);

  return (
    <main className="px-gutter pb-24">
      {/* Header mirrors an index row: title cols 1-5, type from col 6. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:gap-x-gutter">
        <h1 className="text-title font-medium md:col-span-5">{work.title}</h1>
        <p className="text-title max-md:hidden md:col-span-7">
          {work.category}
        </p>
      </div>
      <div className="grid grid-cols-12 gap-x-gutter pt-12 text-body max-md:grid-cols-3 max-md:pt-6">
        <p className="col-span-2 font-medium max-md:col-span-1">{work.date}</p>
        <p className="col-span-4 max-md:col-span-2">{work.description}</p>
      </div>
      <div className="flex flex-col gap-gutter pt-24 max-md:pt-12">
        {images.map(({ image, objectPosition }) => (
          <div
            key={image}
            className="relative aspect-[1.85/1] w-full overflow-hidden"
          >
            <Image
              src={image}
              alt={work.title}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition }}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-x-gutter pt-24 max-md:pt-16">
        <p className="col-span-5 text-body max-md:col-span-12 max-md:pb-2">
          Next Project
        </p>
        <Link
          href={`/work/${slugify(next.title)}`}
          className="col-span-7 text-title font-medium hover:text-neutral-400 max-md:col-span-12"
        >
          {next.title}
        </Link>
      </div>
    </main>
  );
}
