import { WaButton } from "./Wa";
import FluidBg from "./hero/FluidBg";
import PrintStack from "./hero/PrintStack";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <FluidBg />
      <div className="hero-bgword" id="bgword">
        kenangan.
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <h2 className="eyebrow" id="he">
            Sewa Photobooth Premium · Bogor &amp; Jabodetabek
          </h2>
          <h1 id="h1">
            {/* br-m forces the same 3-line break on mobile as desktop wraps to
                naturally; hidden on desktop so the desktop layout is unchanged. */}
            Sesuatu untuk{" "}
            <br className="br-m" />
            <span className="it">dipegang</span>, abadi{" "}
            <br className="br-m" />
            <span className="nbk">
              untuk <span className="it">dikenang</span>.
            </span>
          </h1>
          <p className="sub" id="hs">
            Photobooth yang mengubah experience acaramu menjadi souvenir cetak
            instan. Memori nyata yang beneran disimpan para tamu.
          </p>
          <div className="cta" id="hc">
            <WaButton label="Cek Jadwal & Harga" />
            <a className="btn" href="#galeri" data-scroll="#galeri">
              Lihat Galeri
            </a>
          </div>
          <div className="trust" id="ht">
            <span className="stars">★★★★★</span>
            <span>
              <b>Dipercaya ratusan acara</b>
            </span>
            <span className="dot" />
            <span className="ev">
              Weddings &amp; Private Party · Birthday · Corporate Events · Social
              Gatherings · Event · Concerts &amp; Festivals · Graduation
            </span>
          </div>
        </div>
        <PrintStack />
      </div>
      <div className="scrollcue">
        <span className="ln" />
        Scroll
      </div>
    </section>
  );
}
