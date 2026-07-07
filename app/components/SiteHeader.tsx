import Link from "next/link";
import Logo from "@/app/components/Logo";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/lib/supabase/server";

export default async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
          >
            <Logo className="size-7" />
            Crusit
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm">
            <Link href="/spots" className="text-zinc-300 hover:text-white">
              Explore spots
            </Link>
            <Link href="/spots/new" className="text-zinc-300 hover:text-white">
              Add spot
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden text-zinc-400 sm:inline">{user.email}</span>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-zinc-700 px-3 py-2 text-zinc-300 hover:border-zinc-500 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-zinc-700 px-3 py-2 text-zinc-300 hover:border-zinc-500 hover:text-white"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
