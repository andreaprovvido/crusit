"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = isHome && !scrolled && !open;
  const barClass = overHero
    ? "absolute inset-x-0 top-0 border-transparent bg-transparent text-white"
    : "sticky top-0 border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-paper)_92%,transparent)] text-[color:var(--ink)] backdrop-blur-md";

  return (
    <header className={`z-50 border-b ${barClass}`}>
      <div className="wrap flex items-center justify-between gap-4 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/images/logo-emblem.png"
            alt=""
            width={36}
            height={31}
            className={`h-8! w-auto! max-h-8 ${overHero ? "drop-shadow-sm" : ""}`}
            style={{ width: "auto", height: "2rem" }}
            priority
          />
          {!overHero ? (
            <span className="font-display text-[0.95rem] font-bold tracking-tight">
              {SITE.name}
            </span>
          ) : null}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principale">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-semibold no-underline transition-opacity ${
                  active ? "opacity-100" : "opacity-70 hover:opacity-100"
                } ${active && !overHero ? "text-[color:var(--purple)]" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center md:hidden ${
            overHero ? "text-white" : "text-[color:var(--ink)]"
          }`}
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
        className={`border-t border-[color:var(--line)] bg-[color:var(--bg-paper)] text-[color:var(--ink)] md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="wrap flex flex-col py-2" aria-label="Mobile">
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
