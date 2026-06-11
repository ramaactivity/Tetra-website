import type { Pkg } from "@/lib/pricelist";
import PkgPrints from "./PkgPrints";
import PkgOffer from "./PkgOffer";

// Package as an editorial spread, no cards: numbered identity (01/06 · tag ·
// name · blurb), real prints staged like physical photographs, and the
// interactive tariff (duration pills → one big price → CTA). The prints column
// alternates sides on desktop; on a phone it sits between identity and price.
export default function PackageBlock({
  pkg,
  index,
  total,
}: {
  pkg: Pkg;
  index: number;
  total: number;
}) {
  const alt = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <section className={`pl-pkg${alt ? " pl-pkg--alt" : ""}`} id={pkg.id}>
      <div className="wrap pl-pkg-grid">
        {/* div, not <header>: globals.css fixes every <header> tag (ghost titles) */}
        <div className="pl-pkg-head" data-rv>
          <div className="pl-pkg-kicker">
            <span className="pl-pkg-no">
              {num}
              <i>/{String(total).padStart(2, "0")}</i>
            </span>
            <span className="eyebrow">{pkg.tag}</span>
          </div>
          <h2 className="pl-pkg-name">{pkg.name}</h2>
          <p className="pl-pkg-blurb">{pkg.blurb}</p>
        </div>

        <PkgPrints id={pkg.id} num={num} />
        <PkgOffer pkg={pkg} />
      </div>
    </section>
  );
}
