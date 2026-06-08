/* eslint-disable @next/next/no-img-element */
// KENAPA TETRA — 4 "show-don't-tell" widgets + stat strip.
// PHASE 1: widgets rendered static (printer eject / water drops / gloss / quality
// wipe loops paused; frame-cycle stays on its first state "Wedding" since the JS
// interval only runs in Phase 2). Inline Wedding color matches the reference's
// resting state for widget 3.
export default function WhyTetra() {
  return (
    <section className="why" id="kualitas">
      <div className="wrap">
        <div className="whead">
          <div className="eyebrow" data-rv>
            Kenapa Tetra
          </div>
          <h2 className="sec-title" data-rv style={{ marginTop: 16 }}>
            Kenangan harus <span className="it">abadi</span>.
          </h2>
          <p className="lead" data-rv>
            Bukan sekadar foto — benda yang tahan dipegang bertahun-tahun.
          </p>
        </div>

        <div className="wgrid">
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
      </div>
    </section>
  );
}
