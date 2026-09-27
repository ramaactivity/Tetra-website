// Central site config — contact + WhatsApp deep link.
// WA number can be overridden at build/runtime via NEXT_PUBLIC_WA_NUMBER.

export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "6285213526630"; // 0852-1352-6630 → international

// ---------------------------------------------------------------------------
// Pesan WhatsApp terisi.
//
// Pesan ini dibaca bot admin Tetra (~/tetra-wa-bot → parseWebsite). Label dan
// kalimat penanda "Saya dari website Tetra (halaman ...)" adalah KONTRAK:
// mengubahnya di sini mewajibkan parser bot ikut diubah.
//
// Dua aturan keras:
//  1. Tanpa emoji — emoji lewat deep link wa.me berubah jadi U+FFFD.
//  2. Tanpa & # + % — browser dalam aplikasi Instagram/TikTok men-decode ulang
//     link wa.me, sehingga `&` dibaca sebagai pemisah query dan pesan terpotong
//     di situ. Ini penyebab pesan buntung yang diterima bot selama Jun–Sep 2026.
// ---------------------------------------------------------------------------

export type WaDetail = {
  /** Halaman asal, mis. "Beranda", "Harga", "Wedding", "Area Bogor". */
  halaman: string;
  paket?: string;
  acara?: string;
  /** Sudah diformat, mis. "Sabtu, 28 November 2026". */
  tanggal?: string;
  /** Sudah diformat, mis. "18.00 - 21.00". */
  jam?: string;
  lokasi?: string;
  tamu?: string;
  nama?: string;
};

/** Buang karakter yang merusak deep link, ratakan jadi satu baris, potong 80. */
export function sanitize(value: string): string {
  return value
    .replace(/&/g, "dan")
    .replace(/\+/g, "plus")
    .replace(/[#%]/g, "")
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80)
    .trim();
}

// Urutan baris ikut kontrak bot.
const WA_LABELS: [keyof Omit<WaDetail, "halaman">, string][] = [
  ["acara", "Acara"],
  ["tanggal", "Tanggal"],
  ["jam", "Jam photobooth"],
  ["lokasi", "Lokasi"],
  ["tamu", "Jumlah tamu"],
  ["paket", "Paket"],
  ["nama", "Nama"],
];

/** Susun pesan WA. Baris tanpa isi tidak ditulis sama sekali. */
export function waMessage(detail: WaDetail): string {
  const halaman = sanitize(detail.halaman) || "Beranda";
  const pembuka =
    "Halo Tetra Photobooth!\n" +
    `Saya dari website Tetra (halaman ${halaman}) dan mau cek ketersediaan serta rekomendasi paket.`;

  const baris = WA_LABELS.map(([key, label]) => {
    const raw = detail[key];
    const value = raw ? sanitize(raw) : "";
    return value ? `${label}: ${value}` : "";
  }).filter(Boolean);

  return baris.length ? `${pembuka}\n\n${baris.join("\n")}` : pembuka;
}

/** Deep link WhatsApp dengan pesan terisi. */
export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Nama halaman untuk pesan WA, diturunkan dari pathname supaya tombol di
 * header/footer menyebut halaman yang sama dengan tombol utama di badan
 * halaman. Sengaja tidak mengimpor lib/events.ts atau lib/areas.ts — keduanya
 * besar dan akan ikut terbawa ke bundle klien.
 */
export function halamanDariPath(pathname: string): string {
  const path = pathname.replace(/\/+$/, "");
  if (!path || path === "/") return "Beranda";

  const judul = (slug: string) =>
    slug
      .split("-")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");

  const acara = path.match(/^\/photobooth\/([^/]+)/);
  if (acara) return judul(acara[1]);

  const area = path.match(/^\/sewa-photobooth\/([^/]+)/);
  if (area) return `Area ${judul(area[1])}`;

  const tetap: Record<string, string> = {
    "/harga-sewa-photobooth": "Harga",
    "/pricelist": "Pricelist",
    "/galeri": "Galeri",
  };
  return tetap[path] ?? judul(path.slice(1).replace(/\//g, "-"));
}

export const INSTAGRAM_HANDLE = "@tetraphotobooth";
export const INSTAGRAM_URL = "https://www.instagram.com/tetraphotobooth/";
export const TIKTOK_HANDLE = "@tetraphotobooth";
export const TIKTOK_URL = "https://www.tiktok.com/@tetraphotobooth";
export const EMAIL = "tetraphotobooth@gmail.com";

// Identitas usaha untuk halaman legal (/syarat-ketentuan, /kebijakan-refund,
// /privasi) dan verifikasi merchant payment gateway.
// Kontak publik (WA_NUMBER + EMAIL di atas) sengaja dibedakan dari kontak
// administratif di bawah: yang publik harus konsisten dengan Google Business
// Profile supaya NAP tidak pecah; yang administratif adalah yang terdaftar di
// payment gateway.
export const LEGAL = {
  business: "Tetra Photobooth",
  owner: "Muhamad Ramadan Saputra",
  nib: "1709260089791",
  kbli: "77291 — Penyewaan Peralatan dan Perlengkapan Acara",
  address:
    "Jl. Ciwaluya RT.02/RW.08, Kel. Tegallega, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16127",
  adminEmail: "ramadan@tetraphoto.com",
  adminPhone: "+62 896-1138-4767",
  /** Tanggal berlaku yang ditampilkan di halaman legal. */
  updated: "26 September 2026",
} as const;
