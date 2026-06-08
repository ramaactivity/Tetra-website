/* eslint-disable @next/next/no-img-element */
// Curated overlapping print stack — 5 absolutely-positioned rotated white cards.
// Positions/rotations are locked to 03_DESIGN_SPEC.md §2 (do not change).
// Wrapped in .hero-media-inner so MotionRoot can tilt the whole pile in 3D
// toward the cursor (the outer .hero-media keeps the scroll-scrub transform).
const STACK = [
  { cls: "s-mia", src: "/images/g-bday1.jpg" },
  { cls: "s-awd", src: "/images/g-corp1.jpg" },
  { cls: "s-ner", src: "/images/g-strip2.jpg" },
  { cls: "s-imp", src: "/images/g-strip3.jpg" },
  { cls: "s-pol", src: "/images/g-wed1.jpg" },
];

export default function PrintStack() {
  return (
    <div className="hero-media" id="heroMedia">
      <div className="hero-media-inner" id="heroMediaInner">
        {STACK.map((s) => (
          <div key={s.cls} className={`hg ${s.cls}`}>
            <img src={s.src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
