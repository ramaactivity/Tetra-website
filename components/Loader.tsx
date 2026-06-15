/* eslint-disable @next/next/no-img-element */
// Cinematic photobooth intro overlay. Server-rendered so it paints immediately
// for JS users; hidden via CSS for no-JS / reduced-motion. MotionRoot plays it.
// Story: a viewfinder frames the wordmark → twin focus rings + tetra tick marks
// hunt and lock onto the mark (out-of-focus → sharp) → a focus-lock bloom pulses
// out → a gold glint catches the letters → the tagline rises → shutter punch +
// flash (dip to white), as if the guest was just photographed, clearing to the site.
//
// The mark is the true centre of the screen: the tagline is positioned ABSOLUTELY
// beneath it (not in the flex flow), so the logo sits dead-centre inside the focus
// rings instead of being pushed up by the tagline's height.
export default function Loader() {
  return (
    <>
      <div id="loader">
        <div className="ld-atmos" aria-hidden />
        <div className="ld-aura" aria-hidden />
        <div className="ld-grain" aria-hidden />
        <div className="ld-vignette" aria-hidden />
        <div className="ld-motes" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="ld-frame" id="ldframe" aria-hidden>
          <span className="ld-corner tl" />
          <span className="ld-corner tr" />
          <span className="ld-corner bl" />
          <span className="ld-corner br" />
        </div>
        {/* focus group — centred on the screen, which is where the mark sits */}
        <div className="ld-focus" id="ldfocus" aria-hidden>
          <span className="ld-ring r2" id="ldreticle2" />
          <span className="ld-ring r1" id="ldreticle" />
          <span className="ld-tick t" />
          <span className="ld-tick r" />
          <span className="ld-tick b" />
          <span className="ld-tick l" />
          <span className="ld-bloom" id="ldbloom" />
        </div>
        <div className="ld-inner">
          <div className="ld-mark" id="ldmark">
            <img src="/images/word-white.png" alt="tetra photobooth" />
            <span className="ld-sheen" id="ldsheen" aria-hidden />
          </div>
          <div className="ll" id="ll">
            Capturing moments that matter
          </div>
        </div>
      </div>
      {/* camera flash — the "dip to white" capture moment */}
      <div className="ld-flash" id="ldflash" aria-hidden />
    </>
  );
}
