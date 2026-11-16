type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
};

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="border-b border-[color:var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--purple)_28%,transparent),transparent)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow ? (
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[color:var(--gold)] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="section-title">{title}</h1>
        {lead ? <p className="section-lead mt-3">{lead}</p> : null}
      </div>
    </section>
  );
}
