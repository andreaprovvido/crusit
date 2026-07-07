import type { Metadata } from "next";
import Link from "next/link";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import RichText from "@/app/components/RichText";
import { getSiteContent } from "@/lib/content";
import { aboutPageJsonLd, buildAboutMetadata, getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = buildAboutMetadata();

export default async function AboutPage() {
  const siteUrl = getSiteUrl();
  const content = await getSiteContent("about");

  return (
    <div className="relative overflow-hidden">
      <RainbowMeshBackground variant="spots" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutPageJsonLd(siteUrl)),
          }}
        />

        <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">
          About Crusit
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {content.title}
        </h1>

        <article className="mt-8">
          <RichText content={content.body} />
        </article>

        <section
          aria-labelledby="cta-heading"
          className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center"
        >
          <h2 id="cta-heading" className="text-2xl font-semibold text-white">
            Ready to explore?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-zinc-400">
            Browse the map, read the guides, and contribute what you know. The
            more the community shares, the safer and richer cruising becomes for
            everyone.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/spots"
              className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              Explore spots
            </Link>
            <Link
              href="/blog"
              className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Read the blog
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
