import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "./components/GoogleAnalytics";
import SiteHeader from "./components/SiteHeader";
import { buildPageMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.crusit.com"),
  title: {
    default: "Crusit — Discover cruising spots worldwide",
    template: "%s | Crusit",
  },
  ...buildPageMetadata({
    title: "Crusit — Discover cruising spots worldwide",
    description:
      "A global community map for discovering, sharing, and reviewing LGBTQI+ cruising locations with maps, reviews, and street-level detail.",
    path: "/",
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(siteVerification
    ? { verification: { google: siteVerification } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-white">
        <SiteHeader />
        <main>{children}</main>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
