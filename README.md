# pascalsterzik.com

Personal-brand website for **Pascal Sterzik**, an independent growth diagnostician for
DTC and ecommerce brands (trading as Sterzik Solutions).

## Stack

- **Next.js 15** (App Router, TypeScript) — pinned to the 15 line
- **React 18**
- **Tailwind CSS 3.4** (the visual system is driven by CSS custom properties in
  `app/globals.css`, ported 1:1 from the approved Phase-3 design mock)
- **Framer Motion** (mobile-menu animation; scroll reveals use a small
  IntersectionObserver initializer that matches the mock exactly)
- Self-hosted fonts via `next/font/google`: **Newsreader** + **Libre Franklin**

## Pages

`/` · `/about` · `/audit` · `/contact` · `/impressum` · `/datenschutz`

(The Articles hub is a deferred fast-follow and is intentionally not in v1.)

## Things to provide before production launch (Phase 5)

All live in `lib/site-config.ts`:

| Key | What it is | Status |
| --- | --- | --- |
| `auditFormUrl` | Tally form built from the Phase-2 qualifying survey | **placeholder** |
| `auditFormEmbedId` | Optional Tally embed id to render the form inline on `/audit` | empty (shows placeholder) |
| `bookingUrl` | Cal.com (or Calendly) "book a call" link | **placeholder** |

Plus:

- **Real headshot** — the hero currently shows a labeled placeholder. Swap point is in
  `components/headshot.tsx` (drop the portrait in `/public` and use `next/image`).
- **Legal review** — `app/datenschutz/page.tsx` lists the real data processors (Vercel,
  Tally, Cal.com) but the exact provider entities/addresses, the AVVs, and the final
  text should be confirmed by a lawyer. See the `FLAGS` comment in that file.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
