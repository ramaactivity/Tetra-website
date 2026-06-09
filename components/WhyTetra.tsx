// KENAPA TETRA — pinned card-deck (assistantly-style). On desktop the section
// pins: the left copy holds while the right column's cards deal in one by one
// from the bottom and stack like a deck; once all are in, scroll resumes. The
// stat strip lives in its own normal section AFTER the pin, so the two pinned
// sections (this + Format Cetak) are never directly adjacent (avoids pin-spacer
// overlap). Falls back to a static stack on mobile / no-JS / reduced-motion.
const REASONS = [
  {
    no: "01",
    tag: "Cepat",
    t: "Secepat kedipan",
    d: "Cetakan keluar ±12 detik. Tamu nggak ngantri walau acara rame.",
  },
  {
    no: "02",
    tag: "Awet",
    t: "Awet bertahun-tahun",
    d: "Lapisan pelindung bikin air & sidik jari nggak mempan, warna nggak luntur.",
  },
  {
    no: "03",
    tag: "Custom",
    t: "Didesain buat kamu",
    d: "Tiap acara, frame-nya kami gambar ulang, bukan template seragam.",
  },
  {
    no: "04",
    tag: "Studio",
    t: "Sekelas studio",
    d: "Tajam, gradasi mulus, nggak belang. Beda jauh sama printer rumahan.",
  },
];

export default function WhyTetra() {
  return (
    <>
      <section className="why" id="kualitas">
        <div className="wpin" id="wpin">
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
              <div className="b">500+</div>
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
