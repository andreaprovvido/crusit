import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { listAdminReviews } from "@/lib/admin/data";
import { adminDeleteReviewAction } from "@/app/studio/actions";
import AdminShell from "../AdminShell";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ page?: string }>;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function StudioReviewsPage({ params, searchParams }: PageProps) {
  const { key } = await params;
  const admin = await requireAdmin(key);
  const { page } = await searchParams;

  const result = await listAdminReviews({ page: Number(page) || 1 });
  const base = `/studio/${key}`;

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="reviews" title="Reviews & ratings">
      <p className="mb-3 text-sm text-zinc-400">{result.total} reviews</p>

      <div className="space-y-3">
        {result.reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-amber-300">
                    {"★".repeat(review.rating)}
                    <span className="text-zinc-600">{"★".repeat(5 - review.rating)}</span>
                  </span>
                  {review.spot_slug ? (
                    <Link
                      href={`/spots/${review.spot_slug}`}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      {review.spot_name}
                    </Link>
                  ) : (
                    <span className="text-zinc-400">{review.spot_name ?? "Unknown spot"}</span>
                  )}
                  <span className="text-xs text-zinc-500">· {formatDate(review.created_at)}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-300">{review.body}</p>
                <p className="mt-2 text-xs text-zinc-600">User {review.user_id.slice(0, 8)}</p>
              </div>
              <form action={adminDeleteReviewAction}>
                <input type="hidden" name="key" value={key} />
                <input type="hidden" name="id" value={review.id} />
                <button
                  type="submit"
                  className="rounded-md border border-red-900/60 px-2 py-1 text-xs text-red-300 hover:border-red-700 hover:text-red-200"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {result.reviews.length === 0 ? (
          <p className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-500">
            No reviews yet.
          </p>
        ) : null}
      </div>

      {result.totalPages > 1 ? (
        <div className="mt-4 flex items-center gap-3 text-sm">
          {result.page > 1 ? (
            <Link href={`${base}/reviews?page=${result.page - 1}`} className="text-emerald-400 hover:text-emerald-300">
              ← Prev
            </Link>
          ) : null}
          <span className="text-zinc-500">
            Page {result.page} of {result.totalPages}
          </span>
          {result.page < result.totalPages ? (
            <Link href={`${base}/reviews?page=${result.page + 1}`} className="text-emerald-400 hover:text-emerald-300">
              Next →
            </Link>
          ) : null}
        </div>
      ) : null}
    </AdminShell>
  );
}
