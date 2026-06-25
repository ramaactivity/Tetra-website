import { PKG_PRINTS } from "@/lib/pricelist";
import Pic from "@/components/Pic";

// The package's visual: real prints from real events, staged like physical
// photographs laid on the table — a white-framed print with a handwritten-style
// caption on its bottom margin, a 2R strip tucked behind, viewfinder corner
// ticks, and a giant ghost numeral bleeding off the section edge.
export default function PkgPrints({ id, num }: { id: string; num: string }) {
  const p = PKG_PRINTS[id];
  if (!p) return null;

  // className="" (not "rsp") so the <picture> keeps its own box — `.pl-print
  // picture { aspect-ratio }` depends on it.
  return (
    <figure className="pl-prints" data-rv>
      <span className="pl-prints-no" aria-hidden>
        {num}
      </span>
      <span className="pl-print pl-print--strip" aria-hidden data-float>
        <Pic src={p.strip} alt="" className="" loading="lazy" />
      </span>
      <span className="pl-print pl-print--main" data-float>
        <Pic src={p.main} alt={p.alt} className="" loading="lazy" />
        <span className="pl-print-cap" aria-hidden>
          {p.caption}
        </span>
      </span>
    </figure>
  );
}
