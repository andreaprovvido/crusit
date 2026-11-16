import type { Metadata } from "next";
import { PageHero } from "@/app/components/PageHero";
import { NEIGHBOR_GROUPS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Iscrizioni",
  description:
    "Pre-iscrizioni e liste d’attesa del Gruppo Scout AGESCI San Giuliano 1.",
};

export default function IscrizioniPage() {
  return (
    <>
      <PageHero
        eyebrow="Iscrizioni"
        title="Pre-iscrizioni e liste d’attesa"
        lead="Prima di procedere con la compilazione del modulo, leggi con attenzione le indicazioni riportate di seguito!"
      />
      <section className="section pt-6">
        <div className="prose-scout mx-auto max-w-3xl px-4 sm:px-6">
          <p>
            Il Gruppo Scout{" "}
            <a
              href="https://sangiuliano1.wordpress.com/wp-content/uploads/2019/05/patto-associativo_1999.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[color:var(--purple)]"
            >
              AGESCI
            </a>{" "}
            di San Giuliano Milanese accoglie bambine e bambini, ragazze e
            ragazzi dagli <strong>8 anni compiuti ai 19-20 anni</strong>.
          </p>
          <p>
            È possibile <strong>pre-iscrivere i propri figli</strong> al
            Progetto Educativo scout attraverso la compilazione del{" "}
            <strong>modulo che trovi più in basso</strong> che vi inserisce
            nelle nostre <strong>liste d’attesa</strong>.
          </p>
          <p>
            Abbiamo adottato delle liste d’attesa poiché da qualche anno a
            questa parte le richieste sono ben oltre le nostre possibilità e
            per garantire una gestione efficiente delle richieste (priorità,
            evitare la dispersione dei dati ecc.).
          </p>
          <p>
            <strong>
              L’inserimento in lista di attesa, quindi la compilazione di
              questo modulo, è possibile dal 1° gennaio dell’anno in cui
              il/la bambino/a compie 5 anni.
            </strong>
            <br />
            Ad esempio, chi è nato nel 2018 compirà 5 anni nel 2023, quindi
            dal 1° gennaio 2023 sarà possibile compilare il modulo, anche se
            una chiamata per iscriversi non sarà possibile prima dell’autunno
            2026.
          </p>
          <p>
            Il nostro gruppo, che opera sul territorio di San Giuliano dal
            1954, prova a fare sempre del suo meglio, al fine di garantire un
            efficace servizio educativo, e di permettere a più bambini e
            ragazzi possibili di poter vivere l’esperienza scout.
          </p>
          <p>
            Ogni anno verifichiamo le nostre forze e i capi che volontariamente
            si mettono a disposizione per il servizio.
          </p>
          <p>
            A seguito di ciò, la comunità capi stabilisce ogni anno, seguendo
            le priorità definite all’interno del nostro Progetto Educativo, chi
            e quanti nuovi ingressi ci è possibile accogliere nel nostro
            gruppo.
          </p>
          <p>
            Per i motivi sopracitati non possiamo garantire che tutti i bambini
            e i ragazzi pre-iscritti verranno effettivamente inseriti. L’ordine
            con cui verranno contattate le famiglie segue diversi criteri
            legati alla provenienza (vedi sotto), a situazioni specifiche di
            parentela e/o bisogni educativi speciali ed in base alle esigenze
            dei gruppi che, a seconda degli anni, potrebbero necessitare di
            rinforzare alcune fasce d’età oppure di bilanciare la ripartizione
            maschi-femmine.
          </p>
          <p>
            Indicativamente <strong>verrai contattato/a</strong> tra Maggio e
            Giugno per l’inserimento e prendere parte ad eventuali attività di
            prova.
            <br />
            Qualora purtroppo non ci fosse disponibilità per l’inserimento,
            verrai contattato tra Giugno e Settembre per confermare la tua
            volontà di restare in lista.
            <br />
            Se deciderete di rimanere nella nostra lista di attesa, verrete
            tenuti in considerazione come possibile nuovo ingresso, sempre in
            base alle disponibilità. Se invece deciderete di non rimanere nella
            lista di attesa, il vostro nominativo verrà cancellato e non
            verrete più ricontattati.
          </p>

          <h2 className="font-display mt-10 mb-3 text-xl font-bold text-[color:var(--purple-deep)]">
            Attenzione 1
          </h2>
          <p>
            Tra i punti che consideriamo per impostare la priorità della lista
            di attesa di iscrizione,{" "}
            <strong>
              essere di San Giuliano Milanese ricopre un peso molto importante
            </strong>
            , soprattutto in virtù del fatto che, nei paesi limitrofi, sono
            presenti altri gruppi scout (es:{" "}
            {NEIGHBOR_GROUPS.map((g, i) => (
              <span key={g.href}>
                <a
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[color:var(--purple)]"
                >
                  {g.name}
                </a>
                {i < NEIGHBOR_GROUPS.length - 1 ? ", " : ""}
              </span>
            ))}
            ). Qualora voleste informazioni su come contattarli, o in generale
            sul gruppo, scriveteci a{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-semibold text-[color:var(--purple)]"
            >
              questa mail
            </a>
            .
          </p>

          <h2 className="font-display mt-10 mb-3 text-xl font-bold text-[color:var(--purple-deep)]">
            Attenzione 2
          </h2>
          <p>
            I ragazzi che rimangono in lista d’attesa senza essere mai presi
            verranno poi automaticamente eliminati dalla lista d’attesa a
            partire dal 1° gennaio dell’anno in cui essi compiranno 17 anni.
            (esempio: un ragazzo nato nel 2006 e che, sfortunatamente, non è
            mai stato preso nel gruppo, dal 1° gennaio 2023 verrà eliminato
            dalla lista d’attesa).
          </p>

          <p>
            Per ogni comunicazione verrai contattato tramite il nostro
            indirizzo email istituzionale{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-semibold text-[color:var(--purple)] underline"
            >
              {SITE.email}
            </a>
            .
            <br />
            Può capitare che le mail possano finire nella tua posta
            indesiderata, pertanto, per non perdere nessuna delle nostre
            comunicazioni, ti consigliamo caldamente di aggiungere la nostra
            email tra i tuoi contatti attendibili.
          </p>

          <div className="mt-10">
            <a
              href={SITE.enrollmentForm}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold no-underline"
            >
              Compila il modulo cliccando qui
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
