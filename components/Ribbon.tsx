// Flowing gold ribbon — a single SVG path drawn on scroll, threading the
// sections together. MotionRoot builds the path geometry and animates it.
export default function Ribbon() {
  return (
    <svg id="ribbon" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="rgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C2A05B" stopOpacity="0" />
          <stop offset="0.08" stopColor="#D8BC7E" />
          <stop offset="0.92" stopColor="#D8BC7E" />
          <stop offset="1" stopColor="#C2A05B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path id="ribbonGlow" />
      <path id="ribbonCore" />
      <circle id="ribbonHead" r="5" />
    </svg>
  );
}
