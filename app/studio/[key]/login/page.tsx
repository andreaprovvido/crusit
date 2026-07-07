import { notFound, redirect } from "next/navigation";
import { getCurrentAdmin, isPanelKeyValid } from "@/lib/admin/auth";
import { studioSignInAction } from "@/app/studio/actions";

type PageProps = {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function StudioLoginPage({ params, searchParams }: PageProps) {
  const { key } = await params;
  if (!isPanelKeyValid(key)) notFound();

  const admin = await getCurrentAdmin();
  if (admin) redirect(`/studio/${key}`);

  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-tight text-white">Crusit Studio</h1>
        <p className="mt-2 text-sm text-zinc-400">Admin access only.</p>

        {error ? (
          <p className="mt-6 rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <form action={studioSignInAction} className="mt-8 space-y-4">
          <input type="hidden" name="key" value={key} />
          <label className="block text-sm text-zinc-300">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            />
          </label>
          <label className="block text-sm text-zinc-300">
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
