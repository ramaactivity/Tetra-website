// Hero fluid background — 4 large blurred radial blobs.
// Phase 1: rendered static (breathing animation paused via globals.css override).
export default function FluidBg() {
  return (
    <div className="hero-fluid" aria-hidden>
      <b className="bl1" />
      <b className="bl2" />
      <b className="bl3" />
      <b className="bl4" />
    </div>
  );
}
