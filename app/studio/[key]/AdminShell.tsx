import Link from "next/link";
import { studioSignOutAction } from "@/app/studio/actions";

type NavItem = { href: string; label: string };

export default function AdminShell({
  keyParam,
  email,
  active,
  title,
  children,
}: {
  keyParam: string;
  email: string;
  active: string;
  title: string;
  children: React.ReactNode;
}) {
  const base = `/studio/${keyParam}`;
  const items: NavItem[] = [
    { href: base, label: "Dashboard" },
    { href: `${base}/spots`, label: "Spots" },
    { href: `${base}/reviews`, label: "Reviews" },
    { href: `${base}/users`, label: "Users" },
    { href: `${base}/articles`, label: "Articles" },
    { href: `${base}/about`, label: "About page" },
  ];

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
      <aside className="shrink-0 border-b border-zinc-800 lg:w-60 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between p-4 lg:block">
          <Link href={base} className="text-lg font-bold tracking-tight text-white">
            Crusit <span className="text-emerald-400">Studio</span>
          </Link>
        </div>
        <nav
          aria-label="Admin navigation"
          className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-3"
        >
          {items.map((item) => {
            const isActive =
              item.label.toLowerCase() === active.toLowerCase();
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-zinc-800 px-6 py-4">
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden max-w-40 truncate text-zinc-400 sm:inline">
              {email}
            </span>
            <Link
              href="/"
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-zinc-300 hover:border-zinc-500 hover:text-white"
            >
              View site
            </Link>
            <form action={studioSignOutAction}>
              <input type="hidden" name="key" value={keyParam} />
              <button
                type="submit"
                className="rounded-lg border border-zinc-700 px-3 py-1.5 text-zinc-300 hover:border-zinc-500 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
