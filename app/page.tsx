import Image from "next/image";
import Link from "next/link";
import { POSTS, SITE } from "@/lib/content";

export default function HomePage() {
  const latest = POSTS.slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#1c1526]">
        <Image
          src="/images/hero-mountains.jpg"
          alt="Gruppo Scout San Giuliano 1 in montagna presso un lago alpino"
          fill
          priority
          className="object-cover object-[50%_30%]"
          sizes="100vw"
        />
        {/* Soft readability only at the bottom — photo stays the hero */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,10,24,0.15)_0%,rgba(16,10,24,0.08)_45%,rgba(16,10,24,0.62)_100%)]" />

        <div className="relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 sm:pb-20">
          <div className="wrap">
            <div className="rise mb-5">
              <Image
                src="/images/logo-emblem.png"
                alt={`${SITE.name} AGESCI`}
                width={140}
                height={120}
                className="h-20 w-auto drop-shadow-md sm:h-24"
                priority
              />
            </div>
            <p className="rise mb-2 text-[0.8rem] font-bold tracking-[0.18em] text-white/90 uppercase">
              {SITE.tagline}
            </p>
            <h1 className="rise-2 font-display max-w-[11ch] text-[clamp(3.1rem,12vw,5.9rem)] leading-[0.9] font-bold tracking-[-0.04em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)]">
              San Giuliano 1
            </h1>
            <p className="rise-3 mt-4 max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
              Scoutismo AGESCI a San Giuliano Milanese: crescere insieme
              all’aria aperta, nel servizio e nella comunità.
            </p>
            <div className="rise-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/iscrizioni/" className="btn btn-primary">
                Vuoi iscrivere tuo figlio o tua figlia?
              </Link>
              <Link href="/calendario/" className="btn btn-secondary">
                Calendario eventi
              </Link>
              <a
                href="https://sangiuliano1.wordpress.com/wp-content/uploads/2020/11/peg-2020-2025-sangiuliano1.pdf"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Progetto Educativo 2020 – 2025
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[color:var(--bg-paper)]">
        <div className="wrap">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">Dal blog</h2>
              <p className="section-lead">
                Le ultime comunicazioni del gruppo, come sul sito precedente.
              </p>
            </div>
            <Link
              href="/blog/"
              className="text-sm font-bold text-[color:var(--purple)] no-underline"
            >
              Archivio blog →
            </Link>
          </div>

          <ul className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {latest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="group flex flex-col gap-2 py-6 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                >
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-[color:var(--ink)] group-hover:text-[color:var(--purple)] sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[color:var(--ink-soft)]">
                      {post.excerpt}
                    </p>
                  </div>
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-xs font-bold tracking-[0.12em] text-[color:var(--ink-faint)] uppercase"
                  >
                    {post.dateLabel}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative isolate min-h-[72svh] overflow-hidden bg-[#1c1526]">
        <Image
          src="/images/hero-coast.jpg"
          alt="Scout San Giuliano 1 a pranzo all’aperto con panorama costiero"
          fill
          className="object-cover object-[55%_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(16,10,24,0.72)_0%,rgba(16,10,24,0.35)_48%,rgba(16,10,24,0.12)_100%)]" />
        <div className="relative flex min-h-[72svh] items-end">
          <div className="wrap w-full py-14 sm:py-16">
            <div className="max-w-md text-white">
              <h2 className="font-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                Documenti sempre a portata
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/90">
                Privacy, schede sanitarie, bigini metodologici e materiali utili
                per famiglie e soci.
              </p>
              <Link href="/documenti/" className="btn btn-red mt-7">
                Vai ai documenti
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
