import type { Metadata } from "next";
import { Karla, Syne } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./globals.css";
import { SITE } from "@/lib/content";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} AGESCI — ${SITE.tagline}`,
    template: `%s — ${SITE.name} AGESCI`,
  },
  description:
    "Sito ufficiale del Gruppo Scout AGESCI San Giuliano 1 di San Giuliano Milanese: documenti, calendario, iscrizioni e blog.",
  metadataBase: new URL("https://andreaprovvido.github.io/sangiuliano1"),
  openGraph: {
    title: `${SITE.name} AGESCI`,
    description: SITE.tagline,
    locale: "it_IT",
    type: "website",
    images: [{ url: "/images/logo.png" }],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${syne.variable} ${karla.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
