import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  changePasswordAction,
  signOutAction,
  updateUsernameAction,
} from "@/app/actions";
import RainbowMeshBackground from "@/app/components/RainbowMeshBackground";
import { createClient } from "@/lib/supabase/server";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Your Profile | Crusit",
  description: "Manage your Crusit account: username, password, and sign out.",
  path: "/profile",
  index: false,
});

type PageProps = {
  searchParams: Promise<{ error?: string; saved?: string }>;
};

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white";

export default async function ProfilePage({ searchParams }: PageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/profile");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  const { error, saved } = await searchParams;
  const username = profile?.username ?? "";

  const savedMessage =
    saved === "username"
      ? "Username updated."
      : saved === "password"
        ? "Password updated."
        : null;

  return (
    <div className="relative overflow-hidden">
      <RainbowMeshBackground variant="spots" />
      <div className="relative z-10 mx-auto max-w-xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Your profile</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Manage your account details. Only your username is shown publicly.
        </p>

        {savedMessage ? (
          <p className="mt-6 rounded-xl border border-emerald-900/50 bg-emerald-950/30 p-4 text-sm text-emerald-300">
            {savedMessage}
          </p>
        ) : null}
        {error ? (
          <p className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="text-lg font-semibold text-white">Account</h2>
          <div className="mt-3">
            <p className="text-sm text-zinc-400">Email (private)</p>
            <p className="text-white">{user.email}</p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="text-lg font-semibold text-white">Username</h2>
          <p className="mt-1 text-sm text-zinc-400">
            This is the public name shown on your reviews and ratings.
          </p>
          {!username ? (
            <p className="mt-3 rounded-lg border border-amber-900/50 bg-amber-950/30 p-3 text-sm text-amber-200">
              You haven&apos;t set a username yet. Choose one below.
            </p>
          ) : null}
          <form action={updateUsernameAction} className="mt-4 space-y-3">
            <label className="block text-sm text-zinc-300">
              Username
              <input
                name="username"
                type="text"
                required
                minLength={3}
                maxLength={20}
                pattern="[A-Za-z0-9_]{3,20}"
                defaultValue={username}
                className={inputClass}
              />
              <span className="mt-1 block text-xs text-zinc-500">
                3–20 letters, numbers, or underscores.
              </span>
            </label>
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Save username
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="text-lg font-semibold text-white">Change password</h2>
          <form action={changePasswordAction} className="mt-4 space-y-3">
            <label className="block text-sm text-zinc-300">
              Current password
              <input
                name="currentPassword"
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </label>
            <label className="block text-sm text-zinc-300">
              New password
              <input
                name="newPassword"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                className={inputClass}
              />
            </label>
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:text-white"
            >
              Update password
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <h2 className="text-lg font-semibold text-white">Sign out</h2>
          <p className="mt-1 text-sm text-zinc-400">Sign out of your Crusit account on this device.</p>
          <form action={signOutAction} className="mt-4">
            <button
              type="submit"
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
