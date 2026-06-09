import { waLink, waMessage } from "@/lib/site";
import { PDF_URL } from "@/lib/pricelist";

const WA = waLink(
  waMessage("Halo Mintet, saya mau tanya & booking dari pricelist Tetra Photobooth.")
);

// Mobile-only bottom action bar — the always-visible conversion path.
// Hidden on desktop via CSS (desktop relies on the hero + footer CTAs).
export default function StickyActions() {
  return (
    <div className="pl-sticky" role="group" aria-label="Aksi cepat">
      <a
        className="pl-sticky-btn ghost"
        href={PDF_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
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
