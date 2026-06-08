/* eslint-disable @next/next/no-img-element */
// Brand intro overlay. Server-rendered so it paints immediately for JS users;
// hidden via CSS for no-JS / reduced-motion. MotionRoot plays + removes it.
export default function Loader() {
  return (
    <>
      <div id="loader">
        <img src="/images/word-white.png" alt="tetra" />
        <div className="ll" id="ll">
          Sesuatu untuk dipegang, sesuatu untuk dikenang
        </div>
      </div>
      <div className="curtain" id="curtain" />
    </>
  );
}
