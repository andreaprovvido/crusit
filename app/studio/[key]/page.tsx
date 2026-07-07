import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminStats } from "@/lib/admin/data";
import AdminShell from "./AdminShell";

type PageProps = {
  params: Promise<{ key: string }>;
};

export default async function StudioDashboard({ params }: PageProps) {
  const { key } = await params;
  const admin = await requireAdmin(key);

  let stats: Awaited<ReturnType<typeof getAdminStats>> | null = null;
  let error: string | null = null;
  try {
    stats = await getAdminStats();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load stats.";
  }

  const base = `/studio/${key}`;
  const cards = stats
    ? [
        { label: "Spots (total)", value: stats.spotsTotal, href: `${base}/spots` },
        { label: "Published", value: stats.spotsPublished, href: `${base}/spots?status=published` },
        { label: "Hidden", value: stats.spotsHidden, href: `${base}/spots?status=hidden` },
        { label: "Reviews", value: stats.reviewsTotal, href: `${base}/reviews` },
        { label: "Articles", value: stats.postsTotal, href: `${base}/articles` },
        { label: "Users", value: stats.usersTotal, href: `${base}/users` },
      ]
    : [];

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="dashboard" title="Dashboard">
      {error ? (
        <div className="rounded-xl border border-amber-900/50 bg-amber-950/30 p-4 text-sm text-amber-200">
          <p className="font-medium">Could not load stats.</p>
          <p className="mt-1 text-amber-300/80">{error}</p>
          <p className="mt-2 text-amber-300/80">
            Make sure you ran <code>supabase/admin.sql</code> and set{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-emerald-500/30"
            >
              <p className="text-sm text-zinc-400">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{card.value}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`${base}/spots/new`}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          + New spot
        </Link>
        <Link
          href={`${base}/articles/new`}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:text-white"
        >
          + New article
        </Link>
      </div>
    </AdminShell>
  );
}
