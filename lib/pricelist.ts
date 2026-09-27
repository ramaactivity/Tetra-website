// Pricelist 2026 data — single source of truth for the /pricelist page.
// Prices/terms transcribed from the official 2026 PDF (reference only).
// Editing a price here updates the whole page; the JSX is a thin renderer.

/** Full-size original PDF — served from our own site (public/), not Drive.
 *  PDF_NAME is the friendly filename used for the browser download. */
export const PDF_URL = "/pricelist-tetra-photobooth-2026.pdf";
export const PDF_NAME = "Pricelist Tetra Photobooth 2026.pdf";

/** Indonesian Rupiah, dot-grouped, SSR-deterministic (no Intl locale dependency). */
/** Harga terendah sebuah paket. Tier "Extend" dikecualikan: itu tarif jam
 *  tambahan di hari-H, bukan harga paket, dan nilainya jauh di bawah tier
 *  terpendek — sempat membuat "mulai Rp 500.000" muncul di /harga & JSON-LD. */
export const fromPrice = (p: Pkg): number =>
  Math.min(...p.tiers.filter((t) => !/extend/i.test(t.label)).map((t) => t.price));

export const fmtIDR = (n: number): string =>
  "Rp " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

import {
  TRANSPORT_FREE,
  TRANSPORT_MAGAZINE_EXCLUDED,
  BACKDROP_INCLUDE_TEXT,
  SPIN_KAPASITAS,
  AREA_CLASSIC,
  LISTRIK_CLASSIC,
  MEJA_KURSI,
  LISTRIK_MAGAZINE,
  PELUNASAN,
  DP_MIN,
  CREW_SENTENCE,
  DURASI_PANJANG_NOTE,
} from "./facts";

export type Tier = { label: string; price: number };
export type TermBlock = { title: string; items: string[] };

export type Pkg = {
  id: string; // also the section anchor id
  name: string;
  tag: string; // short category label (eyebrow)
  blurb: string;
  tiers: Tier[];
  includes: string[];
  /** Collapsible extras: flow/alur, syarat & ketentuan, catatan, etc. */
  extras?: TermBlock[];
};

export const PACKAGES: Pkg[] = [
  {
    id: "unlimited",
    name: "Unlimited Photobooth",
    tag: "Photobooth Classic",
    blurb:
      "Cetak foto unlimited dalam format 2R photostrip, 4R, dan polaroid-style. Setiap momen singkat diabadikan jadi memori yang abadi.",
    tiers: [
      { label: "2 Jam Unlimited", price: 2000000 },
      { label: "3 Jam Unlimited", price: 2500000 },
      { label: "4 Jam Unlimited", price: 3000000 },
      { label: "5 Jam Unlimited", price: 3500000 },
      { label: "6 Jam Unlimited", price: 4000000 },
      { label: "8 Jam Unlimited", price: 5000000 },
      { label: "1 Jam OTS Extend", price: 500000 },
    ],
    includes: [
      "Cetak foto unlimited (2R photostrip, 4R, polaroid-style)",
      "Peralatan profesional (printer, kamera, lighting)",
      "Setup rapi & properti seru",
      "Crew profesional dan ramah",
      "Desain frame foto custom sesuai acara",
      "Akses softfile real-time via QR code",
      BACKDROP_INCLUDE_TEXT,
      "Flashdisk kayu berisi seluruh file dokumentasi",
      TRANSPORT_FREE,
    ],
    extras: [
      {
        title: "Catatan",
        items: [DURASI_PANJANG_NOTE],
      },
    ],
  },
  {
    id: "spin360",
    name: "360° Spin Video Booth",
    tag: "Video Booth",
    blurb:
      "Di tengah putaran 360°, setiap wajah punya cerita. Tawa, senyum, dan ekspresi direkam jadi memori yang tetap ada untuk dikenang.",
    tiers: [
      { label: "2 Jam Unlimited", price: 2500000 },
      { label: "3 Jam Unlimited", price: 3000000 },
      { label: "4 Jam Unlimited", price: 3500000 },
      { label: "5 Jam Unlimited", price: 4000000 },
      { label: "6 Jam Unlimited", price: 4500000 },
      { label: "8 Jam Unlimited", price: 5500000 },
      { label: "1 Jam On The Day Extend", price: 500000 },
    ],
    includes: [
      "Video 360° berkualitas tinggi menggunakan iPhone",
      `Platform spin 360 untuk ${SPIN_KAPASITAS}`,
      "Lighting profesional",
      "Template video custom sesuai acara",
      "Pilihan musik sesuai preferensi",
      "Properti seru pilihan",
      "Sharing real-time via Airdrop atau QR code",
      TRANSPORT_FREE,
    ],
  },
  {
    id: "magazine-plus",
    name: "Magazine Box + Photobooth Classic",
    tag: "Magazine Booth",
    blurb:
      "Magazine box booth menangkap setiap momen dengan gaya editorial yang sederhana namun elegan, lengkap dengan classic print photobooth.",
    tiers: [
      { label: "3 Jam Unlimited", price: 5500000 },
      { label: "5 Jam Unlimited", price: 6000000 },
      { label: "8 Jam Unlimited", price: 7000000 },
    ],
    includes: [
      "Magazine box booth",
      "Cetak foto unlimited (2R photostrip, 4R, polaroid-style)",
      "Peralatan profesional (printer, kamera, lighting)",
      "Setup rapi & properti seru",
      "Crew profesional dan ramah",
      "Desain frame foto custom sesuai acara",
      "Akses softfile real-time via QR code",
      BACKDROP_INCLUDE_TEXT,
      "Flashdisk kayu berisi seluruh file dokumentasi",
    ],
    extras: [
      {
        title: "Syarat & Ketentuan",
        items: [
          "Loading magazine booth dilakukan H-3 jam sebelum jam mulai photobooth",
          "Mohon disiapkan area minimal 4×5 meter",
          "Magazine booth hanya untuk indoor",
          "Magazine booth akan dibongkar setelah durasi photobooth selesai",
          `Sumber listrik terdekat wajib disediakan (${LISTRIK_MAGAZINE})`,
          "Klien menyiapkan 1 meja & 3 kursi untuk kebutuhan operasional",
          "Magazine booth tidak dapat dipindahkan setelah setup",
          "Dekorasi tambahan diperbolehkan selama tidak merusak struktur magazine; kerusakan akan dikenakan biaya penggantian",
          `${TRANSPORT_MAGAZINE_EXCLUDED}; penggantian sticker dan dekorasi tambahan juga tidak termasuk`,
        ],
      },
    ],
  },
  {
    id: "magazine-only",
    name: "Magazine Box Only",
    tag: "Magazine Booth",
    blurb:
      "Instalasi magazine box sebagai spot foto editorial yang clean dan stylish, tanpa crew standby, 8 jam unlimited.",
    tiers: [{ label: "8 Jam Unlimited", price: 2500000 }],
    includes: [
      "Instalasi magazine box",
      "Default sticker magazine",
      "Loading & dismantle sesuai ketentuan venue",
      "Tanpa crew standby",
    ],
    extras: [
      {
        title: "Tidak Termasuk",
        items: [
          TRANSPORT_MAGAZINE_EXCLUDED,
          "Biaya penggantian sticker",
          "Dekorasi tambahan",
        ],
      },
      {
        title: "Catatan Penting",
        items: [
          "Loading dilakukan H-1 malam atau hari H",
          "Magazine dibongkar maksimal pukul 23.00",
          "Klien wajib mengirimkan foto area pemasangan dan surat loading (jika diperlukan)",
          "Daya listrik ±100 watt",
          "Penggunaan indoor only",
          "Magazine tidak dapat dipindahkan setelah setup",
          "Dekorasi tambahan diperbolehkan selama tidak merusak struktur magazine (kerusakan akan dikenakan biaya penggantian)",
        ],
      },
      {
        title: "Ketentuan Sticker Custom",
        items: [
          "Judul utama magazine (headline) tidak dapat diganti (penggantian dikenakan biaya mulai Rp 350.000)",
          "Tulisan kecil seperti barcode, judul acara, dan tanggal dapat diganti",
          "Tulisan ukuran sedang (nama, maksimal satu kalimat singkat) dapat diganti",
          "Logo Tetra Photobooth tidak dapat diganti / dihilangkan",
        ],
      },
    ],
  },
  {
    id: "photostage",
    name: "Photo Stage Only",
    tag: "Photostage Service",
    blurb:
      "Tamu langsung berfoto di stage dan mengunduh file digital lewat QR code, tanpa antre panjang; acara tetap berjalan lancar.",
    tiers: [
      { label: "2 Jam Unlimited", price: 1500000 },
      { label: "3 Jam Unlimited", price: 2000000 },
    ],
    includes: [
      "Layout desain custom 4R 1–2 pose",
      "QR code A2 untuk unduh softfile",
      "Link akses softfile via Drive",
      "Lighting profesional",
      "Crew profesional & ramah untuk mengarahkan tamu",
      TRANSPORT_FREE,
    ],
    extras: [
      {
        title: "Flow / Alur",
        items: [
          "Tamu diarahkan oleh crew profesional untuk berpose di photostage",
          "Foto diambil menggunakan kamera profesional dengan pencahayaan optimal",
          "Setelah berfoto, tamu melihat preview & langsung mengunduh softfile melalui QR code di samping pelaminan",
          "Semua file tersimpan dalam link khusus untuk klien, dapat diakses kapan saja",
          "Alur ini memastikan pengalaman tamu nyaman tanpa antre panjang dan menjaga kelancaran acara",
        ],
      },
      {
        title: "Notes",
        items: [
          "Harap dikoordinasikan dengan vendor dokumentasi utama untuk sinkronisasi alur foto dan setup",
        ],
      },
    ],
  },
  {
    id: "photostage-plus",
    name: "Photo Stage + Photobooth Classic",
    tag: "Photostage Service",
    blurb:
      "Pengalaman photostage lengkap dengan pilihan cetak instan classic print photobooth, selain unduh softfile via QR code.",
    tiers: [
      { label: "2 Jam Unlimited", price: 4000000 },
      { label: "3 Jam Unlimited", price: 4500000 },
    ],
    includes: [
      "Layout desain custom 4R 1–2 pose",
      "QR code A2 untuk unduh softfile",
      "Link akses softfile via Drive",
      "Lighting profesional",
      "Crew profesional & ramah untuk mengarahkan tamu",
      TRANSPORT_FREE,
    ],
    extras: [
      {
        title: "Flow / Alur",
        items: [
          "Tamu diarahkan oleh crew profesional untuk berpose di photostage",
          "Foto diambil menggunakan kamera profesional dengan pencahayaan optimal",
          "Setelah berfoto, tamu dapat memilih: unduh softfile via QR code, atau cetak instan dengan classic print photobooth",
          "Semua file tersimpan dalam link khusus untuk klien, dapat diakses kapan saja",
          "Alur ini memastikan pengalaman tamu nyaman tanpa antre panjang dan menjaga kelancaran acara",
        ],
      },
      {
        title: "Notes",
        items: [
          "Harap dikoordinasikan dengan vendor dokumentasi utama untuk sinkronisasi alur foto dan setup",
        ],
      },
    ],
  },
];

/** Standalone experience add-on (priced per piece, not by duration). */
export const KEYCHAIN = {
  name: "Keychain Photobooth Station",
  priceLabel: "10K / pcs",
  /** Booth keychain hanya dibuka mulai 100 pcs. */
  minNote: "Minimal 100 pcs",
  blurb:
    "Experience seru membuat gantungan kunci. Booth khusus keychain, frame akrilik variatif, pilihan gantungan & aksesoris, didukung crew ramah dan profesional.",
};

/** Real prints per package — the brand's hero asset (white prints glowing on
 *  the dark paper) instead of line-art. `main` is the framed print, `strip` a
 *  2R photostrip tucked behind it; `caption` is written on the print's bottom
 *  margin. Files live in /public/images (each has a -sm.jpg variant). */
export type PkgPrint = { main: string; strip: string; alt: string; caption: string };

export const PKG_PRINTS: Record<string, PkgPrint> = {
  unlimited: {
    main: "/images/g-wed1.jpg",
    strip: "/images/g-strip1.jpg",
    alt: "Cetak photobooth pernikahan",
    caption: "Cetak 4R · frame custom",
  },
  spin360: {
    main: "/images/g-bday1.jpg",
    strip: "/images/g-strip2.jpg",
    alt: "Keseruan 360° spin video booth",
    caption: "Momen 360° spin",
  },
  "magazine-plus": {
    main: "/images/g-wed2.jpg",
    strip: "/images/g-strip3.jpg",
    alt: "Magazine box booth pernikahan",
    caption: "Magazine box booth",
  },
  "magazine-only": {
    main: "/images/g-corp2.jpg",
    strip: "/images/g-strip1.jpg",
    alt: "Instalasi magazine box editorial",
    caption: "Instalasi magazine box",
  },
  photostage: {
    main: "/images/g-grad1.jpg",
    strip: "/images/g-strip2.jpg",
    alt: "Photo stage di acara wisuda",
    caption: "Photo stage · 4R layout",
  },
  "photostage-plus": {
    main: "/images/g-grad2.jpg",
    strip: "/images/g-strip3.jpg",
    alt: "Photo stage dengan cetak instan",
    caption: "Stage + cetak instan",
  },
};

export type Layout = {
  name: string;
  size: string;
  poses: string;
  note?: string;
  /** Example photo + shape class for the layout thumbnail. */
  img: string;
  shape: "stripe" | "fourr" | "polaroid";
};

export const LAYOUTS: Layout[] = [
  {
    name: "Stripe / 2R",
    size: "1200 × 3600 px",
    poses: "2–4 pose",
    note: "Landscape & portrait, kolom foto bisa dikustom",
    img: "/images/g-strip1.jpg",
    shape: "stripe",
  },
  {
    name: "4R",
    size: "2400 × 3600 px",
    poses: "2–4 pose",
    note: "Landscape & portrait, kolom bisa dikustom",
    img: "/images/g-corp2.jpg",
    shape: "fourr",
  },
  {
    name: "Polaroid",
    size: "2400 × 1800 px",
    poses: "1–2 pose",
    note: "Landscape & portrait",
    img: "/images/g-grad1.jpg",
    shape: "polaroid",
  },
];

export const ADDITIONAL: Tier[] = [
  { label: "Voucher photobooth 100 pcs", price: 25000 },
  { label: "Guest book photo 25 lembar", price: 200000 },
  { label: "Photomagnet 50 cetak", price: 650000 },
  { label: "Break time / 1 jam", price: 150000 },
  { label: "Album photostripe 20 halaman", price: 100000 },
  { label: "Custom sleeve 1000 lembar", price: 1500000 },
];

export type Backdrop = { name: string; css: string; dark?: boolean };

export const BACKDROPS: Backdrop[] = [
  { name: "Merah", css: "linear-gradient(150deg, #7a1320, #b22234 55%, #5e0f1a)" },
  { name: "Gold", css: "linear-gradient(150deg, #b88a3e, #e9cd8e 50%, #9c7634)" },
  { name: "Putih", css: "linear-gradient(150deg, #f4efe6, #ffffff 55%, #e6ddcd)", dark: true },
  { name: "Silver", css: "linear-gradient(150deg, #9aa0a6, #e3e6ea 50%, #888d93)", dark: true },
  { name: "Hijau Emerald", css: "linear-gradient(150deg, #0b5744, #17886a 52%, #08402f)" },
];

export const BOOKING_TERMS: string[] = [
  `Minimal booking DP sebesar ${DP_MIN}`,
  "Melakukan DP sama dengan keep tanggal",
  PELUNASAN,
  "Pembayaran hanya ke rekening BCA 0954965224 (Muhamad Ramadan Saputra)",
  "Untuk pembayaran melalui wedding / event organizer harap konfirmasi terlebih dahulu maksimal H-7 sebelum pembayaran",
  "Reschedule dapat dilakukan maksimal H-30 sebelum acara dan jika tanggal masih kosong",
  "DP yang sudah masuk tidak dapat diambil kembali",
];

export const TECH_TERMS: TermBlock[] = [
  {
    title: "Area & Perlengkapan",
    items: [
      `Sediakan area minimal ${AREA_CLASSIC}, ${MEJA_KURSI}, serta sumber listrik ${LISTRIK_CLASSIC} di dekat area photobooth.`,
    ],
  },
  {
    title: "Kedatangan & Waktu Operasional",
    items: [
      `${CREW_SENTENCE}, dan layanan selesai tepat waktu sesuai durasi booking.`,
    ],
  },
  {
    title: "Khusus Acara Pernikahan",
    items: ["Terdapat 15 menit sesi khusus pengantin."],
  },
  {
    title: "Ketentuan Lokasi Outdoor",
    items: [
      "Area photobooth tidak boleh terkena sinar matahari langsung.",
      "Client wajib menyediakan tenda atau payung, serta lokasi alternatif jika hujan.",
    ],
  },
  {
    title: "Larangan Pemindahan Peralatan",
    items: [
      "Setelah peralatan terpasang, tidak diperkenankan dipindahkan. Jika darurat, durasi layanan tetap mengikuti waktu booking dan tidak dapat dijeda atau diperpanjang.",
    ],
  },
  {
    title: "Force Majeure",
    items: [
      "Mati listrik, daya listrik tidak mencukupi, hujan, atau gangguan lain di luar kendali kami bukan tanggung jawab pihak photobooth.",
    ],
  },
  {
    title: "Break Time, Perubahan & Tambahan Waktu",
    items: [
      "Perubahan, penambahan waktu, dan break time pada hari H wajib diinformasikan terlebih dahulu.",
    ],
  },
  {
    title: "Kontak Penanggung Jawab",
    items: [
      "Client wajib memberikan nomor kontak PIC / panitia / WO yang bertanggung jawab saat acara.",
    ],
  },
];

/** Quick-nav chips → in-page section anchors. */
export const PRICE_NAV: { id: string; label: string }[] = [
  { id: "unlimited", label: "Unlimited" },
  { id: "spin360", label: "360° Spin" },
  { id: "magazine-plus", label: "Magazine" },
  { id: "photostage", label: "Photo Stage" },
  { id: "tambahan", label: "Tambahan" },
  { id: "pilihan", label: "Format" },
  { id: "ketentuan", label: "Ketentuan" },
];
