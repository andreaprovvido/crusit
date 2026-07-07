import Link from "next/link";
import Logo from "@/app/components/Logo";
import { SITE_NAME } from "@/lib/seo";

const CRUSIT_X_URL = "https://x.com/crusitapp";

const sections: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "All spots", href: "/spots" },
      { label: "Add a spot", href: "/spots/new" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Crusit",
    links: [
      { label: "About", href: "/about" },
      { label: "Your profile", href: "/profile" },
      { label: "Privacy policy", href: "/privacy" },
    ],
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
              <Logo className="size-7" />
              Crusit
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              The community-powered map for discovering, reviewing, and sharing
              gay cruising spots worldwide — built on consent, awareness, and
              safer sex.
            </p>
            <a
              href={CRUSIT_X_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Crusit on X"
              className="mt-6 inline-flex size-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-300 transition hover:border-zinc-600 hover:text-white"
            >
              <XIcon className="size-4" />
            </a>
          </div>

          {sections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="text-sm font-semibold text-white">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-zinc-400 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-zinc-800 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>For adults 18+. Cruise responsibly and respect consent.</p>
        </div>
      </div>
    </footer>
  );
}
