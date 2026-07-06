import { upsertReviewAction } from "@/app/actions";
import type { Review } from "@/lib/types";

type ReviewFormProps = {
  spotId: string;
  spotSlug: string;
  existingReview?: Review | null;
  isAuthenticated: boolean;
};

export default function ReviewForm({
  spotId,
  spotSlug,
  existingReview,
  isAuthenticated,
}: ReviewFormProps) {
  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
        <p className="text-sm text-zinc-300">
          Sign in to rate and review this spot.
        </p>
        <a
          href={`/login?redirectTo=/spots/${spotSlug}`}
          className="mt-3 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
        >
          Sign in
        </a>
      </div>
    );
  }

  return (
    <form
      action={upsertReviewAction}
      className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
    >
      <h2 className="text-lg font-semibold text-white">
        {existingReview ? "Update your review" : "Leave a review"}
      </h2>
      <input type="hidden" name="spotId" value={spotId} />
      <input type="hidden" name="spotSlug" value={spotSlug} />
      {existingReview ? <input type="hidden" name="reviewId" value={existingReview.id} /> : null}

      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-zinc-300">Rating</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="radio"
                name="rating"
                value={value}
                defaultChecked={existingReview?.rating === value}
                required
              />
              {value} star{value === 1 ? "" : "s"}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-4 block text-sm font-medium text-zinc-300" htmlFor="body">
        Comment
      </label>
      <textarea
        id="body"
        name="body"
        required
        minLength={10}
        rows={5}
        defaultValue={existingReview?.body ?? ""}
        className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
        placeholder="Share what this spot is like, when to go, and any tips."
      />

      <button
        type="submit"
        className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
      >
        {existingReview ? "Update review" : "Publish review"}
      </button>
    </form>
  );
}
