import type { Metadata } from "next";
import Link from "next/link";
import { signInAction, signUpAction } from "@/app/actions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sign In | Crusit",
  description:
    "Sign in or create a free Crusit account to add gay cruising spots, leave ratings, and write community reviews.",
  path: "/login",
  index: false,
});

type PageProps = {
  searchParams: Promise<{ error?: string; redirectTo?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const redirectTo = query.redirectTo ?? "/spots";

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-white">Sign in to Crusit</h1>
      <p className="mt-3 text-sm text-zinc-400">
        Create spots, leave ratings, and write reviews.
      </p>

      {query.error ? (
        <p className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
          {query.error}
        </p>
      ) : null}

      <form action={signInAction} className="mt-8 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold text-white">Sign in</h2>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <label className="block text-sm text-zinc-300">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
        >
          Sign in
        </button>
      </form>

      <form action={signUpAction} className="mt-6 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold text-white">Create account</h2>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <label className="block text-sm text-zinc-300">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <label className="block text-sm text-zinc-300">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:text-white"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        <Link href="/spots" className="hover:text-zinc-300">
          Continue browsing without signing in
        </Link>
      </p>
    </div>
  );
}
