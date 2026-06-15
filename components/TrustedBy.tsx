// Trusted-by ticker. Clients are ordered "biggest first" — national/SOE & global
// names lead, smaller venues/partners trail — so the strongest trust signals land
// first as the strip scrolls in.
//
// Each logo image is forced to a flat off-white silhouette in CSS
// (`filter: brightness(0) invert(1)` + reduced opacity → "putih agak abu"), so any
// source artwork — full-colour SVG or PNG — reads as one cohesive monochrome wall
// and brightens to pure white on hover. See `.mq-logo` in app/globals.css and the
// Logo notes in docs/07_ASSETS.md.
//
// Entries with a `logo` render as an image; entries without one fall back to a
// flat-white wordmark so the strip stays complete today and each official logo
// drops straight in (just add the file + set `logo`) as Rama supplies them.
type Client = { name: string; logo?: string; tall?: boolean };

const CLIENTS: Client[] = [
  // — verified official logos, heaviest names first —
  { name: "Pertamina", logo: "/images/logos/pertamina.svg" },
  { name: "Bank Mandiri", logo: "/images/logos/mandiri.svg" },
  { name: "Pelindo", logo: "/images/logos/pelindo.png" },
  { name: "Danantara", logo: "/images/logos/danantara.svg" },
  { name: "SeaBank", logo: "/images/logos/seabank.svg" },
  { name: "BAZNAS", logo: "/images/logos/baznas.svg", tall: true },
  // — flat-white wordmark fallback —
  // Indocement's badge-style mark flattens to a featureless disc under the
  // monochrome filter, so it reads as a wordmark until a horizontal/wordmark-only
  // vector is supplied. The rest await official artwork.
  { name: "Indocement" },
  { name: "United Tractors" },
  { name: "JW Marriott" },
  { name: "Kemenag DKI" },
  { name: "Ancol" },
  { name: "Implora" },
];

function Item({ c }: { c: Client }) {
  if (c.logo) {
    return (
      <img
        className={c.tall ? "mq-logo tall" : "mq-logo"}
        src={c.logo}
        alt={c.name}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return <span>{c.name}</span>;
}

// Continuous ticker (TV news-style). The track holds two identical groups and
// scrolls -50%, so the loop is seamless.
function Group({ items, hidden = false }: { items: Client[]; hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((c) => (
        <Item key={c.name} c={c} />
      ))}
    </div>
  );
}

// Row B uses the reversed order so the two opposing lanes never show the same
// name side-by-side. The second lane is decorative (the first already names
// every client).
const CLIENTS_B = [...CLIENTS].reverse();

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
          <Group items={CLIENTS} />
          <Group items={CLIENTS} hidden />
        </div>
      </div>
      <div className="marquee rev" data-rv aria-hidden>
        <div className="marquee-track">
          <Group items={CLIENTS_B} />
          <Group items={CLIENTS_B} hidden />
        </div>
      </div>
    </section>
  );
}
