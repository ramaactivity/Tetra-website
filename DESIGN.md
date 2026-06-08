# DESIGN — Tetra Photobooth

Dark-luxury skin (FINAL). Single source of truth for tokens is `app/globals.css` (`:root` + `@theme`), ported 1:1 from `reference/index.html`. Full spec in `docs/02_DESIGN_SYSTEM.md` and `docs/03_DESIGN_SPEC.md`.

## Color (locked)
Warm near-black surfaces; white prints pop against them.
- `--paper #15120E` page bg · `--paper2 #1E1912` raised surfaces · `--card #FFFFFF` print/paper
- `--ink #EFE7DA` primary text · `--ink2 #A99B87` muted text
- `--gold #C8A96A` primary accent (CTAs) · `--gold2 #E2C88C` lighter gold (gradients/highlights)
- `--line rgba(255,255,255,.12)` hairline borders
- Strategy: **Committed** dark + gold accent; tinted neutrals (never pure #000/#fff). Italic emphasis words render in solid gold (never gradient text).
- Widget accents: Wedding `#9C7733` · Corporate `#5B7186` · Ulang Tahun `#C77BA0` · Wisuda `#6E9A6B`. Ribbon stroke toward `#D8BC7E`.

## Typography (locked)
- Display/headlines: **Marcellus** (serif, 400). Emphasis = synthetic italic + gold (`.it`).
- Body/UI: **Outfit** (200/300/400/500). Loaded via `next/font` as `--disp` / `--sans`.
- Fluid scale via `clamp()`; light-on-dark gets extra line-height. Eyebrows: 11px uppercase, wide tracking, gold.

## Elevation & shape
- Print cards: white, ~4–6px radius (paper, not chips), shadow `--sh`. Pills/buttons fully round (100px).
- Frosted header (fixed, always visible): base `rgba(21,18,14,.45)` + blur 14; `.solid` after 40px = `rgba(21,18,14,.82)` + blur 18 + hairline + shadow.
- Safe-area: `section{scroll-margin-top:92px}`; hero top padding clears the header.

## Motion conventions
- Smooth scroll: **Lenis** (lerp .055), ScrollTrigger reads from it.
- Easing tokens (use these, never bounce/elastic):
  - `--ease-out-quart cubic-bezier(.25,1,.5,1)`
  - `--ease-out-quint cubic-bezier(.22,1,.36,1)`
  - `--ease-out-expo  cubic-bezier(.16,1,.3,1)` (signature; matches GSAP expo/power curves used in JS)
- Scrubbed scroll-tied tweens use linear (`none`); ambient loops ease-in-out.
- Word reveals rise from a clipped mask with descender-safe padding so g/y/italics never clip.
- Signature moment: loader wordmark → curtain wipe → hero staggered reveal.
- Progressive enhancement: with JS (`html.js`) elements start hidden and reveal; without JS or under `prefers-reduced-motion` (`html.reduced`) everything is shown and the loader is removed. Ambient/looping motion disabled under reduced motion.
- Interaction states (enhancement layer): subtle hover lift on buttons, gold `:focus-visible` ring for keyboard a11y, gallery hover (image scale + caption), nav underline grow.

## Components
Buttons (gold-fill primary / outline secondary), filter pills (active = gold fill), print cards (`.hg`/`.pcard`/`.cell`), badges, the scroll-drawn gold ribbon, custom cursor follower ("Lihat" over gallery).
