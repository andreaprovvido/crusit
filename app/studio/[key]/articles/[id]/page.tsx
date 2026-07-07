import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminPostById } from "@/lib/admin/data";
import { adminUpdatePostAction } from "@/app/studio/actions";
import AdminShell from "../../AdminShell";
import AdminPostForm from "../AdminPostForm";

type PageProps = {
  params: Promise<{ key: string; id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function StudioEditArticlePage({ params, searchParams }: PageProps) {
  const { key, id } = await params;
  const admin = await requireAdmin(key);
  const { error } = await searchParams;

  const post = await getAdminPostById(id);
  if (!post) notFound();

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="articles" title={`Edit: ${post.title}`}>
      <Link
        href={`/studio/${key}/articles`}
        className="mb-6 inline-flex text-sm text-emerald-400 hover:text-emerald-300"
      >
        ← Back to articles
      </Link>
      <AdminPostForm
        keyParam={key}
        action={adminUpdatePostAction}
        post={post}
        submitLabel="Save changes"
        error={error === "missing-fields" ? "Title, slug and body are required." : error}
      />
    </AdminShell>
  );
}
