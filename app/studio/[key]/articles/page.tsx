import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { listAdminPosts } from "@/lib/admin/data";
import { adminDeletePostAction } from "@/app/studio/actions";
import AdminShell from "../AdminShell";

type PageProps = {
  params: Promise<{ key: string }>;
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function StudioArticlesPage({ params }: PageProps) {
  const { key } = await params;
  const admin = await requireAdmin(key);
  const posts = await listAdminPosts();
  const base = `/studio/${key}`;

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="articles" title="Articles">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">{posts.length} articles</p>
        <Link
          href={`${base}/articles/new`}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          + New article
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-zinc-800 text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-zinc-800/60 last:border-b-0">
                <td className="px-4 py-3">
                  <Link
                    href={`${base}/articles/${post.id}`}
                    className="font-medium text-white hover:text-emerald-300"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-zinc-500">/{post.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      post.status === "published"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-zinc-700/40 text-zinc-400"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-400">{formatDate(post.publishedAt)}</td>
                <td className="px-4 py-3 text-zinc-400">{formatDate(post.updatedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`${base}/articles/${post.id}`}
                      className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white"
                    >
                      Edit
                    </Link>
                    {post.status === "published" ? (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white"
                      >
                        View
                      </Link>
                    ) : null}
                    <form action={adminDeletePostAction}>
                      <input type="hidden" name="key" value={key} />
                      <input type="hidden" name="id" value={post.id} />
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
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  No articles yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
