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
};

function SortLink({
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
      aria-current={isActive ? "true" : undefined}
      className={`rounded-full px-3 py-1 text-sm transition ${
        isActive
          ? "bg-emerald-500/15 text-emerald-300"
          : "text-zinc-400 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function ReviewList({ reviews, spotSlug, sort, page }: ReviewListProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-500">Sort by</span>
        <SortLink spotSlug={spotSlug} target="recent" current={sort} label="Recent" />
        <SortLink spotSlug={spotSlug} target="likes" current={sort} label="Most liked" />
      </div>

      {reviews.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-400">
          No reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <ol className="mt-4 space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
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
                    aria-label={review.liked_by_me ? "Unlike this review" : "Like this review"}
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
  );
}
