import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "./components/GoogleAnalytics";
import SiteHeader from "./components/SiteHeader";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  INDEX_ROBOTS,
  SITE_NAME,
  getSiteUrl,
  organizationJsonLd,
} from "@/lib/seo";
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

// Site-wide defaults. `metadataBase` resolves relative canonical/OG URLs, and
// the title template brands any page that only sets a plain string title.
// Per-page metadata (see each page's `metadata` / `generateMetadata`) provides
// unique titles, descriptions, canonicals, and Open Graph / Twitter fields.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: INDEX_ROBOTS,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(getSiteUrl())),
          }}
        />
        <SiteHeader />
        <main>{children}</main>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
