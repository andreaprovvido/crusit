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
  searchParams: Promise<{ error?: string; notice?: string; confirmed?: string; redirectTo?: string }>;
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

      {query.confirmed ? (
        <p className="mt-6 rounded-xl border border-emerald-900/50 bg-emerald-950/30 p-4 text-sm text-emerald-300">
          Your email is confirmed. Sign in to continue.
        </p>
      ) : null}

      {query.notice ? (
        <p className="mt-6 rounded-xl border border-sky-900/50 bg-sky-950/30 p-4 text-sm text-sky-300">
          {query.notice}
        </p>
      ) : null}

      {query.error ? (
        <p className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
          {query.error}
        </p>
      ) : null}

      <form action={signInAction} className="mt-8 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold text-white">Sign in</h2>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <label className="block text-sm text-zinc-300">
          Email or username
          <input
            name="identifier"
            type="text"
            autoComplete="username"
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
          Username
          <input
            name="username"
            type="text"
            required
            minLength={3}
            maxLength={20}
            pattern="[A-Za-z0-9_]{3,20}"
            autoComplete="username"
            placeholder="e.g. cruiser_92"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
          />
          <span className="mt-1 block text-xs text-zinc-500">
            Shown publicly on your reviews. 3–20 letters, numbers, or underscores.
          </span>
        </label>
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
            minLength={6}
            autoComplete="new-password"
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
