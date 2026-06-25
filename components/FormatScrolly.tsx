// FORMAT CETAK — pinned 3-act scrollytelling (4R → 2R → Polaroid).
// Two-column layout: LEFT = the animating print stage (FormatStage, shared with
// /galeri), RIGHT = the copy that cycles with each act. The GSAP timeline
// (formatStory in MotionRoot) drives the stage groups + caption opacity.
import FormatStage from "./format/FormatStage";

export default function FormatScrolly() {
  return (
    <section className="fmt" id="format">
      <div className="fpin" id="fpin">
        <div className="wrap fgrid">
          {/* LEFT — the print stage (scaled up) */}
          <FormatStage />

          {/* RIGHT — copy + cycling captions */}
          <div className="fcopy">
            <div className="eyebrow">Format Cetak</div>
            <h2 className="fmt-title">
              Pilih bentuk <span className="it">kenanganmu</span>.
            </h2>

            <div className="fcaps">
              <div className="fcap" id="c4r">
                <div className="nm">4R</div>
                <div className="sz">
                  10 × 15 cm · <span id="ori4">orientasi landscape</span>
                </div>
                <div className="ds" id="ds4">
                  Cetak utama, lembar utuh. Yang ini <b>landscape</b> — pas buat
                  foto rame-rame.
                </div>
              </div>
              <div className="fcap" id="c2r">
                <div className="nm">2R</div>
                <div className="sz">5 × 15 cm · 3 foto</div>
                <div className="ds">
                  4R portrait yang dipotong otomatis oleh mesin jadi dua strip
                  ikonik.
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
        </div>
      </div>
    </section>
  );
}
