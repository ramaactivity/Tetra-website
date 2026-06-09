import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import TrustedBy from "@/components/TrustedBy";
import Gallery from "@/components/Gallery";
import WhyTetra from "@/components/WhyTetra";
import FormatScrolly from "@/components/FormatScrolly";
import Package from "@/components/Package";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaFooter from "@/components/CtaFooter";

// Story arc: Hook → bukti cepat → lihat hasil → kenapa beda → bentuknya →
// apa yang didapat → semudah ini → suara klien → objeksi → aksi.
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrustedBy />

      <div className="wrap">
        <div className="divider" />
      </div>

      <Manifesto />

      <div className="wrap">
        <div className="divider" />
      </div>

      <Gallery />

      <div className="wrap">
        <div className="divider" />
      </div>

      <WhyTetra />

      <div className="wrap">
        <div className="divider" />
      </div>

      <FormatScrolly />

      <div className="wrap">
        <div className="divider" />
      </div>

      <Package />
      <Process />
      <Testimonials />

      <div className="wrap">
        <div className="divider" />
      </div>

      <Faq />
      <CtaFooter />
    </>
  );
}
