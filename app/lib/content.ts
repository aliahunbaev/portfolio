import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { slugify, type Block, type Project } from "./projects";

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
    if (trimmed.startsWith("> ")) {
      // Quote block; a final line opening with an em dash is the
      // author. Internal blank quote lines are paragraph breaks.
      const lines = trimmed
        .split(/\r?\n/)
        .map((l) => l.replace(/^>\s?/, "").trimEnd());
      let author: string | undefined;
      const lastLine = lines[lines.length - 1].trim();
      if (lines.length > 1 && lastLine.startsWith("—")) {
        author = lastLine.replace(/^—\s*/, "");
        lines.pop();
      }
      blocks.push({
        type: "quote",
        body: lines.join("\n").trim(),
        author,
      });
      continue;
    }
    const media = [...trimmed.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map(
      (m) => ({ alt: m[1], src: m[2] }),
    );
    const images = media.map((m) => m.src);
    const prose = trimmed.replace(/!\[[^\]]*\]\([^)]+\)/g, "").trim();

    if (images.length && !prose) {
      const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);
      const [, firstFlag] = (media[0].alt || "")
        .split("|")
        .map((part) => part.trim());
      // Two or three pieces on a line share a row; four or more are a
      // bounded artifact that opens in the viewer. `Title | gallery`
      // forces the viewer for a short set (a three-page program).
      const forceGallery = firstFlag === "gallery" || firstFlag === "reader";
      if (images.length >= 4 || (images.length >= 3 && forceGallery)) {
        // A bounded artifact; may mix stills and clips. Every still gets
        // its pixel size so the viewer lays out before any image loads.
        const firstStill = images.find((src) => !isVideo(src)) ?? images[0];
        const [galleryTitle, flag] = (media[0].alt || "Gallery")
          .split("|")
          .map((part) => part.trim());
        blocks.push({
          type: "gallery",
          title: galleryTitle || "Gallery",
          mode:
            flag === "reader"
              ? ("reader" as const)
              : flag === "board"
                ? ("board" as const)
                : undefined,
          images: images.map((src) => {
            const url = resolveSrc(slug, src);
            if (isVideo(src)) return { src: url };
            // A "-s" sibling is a lightweight tier: boards open on it and
            // load the full file only when an image is brought forward.
            const small = url.replace(/\.(jpe?g|png)$/i, "-s.$1");
            return {
              src: url,
              ...imageSize(url),
              ...(existsSync(path.join(process.cwd(), "public", small))
                ? { small }
                : {}),
            };
          }),
          cover: imageSize(resolveSrc(slug, firstStill)),
        });
      } else {
        // A video takes its proportions (and a first-frame poster) from a
        // sibling still of the same name, if one exists.
        const posterFor = (src: string) => {
          for (const ext of [".jpg", ".png"]) {
            const candidate = src.replace(/\.(mp4|webm|mov)$/i, ext);
            const url = resolveSrc(slug, candidate);
            const size = imageSize(url);
            if (size) return { poster: url, ...size };
          }
          return {};
        };
        const items = media.map(({ alt, src }) => {
          const url = resolveSrc(slug, src);
          return isVideo(src)
            ? ({ type: "video", src: url, ...posterFor(src) } as const)
            : ({
                type: "image",
                image: url,
                caption: alt || undefined,
                ...imageSize(url),
              } as const);
        });
        if (items.length >= 2) blocks.push({ type: "row", items: [...items] });
        else blocks.push(items[0]);
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
    order: meta.order ? Number(meta.order) : undefined,
    previewVideo: meta.preview ? resolveSrc(slug, meta.preview) : undefined,
    previewPoster: meta.previewPoster
      ? resolveSrc(slug, meta.previewPoster)
      : undefined,
    blocks,
  };
}

const newestFirst = (a: Project, b: Project) =>
  (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0);

/** Every project, from the markdown folders. Newest first. */
export function getWorks(): Project[] {
  const written = existsSync(ROOT)
    ? readdirSync(ROOT, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => readFolder(entry.name))
        .filter((work) => work !== undefined)
    : [];
  return written.sort(newestFirst);
}

/** The homepage rows: markdown projects marked `featured: true`, plus any
 *  placeholder rows they haven't replaced yet. Newest first. */
export function getFeatured(): Project[] {
  // Curated positions first, then the rest by recency.
  return getWorks()
    .filter((work) => work.featured)
    .sort((a, b) => {
    if (a.order != null || b.order != null) {
      if (a.order == null) return 1;
      if (b.order == null) return -1;
      return a.order - b.order;
    }
      return newestFirst(a, b);
    });
}
