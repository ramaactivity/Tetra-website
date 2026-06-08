/* eslint-disable @next/next/no-img-element */
// Cinematic brand intro overlay. Server-rendered so it paints immediately for
// JS users; hidden via CSS for no-JS / reduced-motion. MotionRoot plays + removes it.
// Composition: viewfinder corner brackets (tetra = four) frame a wordmark that
// "develops" via a clip reveal + gold sheen, over a breathing gold atmosphere,
// with an elegant loading hairline + counter. Exits behind a curtain wipe.
export default function Loader() {
  return (
    <>
      <div id="loader">
        <div className="ld-atmos" aria-hidden />
        <span className="ld-corner tl" aria-hidden />
        <span className="ld-corner tr" aria-hidden />
        <span className="ld-corner bl" aria-hidden />
        <span className="ld-corner br" aria-hidden />
        <div className="ld-inner">
          <div className="ld-mark" id="ldmark">
            <img src="/images/word-white.png" alt="tetra photobooth" />
            <span className="ld-sheen" id="ldsheen" aria-hidden />
          </div>
          <div className="ll" id="ll">
            Sesuatu untuk dipegang, sesuatu untuk dikenang
          </div>
          <div className="ld-meta" aria-hidden>
            <span className="ld-bar">
              <span className="ld-bar-fill" id="ldfill" />
            </span>
            <span className="ld-pct">
              <span id="ldpct">0</span>%
            </span>
          </div>
        </div>
      </div>
      <div className="curtain" id="curtain" />
    </>
  );
}
