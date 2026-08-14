import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  projects as legacyFeatured,
  slugify,
  works as legacyWorks,
  type Block,
  type Project,
} from "./projects";

/* Reads project folders from public/work/<slug>/index.md at build time.
   Server-only — never import this from a "use client" component; pages
   load the data and pass it down.

   A project folder holds its markdown and its images together:

     public/work/marble/
       index.md
       cover.jpg
       screens.jpg

   index.md:

     ---
     title: Marble
     date: July 2026
     medium: iOS App
     description: One line for the homepage row and archive.
     cover: cover.jpg          # optional; first image otherwise
     tint: "#E8E5DE"           # rare — only when the colour IS the work
     featured: true            # optional; shows on the homepage
     ---

     Opening context paragraph.

     ![](screens.jpg)

     More narrative where the project earns it.

   Blank-line-separated prose becomes text blocks; a line holding one
   image becomes a full-width image; two images on one line become a
   6/6 pair. Image paths are relative to the folder, or absolute if they
   start with "/". */

const ROOT = path.join(process.cwd(), "public", "work");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {} as Record<string, string>, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line
      .slice(colon + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key) meta[key] = value;
  }
  return { meta, body: raw.slice(match[0].length) };
}

const resolveSrc = (slug: string, src: string) =>
  src.startsWith("/") ? src : `/work/${slug}/${src}`;

/** Pixel size of a local public/ image (PNG and JPEG), for laying out
 *  gallery covers at their natural proportions. */
function imageSize(url: string): { w: number; h: number } | undefined {
  try {
    const buf = readFileSync(path.join(process.cwd(), "public", url));
    if (buf[0] === 0x89 && buf[1] === 0x50)
      return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length - 9) {
        if (buf[i] !== 0xff) {
          i++;
          continue;
        }
        const marker = buf[i + 1];
        if (
          marker >= 0xc0 &&
          marker <= 0xcf &&
          marker !== 0xc4 &&
          marker !== 0xc8 &&
          marker !== 0xcc
        )
          return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
  } catch {}
  return undefined;
}

function parseBlocks(slug: string, body: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of body.split(/\n{2,}/)) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) {
      const title = trimmed.slice(3).trim();
      blocks.push({ type: "section", title, id: slugify(title) });
      continue;
    }
    const media = [...trimmed.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map(
      (m) => ({ alt: m[1], src: m[2] }),
    );
    const images = media.map((m) => m.src);
    const prose = trimmed.replace(/!\[[^\]]*\]\([^)]+\)/g, "").trim();

    if (images.length && !prose) {
      const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);
      if (images.length >= 3) {
        // A bounded artifact; may mix stills and clips. The cover is the
        // first still.
        const firstStill = images.find((src) => !isVideo(src)) ?? images[0];
        blocks.push({
          type: "gallery",
          title: media[0].alt || "Gallery",
          images: images.map((src) => resolveSrc(slug, src)),
          cover: imageSize(resolveSrc(slug, firstStill)),
        });
      } else if (images.every(isVideo)) {
        for (const src of images) {
          blocks.push({ type: "video", src: resolveSrc(slug, src) });
        }
      } else if (images.length === 2) {
        blocks.push({
          type: "pair",
          images: images.map((src) => ({ image: resolveSrc(slug, src) })),
        });
      } else {
        for (const src of images) {
          blocks.push({ type: "image", image: resolveSrc(slug, src) });
        }
      }
    } else if (prose) {
      const last = blocks[blocks.length - 1];
      // Keep consecutive paragraphs in one block so they render together.
      if (last?.type === "text") last.body += `\n\n${prose}`;
      else blocks.push({ type: "text", body: prose });
    }
  }
  return blocks;
}

function readFolder(slug: string): Project | undefined {
  const file = path.join(ROOT, slug, "index.md");
  if (!existsSync(file)) return undefined;
  const { meta, body } = parseFrontmatter(readFileSync(file, "utf8"));
  if (!meta.title) return undefined;
  const blocks = parseBlocks(slug, body);
  const firstImage = blocks.find((b) => b.type === "image");
  return {
    title: meta.title,
    date: meta.date ?? "",
    category: meta.medium ?? meta.category ?? "",
    description: meta.description ?? "",
    image: meta.cover
      ? resolveSrc(slug, meta.cover)
      : firstImage?.type === "image"
        ? firstImage.image
        : "",
    objectPosition: meta.objectPosition ?? "50% 50%",
    tint: meta.tint || undefined,
    featured: meta.featured === "true",
    previewVideo: meta.preview ? resolveSrc(slug, meta.preview) : undefined,
    previewPoster: meta.previewPoster
      ? resolveSrc(slug, meta.previewPoster)
      : undefined,
    blocks,
  };
}

const newestFirst = (a: Project, b: Project) =>
  (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0);

/** Every project — markdown folders first, then any placeholder entries
 *  that markdown hasn't replaced yet. Newest first. */
export function getWorks(): Project[] {
  const written = existsSync(ROOT)
    ? readdirSync(ROOT, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => readFolder(entry.name))
        .filter((work) => work !== undefined)
    : [];
  const claimed = new Set(written.map((work) => work.title));
  const remaining = legacyWorks.filter((work) => !claimed.has(work.title));
  return [...written, ...remaining].sort(newestFirst);
}

/** The homepage rows: markdown projects marked `featured: true`, plus any
 *  placeholder rows they haven't replaced yet. Newest first. */
export function getFeatured(): Project[] {
  const featured = getWorks().filter((work) => work.featured);
  const claimed = new Set(featured.map((work) => work.title));
  const remaining = legacyFeatured.filter((work) => !claimed.has(work.title));
  return [...featured, ...remaining].sort(newestFirst);
}
