import type { Metadata } from "next";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import { buildHomeMetadata, getSiteUrl, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildHomeMetadata();

const features = [
  {
    title: "Street-level map",
    description:
      "Explore spots on a detailed basemap with streets, cities, provinces, regions, and fast zoom-based discovery.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Community reviews",
    description:
      "Read honest ratings and tips from people who've actually been there — no guesswork.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
  },
  {
    title: "Rich location data",
    description:
      "Save the exact street address, city, province, region, coordinates, and context that make a spot easy to find.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
  },
  {
    title: "Searchable directory",
    description:
      "Public spot pages are crawlable and structured for search engines, while the interactive map stays a progressive enhancement.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  const siteUrl = getSiteUrl();

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd(siteUrl)),
        }}
      />
      <RainbowMeshBackground variant="home" />

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-24">
          <div className="text-left">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Live community map
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Discover gay cruising spots with{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
              real-world detail
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
            Crusit is a LGBTQI+ community-powered map for finding, reviewing, and
            adding gay cruising spots with precise addresses, street-level
            context, and location details that make discovery actually useful.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="/spots"
              className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-black transition hover:bg-emerald-400"
            >
              Explore spots
            </a>
            <a
              href="/spots/new"
              className="rounded-xl bg-[#00bd7e] px-8 py-4 font-semibold text-black transition hover:bg-[#00a870]"
            >
              Add a spot
            </a>
            <a
              href="/blog"
              className="rounded-xl bg-[#00bd7e] px-8 py-4 font-semibold text-black transition hover:bg-[#00a870]"
            >
              Read our blog
            </a>
          </div>

          <dl className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <dt className="text-xs uppercase tracking-[0.18em] text-zinc-500">Discover</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">Map + directory</dd>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <dt className="text-xs uppercase tracking-[0.18em] text-zinc-500">Contribute</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">Add exact locations</dd>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
              <dt className="text-xs uppercase tracking-[0.18em] text-zinc-500">Decide</dt>
              <dd className="mt-2 text-2xl font-semibold text-white">Read real reviews</dd>
            </div>
          </dl>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-2 shadow-2xl shadow-emerald-500/10 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-yellow-500/80" />
              <span className="size-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-zinc-500">www.crusit.com/spots</span>
            </div>
            <div className="space-y-4 rounded-b-[1.35rem] bg-zinc-950 p-5">
              <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Featured spot
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Viale del Tramonto
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Viale del Tramonto 18, Rome, RM, Lazio, Italy
                    </p>
                  </div>
                  <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                    ★ 4.8
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  Street-level details, practical notes, and community reviews all
                  in one place.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Address data
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">
                    Street, city, province, region, postcode, coordinates
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Discovery
                  </p>
                  <p className="mt-2 text-sm text-zinc-300">
                    Crawlable pages for Google, interactive map for people
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to explore
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Crusit brings together mapping, reviews, and community in one place.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-emerald-500/30 hover:bg-zinc-900/70"
              >
                <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 transition group-hover:bg-emerald-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 px-8 py-16 text-center md:px-16">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_60%)]"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Built for discovery, not just a demo
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                Start with the public map, add precise locations, and build a
                stronger directory one review at a time.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/spots"
                  className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-black transition hover:bg-emerald-400"
                >
                  Browse spots
                </a>
                <a
                  href="/login"
                  className="rounded-xl bg-violet-500 px-8 py-4 font-semibold text-white transition hover:bg-violet-400"
                >
                  Sign in and contribute
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
