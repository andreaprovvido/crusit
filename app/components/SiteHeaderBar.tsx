"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/app/components/Logo";

type SiteHeaderBarProps = {
  isAuthenticated: boolean;
  username: string | null;
};

function ProfileGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  );
}

export default function SiteHeaderBar({
  isAuthenticated,
  username,
}: SiteHeaderBarProps) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const menuLinkClass =
    "flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-600 hover:text-white";

  return (
    <>
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
            className="hidden flex-nowrap items-center gap-4 text-sm sm:flex"
          >
            <Link href="/spots" className="shrink-0 whitespace-nowrap text-zinc-300 hover:text-white">
              Explore
            </Link>
            <Link href="/blog" className="shrink-0 whitespace-nowrap text-zinc-300 hover:text-white">
              Blog
            </Link>
            <Link href="/about" className="shrink-0 whitespace-nowrap text-zinc-300 hover:text-white">
              About
            </Link>
          </nav>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex sm:gap-3 text-sm">
          <Link
            href="/spots/new"
            aria-label="Add new spot"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="size-4 shrink-0"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="whitespace-nowrap">Add new spot</span>
          </Link>
          {isAuthenticated ? (
            <Link
              href="/profile"
              aria-label="Your profile"
              title={username ?? "Your profile"}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-zinc-700 px-2.5 py-2 text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              <ProfileGlyph className="size-5" />
              {username ? (
                <span className="hidden max-w-32 truncate md:inline">{username}</span>
              ) : null}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-zinc-700 px-3 py-2 whitespace-nowrap text-zinc-300 hover:border-zinc-500 hover:text-white"
            >
              Sign in
            </Link>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:hidden">
          {isAuthenticated ? (
            <Link
              href="/profile"
              aria-label="Your profile"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              <ProfileGlyph className="size-5" />
            </Link>
          ) : null}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-header-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
          >
            <span>Menu</span>
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-header-menu"
          aria-label="Mobile navigation"
          className="border-t border-zinc-800 bg-zinc-950/95 sm:hidden"
        >
          <div className="mx-auto max-w-6xl space-y-2 px-3 py-3">
            <ul className="grid grid-cols-3 gap-2">
              <li>
                <Link href="/spots" className={menuLinkClass} onClick={close}>
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/blog" className={menuLinkClass} onClick={close}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className={menuLinkClass} onClick={close}>
                  About
                </Link>
              </li>
            </ul>

            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link
                  href="/spots/new"
                  className={`${menuLinkClass} gap-1.5 bg-emerald-500 font-semibold text-black hover:border-emerald-400 hover:bg-emerald-400 hover:text-black`}
                  onClick={close}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="size-4 shrink-0"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add new spot
                </Link>
              </li>
              <li>
                {isAuthenticated ? (
                  <Link href="/profile" className={menuLinkClass} onClick={close}>
                    Profile
                  </Link>
                ) : (
                  <Link href="/login" className={menuLinkClass} onClick={close}>
                    Sign in
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      ) : null}
    </>
  );
}
