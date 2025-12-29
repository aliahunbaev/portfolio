import type { Metadata } from "next";
import { Geist, Geist_Mono, Chivo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import PageTransition from "./components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const centurySchoolbook = localFont({
  src: [
    {
      path: "../public/fonts/CenturySchoolbookBT.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CenturySchoolbookItalicBT.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/CenturySchoolbookBoldBT.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CenturySchoolbookBoldItalicBT.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-century-schoolbook",
});

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ali Ahunbáev",
  description: "Creative portfolio and professional services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${centurySchoolbook.variable} ${chivo.variable} antialiased`}
      >
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
