# 00 — START HERE (Opening Prompt for Claude Code / Antigravity)

> Copy everything inside the block below and paste it as your first message to Claude Code,
> with this whole `tetra-photobooth-handover/` folder open in the workspace.

---

```
Halo, kita lanjutin projek website Tetra Photobooth. Ini situs marketing single-page buat
bisnis photobooth gua (premium, Bogor, melayani Jabodetabek & se-Indonesia). Sebelumnya gua
udah bikin prototype HTML satu file yang DESAIN & ANIMASINYA UDAH FINAL dan gua approve.
Tugas lo sekarang: PORTING prototype itu jadi project Next.js produksi — 1:1, jangan ngarang
desain baru.

LANGKAH 0 — baca dulu, jangan langsung ngoding:
1. Baca semua dokumen di folder docs/ SESUAI URUTAN:
   docs/01_PRD.md → 02_DESIGN_SYSTEM.md → 03_DESIGN_SPEC.md → 04_TECH_SPEC.md
   → 05_CONTENT.md → 06_IMPLEMENTATION_PLAN.md → 07_ASSETS.md
2. Buka reference/index.html (atau index.standalone.html) — ini SUMBER KEBENARAN visual & gerak.
   Pelajari struktur, CSS variables, dan animasi GSAP/Lenis-nya. Hasil akhir Next.js harus
   keliatan & berasa SAMA PERSIS.

ATURAN MAIN:
- Stack: Next.js (App Router) + TypeScript + Tailwind v4 + GSAP + ScrollTrigger + Lenis,
  deploy Vercel. Detail di 04_TECH_SPEC.md. Free tier sebisa mungkin.
- JANGAN ganti palette, font, copy, atau komposisi. Skin DARK luxury itu final
  (jangan balik ke cream). Token & layout udah dikunci di docs.
- Copy bahasa Indonesia AMBIL VERBATIM dari 05_CONTENT.md (jangan diparafrase).
- Gambar pakai yang ada di reference/images/ (manifest di 07_ASSETS.md).
- Animasi: porting semua efek (loader, frosted header, hero stack + fluid bg + parallax kata
  "kenangan." + rotasi cluster pas scroll, ribbon emas, FORMAT pinned scrollytelling,
  galeri filter + lightbox, "Kenapa Tetra" 4 widget animasi, timeline Cara Kerja, FAQ accordion).
  Spec lengkap di 03_DESIGN_SPEC.md.
- Hormati SAFE-AREA header: header fixed/frosted selalu tampil; tiap section punya jarak aman
  (scroll-margin-top) biar nggak ketutup. Aturannya di 02_DESIGN_SYSTEM.md.
- JANGAN bangun dulu: halaman harga rahasia (/harga/[slug] + noindex) & Sanity CMS — itu
  fase nanti (tercatat di PRD & Tech spec). v1 = single-page marketing dulu.

CARA KERJA YANG GUA MAU:
- Ikutin 06_IMPLEMENTATION_PLAN.md fase demi fase. Selesaikan satu fase, kasih gua preview,
  baru lanjut.
- Mulai dari Fase 0 (scaffold) + Fase 1 (port markup + style statis, tanpa animasi dulu) biar
  gua bisa cek layout & responsive. Animasi nyusul di Fase 2.
- Kalau ada yang ambigu atau lo mau menyimpang dari reference, TANYA gua dulu — jangan asal
  improvisasi.

Sekarang: konfirmasi lo udah baca semua docs + reference, ringkas pemahaman lo tentang
proyek ini (1 paragraf), lalu kasih rencana Fase 0 + Fase 1 sebelum mulai ngoding.
```

---

## Notes for you (Rama), not for the agent

- The prompt deliberately makes the agent **read first, summarize, and plan** before coding —
  that's where vibecoding usually goes wrong (it guesses). Hold it to that.
- If the agent ever proposes "modernizing" the look or swapping fonts/colors — say no and point
  it back to `02_DESIGN_SYSTEM.md`. The design is locked.
- After Phase 1 lands, eyeball it against `reference/index.html` side by side before approving.
