import { waLink, waMessage } from "@/lib/site";
import { PDF_URL, PDF_NAME } from "@/lib/pricelist";

const WA = waLink(
  waMessage(
    "Halo Tetra Photobooth!\n\nSaya dari website Tetra dan mau tanya & booking paket photobooth-nya.\nBoleh dibantu cek ketersediaan & rekomendasi paket buat acara saya?"
  )
);

// Mobile-only bottom action bar — the always-visible conversion path.
// Hidden on desktop via CSS (desktop relies on the hero + footer CTAs).
export default function StickyActions() {
  return (
    <div className="pl-sticky" role="group" aria-label="Aksi cepat">
      <a className="pl-sticky-btn ghost" href={PDF_URL} download={PDF_NAME}>
        Download PDF
      </a>
      <a
        className="pl-sticky-btn fill"
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
      >
        Booking via WA
      </a>
    </div>
  );
}
