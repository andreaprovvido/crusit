type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
};

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
        <h1 className="section-title">{title}</h1>
        {lead ? <p className="section-lead mt-3 max-w-2xl">{lead}</p> : null}
      </div>
    </section>
  );
}
