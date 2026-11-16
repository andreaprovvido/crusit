"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/images/logo.png"
            alt={`${SITE.name} AGESCI`}
            width={48}
            height={46}
            className="h-11 w-auto"
            priority
          />
          <span className="font-display text-sm font-bold tracking-[0.08em] uppercase text-[color:var(--ink)] sm:text-base">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principale">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold tracking-wide no-underline transition-colors ${
                  active
                    ? "bg-[color:color-mix(in_srgb,var(--purple)_55%,transparent)] text-[color:var(--gold-soft)]"
                    : "text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--ink)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full bg-current transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-[color:var(--line)] bg-[color:var(--bg-elevated)] md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-[color:var(--line)] py-3.5 text-base font-semibold no-underline last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
