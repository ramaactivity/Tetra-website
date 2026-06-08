# 06 — IMPLEMENTATION PLAN (phased)

Build in phases. Finish a phase, show Rama a preview, then continue. Match `reference/index.html`.

## Phase 0 — Scaffold
- [ ] `create-next-app` (App Router, TS). Add Tailwind v4, `gsap`, `@gsap/react`, `lenis`.
- [ ] `next/font` for Marcellus (400) + Outfit (200;300;400;500).
- [ ] Port tokens to `globals.css` `@theme` + `:root` (see Tech spec). Set `body` bg/ink, dark skin.
- [ ] Copy `reference/images/*` → `public/images/`.
- [ ] Add `section{scroll-margin-top:92px}` and base layout container `.wrap`.
- [ ] Lenis provider wired to `ScrollTrigger.update()` (lerp 0.055). Verify smooth scroll works.

## Phase 1 — Static port (markup + styles, NO motion yet)
Goal: pixel-faithful static page so Rama can check layout + responsive before animation.
- [ ] Header (fixed, frosted base + `.solid` style — can be a simple scroll class now).
- [ ] Hero: copy column + the 5-card overlapping stack (exact positions/rotations from Design spec)
      + static fluid background (blobs visible, animation later) + `#bgword`.
- [ ] Manifesto, Trusted-by.
- [ ] Format section static (show 4R/2R/Polaroid states as static cards for now).
- [ ] Format extras, Gallery (grid + tabs, lightbox can be basic), Why (static widgets),
      Process (static timeline), Testimonials, FAQ (accordion works), CTA, Footer.
- [ ] Responsive pass: mobile stacks hero (copy then media), hide `#bgword` on mobile,
      nav collapses sensibly. Respect safe-area on all sections.
- [ ] CTA buttons → WhatsApp deep link (config the number).
- ▶️ **Checkpoint: preview to Rama.**

## Phase 2 — Motion
- [ ] Loader intro → reveal.
- [ ] Header `.solid` transition at 40px scroll.
- [ ] Hero: word-reveal (descender-safe masks), fade-ups, fluid blobs breathing,
      `#bgword` xPercent scrub, `#heroMedia` rotation(-1.5→3)+yPercent(-6) scrub.
- [ ] Global gold **Ribbon** drawing on scroll.
- [ ] **FORMAT pinned scrollytelling** (heaviest): 3 acts, 3D flip handoffs, 4R orientation flip
      with dynamic badge/caption, 2R seam split, Polaroid perforation tear. Tune `end:'+=3400'`.
- [ ] QR animation (scan line + check loop).
- [ ] Gallery filter transitions (keep min-height locked so ribbon doesn't jump) + lightbox polish.
- [ ] Why widgets (printer eject, water beading + gloss, frame cycle 1.9s, quality clip-path wipe)
      + stat strip count-ins.
- [ ] Process gold line draw.
- [ ] FAQ expand/collapse easing.
- [ ] `prefers-reduced-motion` guards.
- ▶️ **Checkpoint: preview to Rama.**

## Phase 3 — Polish & ship
- [ ] Cross-device/responsive QA (mobile, tablet, desktop, ultrawide). `ScrollTrigger.refresh()`
      after fonts/images load; verify pin behaves with Lenis.
- [ ] Performance: image sizing, lazy mount below-fold motion, no CLS, Lighthouse pass.
- [ ] SEO metadata + OG image, `lang="id"`.
- [ ] Remove the "Preview situs" toast.
- [ ] Deploy to Vercel; wire domain/DNS.
- ▶️ **Checkpoint: launch v1.**

## Phase 4 — Deferred (separate sessions)
- [ ] Hidden price-list page `/harga/[slug]` (noindex/nofollow, excluded from sitemap & nav).
- [ ] Sanity CMS for gallery (model `Print`); migrate gallery/hero/format imagery to CMS.
- [ ] Replace placeholder testimonials with real client quotes.

## Definition of done (v1)
Visually & motion-wise indistinguishable from `reference/index.html`, responsive, fast, all CTAs
go to WhatsApp, deployed on Vercel, deferred items cleanly stubbed/omitted.
