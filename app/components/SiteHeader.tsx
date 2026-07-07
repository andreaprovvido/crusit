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
        <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-white"
          >
            <Logo className="size-7" />
            Crusit
          </Link>

          <nav
            aria-label="Main navigation"
            className="flex flex-nowrap items-center gap-4 text-sm"
          >
            <Link href="/spots" className="shrink-0 whitespace-nowrap text-zinc-300 hover:text-white">
              Explore
            </Link>
            <Link href="/blog" className="shrink-0 whitespace-nowrap text-zinc-300 hover:text-white">
              Blog
            </Link>
            <Link href="/about" className="hidden shrink-0 whitespace-nowrap text-zinc-300 hover:text-white sm:inline">
              About
            </Link>
            <Link href="/spots/new" className="shrink-0 whitespace-nowrap text-zinc-300 hover:text-white">
              Add
            </Link>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden max-w-32 truncate text-zinc-400 md:inline">{user.email}</span>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-zinc-700 px-3 py-2 whitespace-nowrap text-zinc-300 hover:border-zinc-500 hover:text-white"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-zinc-700 px-3 py-2 whitespace-nowrap text-zinc-300 hover:border-zinc-500 hover:text-white"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
