// KENAPA TETRA — card-deck hold (assistantly-style). On desktop the section is
// tall and the inner panel uses CSS position:sticky to "hold" in view while the
// right column's cards deal in one by one from the bottom and stack like a deck;
// once the section scrolls past, it releases. The card animation is a scrubbed
// ScrollTrigger WITHOUT a GSAP pin, so it never creates a pin-spacer that could
// collide with the pinned Format Cetak section. Each card carries a small
// looping illustration (no photos) that matches its narrative. Falls back to a
// static stack on mobile / no-JS / reduced-motion.

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
          ±12<span>dtk</span>
        </div>
      </div>
    );
  }
  if (kind === "awet") {
    // glossy print with droplets rolling off — conveys water-resistant
    return (
      <div className="ill ill-awet" aria-hidden>
        <div className="iw-card">
          <span className="iw-sheen" />
        </div>
        <span className="iw-drop a" />
        <span className="iw-drop b" />
        <span className="iw-drop c" />
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
    tag: "Cepat",
    t: "Secepat kedipan",
    d: "Tamu foto, langsung pegang cetakannya.",
    kind: "speed",
    chip: "±12 detik / cetak",
  },
  {
    no: "02",
    tag: "Awet",
    t: "Awet bertahun-tahun",
    d: "Tahan air, sidik jari, dan nggak luntur.",
    kind: "awet",
    chip: "Lapisan anti-air",
  },
  {
    no: "03",
    tag: "Custom",
    t: "Didesain buat kamu",
    d: "Frame digambar ulang tiap acara.",
    kind: "custom",
    chip: "Frame custom",
  },
  {
    no: "04",
    tag: "Studio",
    t: "Sekelas studio",
    d: "Tajam, gradasi mulus, nggak belang.",
    kind: "studio",
    chip: "Sekelas studio",
  },
];

export default function WhyTetra() {
  return (
    <>
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

      <section className="why-after">
        <div className="wrap">
          <div className="wstats">
            <div className="wstat" data-rv>
              <div className="b">Ratusan</div>
              <div className="l">Acara</div>
            </div>
            <div className="wstat" data-rv>
              <div className="b">±12 dtk</div>
              <div className="l">Per cetak</div>
            </div>
            <div className="wstat" data-rv>
              <div className="b">Tahunan</div>
              <div className="l">Tahan lama</div>
            </div>
            <div className="wstat" data-rv>
              <div className="b">+360°</div>
              <div className="l">Video booth (bonus)</div>
            </div>
          </div>

          <p className="wnote" data-rv>
            Tiap acara dijaga <b>operator</b> plus <b>printer cadangan</b> yang
            siaga. Kalau satu unit rewel, momenmu tetap jalan tanpa jeda.
          </p>
        </div>
      </section>
    </>
  );
}
