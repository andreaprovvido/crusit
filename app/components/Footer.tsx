import Link from "next/link";
import { NAV, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--bg-elevated)_90%,black)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold tracking-wide text-[color:var(--gold-soft)]">
            {SITE.fullName}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[color:var(--ink-muted)]">
            {SITE.tagline} · San Giuliano Milanese dal 1954
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-block text-sm font-semibold text-[color:var(--gold)]"
          >
            {SITE.email}
          </a>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.16em] text-[color:var(--ink-muted)] uppercase">
            Sezioni
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="no-underline hover:text-[color:var(--gold-soft)]">
                Home
              </Link>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="no-underline hover:text-[color:var(--gold-soft)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.16em] text-[color:var(--ink-muted)] uppercase">
            Social
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-[color:var(--gold-soft)]"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-[color:var(--gold-soft)]"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={SITE.agesci}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-[color:var(--gold-soft)]"
              >
                AGESCI
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--line)] px-4 py-4 text-center text-xs text-[color:var(--ink-muted)] sm:px-6">
        © {new Date().getFullYear()} {SITE.fullName} — Estote Parati
      </div>
    </footer>
  );
}
