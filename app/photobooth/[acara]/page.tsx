import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import Divider from "@/components/Divider";
import Pic from "@/components/Pic";
import { EVENTS, getEvent } from "@/lib/events";
import { GALLERY } from "@/lib/gallery";
import { AREAS } from "@/lib/areas";
import { waLink, waMessage } from "@/lib/site";

// Halaman layanan per jenis acara — SEO untuk query "photobooth wedding",
// "photobooth ulang tahun", "sewa 360 photobooth", dst. Statis penuh.
export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ acara: e.slug }));
}

type Props = { params: Promise<{ acara: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { acara: slug } = await params;
  const ev = getEvent(slug);
  if (!ev) return {};
  return {
    title: ev.title,
    description: ev.description,
    alternates: { canonical: `/photobooth/${ev.slug}` },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: `/photobooth/${ev.slug}`,
      siteName: "Tetra Photobooth",
      title: `${ev.title} — Tetra Photobooth`,
      description: ev.description,
    },
  };
}

function jsonLd(ev: NonNullable<ReturnType<typeof getEvent>>) {
  const url = `https://tetraphoto.com/photobooth/${ev.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: ev.title,
      serviceType: "Photobooth rental",
      url,
      description: ev.description,
      provider: { "@id": "https://tetraphoto.com/#business" },
      areaServed: AREAS.filter((a) => !a.parent).map((a) => ({ "@type": "City", name: a.name })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: "https://tetraphoto.com" },
        { "@type": "ListItem", position: 2, name: ev.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ev.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

export default async function EventPage({ params }: Props) {
  const { acara: slug } = await params;
  const ev = getEvent(slug);
  if (!ev) notFound();

  const others = EVENTS.filter((e) => e.slug !== ev.slug);
  const shots = ev.gallery ? GALLERY.filter((g) => g.cat === ev.gallery).slice(0, 3) : [];
  const wa = waLink(waMessage(ev.waIntro));

  return (
    <>
      {jsonLd(ev).map((data, i) => (
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
            Jenis Acara · {ev.name}
          </span>
          <h1 className="gx-title" data-rv>
            Sewa Photobooth <span className="it">{ev.h1Tail}</span>.
          </h1>
          <p className="gx-lead" data-rv>
            {ev.lead}
          </p>
          <div className="area-cta" data-rv>
            <a className="btn fill" href={wa} target="_blank" rel="noopener noreferrer">
              Tanya Paket &amp; Harga
            </a>
            <a className="btn" href="/harga-sewa-photobooth">
              Lihat Harga
            </a>
          </div>
        </div>
      </section>

      <Divider />

      <section className="area-story">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Jasa photobooth <span className="it">{ev.name}</span>{" "}
            di Bogor &amp; Jabodetabek.
          </h2>
          {ev.story.map((p) => (
            <p className="lead area-p" data-rv key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
          {shots.length > 0 && (
            <div className="area-prints" data-rv>
              {shots.map((s) => (
                <div className="ap" key={s.src}>
                  <Pic
                    src={s.src}
                    alt={`Hasil photobooth ${ev.name.toLowerCase()} — ${s.title}, ${s.sub}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Divider />

      <section className="area-points">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Kenapa Tetra cocok untuk photobooth{" "}
            <span className="it">{ev.name}</span>.
          </h2>
          <div className="area-grid">
            {ev.points.map((pt) => (
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
            <span className="it">{ev.name}</span>.
          </h2>
          <div className="area-faq">
            {ev.faq.map((f) => (
              <div className="area-qa" data-rv key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <p className="area-others" data-rv>
            Lihat juga photobooth untuk{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                <a href={`/photobooth/${o.slug}`}>{o.name.toLowerCase()}</a>
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
