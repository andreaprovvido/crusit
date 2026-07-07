import type { Metadata } from "next";
import Link from "next/link";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import { aboutPageJsonLd, buildAboutMetadata, getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = buildAboutMetadata();

const pillars = [
  {
    title: "Consent",
    description:
      "Cruising only works when everyone involved chooses freely and clearly. Crusit promotes a culture where a no is always respected, signals are read carefully, and nobody is pressured.",
  },
  {
    title: "Awareness",
    description:
      "Knowing where you are going, what to expect, and what others have experienced makes cruising safer and more enjoyable. Honest reviews and accurate location data are at the heart of what we build.",
  },
  {
    title: "Safer sex",
    description:
      "Protected sex saves lives. We encourage informed choices around PrEP, condoms, regular testing, and open conversations about sexual health — without shame or judgment.",
  },
];

export default function AboutPage() {
  const siteUrl = getSiteUrl();

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
          The community map for gay cruising
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-300">
          Crusit is an open, community-powered platform for discovering gay
          cruising spots — places where men and LGBTQ+ people meet for casual,
          consensual sexual encounters. We make that world easier to navigate
          with real locations, honest reviews, and a safety-first mindset.
        </p>

        <section aria-labelledby="what-heading" className="mt-12">
          <h2 id="what-heading" className="text-2xl font-semibold text-white">
            What is Crusit?
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-300">
            <p>
              Cruising is a long-standing part of gay and queer culture: meeting
              strangers in parks, beaches, saunas, clubs, and other public or
              semi-public spaces for anonymous or semi-anonymous sex. Crusit
              maps those locations worldwide and lets the community describe
              them — what they are like, when they are active, and what to watch
              out for.
            </p>
            <p>
              We are not a dating app and we do not broker encounters. Crusit is
              a directory and review platform: a shared knowledge base built by
              people who cruise, for people who cruise.
            </p>
          </div>
        </section>

        <section aria-labelledby="purpose-heading" className="mt-12">
          <h2 id="purpose-heading" className="text-2xl font-semibold text-white">
            What is it for?
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-300">
            <p>
              Finding reliable information about cruising spots has always been
              word of mouth — fragmented, outdated, and often incomplete.
              Crusit brings that knowledge together in one place:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-zinc-200">Discover</strong> — browse
                spots on a map or filter by country, city, and type
              </li>
              <li>
                <strong className="text-zinc-200">Decide</strong> — read
                community ratings and reviews before you go
              </li>
              <li>
                <strong className="text-zinc-200">Contribute</strong> — add new
                locations and share your experience so others benefit
              </li>
            </ul>
            <p>
              Whether you are travelling to a new city or exploring your own
              neighbourhood, Crusit helps you make informed choices instead of
              guessing.
            </p>
          </div>
        </section>

        <section aria-labelledby="mission-heading" className="mt-12">
          <h2 id="mission-heading" className="text-2xl font-semibold text-white">
            Our mission
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            Sex between consenting adults is nothing to be ashamed of. Cruising
            carries real risks too — legal, physical, and health-related. Our
            mission is to make gay cruising more{" "}
            <strong className="text-zinc-200">informed</strong>, more{" "}
            <strong className="text-zinc-200">consensual</strong>, and more{" "}
            <strong className="text-zinc-200">protected</strong>. Everything we
            build follows three principles:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <h3 className="text-lg font-semibold text-emerald-300">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="audience-heading" className="mt-12">
          <h2 id="audience-heading" className="text-2xl font-semibold text-white">
            Who is Crusit for?
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-300">
            <p>
              Crusit is built for <strong className="text-zinc-200">gay men</strong>{" "}
              and the wider{" "}
              <strong className="text-zinc-200">LGBTQ+ community</strong> —
              including bisexual, queer, and trans people who participate in
              cruising culture. You do not need an account to browse; signing in
              lets you add spots, leave ratings, and write reviews.
            </p>
            <p>
              We welcome everyone who respects consent, discretion, and the
              community that maintains these spaces. Crusit is inclusive by
              design and hostile to harassment, outing, or non-consensual
              behaviour of any kind.
            </p>
          </div>
        </section>

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
