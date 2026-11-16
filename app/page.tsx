import Image from "next/image";
import Link from "next/link";
import { POSTS, SITE } from "@/lib/content";

export default function HomePage() {
  const latest = POSTS.slice(0, 3);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="/images/hero-mountains.jpg"
          alt="Gruppo Scout San Giuliano 1 in montagna presso un lago alpino"
          fill
          priority
          className="object-cover object-[50%_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,3,14,0.12)_0%,rgba(8,3,14,0.22)_36%,rgba(8,3,14,0.68)_76%,rgba(8,3,14,0.9)_100%)]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <div className="animate-rise mb-6">
            <Image
              src="/images/logo.png"
              alt={`${SITE.name} AGESCI`}
              width={160}
              height={152}
              className="h-24 w-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:h-32"
              priority
            />
          </div>
          <p className="animate-rise mb-3 text-xs font-bold tracking-[0.22em] text-[color:var(--gold)] uppercase sm:text-sm">
            {SITE.tagline}
          </p>
          <h1 className="animate-rise-delay font-display max-w-4xl text-[clamp(2.6rem,10vw,5.6rem)] leading-[0.92] font-bold tracking-[-0.03em]">
            <span className="brand-gradient-text">San Giuliano 1</span>
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-[color:var(--ink)] sm:text-lg">
            Scoutismo AGESCI a San Giuliano Milanese: crescere insieme all’aria
            aperta, nel servizio e nella comunità.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/iscrizioni/" className="btn btn-gold no-underline">
              Vuoi iscrivere tuo figlio o tua figlia?
            </Link>
            <Link href="/calendario/" className="btn btn-ghost no-underline">
              Calendario eventi
            </Link>
            <a
              href="https://sangiuliano1.wordpress.com/wp-content/uploads/2020/11/peg-2020-2025-sangiuliano1.pdf"
              className="btn btn-ghost no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Progetto Educativo 2020 – 2025
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">Dal blog</h2>
              <p className="section-lead">
                Le ultime comunicazioni del gruppo, come sul sito precedente.
              </p>
            </div>
            <Link
              href="/blog/"
              className="text-sm font-bold tracking-wide text-[color:var(--gold)] no-underline"
            >
              Archivio blog →
            </Link>
          </div>

          <ul className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {latest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="group flex flex-col gap-2 py-5 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--gold-soft)] sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[color:var(--ink-muted)] sm:text-base">
                      {post.excerpt}
                    </p>
                  </div>
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-xs font-semibold tracking-wide text-[color:var(--gold)] uppercase"
                  >
                    {post.dateLabel}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative min-h-[70svh] overflow-hidden">
        <Image
          src="/images/hero-coast.jpg"
          alt="Scout San Giuliano 1 a pranzo all’aperto con panorama costiero"
          fill
          className="object-cover object-[62%_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,3,14,0.78)_0%,rgba(8,3,14,0.42)_42%,rgba(8,3,14,0.18)_100%)]" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl items-end px-4 py-14 sm:px-6 sm:py-16">
          <div className="max-w-lg">
            <h2 className="section-title">Documenti sempre a portata</h2>
            <p className="section-lead text-[color:var(--ink)]">
              Privacy, schede sanitarie, bigini metodologici e materiali utili
              per famiglie e soci.
            </p>
            <Link href="/documenti/" className="btn btn-red mt-7 no-underline">
              Vai ai documenti
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
