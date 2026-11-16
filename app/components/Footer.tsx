import Link from "next/link";
import { NAV, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-[color:var(--bg-paper)]">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-[color:var(--purple-deep)]">
            {SITE.name}
          </p>
          <p className="mt-2 max-w-sm text-[color:var(--ink-soft)]">
            {SITE.tagline}
            <br />
            San Giuliano Milanese · dal 1954
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-5 inline-block font-semibold text-[color:var(--purple)]"
          >
            {SITE.email}
          </a>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.14em] text-[color:var(--ink-faint)] uppercase">
            Sezioni
          </p>
          <ul className="space-y-2.5 text-sm font-semibold">
            <li>
              <Link href="/" className="no-underline hover:text-[color:var(--purple)]">
                Home
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="no-underline hover:text-[color:var(--purple)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.14em] text-[color:var(--ink-faint)] uppercase">
            Social
          </p>
          <ul className="space-y-2.5 text-sm font-semibold">
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-[color:var(--purple)]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-[color:var(--purple)]"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={SITE.agesci}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-[color:var(--purple)]"
              >
                AGESCI
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--line)] py-4 text-center text-xs text-[color:var(--ink-faint)]">
        © {new Date().getFullYear()} {SITE.fullName} — Estote Parati
      </div>
    </footer>
  );
}
