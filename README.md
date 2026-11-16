# San Giuliano 1 AGESCI

Sito pubblico del **Gruppo Scout San Giuliano 1** (AGESCI), in sostituzione di [sangiuliano1.wordpress.com](https://sangiuliano1.wordpress.com/).

## Sezioni (mirror WordPress)

- **Home** — brand, CTA iscrizioni / calendario / Progetto Educativo, ultimi post
- **Documenti** (`/documenti`) — ex *Modulistica*
- **Calendario** (`/calendario`) — Google Calendar del gruppo
- **Iscrizioni** (`/iscrizioni`) — ex *Scrivici* + form liste d’attesa
- **Blog** (`/blog`) — archivio articoli

## Sviluppo

```bash
npm install
npm run dev
```

Build statico:

```bash
npm run build
# output in ./out
```

Per GitHub Pages (basePath `/crusit`):

```bash
GITHUB_PAGES=true npm run build
```

## Hosting

- **GitHub Pages**: workflow `.github/workflows/deploy-pages.yml` pubblica `out/` su push a `main`.
  URL previsto: `https://andreaprovvido.github.io/crusit/`
  Richiede Pages abilitato (Settings → Pages → Source: GitHub Actions).
- **Vercel**: il repo è già collegato; un deploy/preview fornisce un URL `*.vercel.app`.

## Brand

Logo ufficiale in `public/images/logo.png` (viola / oro / rosso su fondo scuro).
