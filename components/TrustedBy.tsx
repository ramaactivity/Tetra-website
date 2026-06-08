const NAMES = [
  "SeaBank",
  "Pertamina",
  "Indocement",
  "Danantara",
  "Kemenag DKI",
  "Implora",
];

export default function TrustedBy() {
  return (
    <section className="trust-strip">
      <div className="wrap">
        <div className="lbl" data-rv>
          Pernah dipercaya oleh
        </div>
        <div className="names" data-rv>
          {NAMES.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
