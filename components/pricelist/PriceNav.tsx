import { PRICE_NAV } from "@/lib/pricelist";

// Sticky quick-nav chips. On a phone this is a horizontally-scrollable row so a
// visitor can jump straight to a package. `data-scroll` gives smooth-scroll when
// MotionRoot's handler is attached (direct page load); the href is the fallback.
export default function PriceNav() {
  return (
    <div className="pl-chips-wrap">
      <nav className="pl-chips wrap" aria-label="Navigasi paket">
        {PRICE_NAV.map((c) => (
          <a key={c.id} className="pl-chip" href={`#${c.id}`} data-scroll={`#${c.id}`}>
            {c.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
