import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { listAdminUsers } from "@/lib/admin/data";
import AdminShell from "../AdminShell";
import AdminError from "../AdminError";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ page?: string }>;
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function StudioUsersPage({ params, searchParams }: PageProps) {
  const { key } = await params;
  const admin = await requireAdmin(key);
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const base = `/studio/${key}`;

  let result: Awaited<ReturnType<typeof listAdminUsers>> | null = null;
  let loadError: string | null = null;
  try {
    result = await listAdminUsers({ page: currentPage });
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Unknown error.";
  }

  if (!result) {
    return (
      <AdminShell keyParam={key} email={admin.email ?? ""} active="users" title="Registered users">
        <AdminError message={loadError ?? "Unknown error."} />
      </AdminShell>
    );
  }

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="users" title="Registered users">
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-zinc-800 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Registered</th>
              <th className="px-4 py-3">Last sign-in</th>
              <th className="px-4 py-3">Confirmed</th>
            </tr>
          </thead>
          <tbody>
            {result.users.map((user) => (
              <tr key={user.id} className="border-b border-zinc-800/60 last:border-b-0">
                <td className="px-4 py-3 text-white">{user.email ?? "—"}</td>
                <td className="px-4 py-3 text-zinc-400">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3 text-zinc-400">{formatDate(user.lastSignInAt)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      user.confirmed
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {user.confirmed ? "yes" : "pending"}
                  </span>
                </td>
              </tr>
            ))}
            {result.users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  No users found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm">
        {currentPage > 1 ? (
          <Link href={`${base}/users?page=${currentPage - 1}`} className="text-emerald-400 hover:text-emerald-300">
            ← Prev
          </Link>
        ) : null}
        <span className="text-zinc-500">Page {currentPage}</span>
        {result.hasNextPage ? (
          <Link href={`${base}/users?page=${currentPage + 1}`} className="text-emerald-400 hover:text-emerald-300">
            Next →
          </Link>
        ) : null}
      </div>
    </AdminShell>
  );
}
