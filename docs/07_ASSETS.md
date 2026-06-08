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
