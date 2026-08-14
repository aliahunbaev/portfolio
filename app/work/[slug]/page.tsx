import Link from "next/link";
import FadeImage from "../../components/fade-image";
import VideoPlayer from "../../components/video-player";
import { notFound } from "next/navigation";
import AnchorRail from "../../components/anchor-rail";
import GalleryBlock from "../../components/gallery-block";
import { getWorks } from "../../lib/content";
import { slugify, workImages, type Block } from "../../lib/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getWorks().map((work) => ({ slug: slugify(work.title) }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const work = getWorks().find((w) => slugify(w.title) === slug);
  return { title: "Ali Ahunbáev", description: work?.description };
}

function Frame({
  image,
  objectPosition = "50% 50%",
  aspect,
  sizes,
  alt,
  className = "",
}: {
  image: string;
  objectPosition?: string;
  aspect: string;
  sizes: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-black/[0.04] ${aspect} ${className}`}
    >
      <FadeImage
        draggable={false}
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

/* Blocks live in the content zone (page cols 5-12, an 8-col subgrid).
   Images take the zone's full width, pairs split it, text runs narrower
   (5 of 8 cols) so reading lines stay comfortable on big screens. */
function BlockView({
  block,
  alt,
  anchorId,
}: {
  block:
    | Block
    | {
        type: "galleryRow";
        galleries: Extract<Block, { type: "gallery" }>[];
      };
  alt: string;
  anchorId?: string;
}) {
  if (block.type === "section") return null;
  if (block.type === "text") {
    return (
      <p
        id={anchorId}
        className="scroll-mt-24 whitespace-pre-line py-6 leading-[1.5] first:pt-0 md:col-span-5"
      >
        {block.body}
      </p>
    );
  }
  if (block.type === "video") {
    return (
      <div id={anchorId} className="scroll-mt-24 md:col-span-8">
        <VideoPlayer src={block.src} />
      </div>
    );
  }
  if (block.type === "gallery") {
    return (
      <GalleryBlock
        title={block.title}
        images={block.images}
        cover={block.cover}
        className="md:col-span-8"
      />
    );
  }
  if (block.type === "galleryRow") {
    // Shared row: each artifact's share of the width is its aspect
    // ratio, so every tile lands at the same height and the row fills
    // the zone exactly.
    return (
      <div
        id={anchorId}
        className="flex scroll-mt-24 gap-x-gutter max-md:flex-col max-md:gap-y-gutter md:col-span-8"
      >
        {block.galleries.map((g) => (
          <GalleryBlock
            key={g.title}
            title={g.title}
            images={g.images}
            cover={g.cover}
            style={
              g.cover
                ? { flexGrow: g.cover.w / g.cover.h, flexBasis: 0 }
                : { flexGrow: 1, flexBasis: 0 }
            }
          />
        ))}
      </div>
    );
  }
  if (block.type === "pair") {
    return (
      <div className="grid grid-cols-2 gap-x-gutter md:col-span-8">
        {block.images.map(({ image, objectPosition }) => (
          <Frame
            key={image + objectPosition}
            image={image}
            objectPosition={objectPosition}
            aspect="aspect-[4/5]"
            sizes="(max-width: 768px) 50vw, 33vw"
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
      sizes="(max-width: 768px) 100vw, 67vw"
      alt={alt}
      className="md:col-span-8"
    />
  );
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const works = getWorks();
  const index = works.findIndex((w) => slugify(w.title) === slug);
  if (index === -1) notFound();
  const work = works[index];
  const previous = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];

  const blocks: Block[] = work.blocks ?? [
    { type: "text", body: work.description },
    ...workImages(work.title).map(
      ({ image, objectPosition }) =>
        ({ type: "image", image, objectPosition }) as Block,
    ),
  ];

  // Consecutive portrait galleries collapse into one row, and each
  // section's anchor id rides on its first real block — no empty rows.
  type GalleryB = Extract<Block, { type: "gallery" }>;
  type RowBlock = Block | { type: "galleryRow"; galleries: GalleryB[] };
  const grouped: { block: RowBlock; anchorId?: string }[] = [];
  let pendingAnchor: string | undefined;
  for (const block of blocks) {
    if (block.type === "section") {
      pendingAnchor = block.id;
      continue;
    }
    const portrait =
      block.type === "gallery" && block.cover && block.cover.h > block.cover.w;
    const last = grouped[grouped.length - 1];
    if (portrait && last?.block.type === "galleryRow" && !pendingAnchor) {
      (last.block as { galleries: GalleryB[] }).galleries.push(
        block as GalleryB,
      );
    } else if (portrait) {
      grouped.push({
        block: { type: "galleryRow", galleries: [block as GalleryB] },
        anchorId: pendingAnchor,
      });
      pendingAnchor = undefined;
    } else {
      grouped.push({ block, anchorId: pendingAnchor });
      pendingAnchor = undefined;
    }
  }

  const sections = blocks.filter((b) => b.type === "section");

  const meta: [string, string][] = [
    ["Project", work.title],
    ["Date", work.date],
    ["Medium", work.category],
  ];

  return (
    <main
      className="min-h-screen px-gutter pb-24 text-body"
      style={work.tint ? { backgroundColor: work.tint } : undefined}
    >
      {/* Mirrors a homepage row: sticky meta rail cols 1-4, content 5-12. */}
      <div className="pt-30 md:grid md:grid-cols-12 md:items-start md:gap-x-gutter">
        {sections.length ? (
          <aside className="max-md:hidden md:sticky md:top-30 md:col-span-3">
            <AnchorRail sections={sections} />
          </aside>
        ) : (
          <aside className="grid grid-cols-4 content-start gap-x-gutter gap-y-4 max-md:grid-cols-3 md:sticky md:top-30 md:col-span-4">
            {meta.map(([label, value]) => (
              <div
                key={label}
                className="col-span-4 grid grid-cols-subgrid max-md:col-span-3"
              >
                <p className="col-span-2 max-md:col-span-1">{label}</p>
                {label === "Project" ? (
                  <h1 className="col-span-2 max-md:col-span-2">{value}</h1>
                ) : (
                  <p className="col-span-2 max-md:col-span-2">{value}</p>
                )}
              </div>
            ))}
            <Link
              href="/archive"
              className="col-span-4 pt-8 hover:text-neutral-400 max-md:hidden"
            >
              Back
            </Link>
          </aside>
        )}
        <div
          className={
            sections.length
              ? "md:col-span-8 md:col-start-5"
              : "max-md:pt-12 md:col-span-8"
          }
        >
          <div className="md:grid md:grid-cols-8 md:gap-x-gutter md:gap-y-gutter max-md:flex max-md:flex-col max-md:gap-gutter">
            {sections.length ? (
              // Sectioned projects open with the meta as a standardized
              // header inside the content zone, same type size as all.
              <header className="pb-8 md:col-span-5">
                <h1 className="text-title font-medium leading-[1.1]">
                  {work.title}
                </h1>
                <p className="pt-2">
                  {work.category}, {work.date}
                </p>
              </header>
            ) : null}
            {grouped.map(({ block, anchorId }, i) => (
              <BlockView
                key={i}
                block={block}
                alt={work.title}
                anchorId={anchorId}
              />
            ))}
          </div>
          {/* Previous west, next east — the direction you'd travel. */}
          <div className="flex items-baseline justify-between gap-gutter pt-24 max-md:pt-16">
            <div className="grid gap-y-4">
              <p>Previous Project</p>
              <Link
                href={`/work/${slugify(previous.title)}`}
                className="hover:text-neutral-400"
              >
                {previous.title}
              </Link>
            </div>
            <div className="grid gap-y-4 text-right">
              <p>Next Project</p>
              <Link
                href={`/work/${slugify(next.title)}`}
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
