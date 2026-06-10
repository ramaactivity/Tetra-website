import { type Pkg, PKG_PHOTO } from "@/lib/pricelist";
import { waLink, waMessage } from "@/lib/site";
import PriceTier from "./PriceTier";
import Collapsible from "./Collapsible";
import FeatsDisclosure from "./FeatsDisclosure";
import PrintPhoto from "./PrintPhoto";
import PkgIcon from "./PkgIcon";

// Full-viewport package "stage": identity + photo on one side, a single offer
// card (prices · what-you-get · CTA) on the other. Sides alternate by index so
// the scroll reads like an editorial spread; each fits one screen.
export default function PackageBlock({ pkg, index }: { pkg: Pkg; index: number }) {
  const photo = PKG_PHOTO[pkg.id];
  const alt = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  const waPkg = waLink(
    waMessage(`Halo Mintet, saya tertarik dengan paket ${pkg.name} (Tetra Photobooth).`)
  );

  return (
    <section className={`pl-pkg${alt ? " pl-pkg--alt" : ""}`} id={pkg.id}>
      <span className="pl-pkg-num" aria-hidden>
        {num}
      </span>
      <div className="wrap">
        <div className="pl-pkg-stage">
          <div className="pl-pkg-aside" data-rv>
            <div className="pl-pkg-head">
              <div className="pl-pkg-kicker">
                <PkgIcon id={pkg.id} />
                <span className="eyebrow">{pkg.tag}</span>
              </div>
              <h2 className="pl-pkg-name">{pkg.name}</h2>
              <p className="lead pl-pkg-blurb">{pkg.blurb}</p>
            </div>
            {photo && (
              <figure className="pl-pkg-figure">
                <PrintPhoto src={photo.src} alt={photo.alt} />
              </figure>
            )}
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
