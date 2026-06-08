import { waLink } from "@/lib/site";
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
          <div className="eyebrow" id="he">
            Photobooth Premium · Jabodetabek &amp; se-Indonesia
          </div>
          <h1 id="h1">
            Sesuatu untuk <span className="it">dipegang</span>. Sesuatu untuk{" "}
            <span className="it">dikenang</span>.
          </h1>
          <p className="sub" id="hs">
            Cetakan berkualitas studio yang dibawa pulang tamu — dengan frame yang
            kami desain khusus untuk setiap acaramu.
          </p>
          <div className="cta" id="hc">
            <a
              className="btn fill"
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanya Paket &amp; Harga
            </a>
            <a className="btn" href="#galeri">
              Lihat Galeri
            </a>
          </div>
          <div className="trust" id="ht">
            <span className="stars">★★★★★</span>
            <span>
              <b>Dipercaya 500+ acara</b>
            </span>
            <span className="dot" />
            <span>Wedding · Corporate · Ulang Tahun · Wisuda</span>
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
