/* eslint-disable @next/next/no-img-element */
// Cinematic photobooth intro overlay. Server-rendered so it paints immediately
// for JS users; hidden via CSS for no-JS / reduced-motion. MotionRoot plays it.
// Story: a viewfinder frames the wordmark → the camera autofocuses on the logo
// (out-of-focus → sharp) → a gold glint catches the letters → the tagline rises
// → shutter punch + flash (dip to white), as if the guest was just photographed,
// which clears to reveal the site.
export default function Loader() {
  return (
    <>
      <div id="loader">
        <div className="ld-atmos" aria-hidden />
        <div className="ld-frame" id="ldframe" aria-hidden>
          <span className="ld-corner tl" />
          <span className="ld-corner tr" />
          <span className="ld-corner bl" />
          <span className="ld-corner br" />
          <span className="ld-reticle" id="ldreticle" />
        </div>
        <div className="ld-inner">
          <div className="ld-mark" id="ldmark">
            <img src="/images/word-white.png" alt="tetra photobooth" />
            <span className="ld-sheen" id="ldsheen" aria-hidden />
          </div>
          <div className="ll" id="ll">
            Sesuatu untuk dipegang, sesuatu untuk dikenang
          </div>
        </div>
      </div>
      {/* camera flash — the "dip to white" capture moment */}
      <div className="ld-flash" id="ldflash" aria-hidden />
    </>
  );
}
