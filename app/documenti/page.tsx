import type { Metadata } from "next";
import { PageHero } from "@/app/components/PageHero";
import { DOC_SECTIONS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Documenti",
  description:
    "Documenti aggiornati per la partecipazione alle attività e per comprendere il percorso scout nel Gruppo San Giuliano 1.",
};

export default function DocumentiPage() {
  return (
    <>
      <PageHero
        eyebrow="Documenti"
        title="Modulistica e materiali"
        lead="In questa sezione sono disponibili tutti i documenti, aggiornati, necessari per la partecipazione dei soci alle attività e utili a comprendere meglio il percorso scout nel nostro Gruppo."
      />
      <section className="section pt-8">
        <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6">
          {DOC_SECTIONS.map((section) => (
            <div key={section.id}>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--purple-deep)] sm:text-3xl">
                {section.title}
              </h2>
              {section.intro ? (
                <p className="mt-3 max-w-3xl text-[color:var(--ink-soft)]">
                  {section.intro}
                </p>
              ) : null}
              <div className="mt-4">
                {section.items.map((item) => (
                  <div key={item.href + item.title} className="doc-row">
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                    {item.note ? (
                      <p className="text-sm text-[color:var(--ink-soft)]">{item.note}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
