import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Stamp from "@/components/Stamp";
import Nav from "@/components/Nav";
import Clock from "@/components/Clock";

/* Serif — primary voice. Century Schoolbook BT; swap the face here and it
   re-flows everywhere through the --font-serif variable. (ABC Otto lives in
   ~/Library/Fonts if we want to audition it — same shape, four src lines.) */
const serif = localFont({
  src: [
    { path: "./fonts/CenturySchoolbookBT.ttf", weight: "400", style: "normal" },
    { path: "./fonts/CenturySchoolbookItalicBT.ttf", weight: "400", style: "italic" },
    { path: "./fonts/CenturySchoolbookBoldBT.ttf", weight: "700", style: "normal" },
    { path: "./fonts/CenturySchoolbookBoldItalicBT.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

/* Sans — utility voice: dates, clock, captions, project-page body. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahunbaev.com"),
  title: {
    default: "Ali Ahunbáev",
    template: "%s — Ali Ahunbáev",
  },
  description:
    "Ali Ahunbáev is an artist, product designer, founder and director of Combat Créatif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {/* Veils — full-width white fades at the viewport's top and bottom.
            Scrolling content dissolves before it reaches the fixtures, so
            they stay legible with no bar and no boxes. */}
        <div className="veil veil--top" aria-hidden="true" />
        <div className="veil veil--bottom" aria-hidden="true" />

        {/* The three fixtures — layout-independent, hung off the viewport
            corners, touching no column. They survive every page unchanged. */}
        <Stamp />
        <Nav />
        <main>{children}</main>
        <Clock />
      </body>
    </html>
  );
}
