import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnchorRail from "../../components/anchor-rail";
import BoardBlock from "../../components/board-block";
import FadeImage from "../../components/fade-image";
import GalleryBlock from "../../components/gallery-block";
import LoopVideo from "../../components/loop-video";
import VideoPlayer from "../../components/video-player";
import { getWorks, imageSize } from "../../lib/content";
import { slugify, type Block } from "../../lib/projects";

type Params = { params: Promise<{ slug: string }> };

type ImageB = Extract<Block, { type: "image" }>;
type GalleryB = Extract<Block, { type: "gallery" }>;
type RowBlock =
  | Block
  | { type: "galleryRow"; galleries: GalleryB[] }
  | { type: "imageRow"; images: ImageB[] };

export function generateStaticParams() {
  return getWorks().map((work) => ({ slug: slugify(work.title) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorks().find((w) => slugify(w.title) === slug);
  if (!work) return {};
  // The cover is the preview: the work itself, not a card about it.
  const size = imageSize(work.image);
  return {
    title: work.title,
    description: work.description,
    openGraph: {
      images: [
        { url: work.image, alt: work.title, width: size?.w, height: size?.h },
      ],
    },
  };
}

/** Renders *asterisk* spans as italics and [label](url) as links;
 *  everything else verbatim. */
function Em({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\(https?:[^)]+\))/g).map((chunk, i) => {
        const link = chunk.match(/^\[([^\]]+)\]\((https?:[^)]+)\)$/);
        if (link) {
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline decoration-1 underline-offset-2 hover:text-neutral-400"
            >
              {link[1]}
            </a>
          );
        }
        return chunk.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g).map((part, j) =>
          part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
            <strong key={`${i}-${j}`} className="font-medium">
              {part.slice(2, -2)}
            </strong>
          ) : part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
            <em key={`${i}-${j}`}>{part.slice(1, -1)}</em>
          ) : (
            <span key={`${i}-${j}`}>{part}</span>
          ),
        );
      })}
    </>
  );
}

const ratio = (b: { w?: number; h?: number }) =>
  b.w && b.h ? b.w / b.h : 1.85;
const isPortrait = (b: { w?: number; h?: number }) =>
  !!(b.w && b.h && b.h > b.w);

/* An image at its own proportions — never cropped — with an optional
   centred caption beneath. */
function Picture({
  block,
  alt,
  className = "",
  style,
}: {
  block: ImageB;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const frame = (
    <>
      <div
        className="relative w-full overflow-hidden bg-black/[0.04]"
        style={{ aspectRatio: `${block.w ?? 1850} / ${block.h ?? 1000}` }}
      >
        <FadeImage
          draggable={false}
          src={block.image}
          alt={block.caption || alt}
          fill
          sizes="(max-width: 768px) 100vw, 67vw"
          className="object-cover"
        />
      </div>
      {block.caption && (
        <p className="pt-3 text-center">
          <Em text={block.caption} />
        </p>
      )}
    </>
  );
  return (
    <div className={className} style={style}>
      {block.href ? (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-90"
        >
          {frame}
        </a>
      ) : (
        frame
      )}
    </div>
  );
}

/* Blocks live in the content zone (page cols 5-12, an 8-col subgrid).
   Landscape images take the zone's full width at natural ratio;
   consecutive portraits share a row, widths proportional to their
   ratios so heights match; text runs narrower for comfortable lines. */
function BlockView({
  block,
  alt,
  anchorId,
}: {
  block: RowBlock;
  alt: string;
  anchorId?: string;
}) {
  if (block.type === "section") {
    // The header lives in the text and the rail alike — same skeleton.
    return (
      <h2
        id={block.id}
        className="-mb-7 scroll-mt-24 pt-10 text-[16px] font-medium leading-[1.6] first:pt-0 md:col-start-5 md:col-span-4"
      >
        {block.title}
      </h2>
    );
  }
  if (block.type === "text") {
    return (
      <p
        id={anchorId}
        className="scroll-mt-24 whitespace-pre-line py-6 text-[16px] leading-[1.6] first:pt-0 md:col-start-5 md:col-span-4"
      >
        <Em text={block.body} />
      </p>
    );
  }
  if (block.type === "quote") {
    return (
      <figure id={anchorId} className="scroll-mt-24 py-6 text-[16px] leading-[1.6] md:col-start-5 md:col-span-4">
        <blockquote className="whitespace-pre-line italic leading-[1.5]">
          <Em text={block.body} />
        </blockquote>
        {block.author && (
          <figcaption className="pt-2 not-italic">
            — <Em text={block.author} />
          </figcaption>
        )}
      </figure>
    );
  }
  if (block.type === "video") {
    // Silent app previews loop chromelessly, gif-fashion; the player —
    // controls, time, audio — is for film.
    if (block.loop) {
      return (
        <LoopVideo
          src={block.src}
          poster={block.poster}
          w={block.w}
          h={block.h}
          className="scroll-mt-24 md:col-start-3 md:col-span-8"
        />
      );
    }
    return (
      <div id={anchorId} className="scroll-mt-24 md:col-start-3 md:col-span-8">
        <VideoPlayer src={block.src} />
      </div>
    );
  }
  if (block.type === "row") {
    // Written side by side, shown side by side: widths in ratio so the
    // row shares one height; loops and stills mix freely.
    return (
      <div
        id={anchorId}
        className="flex scroll-mt-24 items-start gap-x-gutter md:col-start-3 md:col-span-8"
      >
        {block.items.map((item) =>
          item.type === "video" ? (
            <LoopVideo
              key={item.src}
              src={item.src}
              poster={item.poster}
              w={item.w}
              h={item.h}
              style={{ flexGrow: ratio(item), flexBasis: 0 }}
            />
          ) : (
            <Picture
              key={item.image}
              block={item}
              alt={alt}
              style={{ flexGrow: ratio(item), flexBasis: 0 }}
            />
          ),
        )}
      </div>
    );
  }
  if (block.type === "gallery") {
    if (block.mode === "board") {
      return (
        <BoardBlock
          title={block.title}
          images={block.images}
          className="md:col-start-3 md:col-span-8"
        />
      );
    }
    return (
      <GalleryBlock
        title={block.title}
        images={block.images}
        cover={block.cover}
        mode={block.mode}
        className="md:col-start-3 md:col-span-8"
      />
    );
  }
  if (block.type === "galleryRow") {
    if (block.galleries.length === 1) {
      const g = block.galleries[0];
      return (
        <GalleryBlock
          title={g.title}
          images={g.images}
          cover={g.cover}
          mode={g.mode}
          className="scroll-mt-24 md:col-start-5 md:col-span-4"
        />
      );
    }
    return (
      <div
        id={anchorId}
        className="flex scroll-mt-24 gap-x-gutter max-md:flex-col max-md:gap-y-gutter md:col-start-3 md:col-span-8"
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
  if (block.type === "imageRow") {
    if (block.images.length === 1) {
      // A lone portrait holds half the zone rather than towering.
      return (
        <Picture
          block={block.images[0]}
          alt={alt}
          className="scroll-mt-24 md:col-start-5 md:col-span-4"
        />
      );
    }
    return (
      <div
        id={anchorId}
        className="flex scroll-mt-24 items-start gap-x-gutter max-md:flex-col max-md:gap-y-gutter md:col-start-3 md:col-span-8"
      >
        {block.images.map((img) => (
          <Picture
            key={img.image}
            block={img}
            alt={alt}
            style={{ flexGrow: ratio(img), flexBasis: 0 }}
          />
        ))}
      </div>
    );
  }
  return (
    <div id={anchorId} className="scroll-mt-24 md:col-start-3 md:col-span-8">
      <Picture block={block} alt={alt} />
    </div>
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

  const blocks: Block[] = work.blocks ?? [];

  // Consecutive portrait images pair up; consecutive portrait galleries
  // share a row; each section's anchor rides its first real block.
  const grouped: { block: RowBlock; anchorId?: string }[] = [];
  let pendingAnchor: string | undefined;
  for (const block of blocks) {
    if (block.type === "section") {
      grouped.push({ block });
      continue;
    }
    const last = grouped[grouped.length - 1];
    if (
      block.type === "gallery" &&
      !block.mode &&
      block.cover &&
      block.cover.h > block.cover.w
    ) {
      if (last?.block.type === "galleryRow" && !pendingAnchor) {
        (last.block as { galleries: GalleryB[] }).galleries.push(block);
      } else {
        grouped.push({
          block: { type: "galleryRow", galleries: [block] },
          anchorId: pendingAnchor,
        });
        pendingAnchor = undefined;
      }
      continue;
    }
    if (block.type === "image" && isPortrait(block)) {
      if (
        last?.block.type === "imageRow" &&
        (last.block as { images: ImageB[] }).images.length < 2 &&
        !pendingAnchor
      ) {
        (last.block as { images: ImageB[] }).images.push(block);
      } else {
        grouped.push({
          block: { type: "imageRow", images: [block] },
          anchorId: pendingAnchor,
        });
        pendingAnchor = undefined;
      }
      continue;
    }
    grouped.push({ block, anchorId: pendingAnchor });
    pendingAnchor = undefined;
  }

  const sections = blocks.filter((b) => b.type === "section");

  return (
    <main
      className="min-h-screen px-gutter pb-24 text-body"
      style={work.tint ? { backgroundColor: work.tint } : undefined}
    >
      {/* The overture: full-width facts over a strip of outcomes — the
          homepage's caption-band grammar opening the study. Glimpse
          first, thinking after. */}
      <header className="pt-30">
        <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
          {/* The statement, in the homepage h1's own position: name and
              thesis left, one editorial block. */}
          <div className="md:col-span-8">
            <h1 className="text-title font-medium leading-[1.1]">
              {work.title}
            </h1>
            {(work.tagline ?? work.description) && (
              <p className="pt-3 text-title font-medium leading-[1.2] text-neutral-400">
                {work.tagline ?? work.description}
              </p>
            )}
          </div>
          {/* The facts, stacked on the right rail — SODAA grammar. */}
          <div className="grid grid-cols-2 gap-x-gutter gap-y-6 max-md:pt-10 md:col-span-3 md:col-start-10 md:block md:space-y-6">
            <div>
              <p className="font-medium">Year</p>
              <p className="pt-1">{work.date}</p>
            </div>
            <div>
              <p className="font-medium">Medium</p>
              <p className="pt-1">{work.category}</p>
            </div>
            {work.disciplines && (
              <div>
                <p className="font-medium">Disciplines</p>
                <p className="pt-1">
                  {work.disciplines
                    .split(",")
                    .map((d) => d.trim())
                    .join(" · ")}
                </p>
              </div>
            )}
            {work.links && work.links.length > 0 && (
              <div>
                <p className="font-medium">Links</p>
                <p className="flex flex-wrap gap-x-4 pt-1">
                  {work.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline decoration-1 underline-offset-2 hover:text-neutral-400"
                    >
                      {l.label}
                    </a>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>
        {[work.homeRow, work.caseRow].filter((r) => r && r.length).map((row, ri) => (
          <div
            key={ri}
            className={`flex items-stretch gap-x-gutter max-md:hidden ${ri === 0 ? "mt-12" : "mt-gutter"}`}
          >
            {row!.map((item) => {
              const r = item.w / item.h;
              return (
                <div
                  key={item.src}
                  style={{ flexGrow: r, flexBasis: 0, minWidth: 0 }}
                >
                  <div
                    className="relative w-full overflow-hidden bg-black/[0.04]"
                    style={{ aspectRatio: `${item.w} / ${item.h}` }}
                  >
                    {item.type === "video" ? (
                      <LoopVideo
                        src={item.src}
                        poster={item.poster}
                        w={item.w}
                        h={item.h}
                      />
                    ) : (
                      <FadeImage
                        draggable={false}
                        src={item.src}
                        alt={work.title}
                        fill
                        sizes="30vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </header>
      <div className="pt-16 max-md:flex max-md:flex-col max-md:gap-gutter md:grid md:grid-cols-12 md:items-start md:gap-x-gutter md:gap-y-gutter">
        <aside className="max-md:hidden md:sticky md:top-30 md:col-start-1 md:col-span-2 md:row-start-1">
          <AnchorRail sections={sections} />
        </aside>
        {grouped.map(({ block, anchorId }, i) => (
          <BlockView
            key={i}
            block={block}
            alt={work.title}
            anchorId={anchorId}
          />
        ))}
      </div>
      {/* The bookends end the reading flow, so they live in the reading
          column: small label, title-size name, west and east. */}
      <div className="pt-24 max-md:pt-16 md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="flex items-start justify-between gap-gutter md:col-start-5 md:col-span-4">
          <div className="text-[16px] leading-[1.6]">
            <p>Previous</p>
            <Link
              href={`/work/${slugify(previous.title)}`}
              className="block font-medium hover:text-neutral-400"
            >
              {previous.title}
            </Link>
          </div>
          <div className="text-right text-[16px] leading-[1.6]">
            <p>Next</p>
            <Link
              href={`/work/${slugify(next.title)}`}
              className="block font-medium hover:text-neutral-400"
            >
              {next.title}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
