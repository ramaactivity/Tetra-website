/* eslint-disable @next/next/no-img-element */
// FORMAT CETAK — pinned 3-act scrollytelling (4R → 2R → Polaroid) in the reference.
// PHASE 1: rendered statically. Only the 4R (Act 1) group + caption are visible
// (via globals.css override); the 2R seam + Polaroid perforation markup is present
// but hidden, ready for the pinned GSAP timeline in Phase 2.
export default function FormatScrolly() {
  return (
    <section className="fmt" id="format">
      <div className="fpin" id="fpin">
        <div className="eyebrow">Format Cetak</div>
        <h2 className="fmt-title">
          Pilih bentuk <span className="it">kenanganmu</span>.
        </h2>

        <div className="fstage">
          {/* Act 1 — 4R (landscape ↔ portrait flip) */}
          <div className="fgroup" id="o4r">
            <div className="frame4wrap">
              <div className="oriBadge" id="oriBadge">
                Landscape
              </div>
              <div className="frame4" id="frame4">
                <img id="img4l" src="/images/g-corp1.jpg" alt="" />
                <img id="img4p" src="/images/g-bday1.jpg" alt="" />
                <span className="fsheen" aria-hidden />
              </div>
            </div>
          </div>

          {/* Act 2 — 2R (machine auto-cut into two strips) */}
          <div className="fgroup" id="o2r">
            <div className="pair">
              <div className="half left">
                <img src="/images/g-strip2.jpg" alt="" />
                <span className="fsheen" aria-hidden />
              </div>
              <div className="half right">
                <img src="/images/g-strip2.jpg" alt="" />
                <span className="fsheen" aria-hidden />
              </div>
              <div className="seam" />
            </div>
          </div>

          {/* Act 3 — Polaroid (perforation tear) */}
          <div className="fgroup" id="opol">
            <div className="pair">
              <div className="half left">
                <img src="/images/g-wed1.jpg" alt="" />
                <span className="fsheen" aria-hidden />
              </div>
              <div className="half right">
                <img src="/images/g-wed1.jpg" alt="" />
                <span className="fsheen" aria-hidden />
              </div>
              <div className="perf" />
            </div>
          </div>
        </div>

        <div className="fcaps">
          <div className="fcap" id="c4r">
            <div className="nm">4R</div>
            <div className="sz">
              10 × 15 cm · <span id="ori4">orientasi landscape</span>
            </div>
            <div className="ds" id="ds4">
              Cetak utama, lembar utuh. Yang ini <b>landscape</b> — pas buat foto
              rame-rame.
            </div>
          </div>
          <div className="fcap" id="c2r">
            <div className="nm">2R</div>
            <div className="sz">5 × 15 cm · 3 foto</div>
            <div className="ds">
              4R portrait yang dipotong otomatis oleh mesin jadi dua strip ikonik.
            </div>
            <span className="badge">★ Lagi tren · lebih hemat</span>
          </div>
          <div className="fcap" id="cpol">
            <div className="nm">Polaroid</div>
            <div className="sz">±7,5 × 10 cm · 1 foto</div>
            <div className="ds">
              4R landscape dengan garis perforasi — tinggal sobek jadi dua.{" "}
              <span className="it">Satu untukmu, satu untuk temanmu.</span>
            </div>
            <span className="badge">★ Lagi tren · lebih hemat</span>
          </div>
        </div>
      </div>
    </section>
  );
}
