# 03 — DESIGN SPEC (section-by-section layout + motion)

`reference/index.html` is authoritative. This is the readable map of it. Order = scroll order.
All copy is in `05_CONTENT.md` (use verbatim).

Libraries: GSAP 3.12.5 + ScrollTrigger, Lenis 1.1.13 (from cdnjs in the prototype; in Next.js
import the npm packages — see Tech spec). Global smooth scroll via Lenis; ScrollTrigger updated
from Lenis' scroll.

---

## 0. Loader
Brand intro overlay on load: shows the white Tetra wordmark (`word-white.png`), then reveals the
page. A counter "01 / 10"-style flourish appears in the prototype. Fades out → hero.

## 1. Header / Nav (fixed, frosted)
- Layout: logo left; center/right nav links **Galeri · Format · Cara Kerja**; gold **"Chat Admin"**
  pill far right.
- Frosted from the top; gains `.solid` style after 40px scroll (see Design System → Frosted header).
- Links use `data-scroll="#id"` → smooth-scroll via Lenis to the section (which has
  `scroll-margin-top:92px`).

## 2. HERO  `#top`
**Left column (copy):**
- Eyebrow: `Photobooth Premium · Jabodetabek & se-Indonesia`
- H1 (Marcellus, fluid `clamp(32px,3.9vw,54px)`): `Sesuatu untuk dipegang. Sesuatu untuk dikenang.`
  — the words **dipegang** and **dikenang** are italic + gold.
- Sub (Outfit, `--ink2`): `Cetakan berkualitas studio yang dibawa pulang tamu — dengan frame yang
  kami desain khusus untuk setiap acaramu.`
- CTAs: **Tanya Paket & Harga** (gold fill) + **Lihat Galeri** (outline).
- Trust row: `★★★★★  Dipercaya 500+ acara · Wedding · Corporate · Ulang Tahun · Wisuda`.
- Hero padding `122px 0 84px` (safe-area). Columns top-aligned.

**Right column (curated overlapping print stack — "messy but aesthetic"):**
Container `.hero-media` is `position:relative; width:100%; aspect-ratio:64/52`. Five prints are
absolutely positioned, each a white card (`background:#fff; padding:5px; border-radius:4px;`
shadow `0 30px 54px -22px rgba(0,0,0,.72),0 10px 22px -12px rgba(0,0,0,.5)`), rotated, overlapping
only at corners (never covering faces). Positions (center-based, `transform: translate(-50%,-50%)
rotate()`), back-to-front via z-index:

| class   | image          | left  | top    | width  | rotate | z |
|---------|----------------|-------|--------|--------|--------|---|
| `.s-mia`| g-bday1.jpg    | 26.6% | 42%    | 35.2%  | +5°    | 1 |
| `.s-awd`| g-corp1.jpg    | 65.6% | 71.4%  | 46.9%  | −4°    | 2 |
| `.s-ner`| g-strip2.jpg   | 85.2% | 36.6%  | 18.75% | +7°    | 3 |
| `.s-imp`| g-strip3.jpg   | 68.75%| 38.4%  | 21.9%  | −5°    | 4 |
| `.s-pol`| g-wed1.jpg     | 41.4% | 43.75% | 39.1%  | −3°    | 5 |

(Polaroid `g-wed1` is the focal piece on top.) Widths are % of `.hero-media`; height auto.

**Hero background (hero-only; plain dark below):**
- **Fluid gradient ("breathing like water"):** layer `.hero-fluid` (`position:absolute; inset:0;
  z-index:0`) holding 4 large blurred radial blobs `b.bl1..bl4` (gold/amber tones: `#9C7733`,
  `#C8A96A`, `#6E5526`, `#E2C88C`), `filter:blur(90px)`, `mix-blend-mode:screen`. Each animates
  translate + scale + **opacity pulse** (breathing) on its own loop, ~13–21s, ease-in-out.
  Disable under `prefers-reduced-motion`. (This replaced an earlier "background video" idea —
  it's pure CSS, no media file.)
- **Parallax background word:** `#bgword` = giant faint italic serif word **"kenangan."**
  (`color:rgba(226,200,140,.06)`, `clamp(150px,25vw,420px)`) sitting behind the stack
  (`z-index:1`). Hidden on mobile.
- Stacking: `.hero-fluid` z0 → `#bgword` z1 → `.hero .wrap` (content) z2.

**Hero motion (scrubbed to scroll over the hero):**
- `#bgword` shifts horizontally: `xPercent: -26` (linear, scrub).
- `#heroMedia` (the whole stack) gently rotates + parallaxes: `rotation: -1.5 → 3`,
  `yPercent: 0 → -6` (linear, scrub). This is the tasteful echo of the "object rotates on scroll"
  reference — the entire pile tilts as one.
- Entrance: eyebrow/H1 word-reveal up from masks; sub/CTA/trust fade-up (opacity 0→1, translateY 18→0).

**Scroll cue:** bottom-left `— SCROLL` with an animated growing line. Kept clear of the trust row
by the hero bottom padding.

## 3. MANIFESTO
Centered large Marcellus statement; words reveal up on scroll (same clipped-mask technique with
descender-safe padding). Copy:
`Setiap acara punya cerita. Tugas kami sederhana: memberi tamu sesuatu untuk dipegang, dan kamu
sesuatu untuk dikenang.` (emphasis words italic/gold).

## 4. TRUSTED-BY
Label `Pernah dipercaya oleh`, then a centered wrapping row of names (Marcellus, low opacity,
brightens on hover): **SeaBank · Pertamina · Indocement · Danantara · Kemenag DKI · Implora**.

## 5. FORMAT CETAK  `#format`  (PINNED scrollytelling)
A pinned section (`#fpin`, ScrollTrigger `pin`, `end:'+=3400'`) that tells the print story in 3 acts,
with **3D flip handoffs** between acts (outgoing group `rotateY 90 + scale .82 + fade`, incoming
flips in from `rotateY -90`):

- **Act 1 — 4R:** a true orientation flip between two REAL files (no crop): landscape
  `g-corp1` (1200×800) ↔ portrait `g-bday1` (666×1000). Two stacked imgs crossfade while the frame
  dims swap 300×200 ↔ 200×300, driven by a proxy `flip.a` value. A dynamic badge shows
  "Landscape"/"Portrait"; caption updates: *"Yang ini landscape — pas buat foto rame-rame."* ↔
  *"…diputar jadi portrait — pas buat potret formal & elegan."* Spec line: `4R · 10×15 cm` ·
  "Cetak utama, lembar utuh."
- **Act 2 — 2R:** a center seam `scaleY` draws, then the two halves split apart (machine auto-cut).
  `2R · 5×15 cm · 3 foto`, "4R portrait yang dipotong otomatis oleh mesin jadi dua strip ikonik."
  Badge: `★ Lagi tren · lebih hemat`.
- **Act 3 — Polaroid:** a **perforation** dashed line draws, then halves **tear apart** by hand.
  `Polaroid · ±7,5×10 cm · 1 foto`, "4R landscape dengan garis perforasi — tinggal sobek jadi dua.
  Satu untukmu, satu untuk temanmu." Badge: `★ Lagi tren · lebih hemat`.

## 6. FORMAT EXTRAS  `.fmt-extra`
Two cards:
- **Desain custom** — "Frame sesuai acaramu… tiap frame kami desain ulang, bukan template seragam."
- **QR code** — "Soft file langsung di tangan…", with an **animated QR**: SVG QR + a CSS scan-line
  sweeping down + a looping "✓" checkmark.

## 7. GALERI KARYA  `#galeri`
- Eyebrow `Galeri Karya`; H2 `Sesuatu untuk dikenang.`; sub "Tiap cetakan adalah benda yang dibawa
  pulang — pilih jenis acaramu, lihat hasilnya."
- **Filter tabs:** `Semua · Wedding · Corporate · Ulang Tahun · Wisuda` (active = gold pill).
- **Grid:** justified flex grid of all prints; **min-height locked** so filtering doesn't change
  page height (prevents the ribbon from glitching). Click a print → **lightbox** viewer.
- Items (label format = `Title · Category · PrintType`), see `05_CONTENT.md` and `07_ASSETS.md`:
  Ami & Awal (Wedding·Polaroid), Indocement (Corporate·4R), Nerissa 14th (Ulang Tahun·2R),
  Marsya & Iwan (Wedding·Polaroid), SDIT Al-Hidayah (Wisuda·4R), Koempoel Jadoel (Reuni·2R),
  Implora Glam Activation (·2R), Mia's Sweet 17 (Ulang Tahun·4R), Kemenag DKI (Corporate·4R),
  MTs Umdatur (Wisuda·4R).

## 8. KENAPA TETRA  `#kualitas`
- Eyebrow `Kenapa Tetra`; H2 `Kenangan harus abadi.`; sub "Bukan sekadar foto — benda yang tahan
  dipegang bertahun-tahun."
- A **gold ribbon** curve draws across into this section on scroll.
- **4 animated "show-don't-tell" widgets** on a dark stage:
  1. **Secepat kedipan (±12 dtk):** a printer ejecting a mini photo on a loop.
  2. **Awet bertahun-tahun:** a print with water droplets falling & beading off + a gloss sweep.
  3. **Didesain buat kamu (frame custom):** a white card that cycles 4 event frames every ~1.9s —
     set: Wedding `#9C7733`, Corporate `#5B7186`, Ulang Tahun `#C77BA0`, Wisuda `#6E9A6B`;
     image order g-wed1 / g-corp1 / g-bday1 / g-grad2.
  4. **Sekelas studio (quality):** a clip-path wipe comparing "Printer rumahan" (blurred + banding)
     → "Tetra" (crisp), looping.
- **Stat strip** below: `500+ Acara · ±12 dtk Per cetak · Tahunan Tahan lama · +360° Video booth (bonus)`.
- NOTE: all technical jargon was intentionally removed — keep human benefits only.

## 9. CARA KERJA  `#cara`
- Eyebrow `Cara Kerja`; intro "Dari chat sampai cetakan di tangan."
- A vertical **gold line draws on scroll** down a 5-step timeline:
  1. **Chat Admin** — cerita acaramu (tanggal, tema, jumlah tamu).
  2. **Pilih paket & format** — 2R/4R/polaroid, atau tambah 360 video booth.
  3. **Frame didesain custom** — tim menggambar frame sesuai tema, lalu kamu approve.
  4. **Hari-H** — booth siap ±1 jam sebelum acara; tamu foto, cetak instan, bawa pulang.
  5. **Galeri digital** — semua hasil diakses & dibagikan lewat QR.

## 10. TESTIMONI  `.testi`
Heading `Kata Mereka` / "Yang dirasakan klien." + 2 quote cards (PLACEHOLDER — swap later):
- "Hasil cetaknya tajam banget dan nggak ngantri…" — Panitia Gathering · Corporate Event
- "Frame-nya didesain persis tema pernikahan kami…" — Ami & Awal · Wedding

## 11. FAQ  `.faq`
Heading `Pertanyaan` / "Yang sering ditanya." Accordion items (full copy in `05_CONTENT.md`):
Berapa harganya? (→ routes to Chat Admin) · Area jangkauannya? · Frame bisa custom? · Butuh apa
aja dari kami? · (and more). Each row expands/collapses with a height/opacity transition.

## 12. CTA  `#kontak`
A **fanned trio of prints** + headline "Punya tanggal acara? Kami bantu bikin kenangannya." +
sub "Cetakan yang dibawa pulang. Momen yang nggak hilang." + **Tanya Paket & Harga** (WhatsApp).

## 13. FOOTER
Tetra Photobooth · Bogor, Jawa Barat · Melayani se-Indonesia. Kontak: Chat Admin (WhatsApp),
`@tetraphotobooth`, `tetraphotobooth@gmail.com`. Jelajah: Galeri / Format / Cara Kerja.
`© 2026 Tetra Photobooth`.

## Global: RIBBON
A single flowing gold SVG path is anchored across sections and **draws on scroll**
(stroke-dashoffset), gradient stops toward `#D8BC7E` for visibility on the dark bg. It's the
connective visual thread; keep section heights stable (esp. gallery min-height) so it doesn't jump.

## Global: "Preview" toast
The prototype shows a small bottom-right toast: "Preview situs utuh — copy & testimoni masih
contoh." Remove (or gate behind a flag) for production.
