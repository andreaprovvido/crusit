import type { Review } from "./types";
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
};

function authorLabel(userId: string) {
  return `User ${userId.slice(0, 8)}`;
}

function mapReview(row: ReviewRow): Review {
  return {
    id: row.id,
    spot_id: row.spot_id,
    user_id: row.user_id,
    rating: row.rating,
    body: row.body,
    created_at: row.created_at,
    updated_at: row.updated_at,
    author_label: authorLabel(row.user_id),
  };
}

export async function getReviewsForSpot(spotId: string, page = 1) {
  const supabase = await createClient();
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("reviews")
    .select("id, spot_id, user_id, rating, body, created_at, updated_at", {
      count: "exact",
    })
    .eq("spot_id", spotId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    reviews: (data as ReviewRow[] | null)?.map(mapReview) ?? [],
    total: count ?? 0,
    page: safePage,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}

export async function getUserReviewForSpot(spotId: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, spot_id, user_id, rating, body, created_at, updated_at")
    .eq("spot_id", spotId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return mapReview(data as ReviewRow);
}
