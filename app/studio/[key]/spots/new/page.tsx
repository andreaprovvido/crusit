import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminCreateSpotAction } from "@/app/studio/actions";
import AdminShell from "../../AdminShell";
import AdminSpotForm from "../AdminSpotForm";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function StudioNewSpotPage({ params, searchParams }: PageProps) {
  const { key } = await params;
  const admin = await requireAdmin(key);
  const { error } = await searchParams;

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="spots" title="New spot">
      <Link
        href={`/studio/${key}/spots`}
        className="mb-6 inline-flex text-sm text-emerald-400 hover:text-emerald-300"
      >
        ← Back to spots
      </Link>
      <AdminSpotForm
        keyParam={key}
        action={adminCreateSpotAction}
        submitLabel="Create spot"
        error={error === "missing-fields" ? "Please fill in all required fields." : error}
      />
    </AdminShell>
  );
}
