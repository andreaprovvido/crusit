import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-xs font-bold tracking-[0.2em] text-[color:var(--gold)] uppercase">
        404
      </p>
      <h1 className="section-title mt-3">Pagina non trovata</h1>
      <p className="section-lead mt-3">
        La pagina che cerchi non esiste o è stata spostata.
      </p>
      <Link href="/" className="btn btn-gold mt-8 no-underline">
        Torna alla home
      </Link>
    </section>
  );
}
