import Link from "next/link";
import { toggleReviewLikeAction } from "@/app/actions";
import type { Review, ReviewSort } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-sm text-emerald-400" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-zinc-600">{"★".repeat(5 - rating)}</span>
    </p>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      className="size-4"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

type ReviewListProps = {
  reviews: Review[];
  spotSlug: string;
  sort: ReviewSort;
  page: number;
  total: number;
};

function SortTab({
  spotSlug,
  target,
  current,
  label,
}: {
  spotSlug: string;
  target: ReviewSort;
  current: ReviewSort;
  label: string;
}) {
  const isActive = current === target;
  const href =
    target === "recent" ? `/spots/${spotSlug}` : `/spots/${spotSlug}?sort=${target}`;
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`rounded-t-lg px-4 py-2.5 text-sm font-medium transition ${
        isActive
          ? "border border-b-0 border-zinc-700 bg-zinc-900/60 text-white"
          : "text-zinc-400 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function ReviewList({
  reviews,
  spotSlug,
  sort,
  page,
  total,
}: ReviewListProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30">
      <div className="flex items-end gap-1 border-b border-zinc-800 px-3 pt-3">
        <SortTab spotSlug={spotSlug} target="recent" current={sort} label="Recent" />
        <SortTab spotSlug={spotSlug} target="likes" current={sort} label="Most liked" />
        {total > 0 ? (
          <span className="mb-2 ml-auto text-xs text-zinc-500">{total} total</span>
        ) : null}
      </div>

      <div
        className="max-h-[28rem] overflow-y-auto p-4 [-ms-overflow-style:auto] [scrollbar-width:thin]"
        aria-label="Comments list"
      >
        {reviews.length === 0 ? (
          <p className="text-sm text-zinc-400">
            No comments yet. Be the first to share your experience.
          </p>
        ) : (
          <ol className="space-y-3">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{review.author_label}</p>
                  <time className="text-xs text-zinc-500" dateTime={review.created_at}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </time>
                </div>
                <Stars rating={review.rating} />
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{review.body}</p>

                <div className="mt-3">
                  <form action={toggleReviewLikeAction}>
                    <input type="hidden" name="spotSlug" value={spotSlug} />
                    <input type="hidden" name="reviewId" value={review.id} />
                    <input type="hidden" name="sort" value={sort} />
                    <input type="hidden" name="page" value={String(page)} />
                    <button
                      type="submit"
                      aria-pressed={review.liked_by_me}
                      aria-label={
                        review.liked_by_me ? "Unlike this comment" : "Like this comment"
                      }
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition ${
                        review.liked_by_me
                          ? "border-pink-500/40 bg-pink-500/10 text-pink-300"
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                      }`}
                    >
                      <HeartIcon filled={review.liked_by_me} />
                      <span>{review.like_count}</span>
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
