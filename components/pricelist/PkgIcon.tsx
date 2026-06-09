// Animated line illustrations per package (gold stroke). Motion lives in CSS
// (.pl-pkg-icon.i-<id> …) and is paused under prefers-reduced-motion.
import type { JSX } from "react";

const ICONS: Record<string, JSX.Element> = {
  // Unlimited Photobooth — camera with a pulsing flash
  unlimited: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2.5" y="6.5" width="19" height="13" rx="2.5" />
      <path d="M8 6.5l1.5-2.3h5l1.5 2.3" />
      <circle cx="12" cy="13" r="3.4" />
      <circle className="flash" cx="18.2" cy="9.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  // 360° Spin — rotating circular arrows
  spin360: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <g className="spin">
        <path d="M5 8.5A8 8 0 0 1 19 8" />
        <path d="M19 15.5A8 8 0 0 1 5 16" />
        <path d="M19 8l.5-2.6-2.6.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 16l-.5 2.6 2.6-.7" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  ),
  // Magazine Box + Photobooth — open magazine, gentle sway
  "magazine-plus": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <g className="sway">
        <path d="M12 5.6C9.6 4.2 5.4 4.2 3.6 5.2V18c1.8-1 6-1 8.4.4 2.4-1.4 6.6-1.4 8.4-.4V5.2c-1.8-1-6-1-8.4.4Z" />
        <path d="M12 5.6V18.4" />
      </g>
    </svg>
  ),
  // Magazine Box Only — framed box with a sticker line
  "magazine-only": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="4" y="3.5" width="16" height="17" rx="1.5" />
      <path d="M7.5 16.5h9" />
      <path d="M9.5 19h5" />
    </svg>
  ),
  // Photo Stage — figure on stage with a shimmering spotlight beam
  photostage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path className="beam" d="M9.2 2.5 4.5 14h15L14.8 2.5Z" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10.5" r="1.9" />
      <path d="M9.6 18.5v-2.6a2.4 2.4 0 0 1 4.8 0v2.6" />
      <path d="M3.5 18.5h17" />
    </svg>
  ),
};
ICONS["photostage-plus"] = ICONS.photostage;

export default function PkgIcon({ id }: { id: string }) {
  const icon = ICONS[id];
  if (!icon) return null;
  return (
    <span className={`pl-pkg-icon i-${id}`} aria-hidden>
      {icon}
    </span>
  );
}
