import type { Review } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-sm text-emerald-400" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-zinc-600">{"★".repeat(5 - rating)}</span>
    </p>
  );
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-zinc-400">No reviews yet. Be the first to share your experience.</p>
    );
  }

  return (
    <ol className="space-y-4">
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
        </li>
      ))}
    </ol>
  );
}
