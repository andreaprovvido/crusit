import type { Review, ReviewSort } from "./types";
import { createClient } from "./supabase/server";

const PAGE_SIZE = 20;

type ReviewRow = {
  id: string;
  spot_id: string;
  user_id: string;
  rating: number;
  body: string;
  created_at: string;
  updated_at: string;
  like_count: number | null;
};

const REVIEW_SELECT =
  "id, spot_id, user_id, rating, body, created_at, updated_at, like_count";

function mapReview(
  row: ReviewRow,
  options: { username?: string | null; likedByMe?: boolean } = {},
): Review {
  return {
    id: row.id,
    spot_id: row.spot_id,
    user_id: row.user_id,
    rating: row.rating,
    body: row.body,
    created_at: row.created_at,
    updated_at: row.updated_at,
    author_label: options.username || "Member",
    like_count: row.like_count ?? 0,
    liked_by_me: options.likedByMe ?? false,
  };
}

/** Maps user ids to their public usernames (privacy: never expose emails). */
async function getUsernames(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userIds: string[],
): Promise<Map<string, string>> {
  const unique = [...new Set(userIds)];
  if (unique.length === 0) return new Map();

  const { data } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", unique);

  return new Map(
    ((data as { id: string; username: string }[] | null) ?? []).map((row) => [
      row.id,
      row.username,
    ]),
  );
}

/** Returns the set of review ids (from the given list) liked by the user. */
async function getLikedReviewIds(
  supabase: Awaited<ReturnType<typeof createClient>>,
  reviewIds: string[],
  userId: string | null,
): Promise<Set<string>> {
  if (!userId || reviewIds.length === 0) return new Set();

  const { data } = await supabase
    .from("review_likes")
    .select("review_id")
    .eq("user_id", userId)
    .in("review_id", reviewIds);

  return new Set(
    ((data as { review_id: string }[] | null) ?? []).map((row) => row.review_id),
  );
}

export async function getReviewsForSpot(
  spotId: string,
  page = 1,
  sort: ReviewSort = "recent",
  currentUserId: string | null = null,
  pageSize = PAGE_SIZE,
) {
  const supabase = await createClient();
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("reviews")
    .select(REVIEW_SELECT, { count: "exact" })
    .eq("spot_id", spotId);

  if (sort === "likes") {
    query = query
      .order("like_count", { ascending: false })
      .order("created_at", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data as ReviewRow[] | null) ?? [];
  const [usernames, likedIds] = await Promise.all([
    getUsernames(
      supabase,
      rows.map((row) => row.user_id),
    ),
    getLikedReviewIds(
      supabase,
      rows.map((row) => row.id),
      currentUserId,
    ),
  ]);

  return {
    reviews: rows.map((row) =>
      mapReview(row, {
        username: usernames.get(row.user_id),
        likedByMe: likedIds.has(row.id),
      }),
    ),
    total: count ?? 0,
    page: safePage,
    pageSize,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  };
}

export async function getUserReviewForSpot(spotId: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select(REVIEW_SELECT)
    .eq("spot_id", spotId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return mapReview(data as ReviewRow);
}
