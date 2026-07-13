import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Clock from "@/components/Clock";

/* Serif — primary voice. Times Newer Roman; swap the face here and it
   re-flows everywhere through the --font-serif variable. */
const serif = localFont({
  src: [
    { path: "./fonts/TimesNewerRoman-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/TimesNewerRoman-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/TimesNewerRoman-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/TimesNewerRoman-BoldItalic.otf", weight: "700", style: "italic" },
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
        {/* Chrome: the glass bar on top, the clock bottom-left. Both are
            layout-independent and survive every page unchanged. */}
        <Header />
        <main>{children}</main>
        <Clock />
      </body>
    </html>
  );
}
