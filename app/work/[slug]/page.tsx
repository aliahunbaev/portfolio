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

/* The whole page is body-size text. Prose always lives in cols 6-9;
   images bleed across all 12 (pairs split 6/6). */
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
  // The first text block opens in the header's right column, beside the
  // meta; the description stands in when a project has no written story.
  const [headerText, rest] =
    blocks[0]?.type === "text"
      ? [blocks[0].body, blocks.slice(1)]
      : [work.description, blocks];

  const meta: [string, string][] = [
    ["Project", work.title],
    ["Date", work.date],
    ["Type", work.category],
  ];

  return (
    <main className="px-gutter pb-24 text-body">
      {/* SODAA-style header: label/value meta left, story right, all 14px. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="grid grid-cols-5 content-start gap-x-gutter gap-y-4 max-md:grid-cols-3 md:col-span-5">
          {meta.map(([label, value]) => (
            <div key={label} className="col-span-5 grid grid-cols-subgrid max-md:col-span-3">
              <p className="col-span-2 max-md:col-span-1">
                {label}
              </p>
              {label === "Project" ? (
                <h1 className="col-span-3 max-md:col-span-2">{value}</h1>
              ) : (
                <p className="col-span-3 max-md:col-span-2">{value}</p>
              )}
            </div>
          ))}
        </div>
        <p className="whitespace-pre-line leading-[1.5] max-md:pt-12 md:col-span-4 md:col-start-6">
          {headerText}
        </p>
      </div>
      <div className="flex flex-col gap-gutter pt-24 max-md:pt-12">
        {rest.map((block, i) => (
          <BlockView key={i} block={block} alt={work.title} />
        ))}
      </div>
      <div className="grid grid-cols-12 gap-x-gutter pt-24 max-md:pt-16">
        <p className="max-md:col-span-12 max-md:pb-2 md:col-span-5">
          Next Project
        </p>
        <Link
          href={`/work/${slugify(next.title)}`}
          className="hover:text-neutral-400 max-md:col-span-12 md:col-span-7"
        >
          {next.title}
        </Link>
      </div>
    </main>
  );
}
