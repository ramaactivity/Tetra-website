"use client";

import { useState } from "react";
import { fmtIDR, type Pkg, type Tier } from "@/lib/pricelist";
import { waLink, waMessage } from "@/lib/site";
import FeatsDisclosure from "./FeatsDisclosure";
import Collapsible from "./Collapsible";

// The interactive tariff: pick a duration, one big price answers. Replaces the
// old 7-row price table. "Extend" tiers become a footnote, and the WhatsApp
// CTA carries the chosen duration into the chat.
const isExtend = (t: Tier) => /extend/i.test(t.label);

export default function PkgOffer({ pkg }: { pkg: Pkg }) {
  const durations = pkg.tiers.filter((t) => !isExtend(t));
  const extend = pkg.tiers.find(isExtend);
  const [sel, setSel] = useState(0);
  const tier = durations[sel] ?? durations[0];

  const wa = waLink(
    waMessage(
      `Halo Tetra Photobooth! 👋\n\nSaya dari website Tetra dan tertarik dengan paket ${pkg.name} (${tier.label}).\nBoleh dibantu cek ketersediaan & detailnya buat acara saya?`
    )
  );

  // "2 Jam Unlimited" → "2 Jam" on the pill; the full label lives next to the price
  const short = (label: string) => label.replace(/\s+unlimited\s*$/i, "");

  return (
    <div className="pl-offer" data-rv>
      {durations.length > 1 && (
        <div className="pl-durs-block">
          <span className="pl-offer-label" id={`${pkg.id}-durasi`}>
            Pilih durasi
          </span>
          <div className="pl-durs" role="group" aria-labelledby={`${pkg.id}-durasi`}>
            {durations.map((t, i) => (
              <button
                key={t.label}
                type="button"
                className={`pl-dur${i === sel ? " on" : ""}`}
                aria-pressed={i === sel}
                onClick={() => setSel(i)}
              >
                {short(t.label)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pl-price" aria-live="polite">
        <span className="pl-price-num" key={tier.label}>
          <span className="pl-price-rp">Rp</span>
          {fmtIDR(tier.price).replace(/^Rp\s*/, "")}
        </span>
        <span className="pl-price-for">untuk {tier.label.toLowerCase()}</span>
      </div>

      {extend && (
        <p className="pl-extend">
          {extend.label} <b>{fmtIDR(extend.price)}</b>
        </p>
      )}

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
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
      >
        Booking paket ini
      </a>
    </div>
  );
}
