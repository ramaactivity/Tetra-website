# 02 — DESIGN SYSTEM

The single source of truth for tokens is `reference/index.html` (the `:root` block + base styles).
This file documents it so the agent doesn't re-invent anything.

## Skin

**Dark luxury** (FINAL). Warm near-black backgrounds; full-color prints on white "cards" pop and
"glow" against the dark = the premium effect. Never revert to the earlier cream skin.

## Color tokens (CSS variables — copy exactly)

```css
:root{
  --paper:  #15120E;  /* page background — warm near-black */
  --paper2: #1E1912;  /* slightly raised surfaces */
  --card:   #FFFFFF;  /* print "card" / paper white */
  --ink:    #EFE7DA;  /* primary text — warm off-white */
  --ink2:   #A99B87;  /* muted text */
  --gold:   #C8A96A;  /* primary gold (CTAs, accents) */
  --gold2:  #E2C88C;  /* lighter gold (gradients, highlights) */
  --line:   rgba(255,255,255,.12);  /* hairline borders */
  --sh: 0 26px 52px -24px rgba(0,0,0,.72), 0 10px 22px -12px rgba(0,0,0,.5); /* card shadow */
  --disp: 'Marcellus', serif;       /* display / headlines */
  --sans: 'Outfit', sans-serif;     /* body / UI */
}
body{ background:var(--paper); color:var(--ink); }
```

For Tailwind v4: register these as theme tokens (e.g. `@theme { --color-paper:#15120E; ... }`)
so utilities like `bg-paper text-ink` map to them. Keep the raw `--sh`, `--disp`, `--sans` too.

## Typography

- **Display/Headlines:** Marcellus (serif). Italic variants are used for emphasis words
  (rendered with a slanted/italic gold treatment, e.g. *dipegang*, *dikenang*, *abadi*).
- **Body/UI:** Outfit (weights 200, 300, 400, 500).
- Load via `next/font/google` (preferred) — Marcellus (400) + Outfit (200;300;400;500).
- Headline scale is fluid via `clamp()`. Current hero H1: `clamp(32px, 3.9vw, 54px)`,
  line-height ~1.07, letter-spacing -0.015em. Section H2s are similar large serif.
- Eyebrows / labels: Outfit, ~11–12px, uppercase, letter-spacing 0.16–0.32em, color `--ink2`.
- Body: Outfit ~15–17.5px, line-height ~1.6–1.65, color `--ink2`.

## Spacing & layout

- Container: centered `.wrap`, max-width ~1200–1240px, side padding ~clamp on small screens.
- Section vertical rhythm: generous (multiples of ~6–19vh depending on section).
- **Radii:** cards/prints ~4–6px (prints feel like paper, not rounded chips); pills/buttons
  fully rounded (`border-radius:100px`).
- **Shadows:** use `--sh` for print cards. Stacked hero prints add a stronger layered shadow.

## ⭐ Safe-area rule (applies to ALL sections)

The **header is fixed and always visible** (frosted). Two rules keep content clear of it:

1. **Hero top clearance:** hero content starts well below the header — current hero padding is
   `122px` top / `84px` bottom. Header is ~74px tall (shrinks to ~56px when scrolled, class
   `.solid`). Net: ≥ ~48px breathing gap under the header; trust row lifted off the scroll cue.
2. **Anchor offset:** every `<section>` has `scroll-margin-top: 92px` so that clicking a nav
   link (Galeri/Format/Cara Kerja) stops the section **below** the header, never hidden under it.

When adding any new section, keep `scroll-margin-top` and don't let the first line collide with
the header on initial view.

## Frosted header

- `position:fixed; z-index:200`. Base (top of page): `background:rgba(21,18,14,.45)` +
  `backdrop-filter:blur(14px)`, transparent border, padding `22px 0`.
- After ~40px scroll, add class `.solid`: `background:rgba(21,18,14,.82)` + `blur(18px)` +
  `border-color:var(--line)` + soft shadow + padding shrinks to `13px 0`. Transition ~0.5s.
- Logo: `word-white.png`, height ~30px. Nav links uppercase 12px, 0.16em tracking, gold underline
  grows on hover. "Chat Admin" is a gold-filled pill.

## Components

- **Button / CTA (primary):** gold fill (`--gold`), dark text, pill radius, subtle hover lift.
- **Button (secondary):** outline (1px `--line` or gold), `--ink` text, transparent fill.
- **Pill / filter tab:** rounded, `--line` border; active state = gold fill.
- **Print card (`.hg` / `.pcard`):** white background, small white padding (paper border),
  `--sh` shadow, image `width:100%`. In the hero they're absolutely positioned + rotated to form
  a curated stack (see Design spec).
- **Badge:** small uppercase pill, dark translucent bg + blur + faint gold border (e.g.
  "Cetak Unlimited", "Lagi tren · lebih hemat").
- **Ribbon:** a single flowing gold SVG path drawn on scroll (stroke gradient toward `#D8BC7E`
  for visibility on dark) that visually links sections.

## Motion principles

- **Smooth scroll:** Lenis (lerp ≈ 0.055). All ScrollTrigger scrubs read from Lenis.
- **Easing:** ease-in-out for ambient loops; `none` (linear) for scrubbed scroll-tied tweens.
- **Word reveals:** headline/manifesto words animate up from a clipped mask. IMPORTANT: the mask
  wrappers add padding/negative-margin so **descenders (g, y) and italics are never clipped**
  (`overflow:hidden; padding:.05em .1em .22em; margin:-.05em -.1em -.22em`; inner `translateY(130%)`).
- **Respect `prefers-reduced-motion`:** ambient/looping animations should disable under it.
- Keep motion **tasteful and premium** — small rotations (≤ ~7°), gentle parallax, no gimmicks.

See `03_DESIGN_SPEC.md` for the exact, per-section motion choreography and numbers.
