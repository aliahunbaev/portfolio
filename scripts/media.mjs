#!/usr/bin/env node
/*
 * Turns a folder of raw material into web-ready files for a project.
 *
 *   node scripts/media.mjs ~/Desktop/art-movement the-art-movement
 *
 * Reads every file in the source folder and writes optimized copies into
 * public/work/<slug>/, leaving the originals untouched:
 *
 *   photos (jpg/png/heic/tiff/webp) -> JPEG, longest edge 2400px
 *   graphics/screenshots (png)      -> PNG, longest edge 2400px
 *   video (mov/mp4/m4v/avi)         -> MP4 H.264 1080p, web-optimized
 *   preview*.mov/mp4                -> also extracts a first-frame poster
 *   PDF                             -> one JPEG per page (deck-01.jpg …)
 *
 * Then it prints markdown you can paste straight into index.md.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const [source, slug] = process.argv.slice(2);
if (!source || !slug) {
  console.error("usage: node scripts/media.mjs <source-folder> <slug>");
  process.exit(1);
}

const MAX_EDGE = 2400;
const out = path.join(process.cwd(), "public", "work", slug);
mkdirSync(out, { recursive: true });

const has = (cmd) => {
  try {
    execFileSync("command", ["-v", cmd], { shell: true, stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const kebab = (name) =>
  name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const size = (file) => (statSync(file).size / 1024 / 1024).toFixed(1) + "MB";
const written = [];

for (const entry of readdirSync(source).sort()) {
  const file = path.join(source, entry);
  if (statSync(file).isDirectory() || entry.startsWith(".")) continue;
  const ext = path.extname(entry).toLowerCase();
  const base = kebab(entry);

  // Photos and graphics: resize, convert to JPEG unless PNG suits it better.
  if ([".jpg", ".jpeg", ".heic", ".heif", ".tiff", ".tif", ".webp"].includes(ext)) {
    const dest = path.join(out, `${base}.jpg`);
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "80",
      "--resampleHeightWidthMax", String(MAX_EDGE), file, "--out", dest],
      { stdio: "ignore" });
    written.push({ file: `${base}.jpg`, kind: "image", size: size(dest) });
  } else if (ext === ".png") {
    const dest = path.join(out, `${base}.png`);
    execFileSync("sips", ["--resampleHeightWidthMax", String(MAX_EDGE), file,
      "--out", dest], { stdio: "ignore" });
    written.push({ file: `${base}.png`, kind: "image", size: size(dest) });
  } else if ([".mov", ".mp4", ".m4v", ".avi", ".webm"].includes(ext)) {
    if (!has("ffmpeg")) {
      console.warn(`skipped ${entry} — install ffmpeg: brew install ffmpeg`);
      continue;
    }
    const dest = path.join(out, `${base}.mp4`);
    execFileSync("ffmpeg", ["-y", "-i", file,
      "-vf", "scale='min(1920,iw)':-2",
      "-c:v", "libx264", "-crf", "24", "-preset", "slow",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      "-c:a", "aac", "-b:a", "128k", dest], { stdio: "ignore" });
    written.push({ file: `${base}.mp4`, kind: "video", size: size(dest) });
    // Homepage preview reels get a first-frame poster so the pre-play
    // state is indistinguishable from the playing video (frontmatter:
    // preview + previewPoster).
    if (base.startsWith("preview")) {
      const posterDest = path.join(out, `${base}-poster.jpg`);
      execFileSync("ffmpeg", ["-y", "-i", dest, "-frames:v", "1",
        "-q:v", "3", posterDest], { stdio: "ignore" });
      written.push({ file: `${base}-poster.jpg`, kind: "image", size: size(posterDest) });
    }
  } else if (ext === ".pdf") {
    if (!has("pdftoppm")) {
      console.warn(`skipped ${entry} — install poppler: brew install poppler`);
      continue;
    }
    execFileSync("pdftoppm", ["-jpeg", "-r", "150", "-scale-to", String(MAX_EDGE),
      file, path.join(out, base)], { stdio: "ignore" });
    for (const page of readdirSync(out).filter((f) => f.startsWith(`${base}-`)).sort()) {
      written.push({ file: page, kind: "image", size: size(path.join(out, page)) });
    }
  }
}

console.log(`\n${written.length} files → public/work/${slug}/\n`);
for (const { file, size } of written) console.log(`  ${file.padEnd(40)} ${size}`);
console.log("\nMarkdown for index.md:\n");
for (const { file } of written) console.log(`![](${file})\n`);
