/* eslint-disable @next/next/no-img-element */
// KENAPA TETRA — pinned 2-column reveal (desktop): left copy holds while the
// right column swaps through the 4 "show-don't-tell" widgets one at a time as
// you scroll (mirrors the Format Cetak pin). Falls back to a static stack on
// mobile, no-JS, and prefers-reduced-motion. Widget internals unchanged; the
// cfrm frame-cycle still runs from MotionRoot.
export default function WhyTetra() {
  return (
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

          <div className="why-stage" id="wstage">
            {/* 1 — speed */}
            <div className="wd" data-rv>
              <div className="wd-stage">
                <div className="prn">
                  <span className="led" />
                  <div className="prn-out">
                    <img src="/images/g-bday1.jpg" alt="" />
                  </div>
                </div>
                <div className="speed-num">
                  ±12<span>dtk</span>
                </div>
              </div>
              <div className="wd-cap">
                <h4>Secepat kedipan</h4>
                <p>Cetakan keluar ±12 detik. Tamu nggak ngantri walau acara rame.</p>
              </div>
            </div>

            {/* 2 — durable */}
            <div className="wd" data-rv>
              <div className="wd-stage">
                <div className="dprint">
                  <img src="/images/g-wed1.jpg" alt="" />
                  <div className="gloss" />
                </div>
                <span className="drop d1" />
                <span className="drop d2" />
                <span className="drop d3" />
              </div>
              <div className="wd-cap">
                <h4>Awet bertahun-tahun</h4>
                <p>
                  Lapisan pelindung bikin air &amp; sidik jari nggak mempan. Warna
                  nggak luntur.
                </p>
              </div>
            </div>

            {/* 3 — custom frame */}
            <div className="wd" data-rv>
              <div className="wd-stage">
                <div className="cfrm" id="cfrm" style={{ borderColor: "#9C7733" }}>
                  <div className="ph">
                    <img src="/images/g-wed1.jpg" alt="" className="on" />
                    <img src="/images/g-corp1.jpg" alt="" />
                    <img src="/images/g-bday1.jpg" alt="" />
                    <img src="/images/g-grad2.jpg" alt="" />
                  </div>
                  <div className="lbl" id="cfrmLbl" style={{ color: "#9C7733" }}>
                    Wedding
                  </div>
                  <div className="sub">Frame custom</div>
                </div>
              </div>
              <div className="wd-cap">
                <h4>Didesain buat kamu</h4>
                <p>Tiap acara, frame-nya kami gambar ulang — bukan template seragam.</p>
              </div>
            </div>

            {/* 4 — quality */}
            <div className="wd" data-rv>
              <div className="wd-stage">
                <div className="qcmp">
                  <img className="bad" src="/images/g-corp1.jpg" alt="" />
                  <div className="bad-band" />
                  <div className="good-wrap">
                    <img src="/images/g-corp1.jpg" alt="" />
                  </div>
                  <span className="qtag b">Printer rumahan</span>
                  <span className="qtag g">Tetra</span>
                </div>
              </div>
              <div className="wd-cap">
                <h4>Sekelas studio</h4>
                <p>Tajam, gradasi mulus, nggak belang. Beda jauh sama printer rumahan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          Tiap acara dijaga <b>operator</b> plus <b>printer cadangan</b> yang siaga.
          Kalau satu unit rewel, momenmu tetap jalan tanpa jeda.
        </p>
      </div>
    </section>
  );
}
