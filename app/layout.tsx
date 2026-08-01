import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "./components/site-nav";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
