import Pic from "@/components/Pic";
// The animating print stage shared by the homepage Format section and the
// /galeri Format section. Markup + IDs are byte-identical to the previous inline
// versions so MotionRoot's formatStory() (which targets #o4r/#frame4/#fpin etc.)
// drives it unchanged on either page. Only the right-hand copy column differs
// between pages, so that stays in each page's own component.
export default function FormatStage() {
  return (
    <div className="fstage-wrap">
      <div className="fstage">
        {/* Act 1 — 4R (landscape ↔ portrait flip) */}
        <div className="fgroup" id="o4r">
          <div className="frame4wrap">
            <div className="oriBadge" id="oriBadge">
              Landscape
            </div>
            <div className="frame4" id="frame4">
              <Pic src="/images/g-corp1.jpg" alt="Cetak photobooth 4R landscape" id="img4l" loading="lazy" />
              <Pic src="/images/g-bday1.jpg" alt="Cetak photobooth 4R portrait" id="img4p" loading="lazy" />
              <span className="fsheen" aria-hidden />
            </div>
          </div>
        </div>

        {/* Act 2 — 2R (machine auto-cut into two strips) */}
        <div className="fgroup" id="o2r">
          <div className="pair">
            <div className="half left">
              <Pic src="/images/g-strip2.jpg" alt="Photo strip 2R hasil photobooth" loading="lazy" />
              <span className="fsheen" aria-hidden />
            </div>
            <div className="half right">
              <Pic src="/images/g-strip2.jpg" alt="" loading="lazy" />
              <span className="fsheen" aria-hidden />
            </div>
            <div className="seam" />
          </div>
        </div>

        {/* Act 3 — Polaroid (perforation tear) */}
        <div className="fgroup" id="opol">
          <div className="pair">
            <div className="half left">
              <Pic src="/images/g-wed1.jpg" alt="Cetak photobooth gaya polaroid" loading="lazy" />
              <span className="fsheen" aria-hidden />
            </div>
            <div className="half right">
              <Pic src="/images/g-wed1.jpg" alt="" loading="lazy" />
              <span className="fsheen" aria-hidden />
            </div>
            <div className="perf" />
          </div>
        </div>
      </div>
    </div>
  );
}
