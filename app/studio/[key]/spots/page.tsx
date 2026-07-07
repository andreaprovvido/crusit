import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { listAdminSpots } from "@/lib/admin/data";
import { spotTypeLabel } from "@/lib/spotTypes";
import {
  adminDeleteSpotAction,
  adminSetSpotStatusAction,
} from "@/app/studio/actions";
import AdminShell from "../AdminShell";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
};

export default async function StudioSpotsPage({ params, searchParams }: PageProps) {
  const { key } = await params;
  const admin = await requireAdmin(key);
  const { q, status, page } = await searchParams;

  const statusFilter = status === "hidden" || status === "published" ? status : undefined;
  const result = await listAdminSpots({
    q,
    status: statusFilter,
    page: Number(page) || 1,
  });

  const base = `/studio/${key}`;

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="spots" title="Spots">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <form className="flex flex-wrap gap-2" action={`${base}/spots`}>
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name, city, country…"
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
          />
          <select
            name="status"
            defaultValue={statusFilter ?? ""}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white"
          >
            <option value="">All statuses</option>
            <option value="published">Published</option>
            <option value="hidden">Hidden</option>
          </select>
          <button
            type="submit"
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-500 hover:text-white"
          >
            Filter
          </button>
        </form>
        <Link
          href={`${base}/spots/new`}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          + New spot
        </Link>
      </div>

      <p className="mb-3 text-sm text-zinc-400">{result.total} spots</p>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-zinc-800 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {result.spots.map((spot) => (
              <tr key={spot.id} className="border-b border-zinc-800/60 last:border-b-0">
                <td className="px-4 py-3">
                  <Link
                    href={`${base}/spots/${spot.id}`}
                    className="font-medium text-white hover:text-emerald-300"
                  >
                    {spot.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-400">{spotTypeLabel(spot.spot_type)}</td>
                <td className="px-4 py-3 text-zinc-400">
                  {[spot.city, spot.country].filter(Boolean).join(", ")}
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {spot.rating_count > 0
                    ? `${spot.rating_avg.toFixed(1)} (${spot.rating_count})`
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      spot.status === "published"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-zinc-700/40 text-zinc-400"
                    }`}
                  >
                    {spot.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`${base}/spots/${spot.id}`}
                      className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white"
                    >
                      Edit
                    </Link>
                    <form action={adminSetSpotStatusAction}>
                      <input type="hidden" name="key" value={key} />
                      <input type="hidden" name="id" value={spot.id} />
                      <input
                        type="hidden"
                        name="status"
                        value={spot.status === "published" ? "hidden" : "published"}
                      />
                      <button
                        type="submit"
                        className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white"
                      >
                        {spot.status === "published" ? "Hide" : "Publish"}
                      </button>
                    </form>
                    <form action={adminDeleteSpotAction}>
                      <input type="hidden" name="key" value={key} />
                      <input type="hidden" name="id" value={spot.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-red-900/60 px-2 py-1 text-xs text-red-300 hover:border-red-700 hover:text-red-200"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {result.spots.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-zinc-500">
                  No spots found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <Pagination base={`${base}/spots`} q={q} status={statusFilter} result={result} />
    </AdminShell>
  );
}

function Pagination({
  base,
  q,
  status,
  result,
}: {
  base: string;
  q?: string;
  status?: string;
  result: { page: number; totalPages: number };
}) {
  if (result.totalPages <= 1) return null;
  const makeHref = (page: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (status) sp.set("status", status);
    sp.set("page", String(page));
    return `${base}?${sp.toString()}`;
  };

  return (
    <div className="mt-4 flex items-center gap-3 text-sm">
      {result.page > 1 ? (
        <Link href={makeHref(result.page - 1)} className="text-emerald-400 hover:text-emerald-300">
          ← Prev
        </Link>
      ) : null}
      <span className="text-zinc-500">
        Page {result.page} of {result.totalPages}
      </span>
      {result.page < result.totalPages ? (
        <Link href={makeHref(result.page + 1)} className="text-emerald-400 hover:text-emerald-300">
          Next →
        </Link>
      ) : null}
    </div>
  );
}
