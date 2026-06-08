const NAMES = [
  "SeaBank",
  "Pertamina",
  "Indocement",
  "Danantara",
  "Kemenag DKI",
  "Implora",
];

// Continuous ticker (TV news-style). The track holds two identical groups and
// scrolls -50%, so the loop is seamless. Real flat-white logos can later drop
// straight into each group in place of the text names.
function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {NAMES.map((n) => (
        <span key={n}>{n}</span>
      ))}
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section className="trust-strip">
      <div className="wrap">
        <div className="lbl" data-rv>
          Partner &amp; Klien Kami
        </div>
      </div>
      <div className="marquee" data-rv>
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
