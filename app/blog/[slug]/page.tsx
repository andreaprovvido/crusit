import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/app/components/PageHero";
import { getPost, POSTS, SITE } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Articolo" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={post.dateLabel} title={post.title} />
      <article className="section pt-6">
        <div className="prose-scout mx-auto max-w-3xl px-4 sm:px-6">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}

          {post.attachments?.length ? (
            <div className="mt-8 border-t border-[color:var(--line)] pt-6">
              <h2 className="font-display mb-3 text-xl font-bold text-[color:var(--gold-soft)]">
                Allegati
              </h2>
              <ul className="space-y-2">
                {post.attachments.map((file) => (
                  <li key={file.href}>
                    <a
                      href={file.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[color:var(--gold)]"
                    >
                      {file.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <Link href="/blog/" className="font-semibold text-[color:var(--gold)]">
              ← Torna al blog
            </Link>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--ink-muted)]"
            >
              Instagram
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--ink-muted)]"
            >
              Facebook
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
