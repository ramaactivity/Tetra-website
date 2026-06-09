import { fmtIDR, type Tier } from "@/lib/pricelist";

// Duration ↔ price rows. One line each — stays legible down to 320px.
export default function PriceTier({ tiers }: { tiers: Tier[] }) {
  return (
    <ul className="pl-tiers">
      {tiers.map((t) => (
        <li className="pl-tier" key={t.label}>
          <span className="pl-tier-label">{t.label}</span>
          <span className="pl-tier-price">{fmtIDR(t.price)}</span>
        </li>
      ))}
    </ul>
  );
}
