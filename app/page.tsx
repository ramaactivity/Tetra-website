import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import TrustedBy from "@/components/TrustedBy";
import FormatScrolly from "@/components/FormatScrolly";
import FormatExtras from "@/components/FormatExtras";
import Gallery from "@/components/Gallery";
import WhyTetra from "@/components/WhyTetra";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaFooter from "@/components/CtaFooter";

// Section order mirrors reference/index.html exactly (with inter-section dividers).
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Manifesto />
      <TrustedBy />

      <div className="wrap">
        <div className="divider" />
      </div>

      <FormatScrolly />
      <FormatExtras />

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
