// Central site config — contact + WhatsApp deep link.
// WA number can be overridden at build/runtime via NEXT_PUBLIC_WA_NUMBER.

export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "6285213526630"; // 0852-1352-6630 → international

export const WA_DEFAULT_MESSAGE =
  "Halo Tetra Photobooth, aku mau tanya paket & harga untuk acaraku.";

/** Build a WhatsApp chat deep link with a prefilled message. */
export function waLink(message: string = WA_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const INSTAGRAM_HANDLE = "@tetraphotobooth";
export const INSTAGRAM_URL = "https://instagram.com/tetraphotobooth";
export const EMAIL = "tetraphotobooth@gmail.com";
