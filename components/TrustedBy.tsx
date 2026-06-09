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
function Group({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((n) => (
        <span key={n}>{n}</span>
      ))}
    </div>
  );
}

// Row B uses the reversed order so the two opposing lanes never show the same
// name side-by-side. The second lane is decorative (the first already names
// every client) and is shown only on mobile via CSS — desktop keeps one lane.
const NAMES_B = [...NAMES].reverse();

export default function TrustedBy() {
  return (
    <section className="trust-strip">
      <div className="wrap">
        <div className="lbl" data-rv>
          Dipercaya brand &amp; keluarga di ratusan acara
        </div>
      </div>
      <div className="marquee" data-rv>
        <div className="marquee-track">
          <Group items={NAMES} />
          <Group items={NAMES} hidden />
        </div>
      </div>
      <div className="marquee rev" data-rv aria-hidden>
        <div className="marquee-track">
          <Group items={NAMES_B} />
          <Group items={NAMES_B} hidden />
        </div>
      </div>
    </section>
  );
}
