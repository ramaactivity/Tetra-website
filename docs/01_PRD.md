# 01 — PRD (Product Requirements)

## 1. Product

A single-page **marketing website** for **Tetra Photobooth**, a premium photobooth service
based in Bogor, serving Jabodetabek and all of Indonesia. Tetra Photobooth is part of the
"Tetra" family (alongside Tetra Visual = photo/video production, and Tetra Ops = internal ops).

The site's job: make the brand feel **premium and trustworthy**, show real work, explain the
print formats, and drive the visitor to **chat the admin on WhatsApp**.

## 2. The core product idea (positioning)

The HERO product is the **physical print** the guest takes home — studio-quality, with a
**custom-designed frame** per event, plus a **QR code** for the digital soft-file. The emotional
pitch: *"Sesuatu untuk dipegang. Sesuatu untuk dikenang."* (Something to hold. Something to
remember.) The 360 Video Booth exists only as a **bonus mention**, never the headline.

## 3. Audience

Event organizers / hosts evaluating a photobooth vendor for: **Wedding, Corporate, Ulang Tahun
(birthdays), Wisuda (graduations)**. They care about quality of the print, reliability (no
queue), customization, and coverage area.

## 4. Goals & success criteria

- Communicate "premium / berkelas" instantly (design quality is the differentiator).
- Showcase real client prints credibly (gallery + social proof).
- Educate on formats (4R / 2R / Polaroid) without jargon.
- Primary CTA conversion: **"Tanya Paket & Harga" → WhatsApp chat** (admin sends pricelist).
- Fast, smooth, mobile-friendly; no broken layouts.

## 5. Primary CTA & contact

- Every CTA funnels to **Chat Admin (WhatsApp)**. Price is intentionally **not shown on the page**
  — admin sends a tailored pricelist in chat. (FAQ "Berapa harganya?" routes to chat.)
- Contact: WhatsApp (Chat Admin), Instagram `@tetraphotobooth`, email `tetraphotobooth@gmail.com`.

## 6. Scope — IN (v1)

Single scrolling page with these sections (in order):
1. **Loader** (brand intro)
2. **Header / Nav** (fixed, frosted) — links: Galeri, Format, Cara Kerja + gold "Chat Admin" pill
3. **Hero** — headline + CTA + curated overlapping print stack + animated fluid background
4. **Manifesto** — one emotional statement
5. **Trusted-by** — client names (SeaBank, Pertamina, Indocement, Danantara, Kemenag DKI, Implora)
6. **Format Cetak** — pinned scrollytelling: 4R → 2R → Polaroid
7. **Format extras** — "Desain custom" card + animated "QR code" card
8. **Galeri Karya** — category filter (Semua/Wedding/Corporate/Ulang Tahun/Wisuda) + grid + lightbox
9. **Kenapa Tetra** — 4 animated "show-don't-tell" benefit widgets + stat strip
10. **Cara Kerja** — 5-step process timeline (gold line draws on scroll)
11. **Testimoni** — client quotes
12. **FAQ** — accordion (pricing Q → chat)
13. **CTA** — fanned print trio + WhatsApp
14. **Footer**

Plus a flowing gold **"ribbon" SVG** that ties sections together on scroll.

## 7. Scope — OUT (deferred, documented for later)

- **Hidden price-list page**: secret, unguessable URL `/harga/[slug]` with `noindex`. Admin shares
  the link privately. NOT built in v1; see Tech spec §"Future".
- **Sanity CMS** for the gallery (so non-devs can add prints). NOT built in v1. Until then the
  gallery is hard-coded from `reference/images/` + `05_CONTENT.md`.
- Real testimonials (currently 2 placeholders) — swap when provided.

## 8. Key domain facts (must be correct in copy/UI)

All formats derive from one **4R sheet** (10×15 cm), printed on a **DNP DS-RX1HS**:
- **4R** = the whole 10×15 cm sheet, landscape OR portrait, 2–4 photos (ideal 3). The "parent".
- **2R** = a **4R portrait** auto-cut by the machine into **two strips** (≈5×15 cm, 3 photos each).
- **Polaroid** = a **4R landscape** with a **perforation line** (dotted), torn **by hand** into two
  ("Satu untukmu, satu untuk temanmu.").
- Recommend **2R & Polaroid** (on-trend + cheaper). Every print has a **custom frame** + a **QR code**
  for the digital soft-file. **360 Video Booth = bonus only.**

Social proof line: **"Dipercaya 500+ acara."** Print speed: **±12 seconds**.

## 9. Brand promise (for tone)

Warm, intimate, premium Indonesian voice. The customer/guest is the spotlight. Avoid generic
"AI-slop" SaaS tone and avoid technical jargon (no "dye-sublimation / 300×600 DPI / model
numbers" in user-facing copy — translate to human benefits).
