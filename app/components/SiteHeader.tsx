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
      <div className="mx-auto flex max-w-6xl flex-nowrap items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-2 sm:gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1.5 text-base font-bold tracking-tight text-white sm:gap-2 sm:text-lg"
          >
            <Logo className="size-6 sm:size-7" />
            Crusit
          </Link>

          <nav
            aria-label="Main navigation"
            className="flex flex-nowrap items-center gap-2 text-xs sm:gap-4 sm:text-sm"
          >
            <Link href="/spots" className="shrink-0 whitespace-nowrap text-zinc-300 hover:text-white">
              <span className="sm:hidden">Explore</span>
              <span className="hidden sm:inline">Explore spots</span>
            </Link>
            <Link href="/spots/new" className="shrink-0 whitespace-nowrap text-zinc-300 hover:text-white">
              <span className="sm:hidden">Add</span>
              <span className="hidden sm:inline">Add spot</span>
            </Link>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs sm:gap-3 sm:text-sm">
          {user ? (
            <>
              <span className="hidden max-w-32 truncate text-zinc-400 md:inline">{user.email}</span>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-zinc-700 px-2 py-1.5 whitespace-nowrap text-zinc-300 hover:border-zinc-500 hover:text-white sm:px-3 sm:py-2"
                >
                  <span className="sm:hidden">Out</span>
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-zinc-700 px-2 py-1.5 whitespace-nowrap text-zinc-300 hover:border-zinc-500 hover:text-white sm:px-3 sm:py-2"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
