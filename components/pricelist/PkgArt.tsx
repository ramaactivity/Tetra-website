// Large gold line-art per package — represents each service's actual output/
// experience (a photostrip, a 360 rig, a magazine box, a photo stage). Replaces
// the generic per-package photo. Stroke inherits `color`; motion lives in CSS
// (.pl-art-* classes) and is paused under prefers-reduced-motion.
import type { JSX } from "react";

const COMMON = {
  viewBox: "0 0 140 140",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ART: Record<string, JSX.Element> = {
  // Unlimited Photobooth — two overlapping photostrips (the printed product)
  unlimited: (
    <svg {...COMMON}>
      <g className="pl-art-strip2" transform="rotate(-9 70 72)" opacity="0.45">
        <rect x="34" y="20" width="40" height="100" rx="5" />
      </g>
      <g transform="rotate(7 70 72)">
        <rect x="58" y="14" width="46" height="106" rx="5" />
        <rect x="64" y="21" width="34" height="22" rx="2.5" strokeWidth="1.2" />
        <rect x="64" y="48" width="34" height="22" rx="2.5" strokeWidth="1.2" />
        <rect x="64" y="75" width="34" height="22" rx="2.5" strokeWidth="1.2" />
        <g fill="currentColor" stroke="none" opacity="0.85">
          <circle cx="77" cy="31" r="2.4" /><circle cx="85" cy="31" r="2.4" />
          <circle cx="77" cy="58" r="2.4" /><circle cx="85" cy="58" r="2.4" />
          <circle cx="77" cy="85" r="2.4" /><circle cx="85" cy="85" r="2.4" />
        </g>
        <path d="M67 105h28" strokeWidth="1.2" />
        <rect x="67" y="109" width="7" height="7" rx="1" strokeWidth="1" />
        <path d="M80 111h15M80 114h11" strokeWidth="1" opacity="0.7" />
      </g>
      <g className="pl-art-spark" fill="currentColor" stroke="none">
        <path d="M112 30l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z" opacity="0.9" />
      </g>
    </svg>
  ),

  // 360 Spin Video Booth — figure on a spinning platform, camera arm, motion arcs
  spin360: (
    <svg {...COMMON}>
      <ellipse cx="70" cy="104" rx="40" ry="13" />
      <ellipse cx="70" cy="104" rx="22" ry="7" opacity="0.45" />
      <circle cx="70" cy="58" r="8" />
      <path d="M62 100V78a8 8 0 0 1 16 0v22" />
      <path d="M30 104c0-12 8-20 8-20" opacity="0.6" />
      <path d="M38 84l6-2-1 6" opacity="0.6" />
      {/* camera pole arcing over */}
      <path d="M104 104c6-26-6-48-22-52" strokeWidth="1.3" />
      <rect x="78" y="46" width="9" height="7" rx="1.5" transform="rotate(-18 82 49)" />
      <g className="pl-art-spin">
        <path d="M70 26a44 44 0 0 1 40 26" strokeWidth="1.3" />
        <path d="M110 52l1-7-7 2" />
        <path d="M70 114a44 44 0 0 1-40-26" strokeWidth="1.3" opacity="0.7" />
        <path d="M30 88l-1 7 7-2" opacity="0.7" />
      </g>
    </svg>
  ),

  // Magazine Box + Photobooth — acrylic box booth with a couple inside
  "magazine-plus": (
    <svg {...COMMON}>
      <g className="pl-art-float">
        {/* isometric acrylic box */}
        <path d="M40 44l30-12 30 12v54l-30 12-30-12z" />
        <path d="M40 44l30 12 30-12M70 56v54" opacity="0.4" />
        {/* couple inside */}
        <circle cx="62" cy="66" r="4.5" />
        <path d="M56 96V80a6 6 0 0 1 12 0v16" />
        <circle cx="80" cy="70" r="4.5" />
        <path d="M74 98V84a6 6 0 0 1 12 0v14" />
        {/* signature script on top */}
        <path d="M50 36c4-3 7 3 11 0s7-4 10-1" strokeWidth="1.2" opacity="0.8" />
      </g>
    </svg>
  ),

  // Magazine Box Only — the box installation with a sticker label, no crew
  "magazine-only": (
    <svg {...COMMON}>
      <path d="M40 44l30-12 30 12v54l-30 12-30-12z" />
      <path d="M40 44l30 12 30-12M70 56v54" opacity="0.4" />
      {/* sticker label on front face */}
      <rect x="52" y="68" width="36" height="26" rx="2" strokeWidth="1.2" transform="skewY(6)" />
      <path d="M57 80h26M57 86h18" strokeWidth="1.1" opacity="0.7" transform="skewY(6)" />
      <path d="M50 36c4-3 7 3 11 0s7-4 10-1" strokeWidth="1.2" opacity="0.7" />
    </svg>
  ),

  // Photo Stage — pelaminan arch + couple + spotlight beam + QR stand
  photostage: (
    <svg {...COMMON}>
      <path d="M34 112V70a36 36 0 0 1 72 0v42" />
      {/* floral hints */}
      <g opacity="0.7"><circle cx="42" cy="50" r="3" /><circle cx="48" cy="44" r="2.4" /><circle cx="98" cy="50" r="3" /><circle cx="92" cy="44" r="2.4" /></g>
      {/* spotlight beam */}
      <path className="pl-art-beam" d="M70 18l-16 40h32z" fill="currentColor" stroke="none" opacity="0.16" />
      {/* couple */}
      <circle cx="62" cy="70" r="5" />
      <path d="M55 110V86a7 7 0 0 1 14 0v24" />
      <circle cx="82" cy="74" r="5" />
      <path d="M75 110V90a7 7 0 0 1 14 0v20" />
      {/* QR stand */}
      <rect x="108" y="74" width="14" height="14" rx="1.5" strokeWidth="1.2" />
      <path d="M115 88v22" strokeWidth="1.2" /><path d="M108 112h14" strokeWidth="1.2" />
    </svg>
  ),

  // Photo Stage + Photobooth — stage + an instant print coming out of a printer
  "photostage-plus": (
    <svg {...COMMON}>
      <path d="M30 108V70a34 34 0 0 1 68 0v38" />
      <path className="pl-art-beam" d="M64 20l-14 36h28z" fill="currentColor" stroke="none" opacity="0.16" />
      <circle cx="58" cy="70" r="5" />
      <path d="M51 106V86a7 7 0 0 1 14 0v20" />
      <circle cx="78" cy="74" r="5" />
      <path d="M71 106V90a7 7 0 0 1 14 0v16" />
      {/* printer + emerging print */}
      <rect x="100" y="86" width="26" height="16" rx="2" />
      <path d="M104 86v-3h18v3" opacity="0.6" />
      <g className="pl-art-print">
        <rect x="106" y="66" width="14" height="20" rx="1.5" strokeWidth="1.2" />
        <rect x="109" y="69" width="8" height="9" rx="1" strokeWidth="1" opacity="0.7" />
      </g>
    </svg>
  ),
};

export default function PkgArt({ id }: { id: string }) {
  const art = ART[id];
  if (!art) return null;
  return (
    <span className={`pl-art i-${id}`} aria-hidden>
      {art}
    </span>
  );
}
