import WaitlistForm from "./components/WaitlistForm";

const features = [
  {
    title: "Global map",
    description:
      "Browse cruising spots across cities and countries on an interactive map built for discovery.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Community reviews",
    description:
      "Read honest ratings and tips from people who've actually been there — no guesswork.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
    ),
  },
  {
    title: "Share your spots",
    description:
      "Add locations, upload details, and help others find great places in your area.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
  },
  {
    title: "Built for privacy",
    description:
      "Anonymous profiles and discreet browsing so you explore on your own terms.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-6"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08),transparent_40%)]"
        aria-hidden
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-xl font-bold tracking-tight">Crusit</span>
        <a
          href="#waitlist"
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Join waitlist
        </a>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-16 text-center md:pt-24">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Launching soon
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
            Discover cruising spots{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
              worldwide
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
            A global community map for discovering, sharing, and reviewing cruising
            locations — built by the community, for the community.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#waitlist"
              className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-black transition hover:bg-emerald-400"
            >
              Get early access
            </a>
            <a
              href="#features"
              className="rounded-xl border border-zinc-700 px-8 py-4 font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              See features
            </a>
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-1 shadow-2xl shadow-emerald-500/5 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-yellow-500/80" />
              <span className="size-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-zinc-500">crusit.app/map</span>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-b-xl bg-zinc-900">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />
              {[
                { top: "25%", left: "20%" },
                { top: "45%", left: "55%" },
                { top: "60%", left: "30%" },
                { top: "35%", left: "75%" },
                { top: "70%", left: "65%" },
              ].map((pin, index) => (
                <div
                  key={index}
                  className="absolute size-4 -translate-x-1/2 -translate-y-full"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className="size-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                  <div className="mx-auto mt-0.5 size-1 rounded-full bg-emerald-500/60" />
                </div>
              ))}
              <div className="absolute bottom-4 left-4 rounded-lg border border-zinc-700 bg-zinc-950/90 px-3 py-2 text-left text-xs text-zinc-400 backdrop-blur">
                <p className="font-medium text-white">Central Park West</p>
                <p className="mt-0.5 text-emerald-400">★ 4.8 · 23 reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to explore
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Crusit brings together mapping, reviews, and community in one place.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-emerald-500/30 hover:bg-zinc-900/70"
              >
                <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 transition group-hover:bg-emerald-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="mx-auto max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 px-8 py-16 text-center md:px-16">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_60%)]"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Be first to explore
              </h2>
              <p className="mx-auto mt-4 max-w-md text-zinc-400">
                Join the waitlist for early access when Crusit launches. No spam,
                just a heads-up when we go live.
              </p>
              <div className="relative mx-auto mt-8 max-w-md">
                <WaitlistForm />
              </div>
              <p className="mt-6 text-xs text-zinc-500">
                By joining, you agree to receive launch updates. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Crusit. All rights reserved.</p>
      </footer>
    </div>
  );
}
