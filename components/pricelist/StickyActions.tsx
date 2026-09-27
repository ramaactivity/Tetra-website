import { PDF_URL, PDF_NAME } from "@/lib/pricelist";
import { WaButton } from "../Wa";

// Mobile-only bottom action bar — the always-visible conversion path.
// Hidden on desktop via CSS (desktop relies on the hero + footer CTAs).
export default function StickyActions() {
  return (
    <div className="pl-sticky" role="group" aria-label="Aksi cepat">
      <a className="pl-sticky-btn ghost" href={PDF_URL} download={PDF_NAME}>
        Download PDF
      </a>
      <WaButton label="Booking via WhatsApp" className="pl-sticky-btn fill" />
    </div>
  );
}
