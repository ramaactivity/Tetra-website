/* eslint-disable @next/next/no-img-element */
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
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-corp1-sm.jpg" />
                <img id="img4l" src="/images/g-corp1.jpg" alt="" loading="lazy" decoding="async" />
              </picture>
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-bday1-sm.jpg" />
                <img id="img4p" src="/images/g-bday1.jpg" alt="" loading="lazy" decoding="async" />
              </picture>
              <span className="fsheen" aria-hidden />
            </div>
          </div>
        </div>

        {/* Act 2 — 2R (machine auto-cut into two strips) */}
        <div className="fgroup" id="o2r">
          <div className="pair">
            <div className="half left">
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-strip2-sm.jpg" />
                <img src="/images/g-strip2.jpg" alt="" loading="lazy" decoding="async" />
              </picture>
              <span className="fsheen" aria-hidden />
            </div>
            <div className="half right">
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-strip2-sm.jpg" />
                <img src="/images/g-strip2.jpg" alt="" loading="lazy" decoding="async" />
              </picture>
              <span className="fsheen" aria-hidden />
            </div>
            <div className="seam" />
          </div>
        </div>

        {/* Act 3 — Polaroid (perforation tear) */}
        <div className="fgroup" id="opol">
          <div className="pair">
            <div className="half left">
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-wed1-sm.jpg" />
                <img src="/images/g-wed1.jpg" alt="" loading="lazy" decoding="async" />
              </picture>
              <span className="fsheen" aria-hidden />
            </div>
            <div className="half right">
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-wed1-sm.jpg" />
                <img src="/images/g-wed1.jpg" alt="" loading="lazy" decoding="async" />
              </picture>
              <span className="fsheen" aria-hidden />
            </div>
            <div className="perf" />
          </div>
        </div>
      </div>
    </div>
  );
}
