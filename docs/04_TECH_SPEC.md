# 04 — TECH SPEC (Next.js architecture)

## Stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS v4** (with `@theme` tokens mapping the design variables)
- **GSAP 3.12.5** + **ScrollTrigger** (npm: `gsap`) — consider `@gsap/react` `useGSAP()` hook
- **Lenis** smooth scroll (npm: `lenis` / `@studio-freight/lenis`)
- **next/font/google** for Marcellus + Outfit
- Deploy: **Vercel**. Free tier throughout. DNS likely via the registrar already used for the
  brand (set later).

> The prototype loads GSAP/Lenis from cdnjs and Google Fonts via `<link>`. In Next.js, switch to
> npm imports and `next/font` for self-hosting + no layout shift.

## Project structure (suggested)

```
app/
  layout.tsx                 // fonts, <html>, global Lenis provider, metadata
  page.tsx                   // composes all sections in order
  globals.css                // @theme tokens + base styles ported from :root
components/
  Loader.tsx
  Header.tsx                 // fixed frosted nav, .solid on scroll, data-scroll links
  Hero.tsx                   // copy + PrintStack + FluidBg + bgword + scroll motion
  hero/PrintStack.tsx        // 5 absolutely-positioned rotated cards
  hero/FluidBg.tsx           // 4 breathing blobs
  Manifesto.tsx
  TrustedBy.tsx
  FormatScrolly.tsx          // pinned 3-act story (4R/2R/Polaroid) — heaviest motion piece
  FormatExtras.tsx           // custom design + animated QR
  Gallery.tsx                // filter tabs + grid + lightbox
  WhyTetra.tsx               // 4 animated widgets + stat strip
  Process.tsx                // 5-step timeline, gold line draws
  Testimonials.tsx
  Faq.tsx                    // accordion
  CtaFooter.tsx              // CTA + footer (or split)
  Ribbon.tsx                 // global scroll-drawn SVG
  ui/PrintCard.tsx, Pill.tsx, Badge.tsx, Button.tsx
lib/
  useLenis.ts                // Lenis init + ScrollTrigger.update wiring
  gsap.ts                    // registerPlugin(ScrollTrigger) once (client)
  gallery.ts                 // typed gallery data (from 05_CONTENT.md / 07_ASSETS.md)
public/
  images/                    // copy reference/images/* here
  // (optionally) logos from the brand set
```

## GSAP + Lenis in Next.js (important)

- All motion components are **client components** (`"use client"`).
- Register ScrollTrigger once on the client: `gsap.registerPlugin(ScrollTrigger)`.
- Init Lenis in a top-level client provider; on each Lenis `scroll`, call `ScrollTrigger.update()`,
  and drive Lenis' `raf` from `gsap.ticker` (or rAF). Set `lerp ≈ 0.055`.
- Use `useGSAP()` (`@gsap/react`) or `useLayoutEffect` with a `gsap.context()` scoped to each
  component for safe cleanup on unmount/route change.
- The FORMAT section uses `ScrollTrigger` **pin** + scrub with `end:'+=3400'`. Test pin behavior
  with Lenis carefully; ensure `ScrollTrigger.refresh()` runs after fonts/images load.
- Respect `prefers-reduced-motion`: guard ambient loops (fluid blobs, widget loops).

## Tailwind v4 theme (map tokens)

In `globals.css`:
```css
@import "tailwindcss";
@theme {
  --color-paper:#15120E; --color-paper2:#1E1912; --color-card:#FFFFFF;
  --color-ink:#EFE7DA; --color-ink2:#A99B87; --color-gold:#C8A96A; --color-gold2:#E2C88C;
  --color-line: rgba(255,255,255,.12);
}
/* keep raw helpers too */
:root{
  --sh:0 26px 52px -24px rgba(0,0,0,.72),0 10px 22px -12px rgba(0,0,0,.5);
}
html{ scroll-behavior:auto; } /* Lenis handles smooth scroll */
section{ scroll-margin-top:92px; } /* safe-area anchor offset */
```
You can port most of the prototype's bespoke CSS as-is into component-scoped CSS or `globals.css`;
Tailwind utilities are optional sugar, not a requirement. **Match the reference pixel values.**

## Images

- Copy `reference/images/*` → `public/images/`.
- `next/image` is fine for the gallery/most prints; for the absolutely-positioned + rotated hero
  stack and the format flip imagery, plain `<img>` (or `next/image` with `fill`) is simpler —
  whatever reproduces the reference exactly. Don't crop prints (no forced `object-fit:cover` on
  hero/format; natural aspect with white card padding).
- These files are web-optimized (~max 1000px). Higher-res originals exist on Rama's side if needed.

## Fonts

```ts
import { Marcellus, Outfit } from "next/font/google";
const marcellus = Marcellus({ subsets:["latin"], weight:"400", variable:"--disp" });
const outfit = Outfit({ subsets:["latin"], weight:["200","300","400","500"], variable:"--sans" });
```
Apply both `variable` classes on `<html>` / `<body>`; map `--disp`/`--sans` accordingly.

## SEO / metadata

- `metadata` in `layout.tsx`: title/description in Indonesian, OpenGraph image (use a hero print
  or a branded card), `lang="id"`.
- Single canonical page. Sitemap/robots default-indexable for the marketing page.

## Performance

- Self-host fonts (next/font) → no FOUT/CLS.
- Lazy-mount heavy motion below the fold; `ScrollTrigger.refresh()` after load.
- Compress images; serve responsive sizes via `next/image` where used.
- Defer/segment GSAP timelines per section (don't build one giant timeline).

## CTA wiring

- All "Tanya Paket & Harga" / "Chat Admin" buttons → WhatsApp deep link
  `https://wa.me/<NUMBER>?text=<prefilled>` (put `<NUMBER>` + default message in a config/env).
- Instagram → `https://instagram.com/tetraphotobooth`; email `mailto:tetraphotobooth@gmail.com`.

## Future (DO NOT build in v1 — documented for later)

1. **Hidden price-list page** — route `app/harga/[slug]/page.tsx`:
   - Unguessable `slug` (random token). Admin shares the URL privately in chat.
   - `export const metadata = { robots: { index:false, follow:false } }` (noindex/nofollow),
     plus exclude from sitemap and add `X-Robots-Tag: noindex` if possible.
   - Renders the tailored pricelist. Keep it off all internal links/nav.
2. **Sanity CMS for the gallery** — model `Print` (title, category, printType, image, event,
   date, featured). Gallery + hero stack + format imagery read from Sanity so non-devs can update.
   Until then, `lib/gallery.ts` is the hard-coded source.
