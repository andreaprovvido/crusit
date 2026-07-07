import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminCreatePostAction } from "@/app/studio/actions";
import AdminShell from "../../AdminShell";
import AdminPostForm from "../AdminPostForm";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function StudioNewArticlePage({ params, searchParams }: PageProps) {
  const { key } = await params;
  const admin = await requireAdmin(key);
  const { error } = await searchParams;

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="articles" title="New article">
      <Link
        href={`/studio/${key}/articles`}
        className="mb-6 inline-flex text-sm text-emerald-400 hover:text-emerald-300"
      >
        ← Back to articles
      </Link>
      <AdminPostForm
        keyParam={key}
        action={adminCreatePostAction}
        submitLabel="Create article"
        error={error === "missing-fields" ? "Title, slug and body are required." : error}
      />
    </AdminShell>
  );
}
