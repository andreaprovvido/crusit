import type { Metadata } from "next";
import { PageHero } from "@/app/components/PageHero";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Calendario",
  description: "Calendario eventi del Gruppo Scout San Giuliano 1 AGESCI.",
};

export default function CalendarioPage() {
  return (
    <>
      <PageHero
        eyebrow="Calendario"
        title="Eventi del gruppo"
        lead="Il calendario ufficiale delle attività e degli appuntamenti del Gruppo Scout San Giuliano 1."
      />
      <section className="section pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--bg-paper)]">
            <iframe
              title="Calendario eventi San Giuliano 1"
              src={SITE.calendarEmbed}
              className="h-[70vh] min-h-[480px] w-full border-0 bg-white"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
