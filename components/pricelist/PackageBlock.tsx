import type { Pkg } from "@/lib/pricelist";
import { waLink, waMessage } from "@/lib/site";
import PriceTier from "./PriceTier";
import Collapsible from "./Collapsible";
import FeatsDisclosure from "./FeatsDisclosure";
import PkgArt from "./PkgArt";

// Package: an identity header (kicker · name · blurb), then a balanced body with
// a large gold line-illustration of the package's output on one side and the
// offer (prices · what-you-get · CTA) on the other. Body sides alternate.
export default function PackageBlock({ pkg, index }: { pkg: Pkg; index: number }) {
  const alt = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  const waPkg = waLink(
    waMessage(`Halo Mintet, saya tertarik dengan paket ${pkg.name} (Tetra Photobooth).`)
  );

  return (
    <section className={`pl-pkg${alt ? " pl-pkg--alt" : ""}`} id={pkg.id}>
      <div className="wrap pl-pkg-stage">
        <div className="pl-pkg-head" data-rv>
          <div className="pl-pkg-eyebrow">
            <span className="pl-pkg-no">{num}</span>
            <span className="eyebrow">{pkg.tag}</span>
          </div>
          <h2 className="pl-pkg-name">{pkg.name}</h2>
          <p className="lead pl-pkg-blurb">{pkg.blurb}</p>
        </div>

        <div className="pl-pkg-body">
          <figure className="pl-pkg-art-wrap" data-rv>
            <span className="pl-art-no" aria-hidden>
              {num}
            </span>
            <PkgArt id={pkg.id} />
          </figure>

          <div className="pl-pkg-offer" data-rv>
            <div className="pl-offer-prices">
              <PriceTier tiers={pkg.tiers} />
            </div>

            <FeatsDisclosure items={pkg.includes} />

            {pkg.extras && pkg.extras.length > 0 && (
              <div className="pl-extras">
                {pkg.extras.map((e) => (
                  <Collapsible key={e.title} title={e.title} items={e.items} />
                ))}
              </div>
            )}

            <a
              className="btn fill pl-pkg-cta"
              href={waPkg}
              target="_blank"
              rel="noopener noreferrer"
            >
              Booking paket ini
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
