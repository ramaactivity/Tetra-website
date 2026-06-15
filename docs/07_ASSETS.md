# 07 — ASSETS (manifest)

All files live in `reference/images/`. Copy them to `public/images/` in the Next.js app.
These are web-optimized (≤ ~1000px). Filenames are the canonical keys used throughout the docs.

## Photos (real client prints)

| key (file)     | dims (w×h) | orient.   | what it is                          | used in (primary)                         |
|----------------|-----------|-----------|-------------------------------------|-------------------------------------------|
| `g-wed1.jpg`   | 780×1000  | portrait  | Ami & Awal — wedding **polaroid**   | Hero stack (focal), gallery, why-widget   |
| `g-wed2.jpg`   | 761×1000  | portrait  | Marsya & Iwan — wedding polaroid    | Gallery                                   |
| `g-corp1.jpg`  | 1000×666  | landscape | Indocement — corporate **4R**       | Hero stack, FORMAT 4R-landscape, gallery  |
| `g-corp2.jpg`  | 666×1000  | portrait  | Kemenag DKI — corporate **4R**      | Gallery                                   |
| `g-bday1.jpg`  | 666×1000  | portrait  | Mia's Sweet 17 — birthday **4R**    | Hero stack, FORMAT 4R-portrait, why-widget|
| `g-strip1.jpg` | 333×1000  | portrait  | Koempoel Jadoel — reunion **2R**    | Gallery                                   |
| `g-strip2.jpg` | 333×1000  | portrait  | Nerissa 14th — birthday **2R**      | Hero stack, gallery                       |
| `g-strip3.jpg` | 333×1000  | portrait  | Implora Glam Activation — **2R**    | Hero stack, gallery                       |
| `g-grad1.jpg`  | 1000×666  | landscape | SDIT Al-Hidayah — wisuda **4R**     | Gallery                                   |
| `g-grad2.jpg`  | 666×1000  | portrait  | MTs Umdatur — wisuda **4R**         | Gallery, why-widget (frame cycle)         |

> Orientation matters for the FORMAT flip: 4R landscape = `g-corp1`, 4R portrait = `g-bday1`.
> Strips (2R) are ~1:3. Don't crop prints — keep natural aspect inside white "paper" cards.

## Logo

| key                | dims    | notes                                            |
|--------------------|---------|--------------------------------------------------|
| `word-white.png`   | 900×454 | Tetra wordmark, white — used in loader, nav, footer |

Full brand logo set (not bundled here, available on Rama's side) includes black/white variants of:
`tetra-wordmark`, `photobooth-wordmark`, `tetra-lockup`, `tetra-lockup-pill`. Brand type DNA:
contrast serif **"tetra."** + wide-tracked geometric sans caps **"PHOTOBOOTH"**, monochrome.

## Client logos (trusted-by strip)

Live in `public/images/logos/`, lowercase-slug filenames (`pertamina.svg`, `mandiri.svg`, …).
Rendered by `components/TrustedBy.tsx`, styled by `.mq-logo` in `app/globals.css`.

**Flat-white rule (the "konsep sebelumnya"):** source artwork is used *as-is* — full-colour
SVG or PNG, official trademark. The colour is removed in CSS, never in the file:
`filter: brightness(0) invert(1)` collapses any logo to a flat white silhouette, then
`opacity: .55` gives the muted "putih agak abu" tone (→ `1` on hover). This keeps the whole
strip one cohesive monochrome wall regardless of each logo's native colours. So a new logo
only needs to be a clean, tightly-cropped vector/transparent-PNG — no recolouring required.

- **Order = biggest first.** National / SOE / global names lead (Pertamina → Mandiri →
  Pelindo → Danantara → SeaBank → Indocement → BAZNAS …), smaller venues/partners trail.
- **`tall: true`** in the `CLIENTS` array = emblem-over-wordmark lockups (e.g. the BAZNAS
  Garuda crest) that need extra height so stacked text stays legible.
- **Fallback:** a client with no `logo` renders as a flat-white wordmark (same muted tone),
  so the strip stays complete and each official file drops straight in when supplied.

**Badge-style marks don't flatten well.** A logo that's a filled circular/shield badge
(e.g. Indocement's Tiga Roda) collapses to a featureless white disc under `brightness(0)`,
because the filter erases the internal colour boundaries. Prefer a horizontal / wordmark-only
vector for these; otherwise leave them as the text fallback.

Bundled (verified official): `pertamina` `mandiri` `pelindo` `danantara` `seabank` `baznas`.
Text fallback for now (awaiting clean horizontal/wordmark artwork): Indocement, United Tractors,
JW Marriott, Kemenag DKI, Ancol, Implora.

## Fonts (Google Fonts → use `next/font`)
- **Marcellus** — weight 400 (display/headlines; italic emphasis treatment).
- **Outfit** — weights 200, 300, 400, 500 (body/UI).

## Motion libraries (prototype used cdnjs; in Next.js use npm)
- GSAP `3.12.5` + ScrollTrigger
- Lenis `1.1.13` (smooth scroll, lerp ≈ 0.055)

## External assets NOT used
- 360 video files exist for the business but are **not** used on the site (360 booth is a bonus
  mention only). No background video — the hero "fluid" is pure CSS.

## Color refs used in widgets (beyond core tokens)
- Why "frame cycle" categories: Wedding `#9C7733`, Corporate `#5B7186`, Ulang Tahun `#C77BA0`,
  Wisuda `#6E9A6B`.
- Ribbon stroke (dark-visible) gradient toward `#D8BC7E`.
- bgword fill `rgba(226,200,140,.06)`; fluid blobs `#9C7733 / #C8A96A / #6E5526 / #E2C88C`.
