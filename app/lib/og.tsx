import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* Share cards for links without a picture of their own: the site card
   and each essay. Same anatomy as the page: a small label line on top,
   the piece in medium at the bottom, subtitle in regular beneath. White
   ground, black type. Inter stands in for Helvetica Neue, which the
   renderer cannot reach. */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const toArrayBuffer = (buf: Buffer) =>
  buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;

async function fonts() {
  // Literal paths from the project root so Vercel's file tracer ships
  // the fonts with the image function (see next.config.ts).
  const [regular, medium] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Inter-Regular.woff")),
    readFile(join(process.cwd(), "app/fonts/Inter-Medium.woff")),
  ]);
  return [
    { name: "Inter", data: toArrayBuffer(regular), weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: toArrayBuffer(medium), weight: 500 as const, style: "normal" as const },
  ];
}

type Card = {
  /** Top-left, the site name or section. */
  label: string;
  /** Top-right, a date or medium. */
  aside?: string;
  title: string;
  subtitle?: string;
};

export async function ogCard({ label, aside, title, subtitle }: Card) {
  const long = title.length > 48;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          color: "#000000",
          fontFamily: "Inter",
          fontSize: 28,
          letterSpacing: "-0.01em",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{label}</span>
          {aside && <span>{aside}</span>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <span
            style={{
              fontSize: long ? 56 : 72,
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span style={{ marginTop: 20, fontSize: 32, lineHeight: 1.3 }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
