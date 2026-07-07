import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminContent } from "@/lib/admin/data";
import { adminUpdateContentAction } from "@/app/studio/actions";
import AdminShell from "../AdminShell";
import AdminError from "../AdminError";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
};

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white";

export default async function StudioAboutPage({ params, searchParams }: PageProps) {
  const { key } = await params;
  const admin = await requireAdmin(key);
  const { error, saved } = await searchParams;

  let content: Awaited<ReturnType<typeof getAdminContent>> = null;
  let loadError: string | null = null;
  try {
    content = await getAdminContent("about");
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Unknown error.";
  }

  if (loadError) {
    return (
      <AdminShell keyParam={key} email={admin.email ?? ""} active="about page" title="About page">
        <AdminError message={loadError} />
      </AdminShell>
    );
  }

  return (
    <AdminShell keyParam={key} email={admin.email ?? ""} active="about page" title="About page">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">Edit the public About page content.</p>
        <Link href="/about" className="text-sm text-zinc-400 hover:text-white">
          View public page ↗
        </Link>
      </div>

      {saved ? (
        <p className="mb-4 rounded-lg border border-emerald-900/50 bg-emerald-950/30 p-3 text-sm text-emerald-300">
          Saved.
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <form action={adminUpdateContentAction} className="max-w-3xl space-y-5">
        <input type="hidden" name="key" value={key} />
        <input type="hidden" name="contentKey" value="about" />

        <label className="block text-sm text-zinc-300">
          Title
          <input name="title" defaultValue={content?.title ?? ""} className={inputClass} />
        </label>

        <label className="block text-sm text-zinc-300">
          Body
          <textarea
            name="body"
            rows={22}
            defaultValue={content?.body ?? ""}
            placeholder={"Use '## Heading' for sections and a blank line between paragraphs."}
            className={`${inputClass} font-mono text-sm`}
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          Save changes
        </button>
      </form>
    </AdminShell>
  );
}
