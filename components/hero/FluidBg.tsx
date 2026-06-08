// Hero fluid background — 4 breathing radial blobs + 2 drifting light-leak
// streaks for a living, cinematic atmosphere. MotionRoot adds cursor parallax.
export default function FluidBg() {
  return (
    <div className="hero-fluid" id="heroFluid" aria-hidden>
      <b className="bl1" />
      <b className="bl2" />
      <b className="bl3" />
      <b className="bl4" />
      <span className="leak leak1" />
      <span className="leak leak2" />
    </div>
  );
}
