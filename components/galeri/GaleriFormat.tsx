// FORMAT CETAK (galeri) — the homepage's pinned 3-act scrollytelling, adopted
// onto /galeri with RICHER copy. The print stage (FormatStage) is shared with
// the homepage so MotionRoot's `formatStory()` animates it automatically; only
// the section id and the right-hand copy differ.
import FormatStage from "@/components/format/FormatStage";

export default function GaleriFormat() {
  return (
    <section className="fmt" id="format-galeri">
      <div className="fpin" id="fpin">
        <div className="wrap fgrid">
          {/* LEFT — the print stage (scaled up) */}
          <FormatStage />

          {/* RIGHT — copy + cycling captions (richer than the homepage version) */}
          <div className="fcopy">
            <div className="eyebrow">Format Cetak</div>
            <h2 className="fmt-title">
              Pilih bentuk <span className="it">kenanganmu</span>.
            </h2>
            <p className="fmt-lead">
              Setiap ukuran punya karakter sendiri. Kenali bentuknya, lalu pilih yang paling
              pas untuk acaramu.
            </p>

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
                <ul className="fdetail">
                  <li>Bisa landscape atau portrait, menyesuaikan konsep acara</li>
                  <li>Muat banyak orang dalam satu bingkai penuh</li>
                  <li>Pilihan utama untuk cetakan &amp; pajangan</li>
                </ul>
                <div className="fnote">Tiap cetak termasuk QR untuk soft-file digital.</div>
              </div>

              <div className="fcap" id="c2r">
                <div className="nm">2R</div>
                <div className="sz">5 × 15 cm · 3 foto</div>
                <div className="ds">
                  4R portrait yang dipotong otomatis oleh mesin jadi dua strip ikonik.
                </div>
                <ul className="fdetail">
                  <li>Dapat 2 strip identik dari satu kali cetak</li>
                  <li>Satu dibawa pulang, satu dibagi ke teman</li>
                  <li>3 pose tersusun vertikal, gaya photobooth klasik</li>
                </ul>
                <span className="badge">★ Lagi tren · lebih hemat</span>
              </div>

              <div className="fcap" id="cpol">
                <div className="nm">Polaroid</div>
                <div className="sz">±7,5 × 10 cm · 1 foto</div>
                <div className="ds">
                  4R landscape dengan garis perforasi — tinggal sobek jadi dua.{" "}
                  <span className="it">Satu untukmu, satu untuk temanmu.</span>
                </div>
                <ul className="fdetail">
                  <li>Bingkai putih khas polaroid yang ikonik</li>
                  <li>Kesan vintage, manis buat dipajang &amp; ditempel</li>
                  <li>Frame bisa didesain sesuai tema acaramu</li>
                </ul>
                <span className="badge">★ Manis buat kenang-kenangan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
