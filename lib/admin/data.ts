import type { Spot } from "@/lib/types";
import { createAdminClient } from "@/lib/supabase/admin";

const SPOT_SELECT =
  "id, slug, name, description, street_address, city, province, region, postal_code, country, created_by, created_at, status, spot_type, rating_avg, rating_count, latitude, longitude";

const PAGE_SIZE = 30;

type SpotRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  street_address: string;
  city: string;
  province: string;
  region: string;
  postal_code: string;
  country: string;
  created_by: string | null;
  created_at: string;
  status: "published" | "hidden";
  spot_type: string;
  rating_avg: number;
  rating_count: number;
  latitude: number;
  longitude: number;
};

function mapSpot(row: SpotRow): Spot {
  return {
    ...row,
    spot_type: row.spot_type ?? "other",
    rating_avg: Number(row.rating_avg),
  };
}

// ---------------------------------------------------------------------------
// Dashboard stats
// ---------------------------------------------------------------------------
export async function getAdminStats() {
  const supabase = createAdminClient();

  const [spotsAll, spotsPublished, reviews, posts, users] = await Promise.all([
    supabase.from("spots").select("id", { count: "exact", head: true }),
    supabase
      .from("spots")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("reviews").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.auth.admin.listUsers({ page: 1, perPage: 1 }),
  ]);

  const usersData = users.data as { total?: number; users?: unknown[] } | null;
  const usersTotal = usersData?.total ?? usersData?.users?.length ?? 0;

  return {
    spotsTotal: spotsAll.count ?? 0,
    spotsPublished: spotsPublished.count ?? 0,
    spotsHidden: (spotsAll.count ?? 0) - (spotsPublished.count ?? 0),
    reviewsTotal: reviews.count ?? 0,
    postsTotal: posts.count ?? 0,
    usersTotal,
  };
}

// ---------------------------------------------------------------------------
// Spots
// ---------------------------------------------------------------------------
export async function listAdminSpots({
  q,
  status,
  page = 1,
}: {
  q?: string;
  status?: "published" | "hidden";
  page?: number;
}) {
  const supabase = createAdminClient();
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("spots_admin")
    .select(SPOT_SELECT, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    const term = `%${q.trim()}%`;
    query = query.or(
      `name.ilike.${term},city.ilike.${term},country.ilike.${term},slug.ilike.${term}`,
    );
  }
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  return {
    spots: (data as SpotRow[] | null)?.map(mapSpot) ?? [],
    total: count ?? 0,
    page: safePage,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}

export async function getAdminSpotById(id: string): Promise<Spot | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("spots_admin")
    .select(SPOT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapSpot(data as SpotRow);
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------
export type AdminReview = {
  id: string;
  spot_id: string;
  user_id: string;
  rating: number;
  body: string;
  created_at: string;
  spot_name: string | null;
  spot_slug: string | null;
  username: string | null;
};

export async function listAdminReviews({ page = 1 }: { page?: number }) {
  const supabase = createAdminClient();
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("reviews")
    .select("id, spot_id, user_id, rating, body, created_at, spots(name, slug)", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);

  type Row = {
    id: string;
    spot_id: string;
    user_id: string;
    rating: number;
    body: string;
    created_at: string;
    spots: { name: string; slug: string } | { name: string; slug: string }[] | null;
  };

  const rows = (data as Row[] | null) ?? [];

  const userIds = [...new Set(rows.map((row) => row.user_id))];
  const usernameMap = new Map<string, string>();
  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username")
      .in("id", userIds);
    for (const profile of (profiles as { id: string; username: string }[] | null) ?? []) {
      usernameMap.set(profile.id, profile.username);
    }
  }

  const reviews: AdminReview[] = rows.map((row) => {
    const spot = Array.isArray(row.spots) ? row.spots[0] : row.spots;
    return {
      id: row.id,
      spot_id: row.spot_id,
      user_id: row.user_id,
      rating: row.rating,
      body: row.body,
      created_at: row.created_at,
      spot_name: spot?.name ?? null,
      spot_slug: spot?.slug ?? null,
      username: usernameMap.get(row.user_id) ?? null,
    };
  });

  return {
    reviews,
    total: count ?? 0,
    page: safePage,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}

// ---------------------------------------------------------------------------
// Users (auth admin API)
// ---------------------------------------------------------------------------
export type AdminUser = {
  id: string;
  email: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  confirmed: boolean;
};

export async function listAdminUsers({ page = 1 }: { page?: number }) {
  const supabase = createAdminClient();
  const perPage = 50;
  const { data, error } = await supabase.auth.admin.listUsers({
    page,
    perPage,
  });

  if (error) throw new Error(error.message);

  const users: AdminUser[] = (data?.users ?? []).map((user) => ({
    id: user.id,
    email: user.email ?? null,
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at ?? null,
    confirmed: Boolean(user.email_confirmed_at ?? user.confirmed_at),
  }));

  return {
    users,
    page,
    perPage,
    hasNextPage: users.length === perPage,
  };
}

// ---------------------------------------------------------------------------
// Blog posts (admin — includes drafts)
// ---------------------------------------------------------------------------
export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  body: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string;
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
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
};

function mapPost(row: PostRow): AdminPost {
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
    status: row.status,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

export async function listAdminPosts() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, description, excerpt, body, author, tags, reading_minutes, status, published_at, updated_at",
    )
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return ((data as PostRow[] | null) ?? []).map(mapPost);
}

export async function getAdminPostById(id: string): Promise<AdminPost | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, description, excerpt, body, author, tags, reading_minutes, status, published_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapPost(data as PostRow);
}

// ---------------------------------------------------------------------------
// Site content (admin read — includes any key)
// ---------------------------------------------------------------------------
export type AdminContent = {
  key: string;
  title: string;
  body: string;
  updatedAt: string;
};

export async function getAdminContent(key: string): Promise<AdminContent | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("key, title, body, updated_at")
    .eq("key", key)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return {
    key: data.key as string,
    title: data.title as string,
    body: data.body as string,
    updatedAt: data.updated_at as string,
  };
}
