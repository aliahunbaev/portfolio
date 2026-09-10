import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CursorLabel from "./components/cursor-label";
import IntroLoader from "./components/intro-loader";
import PageFade from "./components/page-fade";
import SiteFooter from "./components/site-footer";
import SiteNav from "./components/site-nav";

// Combat Créatif wordmark typeface, only used by the retired BrandPill.
const fraktion = localFont({
  src: "./fonts/PPFraktionSans-Bold.otf",
  variable: "--font-fraktion",
});

const description =
  "Ali Ahunbáev is an artist, product designer, founder and director of Combat Créatif.";

// Share previews: metadataBase makes every image URL absolute, the
// template puts the site name after a page's own title. Pages set title
// and description; project pages add their cover, essays get a card
// (writing/[slug]/opengraph-image.tsx), everything else falls back to
// the site card (app/opengraph-image.tsx).
export const metadata: Metadata = {
  metadataBase: new URL("https://ahunbaev.com"),
  title: { default: "Ali Ahunbáev", template: "%s · Ali Ahunbáev" },
  description,
  openGraph: { siteName: "Ali Ahunbáev", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraktion.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CursorLabel />
        <IntroLoader />
        <SiteNav />
        <SiteFooter>
          <PageFade>{children}</PageFade>
        </SiteFooter>
      </body>
    </html>
  );
}
