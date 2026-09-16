import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import Divider from "@/components/Divider";
import Pic from "@/components/Pic";
import { AREAS, getArea } from "@/lib/areas";
import { waLink, waMessage } from "@/lib/site";

// Halaman area layanan — SEO lokal per kota. Statis penuh.
export const dynamicParams = false;

export function generateStaticParams() {
  return AREAS.map((a) => ({ area: a.slug }));
}

type Props = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return {
    title: area.title,
    description: area.description,
    alternates: { canonical: `/sewa-photobooth/${area.slug}` },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: `/sewa-photobooth/${area.slug}`,
      siteName: "Tetra Photobooth",
      title: `${area.title} — Tetra Photobooth`,
      description: area.description,
    },
  };
}

function jsonLd(area: NonNullable<ReturnType<typeof getArea>>) {
  const url = `https://tetraphoto.com/sewa-photobooth/${area.slug}`;
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Sewa Photobooth ${area.name}`,
    serviceType: "Photobooth rental",
    url,
    description: area.description,
    areaServed: { "@type": "City", name: area.name },
    provider: { "@id": "https://tetraphoto.com/#business" },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://tetraphoto.com" },
      { "@type": "ListItem", position: 2, name: `Sewa Photobooth ${area.name}`, item: url },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [service, breadcrumb, faq];
}

export default async function AreaPage({ params }: Props) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  // Sesama level saja: kota utama saling menautkan, sub-area saling menautkan.
  const others = AREAS.filter((a) => a.slug !== area.slug && a.parent === area.parent);
  const subs = AREAS.filter((a) => a.parent === area.slug);
  const wa = waLink(waMessage(area.waIntro));

  return (
    <>
      {jsonLd(area).map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      <Header />

      <section className="gx-hero">
        <div className="wrap">
          <span className="eyebrow" data-rv>
            Area Layanan · {area.name}
          </span>
          <h1 className="gx-title" data-rv>
            Sewa Photobooth <span className="it">{area.h1Tail}</span>.
          </h1>
          <p className="gx-lead" data-rv>
            {area.lead}
          </p>
          <div className="area-cta" data-rv>
            <a className="btn fill" href={wa} target="_blank" rel="noopener noreferrer">
              Tanya Paket &amp; Harga
            </a>
            <a className="btn" href="/galeri">
              Lihat Galeri
            </a>
          </div>
        </div>
      </section>

      <Divider />

      <section className="area-story">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Jasa photobooth di <span className="it">{area.name}</span>.
          </h2>
          {area.story.map((p) => (
            <p className="lead area-p" data-rv key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
          <div className="area-prints" data-rv>
            {area.prints.map((pr) => (
              <div className="ap" key={pr.src}>
                <Pic src={pr.src} alt={pr.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="area-points">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Kenapa memilih <span className="it">Tetra</span> di {area.name}.
          </h2>
          <div className="area-grid">
            {area.points.map((pt) => (
              <div className="area-point" data-rv key={pt.h}>
                <h3>{pt.h}</h3>
                <p>{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="area-faqsec">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Pertanyaan soal sewa photobooth{" "}
            <span className="it">{area.name}</span>.
          </h2>
          <div className="area-faq">
            {area.faq.map((f) => (
              <div className="area-qa" data-rv key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          {subs.length > 0 && (
            <p className="area-others" data-rv>
              Termasuk area{" "}
              {subs.map((sub, i) => (
                <span key={sub.slug}>
                  <a href={`/sewa-photobooth/${sub.slug}`}>{sub.name}</a>
                  {i < subs.length - 2 ? ", " : i === subs.length - 2 ? ", dan " : "."}
                </span>
              ))}
            </p>
          )}
          <p className="area-others" data-rv>
            Kami juga melayani{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                <a href={`/sewa-photobooth/${o.slug}`}>sewa photobooth {o.name}</a>
                {i < others.length - 2 ? ", " : i === others.length - 2 ? ", dan " : "."}
              </span>
            ))}
          </p>
        </div>
      </section>

      <CtaFooter />
    </>
  );
}
