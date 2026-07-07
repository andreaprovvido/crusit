import type { Metadata } from "next";
import Link from "next/link";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import { getAllBlogPosts } from "@/lib/blog";
import { buildBlogIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildBlogIndexMetadata();

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="relative overflow-hidden">
      <RainbowMeshBackground variant="spots" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-400">
            Crusit blog
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
            Cruising guides & community stories
          </h1>
          <p className="mt-3 text-zinc-400">
            Guides, safety tips, and etiquette from the Crusit community to help
            you cruise smarter and safer.
          </p>
        </div>

        <ol className="mt-10 space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-emerald-500/30">
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <time dateTime={post.publishedTime}>
                    {formatDate(post.publishedTime)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-emerald-300"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-zinc-400">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Read article
                </Link>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
