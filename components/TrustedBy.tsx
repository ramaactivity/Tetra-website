"use client";

import { useEffect, useRef, useState } from "react";

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
// IMPORTANT: logo files MUST have a TRANSPARENT background. A white/dark backdrop
// gets flattened into a solid white rectangle by the monochrome filter. Vectors
// (SVG) or large transparent PNGs are downscaled to ~34px tall so resolution is
// never the issue; background + (for busy emblems) internal detail are.
//
// Entries with a `logo` render as an image; if that file is missing/fails to load
// the item falls back to a flat-white wordmark so the strip never breaks — drop a
// correctly-named transparent file into /public/images/logos and it appears.
type Client = { name: string; logo?: string; tall?: boolean; dark?: boolean };

const CLIENTS: Client[] = [
  // — verified official logos, heaviest names first —
  { name: "Pertamina", logo: "/images/logos/pertamina.svg" },
  { name: "Bank Mandiri", logo: "/images/logos/mandiri.svg" },
  { name: "Pelindo", logo: "/images/logos/pelindo.png" },
  { name: "Danantara", logo: "/images/logos/danantara.svg" },
  { name: "SeaBank", logo: "/images/logos/seabank.svg" },
  { name: "BAZNAS", logo: "/images/logos/baznas.svg", tall: true },
  { name: "Indocement", logo: "/images/logos/indocement.svg", tall: true },
  { name: "United Tractors", logo: "/images/logos/united-tractors.svg" },
  { name: "JW Marriott", logo: "/images/logos/jw-marriott.svg", tall: true },
  // NOTE: logo provided is "Kementerian Pendidikan Dasar & Menengah"
  // (Kemendikdasmen), which differs from the previous "Kemenag DKI" entry.
  { name: "Kemendikdasmen", logo: "/images/logos/kemendikdasmen.svg", tall: true },
  { name: "Ancol", logo: "/images/logos/ancol.svg" },
  { name: "Implora", logo: "/images/logos/implora.png" },
  // PAI's mark was white-on-dark; recoloured to near-black on transparent so it
  // sits on the same white tile as the rest (consistent wall).
  { name: "Prima Audio Indonesia", logo: "/images/logos/prima-audio.png", tall: true },
];

function Item({ c }: { c: Client }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // A 404 can fire its error event before React attaches onError during
  // hydration, leaving a broken-image icon. Re-check after mount: a
  // complete-but-zero-width image means the source failed → use the wordmark.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (c.logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        className={["mq-logo", c.tall && "tall", c.dark && "dark"].filter(Boolean).join(" ")}
        src={c.logo}
        alt={c.name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
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
      <div className="marquee">
        <div className="marquee-track">
          <Group items={CLIENTS} />
          <Group items={CLIENTS} hidden />
        </div>
      </div>
      <div className="marquee rev" aria-hidden>
        <div className="marquee-track">
          <Group items={CLIENTS_B} />
          <Group items={CLIENTS_B} hidden />
        </div>
      </div>
    </section>
  );
}
