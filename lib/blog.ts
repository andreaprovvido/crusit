// DB-backed blog. Posts are stored in the `blog_posts` table and managed from
// the /studio admin panel. Public reads only return published posts (enforced
// by RLS). All read helpers degrade gracefully to empty results if the table
// does not exist yet, so the site never crashes before the SQL migration runs.

import { listEditorialArticles } from "@/lib/editorial/articles";
import { createClient } from "@/lib/supabase/server";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  body: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  publishedTime: string;
  modifiedTime?: string;
};

type PostRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  body: string;
  author: string;
  tags: string[] | null;
  reading_minutes: number;
  published_at: string | null;
  updated_at: string;
  created_at: string;
};

function mapPost(row: PostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    excerpt: row.excerpt,
    body: row.body,
    author: row.author,
    tags: row.tags ?? [],
    readingMinutes: row.reading_minutes,
    publishedTime: row.published_at ?? row.created_at,
    modifiedTime: row.updated_at,
  };
}

const SELECT =
  "id, slug, title, description, excerpt, body, author, tags, reading_minutes, published_at, updated_at, created_at";

function mergeEditorial(dbPosts: BlogPost[]): BlogPost[] {
  const bySlug = new Map(dbPosts.map((post) => [post.slug, post]));

  for (const editorial of listEditorialArticles()) {
    const existing = bySlug.get(editorial.slug);
    bySlug.set(editorial.slug, {
      id: existing?.id ?? `editorial-${editorial.slug}`,
      slug: editorial.slug,
      title: editorial.title,
      description: editorial.description,
      excerpt: editorial.excerpt,
      body: editorial.body,
      author: editorial.author,
      tags: editorial.tags,
      readingMinutes: editorial.readingMinutes,
      publishedTime: existing?.publishedTime ?? editorial.publishedTime,
      modifiedTime: editorial.modifiedTime,
    });
  }

  return [...bySlug.values()].sort((a, b) =>
    b.publishedTime.localeCompare(a.publishedTime),
  );
}

async function readPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) return [];
    return (data as PostRow[]).map(mapPost);
  } catch {
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return mergeEditorial(await readPublishedPosts());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return posts.map((post) => post.slug);
}
