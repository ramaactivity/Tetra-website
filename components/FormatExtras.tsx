// Format extras — "Desain custom" card + animated "QR code" card.
// PHASE 1: QR scan-line + ✓ check loop are paused (globals.css override).
export default function FormatExtras() {
  return (
    <section className="fmt-extra">
      <div className="wrap">
        <div className="single">
          <div className="fx" data-rv>
            <div className="qrbox">
              <svg viewBox="0 0 100 100">
                <rect x="6" y="6" width="22" height="22" fill="none" stroke="#221C16" strokeWidth="5" />
                <rect x="14" y="14" width="6" height="6" fill="#221C16" />
                <rect x="72" y="6" width="22" height="22" fill="none" stroke="#221C16" strokeWidth="5" />
                <rect x="80" y="14" width="6" height="6" fill="#221C16" />
                <rect x="6" y="72" width="22" height="22" fill="none" stroke="#221C16" strokeWidth="5" />
                <rect x="14" y="80" width="6" height="6" fill="#221C16" />
                <g fill="#221C16">
                  <rect x="38" y="10" width="6" height="6" />
                  <rect x="50" y="10" width="6" height="6" />
                  <rect x="62" y="16" width="6" height="6" />
                  <rect x="38" y="22" width="6" height="6" />
                  <rect x="10" y="38" width="6" height="6" />
                  <rect x="22" y="38" width="6" height="6" />
                  <rect x="38" y="38" width="6" height="6" />
                  <rect x="50" y="44" width="6" height="6" />
                  <rect x="62" y="38" width="6" height="6" />
                  <rect x="74" y="44" width="6" height="6" />
                  <rect x="86" y="38" width="6" height="6" />
                  <rect x="44" y="56" width="6" height="6" />
                  <rect x="56" y="56" width="6" height="6" />
                  <rect x="68" y="62" width="6" height="6" />
                  <rect x="80" y="56" width="6" height="6" />
                  <rect x="38" y="74" width="6" height="6" />
                  <rect x="50" y="80" width="6" height="6" />
                  <rect x="62" y="74" width="6" height="6" />
                  <rect x="74" y="80" width="6" height="6" />
                  <rect x="86" y="74" width="6" height="6" />
                  <rect x="38" y="86" width="6" height="6" />
                </g>
              </svg>
              <div className="scan" />
              <div className="ok">✓</div>
            </div>
            <div>
              <div className="ic">QR code</div>
              <h4>Soft file langsung di tangan</h4>
              <p>
                Tiap cetakan punya QR code-nya sendiri. Tamu tinggal scan, versi
                digitalnya langsung siap dibagikan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
