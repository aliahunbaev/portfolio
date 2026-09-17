// Dev-only helper for the strip arranger at /arrange/[slug]. Reads the
// project folder and rewrites the three strip lines of its frontmatter.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { execFileSync } from "child_process";
import path from "path";
import { NextResponse } from "next/server";
import { imageSize } from "@/app/lib/content";

const ROOT = path.join(process.cwd(), "public", "work");
const KEYS = ["homeRow", "caseRow", "caseRow2"] as const;

function guard() {
  if (process.env.NODE_ENV === "production")
    return NextResponse.json({ error: "not available" }, { status: 404 });
  return null;
}

function rows(md: string) {
  const out: Record<string, string> = {};
  for (const k of KEYS) {
    const m = md.match(new RegExp(`^${k}:\\s*(.*)$`, "m"));
    out[k] = m ? m[1].trim() : "";
  }
  return out;
}

export async function GET(req: Request) {
  const g = guard(); if (g) return g;
  const slug = new URL(req.url).searchParams.get("slug") ?? "";
  const dir = path.join(ROOT, slug);
  if (!slug || !existsSync(dir)) return NextResponse.json({ error: "no such project" }, { status: 404 });
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|mp4)$/i.test(f)).sort();
  const assets = files.flatMap((name) => {
    const url = `/work/${slug}/${name}`;
    if (/\.mp4$/i.test(name)) {
      for (const sib of [".jpg", ".png", "-poster.jpg"]) {
        const poster = url.replace(/\.mp4$/i, sib);
        const size = imageSize(poster);
        if (size) return [{ name, url, poster, type: "video", ...size }];
      }
      return [];
    }
    const size = imageSize(url);
    return size ? [{ name, url, type: "image", ...size }] : [];
  });
  const md = readFileSync(path.join(dir, "index.md"), "utf8");
  return NextResponse.json({ assets, rows: rows(md) });
}

export async function POST(req: Request) {
  const g = guard(); if (g) return g;
  const { slug, ...next } = (await req.json()) as { slug: string } & Record<string, string>;
  const file = path.join(ROOT, slug ?? "", "index.md");
  if (!slug || !existsSync(file)) return NextResponse.json({ error: "no such project" }, { status: 404 });
  let md = readFileSync(file, "utf8");
  for (const k of KEYS) {
    if (!(k in next)) continue;
    const value = (next[k] ?? "").trim();
    const line = value ? `${k}: ${value}` : "";
    const re = new RegExp(`^${k}:.*\\n?`, "m");
    if (re.test(md)) md = md.replace(re, line ? line + "\n" : "");
    else if (line) md = md.replace(/^---\n([\s\S]*?)\n---/, (all, fm) => `---\n${fm}\n${line}\n---`);
  }
  writeFileSync(file, md);
  return NextResponse.json({ ok: true, rows: rows(md) });
}

/** Upload files from the arranger's drop zone into public/work/<slug>.
 *  Images over 2400px are downscaled (sips), PNG photos become JPEG,
 *  and every video gets a same-name first-frame poster (ffmpeg). */
export async function PUT(req: Request) {
  const g = guard(); if (g) return g;
  const form = await req.formData();
  const slug = String(form.get("slug") ?? "");
  const dir = path.join(ROOT, slug);
  if (!slug || !existsSync(dir)) return NextResponse.json({ error: "no such project" }, { status: 404 });
  const saved: string[] = [];
  for (const entry of form.getAll("files")) {
    if (!(entry instanceof File)) continue;
    const clean = entry.name.toLowerCase().replace(/\.jpeg$/, ".jpg").replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
    if (!/\.(jpg|png|mp4|mov)$/.test(clean)) continue;
    let target = path.join(dir, clean);
    writeFileSync(target, Buffer.from(await entry.arrayBuffer()));
    try {
      if (/\.mov$/.test(clean)) {
        const mp4 = target.replace(/\.mov$/, ".mp4");
        execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", target, "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);
        execFileSync("rm", [target]); target = mp4;
      }
      if (/\.mp4$/.test(target)) {
        execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", target, "-frames:v", "1", "-q:v", "3", target.replace(/\.mp4$/, ".jpg")]);
      } else {
        const isPhotoPng = /\.png$/.test(target) && Number(execFileSync("sips", ["-g", "hasAlpha", target]).toString().match(/hasAlpha: (\w+)/)?.[1] === "yes") === 0;
        const out = isPhotoPng ? target.replace(/\.png$/, ".jpg") : target;
        const args = ["-Z", "2400", ...(isPhotoPng ? ["-s", "format", "jpeg", "-s", "formatOptions", "88"] : []), target, "--out", out];
        execFileSync("sips", args, { stdio: "ignore" });
        if (out !== target) execFileSync("rm", [target]);
        target = out;
      }
    } catch (e) {
      // leave the raw file in place if a converter is missing
    }
    saved.push(path.basename(target));
  }
  return NextResponse.json({ ok: true, saved });
}
