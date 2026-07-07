import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminSpotById } from "@/lib/admin/data";
import { adminUpdateSpotAction } from "@/app/studio/actions";
import AdminShell from "../../AdminShell";
import AdminSpotForm from "../AdminSpotForm";

type PageProps = {
  params: Promise<{ key: string; id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function StudioEditSpotPage({ params, searchParams }: PageProps) {
  const { key, id } = await params;
  const admin = await requireAdmin(key);
  const { error } = await searchParams;

  const spot = await getAdminSpotById(id);
  if (!spot) notFound();

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="spots" title={`Edit: ${spot.name}`}>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/studio/${key}/spots`}
          className="inline-flex text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back to spots
        </Link>
        <Link
          href={`/spots/${spot.slug}`}
          className="inline-flex text-sm text-zinc-400 hover:text-white"
        >
          View public page ↗
        </Link>
      </div>
      <AdminSpotForm
        keyParam={key}
        action={adminUpdateSpotAction}
        spot={spot}
        submitLabel="Save changes"
        error={error === "missing-fields" ? "Please fill in all required fields." : error}
      />
    </AdminShell>
  );
}
