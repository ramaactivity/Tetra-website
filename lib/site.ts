// Central site config — contact + WhatsApp deep link.
// WA number can be overridden at build/runtime via NEXT_PUBLIC_WA_NUMBER.

export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "6285213526630"; // 0852-1352-6630 → international

// Pre-filled WhatsApp handoff. The intro varies by where the visitor tapped
// (paket / galeri / generic); the "Detail acara" form stays identical so the
// auto-reply bot always gets the same three fields back in the same shape.
// NOTE: no emoji here — emoji passed through the wa.me deep link gets mangled
// into U+FFFD on handoff to the WhatsApp app. Bot replies (sent server-side)
// can still use emoji; this prefilled text must stay plain.
const WA_FORM =
  "\n\nDetail acara:\n• Jenis acara   :\n• Tanggal acara :\n• Lokasi/venue  :\n\nTerima kasih, ditunggu infonya ya!";

/** Build the pre-filled chat body from a context-specific opening line. */
export function waMessage(
  intro: string = "Halo Tetra Photobooth!\n\nSaya dari website Tetra dan tertarik sama paket photobooth-nya.\nBoleh dibantu cek ketersediaan & rekomendasi paket buat acara saya?"
): string {
  return intro + WA_FORM;
}

export const WA_DEFAULT_MESSAGE = waMessage();

/** Build a WhatsApp chat deep link with a prefilled message. */
export function waLink(message: string = WA_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
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
