import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import IntroLoader from "./components/intro-loader";
import SiteNav from "./components/site-nav";

// Combat Créatif wordmark typeface, used only for the brand pill.
const fraktion = localFont({
  src: "./fonts/PPFraktionSans-Bold.otf",
  variable: "--font-fraktion",
});

export const metadata: Metadata = {
  title: "Ali Ahunbáev",
  description:
    "Ali Ahunbáev is an artist, product designer, founder and director of Combat Créatif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraktion.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <IntroLoader />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
