// Dev-only helper for the strip arranger at /arrange/[slug]. Reads the
// project folder and rewrites the three strip lines of its frontmatter.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
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
