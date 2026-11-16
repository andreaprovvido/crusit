import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/app/components/PageHero";
import { POSTS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Archivio blog del Gruppo Scout San Giuliano 1 AGESCI.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Archivio blog"
        lead="Comunicazioni e aggiornamenti del gruppo, ripresi dal sito WordPress."
      />
      <section className="section pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {POSTS.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}/`}
                  className="group flex flex-col gap-2 py-6 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div>
                    <h2 className="font-display text-2xl font-semibold group-hover:text-[color:var(--gold-soft)]">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-[color:var(--ink-muted)]">
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

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-[color:var(--ink-muted)]">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--gold)]"
            >
              Instagram
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--gold)]"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
