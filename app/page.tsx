import type { Metadata } from "next";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
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
import Divider from "@/components/Divider";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Story arc: Hook → bukti cepat → lihat hasil → kenapa beda → bentuknya →
// apa yang didapat → semudah ini → suara klien → objeksi → aksi.
export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <Hero />
      <TrustedBy />

      <Divider />

      <Manifesto />

      <Divider />

      <Gallery />

      <Divider />

      <WhyTetra />

      <Divider />

      <FormatScrolly />

      <Divider />

      <Package />
      <Process />
      <Testimonials />

      <Divider />

      <Faq />
      <CtaFooter />
    </>
  );
}
