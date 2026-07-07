import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  buildBlogPostMetadata,
  getSiteUrl,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Article not found", robots: { index: false, follow: false } };
  }

  return buildBlogPostMetadata({
    title: post.title,
    description: post.description,
    slug: post.slug,
    path: `/blog/${post.slug}`,
    publishedTime: post.publishedTime,
    modifiedTime: post.modifiedTime,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const siteUrl = getSiteUrl();

  return (
    <div className="relative overflow-hidden">
      <RainbowMeshBackground variant="spots" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogPostingJsonLd(post, siteUrl)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbJsonLd(
                [
                  { name: "Home", path: "/" },
                  { name: "Blog", path: "/blog" },
                  { name: post.title, path: `/blog/${post.slug}` },
                ],
                siteUrl,
              ),
            ),
          }}
        />

        <nav aria-label="Breadcrumb" className="text-sm text-zinc-400">
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-zinc-300">{post.title}</span>
        </nav>

        <article className="mt-4">
          <header>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <time dateTime={post.publishedTime}>
                {formatDate(post.publishedTime)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
              {post.title}
            </h1>
            <p className="mt-3 text-lg text-zinc-400">{post.excerpt}</p>
          </header>

          <div className="mt-8 space-y-8">
            {post.sections.map((section, index) => (
              <section key={index}>
                {section.heading ? (
                  <h2 className="text-2xl font-semibold text-white">
                    {section.heading}
                  </h2>
                ) : null}
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-base leading-relaxed text-zinc-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {post.tags.length > 0 ? (
            <ul className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}
        </article>

        <div className="mt-12 border-t border-zinc-800 pt-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </div>
  );
}
