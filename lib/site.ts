// Central site config — contact + WhatsApp deep link.
// WA number can be overridden at build/runtime via NEXT_PUBLIC_WA_NUMBER.

export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "6285213526630"; // 0852-1352-6630 → international

// Pre-filled WhatsApp handoff. The intro varies by where the visitor tapped
// (paket / galeri / generic); the fill-in template stays identical so the admin
// (Mintet) always gets the same three fields back.
const WA_FORM =
  "\n\nBoleh info lebih lanjut untuk\nJenis acara:\nTanggal:\nLokasi:\n\nTerima kasih";

/** Build the pre-filled chat body from a context-specific opening line. */
export function waMessage(
  intro: string = "Halo Mintet, saya lihat info paket Tetra Photobooth di website."
): string {
  return intro + WA_FORM;
}

export const WA_DEFAULT_MESSAGE = waMessage();

/** Build a WhatsApp chat deep link with a prefilled message. */
export function waLink(message: string = WA_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const INSTAGRAM_HANDLE = "@tetraphotobooth";
export const INSTAGRAM_URL = "https://instagram.com/tetraphotobooth";
export const EMAIL = "tetraphotobooth@gmail.com";
