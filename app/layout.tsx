import type { Metadata } from "next";
import { Libre_Caslon_Text, Inter } from "next/font/google";
import "./globals.css";
import Stamp from "@/components/Stamp";
import Nav from "@/components/Nav";
import Clock from "@/components/Clock";

/* Serif — primary voice. Caslon-flavored stand-in; swap the face here and it
   re-flows everywhere through the --font-serif variable. */
const serif = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
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
