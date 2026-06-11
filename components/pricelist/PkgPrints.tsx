/* eslint-disable @next/next/no-img-element */
import { PKG_PRINTS } from "@/lib/pricelist";

// The package's visual: real prints from real events, staged like physical
// photographs laid on the table — a white-framed print with a handwritten-style
// caption on its bottom margin, a 2R strip tucked behind, viewfinder corner
// ticks, and a giant ghost numeral bleeding off the section edge.
export default function PkgPrints({ id, num }: { id: string; num: string }) {
  const p = PKG_PRINTS[id];
  if (!p) return null;
  const sm = (src: string) => src.replace(/\.jpg$/, "-sm.jpg");

  return (
    <figure className="pl-prints" data-rv>
      <span className="pl-prints-no" aria-hidden>
        {num}
      </span>
      <span className="pl-print pl-print--strip" aria-hidden data-float>
        <picture>
          <source media="(max-width: 768px)" srcSet={sm(p.strip)} />
          <img src={p.strip} alt="" loading="lazy" decoding="async" />
        </picture>
      </span>
      <span className="pl-print pl-print--main" data-float>
        <picture>
          <source media="(max-width: 768px)" srcSet={sm(p.main)} />
          <img src={p.main} alt={p.alt} loading="lazy" decoding="async" />
        </picture>
        <span className="pl-print-cap" aria-hidden>
          {p.caption}
        </span>
      </span>
    </figure>
  );
}
