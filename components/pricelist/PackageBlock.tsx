import type { Pkg } from "@/lib/pricelist";
import { waLink, waMessage } from "@/lib/site";
import PriceTier from "./PriceTier";
import Collapsible from "./Collapsible";
import FeatsDisclosure from "./FeatsDisclosure";
import PkgArt from "./PkgArt";

// Full-viewport package "stage": a custom line-illustration of the package's
// output/experience on one side, a single offer card (prices · what-you-get ·
// CTA) on the other. Sides alternate by index; each fits one screen.
export default function PackageBlock({ pkg, index }: { pkg: Pkg; index: number }) {
  const alt = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  const waPkg = waLink(
    waMessage(`Halo Mintet, saya tertarik dengan paket ${pkg.name} (Tetra Photobooth).`)
  );

  return (
    <section className={`pl-pkg${alt ? " pl-pkg--alt" : ""}`} id={pkg.id}>
      <div className="wrap">
        <div className="pl-pkg-stage">
          <div className="pl-pkg-aside" data-rv>
            <div className="pl-pkg-head">
              <span className="eyebrow">{pkg.tag}</span>
              <h2 className="pl-pkg-name">{pkg.name}</h2>
              <p className="lead pl-pkg-blurb">{pkg.blurb}</p>
            </div>
            <div className="pl-pkg-art-wrap">
              <span className="pl-pkg-num" aria-hidden>
                {num}
              </span>
              <PkgArt id={pkg.id} />
            </div>
          </div>

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
