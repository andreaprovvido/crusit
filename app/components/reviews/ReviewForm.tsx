"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upsertReviewAction } from "@/app/actions";
import type { Review } from "@/lib/types";

type ReviewFormProps = {
  spotId: string;
  spotSlug: string;
  existingReview?: Review | null;
  isAuthenticated: boolean;
};

type Draft = { rating: number; body: string };

function draftKey(spotSlug: string) {
  return `crusit_review_draft_${spotSlug}`;
}

export default function ReviewForm({
  spotId,
  spotSlug,
  existingReview,
  isAuthenticated,
}: ReviewFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState<number>(existingReview?.rating ?? 0);
  const [body, setBody] = useState<string>(existingReview?.body ?? "");

  // Restore a draft saved before the guest was sent to sign in.
  useEffect(() => {
    if (existingReview) return;
    try {
      const raw = sessionStorage.getItem(draftKey(spotSlug));
      if (!raw) return;
      const draft = JSON.parse(raw) as Draft;
      if (typeof draft.body === "string") setBody(draft.body);
      if (typeof draft.rating === "number") setRating(draft.rating);
      sessionStorage.removeItem(draftKey(spotSlug));
    } catch {
      // Ignore malformed drafts.
    }
  }, [existingReview, spotSlug]);

  function handleGuestSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      sessionStorage.setItem(
        draftKey(spotSlug),
        JSON.stringify({ rating, body }),
      );
    } catch {
      // Storage may be unavailable; continue to sign in regardless.
    }
    router.push(`/login?redirectTo=${encodeURIComponent(`/spots/${spotSlug}`)}`);
  }

  const commonFields = (
    <>
      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-zinc-300">Rating</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
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
        value={body}
        onChange={(event) => setBody(event.target.value)}
        className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
        placeholder="Share what this spot is like, when to go, and any tips."
      />
    </>
  );

  if (!isAuthenticated) {
    return (
      <form
        ref={formRef}
        onSubmit={handleGuestSubmit}
        className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
      >
        <h2 className="text-lg font-semibold text-white">Leave a review</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Write your review now — you&apos;ll sign in to publish it.
        </p>
        {commonFields}
        <button
          type="submit"
          className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
        >
          Sign in to publish
        </button>
      </form>
    );
  }

  return (
    <form
      ref={formRef}
      action={upsertReviewAction}
      className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
    >
      <h2 className="text-lg font-semibold text-white">
        {existingReview ? "Update your review" : "Leave a review"}
      </h2>
      <input type="hidden" name="spotId" value={spotId} />
      <input type="hidden" name="spotSlug" value={spotSlug} />
      {existingReview ? <input type="hidden" name="reviewId" value={existingReview.id} /> : null}

      {commonFields}

      <button
        type="submit"
        className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
      >
        {existingReview ? "Update review" : "Publish review"}
      </button>
    </form>
  );
}
