// KENAPA TETRA — card-deck hold (assistantly-style). On desktop the section is
// tall and the inner panel uses CSS position:sticky to "hold" in view while the
// right column's cards deal in one by one from the bottom and stack like a deck;
// once the section scrolls past, it releases. The card animation is a scrubbed
// ScrollTrigger WITHOUT a GSAP pin. Each card carries a small looping CSS/SVG
// illustration (no photos) that matches its narrative. Falls back to a static
// stack on mobile / no-JS / reduced-motion.

// Pure-CSS/SVG illustration per reason (context-matched, looping).
function Illo({ kind }: { kind: string }) {
  if (kind === "speed") {
    // a print card ejecting from a printer, fast — conveys instant print
    return (
      <div className="ill ill-speed" aria-hidden>
        <div className="ip-printer">
          <span className="ip-led" />
        </div>
        <div className="ip-slot">
          <div className="ip-card">
            <span className="ip-ph" />
            <span className="ip-ln" />
            <span className="ip-ln short" />
          </div>
        </div>
        <div className="ip-num">
          ±10<span>dtk</span>
        </div>
      </div>
    );
  }
  if (kind === "qr") {
    // QR with a scan line sweeping + a share tick — conveys instant digital share
    return (
      <div className="ill ill-qr" aria-hidden>
        <div className="iq-code">
          <svg viewBox="0 0 100 100">
            <rect x="6" y="6" width="24" height="24" fill="none" stroke="#221c16" strokeWidth="5" />
            <rect x="15" y="15" width="6" height="6" fill="#221c16" />
            <rect x="70" y="6" width="24" height="24" fill="none" stroke="#221c16" strokeWidth="5" />
            <rect x="79" y="15" width="6" height="6" fill="#221c16" />
            <rect x="6" y="70" width="24" height="24" fill="none" stroke="#221c16" strokeWidth="5" />
            <rect x="15" y="79" width="6" height="6" fill="#221c16" />
            <g fill="#221c16">
              <rect x="40" y="10" width="6" height="6" />
              <rect x="52" y="10" width="6" height="6" />
              <rect x="40" y="22" width="6" height="6" />
              <rect x="10" y="40" width="6" height="6" />
              <rect x="22" y="40" width="6" height="6" />
              <rect x="40" y="40" width="6" height="6" />
              <rect x="52" y="46" width="6" height="6" />
              <rect x="64" y="40" width="6" height="6" />
              <rect x="76" y="46" width="6" height="6" />
              <rect x="88" y="40" width="6" height="6" />
              <rect x="46" y="58" width="6" height="6" />
              <rect x="70" y="64" width="6" height="6" />
              <rect x="40" y="76" width="6" height="6" />
              <rect x="52" y="82" width="6" height="6" />
              <rect x="64" y="76" width="6" height="6" />
              <rect x="82" y="76" width="6" height="6" />
              <rect x="40" y="88" width="6" height="6" />
            </g>
          </svg>
          <span className="iq-scan" />
        </div>
      </div>
    );
  }
  if (kind === "custom") {
    // a frame that draws itself, cycling event accent colors — conveys custom
    return (
      <div className="ill ill-custom" aria-hidden>
        <svg className="ic-frame" viewBox="0 0 140 96" preserveAspectRatio="none">
          <rect
            className="ic-rect"
            x="6"
            y="6"
            width="128"
            height="84"
            rx="8"
            fill="none"
            strokeWidth="3"
          />
        </svg>
        <span className="ic-corners" />
        <span className="ic-pen" />
      </div>
    );
  }
  if (kind === "props") {
    // playful props gently floating — conveys fun, fresh photo props
    return (
      <div className="ill ill-props" aria-hidden>
        <svg className="ipr ipr-glass" viewBox="0 0 72 26">
          <circle cx="16" cy="13" r="11" fill="none" stroke="#9c7733" strokeWidth="3" />
          <circle cx="56" cy="13" r="11" fill="none" stroke="#9c7733" strokeWidth="3" />
          <path d="M27 13h18" fill="none" stroke="#9c7733" strokeWidth="3" />
        </svg>
        <svg className="ipr ipr-star" viewBox="0 0 24 24">
          <path
            d="M12 2l2.6 6.3L21 9l-4.8 4.3L17.6 20 12 16.6 6.4 20l1.4-6.7L3 9l6.4-.7z"
            fill="none"
            stroke="#c8a96a"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <svg className="ipr ipr-bubble" viewBox="0 0 40 34">
          <path
            d="M6 4h28a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H18l-9 7 2-7H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
            fill="none"
            stroke="#9c7733"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  if (kind === "crew") {
    // a staff member with headset + a steady "on duty" pulse — conveys ready crew
    return (
      <div className="ill ill-crew" aria-hidden>
        <span className="icr-ring" />
        <svg className="icr" viewBox="0 0 64 64">
          <circle cx="32" cy="24" r="11" fill="none" stroke="#9c7733" strokeWidth="3" />
          <path d="M14 54c2-11 9-16 18-16s16 5 18 16" fill="none" stroke="#9c7733" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 26a12 12 0 0 1 24 0v6" fill="none" stroke="#c8a96a" strokeWidth="3" strokeLinecap="round" />
          <rect x="42" y="30" width="6" height="9" rx="3" fill="#c8a96a" />
        </svg>
      </div>
    );
  }
  // studio — a blurred frame snapping into sharp focus + reticle
  return (
    <div className="ill ill-studio" aria-hidden>
      <div className="is-shot">
        <span className="is-row r1" />
        <span className="is-row r2" />
        <span className="is-row r3" />
      </div>
      <span className="is-reticle" />
    </div>
  );
}

const REASONS = [
  {
    no: "01",
    tag: "Studio",
    t: "Sekelas studio",
    d: "Kamera & lighting profesional. Hasil tajam, terang, semua auto good-looking.",
    kind: "studio",
    chip: "Kualitas studio",
  },
  {
    no: "02",
    tag: "Cepat",
    t: "Cetak ±10 detik",
    d: "Printer DNP RX1HS kecepatan tinggi. Foto fisik langsung jadi, warna tahan lama.",
    kind: "speed",
    chip: "±10 detik / cetak",
  },
  {
    no: "03",
    tag: "Digital",
    t: "Langsung dibagikan",
    d: "Scan QR, foto digital masuk ke HP tamu. Siap posting saat itu juga.",
    kind: "qr",
    chip: "Instant share",
  },
  {
    no: "04",
    tag: "Custom",
    t: "Frame custom",
    d: "Bingkai didesain mengikuti tema acaramu, bukan template seragam.",
    kind: "custom",
    chip: "Custom desain",
  },
  {
    no: "05",
    tag: "Properti",
    t: "Properti kekinian",
    d: "Props seru yang selalu di-update, bikin pose makin hidup.",
    kind: "props",
    chip: "Props seru",
  },
  {
    no: "06",
    tag: "Kru",
    t: "Kru ramah & sigap",
    d: "Memandu tamu, menjaga antrean tertib, dan jaga mood acara dari awal sampai akhir.",
    kind: "crew",
    chip: "All-in service",
  },
];

export default function WhyTetra() {
  return (
    <section className="why" id="kualitas">
      <div className="wsticky" id="wsticky">
        <div className="wrap why2">
          <div className="why-copy">
            <div className="eyebrow" data-rv>
              Kenapa Tetra
            </div>
            <h2 className="why-title" data-rv>
              Bukan sekadar <span className="it">cetak foto</span>.
            </h2>
            <p className="lead why-lead" data-rv>
              Hasil sekelas studio, frame buatan sendiri, dan booth yang nggak
              pernah bikin tamu nunggu.
            </p>
            <div className="why-prog" data-rv aria-hidden>
              <span id="whyProgFill" />
            </div>
          </div>

          <div className="why-deck" id="wdeck">
            {REASONS.map((r) => (
              <article className="rcard" key={r.no}>
                <div className="rc-head">
                  <span className="rc-no">{r.no}</span>
                  <span className="rc-tag">{r.tag}</span>
                </div>
                <div className="rc-figure">
                  <Illo kind={r.kind} />
                  <span className="rc-chip">{r.chip}</span>
                </div>
                <h3 className="rc-title">{r.t}</h3>
                <p className="rc-desc">{r.d}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
