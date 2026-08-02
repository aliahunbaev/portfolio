import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  slugify,
  workImages,
  works,
  type Block,
} from "../../lib/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((work) => ({ slug: slugify(work.title) }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const work = works.find((w) => slugify(w.title) === slug);
  return { title: work ? `${work.title} — Ali Ahunbáev` : "Ali Ahunbáev" };
}

function Frame({
  image,
  objectPosition = "50% 50%",
  aspect,
  sizes,
  alt,
}: {
  image: string;
  objectPosition?: string;
  aspect: string;
  sizes: string;
  alt: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${aspect}`}>
      <Image
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}

/* Width is a property of each block, assigned in columns: text sits in
   6-9 for a readable measure, single images bleed across all 12, pairs
   split the grid 6/6. */
function BlockView({ block, alt }: { block: Block; alt: string }) {
  if (block.type === "text") {
    return (
      <div className="py-12 md:grid md:grid-cols-12 md:gap-x-gutter">
        <p className="whitespace-pre-line text-body leading-[1.5] md:col-span-4 md:col-start-6">
          {block.body}
      </p>
      </div>
    );
  }
  if (block.type === "pair") {
    return (
      <div className="grid grid-cols-2 gap-x-gutter">
        {block.images.map(({ image, objectPosition }) => (
          <Frame
            key={image + objectPosition}
            image={image}
            objectPosition={objectPosition}
            aspect="aspect-[4/5]"
            sizes="50vw"
            alt={alt}
          />
        ))}
      </div>
    );
  }
  return (
    <Frame
      image={block.image}
      objectPosition={block.objectPosition}
      aspect="aspect-[1.85/1]"
      sizes="100vw"
      alt={alt}
    />
  );
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const index = works.findIndex((w) => slugify(w.title) === slug);
  if (index === -1) notFound();
  const work = works[index];
  const next = works[(index + 1) % works.length];
  const blocks: Block[] =
    work.blocks ??
    workImages(work.title).map(({ image, objectPosition }) => ({
      type: "image",
      image,
      objectPosition,
    }));

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
        {blocks.map((block, i) => (
          <BlockView key={i} block={block} alt={work.title} />
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
