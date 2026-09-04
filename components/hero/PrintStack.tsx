import Pic from "../Pic";
// Curated overlapping print stack — 5 absolutely-positioned rotated white cards.
// Positions/rotations are locked to 03_DESIGN_SPEC.md §2 (do not change).
// Wrapped in .hero-media-inner so MotionRoot can tilt the whole pile in 3D
// toward the cursor (the outer .hero-media keeps the scroll-scrub transform).
const STACK = [
  { cls: "s-mia", src: "/images/g-bday1.jpg", alt: "Cetakan 4R photobooth acara ulang tahun" },
  { cls: "s-awd", src: "/images/g-corp1.jpg", alt: "Cetakan 4R photobooth corporate event" },
  { cls: "s-ner", src: "/images/g-strip2.jpg", alt: "Photo strip 2R photobooth ulang tahun" },
  { cls: "s-imp", src: "/images/g-strip3.jpg", alt: "Photo strip 2R photobooth brand activation" },
  { cls: "s-pol", src: "/images/g-wed1.jpg", alt: "Cetakan polaroid photobooth pernikahan" },
];

export default function PrintStack() {
  return (
    <div className="hero-media" id="heroMedia">
      <div className="hero-media-inner" id="heroMediaInner">
        {STACK.map((s) => (
          // .hgw owns the stack position + entrance; .hg floats independently
          <div key={s.cls} className={`hgw ${s.cls}`}>
            <div className="hg">
              <Pic src={s.src} alt={s.alt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
