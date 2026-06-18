// Central site config — contact + WhatsApp deep link.
// WA number can be overridden at build/runtime via NEXT_PUBLIC_WA_NUMBER.

export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "6285213526630"; // 0852-1352-6630 → international

// Pre-filled WhatsApp handoff. The intro varies by where the visitor tapped
// (paket / galeri / generic); the "Detail acara" form stays identical so the
// auto-reply bot always gets the same three fields back in the same shape.
const WA_FORM =
  "\n\nDetail acara:\n• Jenis acara   :\n• Tanggal acara :\n• Lokasi/venue  :\n\nTerima kasih, ditunggu infonya ya! 🙌";

/** Build the pre-filled chat body from a context-specific opening line. */
export function waMessage(
  intro: string = "Halo Tetra Photobooth! 👋\n\nSaya dari website Tetra dan tertarik sama paket photobooth-nya.\nBoleh dibantu cek ketersediaan & rekomendasi paket buat acara saya?"
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
