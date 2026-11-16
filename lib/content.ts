export type NavItem = {
  label: string;
  href: string;
};

export const SITE = {
  name: "San Giuliano 1",
  fullName: "Gruppo Scout San Giuliano 1",
  tagline: "GRUPPO SCOUT AGESCI",
  email: "sangiuliano1@lombardia.agesci.it",
  instagram: "https://www.instagram.com/sangiuliano1agesci/",
  facebook: "https://www.facebook.com/profile.php?id=100075794147543",
  agesci: "https://www.agesci.it/",
  calendarEmbed:
    "https://calendar.google.com/calendar/embed?showTitle=0&height=600&wkst=1&bgcolor=%230B0612&src=k2cbmooer0ai6tai111ja0ccdo%40group.calendar.google.com&color=%2342104A&ctz=Europe%2FRome",
  enrollmentForm: "https://forms.gle/w8mUmHa4RpZjzBdG7",
} as const;

export const NAV: NavItem[] = [
  { label: "Documenti", href: "/documenti/" },
  { label: "Calendario", href: "/calendario/" },
  { label: "Iscrizioni", href: "/iscrizioni/" },
  { label: "Blog", href: "/blog/" },
];

export type DocLink = {
  title: string;
  href: string;
  note?: string;
};

export const DOC_SECTIONS: {
  id: string;
  title: string;
  intro?: string;
  items: DocLink[];
}[] = [
  {
    id: "privacy",
    title: "Moduli privacy e scheda sanitaria",
    items: [
      {
        title: "Nuovo modulo privacy 2024 minori",
        href: "https://www.agesci.it/?wpfb_dl=54624",
      },
      {
        title: "Nuovo modulo privacy 2024 adulti/maggiorenni",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2023/12/nuova-informativa-unificata-2024_gdpr-adulti.pdf",
      },
      {
        title: "Scheda dati sanitari minorenni",
        href: "https://www.agesci.it/?wpfb_dl=54812",
      },
    ],
  },
  {
    id: "bigini",
    title: "Bigini metodologici",
    intro:
      "Per comprendere meglio il percorso scout a partire dalle branche e conoscere un po’ di terminologia scout.",
    items: [
      {
        title: "Branca LC — Lupetti e Coccinelle",
        href: "https://drive.google.com/open?id=1VVuk9rrFeHhQLochd80urCD9bQsKQUzxfjhDAhEyVAg",
      },
      {
        title: "Branca EG — Esploratori e Guide",
        href: "https://drive.google.com/open?id=1vftr8d9FUg9-PhktqoBmTpU84RuKQ_mJUuwLGUkoRuc",
      },
      {
        title: "Branca RS — Rover e Scolte",
        href: "https://drive.google.com/open?id=1F23APfsPqppztVaf4e5x-BVWsh5gylf9xYdZsUplal0",
      },
      {
        title: "Patto con i genitori — Dicembre 2023",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2023/12/patto-con-i-genitori-2023.pdf",
      },
      {
        title: "Progetto Educativo 2020/2025",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2020/11/peg-2020-2025-sangiuliano1.pdf",
      },
      {
        title: "Patto associativo AGESCI",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2019/05/patto-associativo_1999.pdf",
      },
    ],
  },
  {
    id: "vari",
    title: "Documenti vari",
    items: [
      {
        title: "Lo zaino",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2023/09/lozaino.pdf",
        note: "Lo zaino è un nostro fedele compagno di viaggio nelle nostre uscite e nei nostri campi; è importante quindi prepararlo bene!",
      },
      {
        title: "Dizionario semi-serio di Scauttese/Italiano",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2013/05/dizionario_scauttese.pdf",
      },
      {
        title: "Canti S. Messa Apertura 2024",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2024/10/canti-messa-apertura-2024.pdf",
      },
    ],
  },
];

export const NEIGHBOR_GROUPS = [
  {
    name: "Melegnano",
    href: "http://www.scoutmelegnano.org/sito/",
  },
  {
    name: "San Donato Milanese",
    href: "http://sandonato1.altervista.org/",
  },
  {
    name: "Peschiera Borromeo",
    href: "https://www.facebook.com/Mirazzano1/",
  },
] as const;

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  excerpt: string;
  body: string[];
  attachments?: DocLink[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "festa-della-citta-2023",
    title: "Festa della città 2023",
    date: "2023-09-30",
    dateLabel: "30 settembre 2023",
    excerpt:
      "Anche quest’anno la Festa della Città di San Giuliano del 1 Ottobre ci vedrà coinvolti con stand, contest logo e eventi del Clan/Fuoco.",
    body: [
      "Ciao a tutti! Benritrovati!",
      "Anche quest’anno la Festa della Città di San Giuliano del 1 Ottobre ci vedrà coinvolti! Ci trovate con lo stand di rappresentanza dalla mattina al tardo pomeriggio in Via Marconi, più o meno all’altezza della Farmacia, in prossimità dell’incrocio con Via Trieste.",
      "Vi aspettiamo numerosi per esprimere la vostra preferenza sulle proposte grafiche pervenute in occasione del contest per il logo del 70esimo del Gruppo!",
      "Inoltre, il Clan/Fuoco del gruppo vi invita a prendere parte agli eventi da loro organizzati per l’occasione. L’obiettivo di questi eventi è quello di condividere il percorso che hanno affrontato quest’anno, relativo alla legalità, all’antimafia e alla conoscenza della criminalità organizzata nel nord Italia, culminato con la partecipazione ad un campo di Libera (Lotta contro le mafie) quest’estate ad Aversa (CE).",
      "Organizzeranno un torneo di calcio aperto alla fascia di età 12-16 nel pomeriggio ed un momento di condivisione serale dedicato agli adulti, in cui riporteranno le loro emozioni, impressioni ma anche informazioni provate e apprese durante il percorso di quest’anno.",
      "Vi alleghiamo la locandina dei due eventi con tutte le info, sperando di vedervi numerosi! A Domenica!",
    ],
    attachments: [
      {
        title: "Volantino torneo scout",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2023/09/volantino-torneo-scout-1_compressed.pdf",
      },
      {
        title: "Volantino evento serale scout",
        href: "https://sangiuliano1.wordpress.com/wp-content/uploads/2023/09/volantino-evento-serale-scout.pdf",
      },
    ],
  },
  {
    slug: "ripresa-attivita-scout",
    title: "Ripresa Attività Scout",
    date: "2020-06-23",
    dateLabel: "23 giugno 2020",
    excerpt:
      "A breve riprenderanno le attività in presenza. Ogni unità comunicherà date e modalità; i documenti sono in Documenti.",
    body: [
      "Cari genitori,",
      "come anticipato durante la scorsa riunione a breve riprenderanno finalmente le attività in presenza. Non saranno ancora le “vecchie” attività, ma faremo del nostro meglio per poter vivere insieme delle belle e significative esperienze.",
      "Ogni unità provvederà a comunicare nel dettaglio le attività che verranno svolte, con date e modalità.",
      "Abbiamo provveduto a pubblicare nella sezione Documenti del sito tutto il materiale di approfondimento rispetto alle attività che svolgeremo in questo periodo e fino al 31 luglio. Troverete nello specifico: Protocollo Sanitario; Atto di Corresponsabilità; Autodichiarazione stato di salute; Progetto di ripresa attività.",
      "Non vediamo l’ora di vedere i ragazzi. Certi della vostra comprensione e collaborazione vi salutiamo fraternamente.",
      "La Comunità Capi",
    ],
  },
  {
    slug: "estote-parati-4-0",
    title: "Estote Parati 4.0",
    date: "2020-04-23",
    dateLabel: "23 aprile 2020",
    excerpt:
      "In giorni di smarrimento, la Comunità Capi lavora e si forma per ritrovarsi sempre pronti.",
    body: [
      "Ciao caro gruppo!",
      "In questi giorni di probabile smarrimento e sfiducia, la Comunità Capi è al lavoro e ne approfitta per fare un po’ di formazione, per farci trovare “sempre pronti” quando potremo rincontrarci e riassaporare lo scoutismo che amiamo.",
      "“Dopo le nubi splende di nuovo il sole. Che la vostra nube particolare sia tristezza o dolore o ansietà, il sole della felicità verrà di nuovo su di voi se prenderete al meglio la situazione quando i tempi sono duri.“ — BP",
    ],
  },
  {
    slug: "uscita-di-inizio-anno-scout-2019-2020",
    title: "Uscita di inizio anno scout 2019/2020",
    date: "2019-10-18",
    dateLabel: "18 ottobre 2019",
    excerpt:
      "Uscita di apertura a Cozzo (PV) il 19–20 ottobre: passaggi, pranzo con i genitori e messa.",
    body: [
      "Carissimi tutti,",
      "questo weekend, 19 – 20 ottobre, avrà luogo l’uscita di apertura dell’anno scout, che si terrà a Cozzo (PV) presso la casa parrocchiale in Via al Santuario.",
      "Sabato sera intorno alle 19.30 avranno luogo, come di consueto, i passaggi e Domenica 20 ottobre i genitori sono invitati a raggiungerci entro le ore 12.15 per partecipare al pranzo che avrà inizio alle ore 12.30.",
      "Il pasto sarà al sacco e ogni famiglia provvederà per sé.",
      "Alle ore 14.00 ci saranno le votazioni per il consiglio pastorale della comunità pastorale Paolo VI di San Giuliano Milanese, seguiranno maggiori informazioni. Ci sarà poi la messa insieme durante la quale verranno utilizzate, come avvenuto in uscita di chiusura, le particole prodotte nei laboratori del carcere di Opera, presso il quale alcuni nostri ragazzi del Clan/Fuoco hanno partecipato ai workshop. Le offerte che raccoglieremo durante l’offertorio verranno donate per le attività di recupero svolte in favore degli ospiti della struttura detentiva.",
      "Concluderemo tutte le attività per le ore 16.00 a Cozzo, il rientro a San Giuliano sarà autonomo.",
      "A presto, La Comunità Capi",
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
