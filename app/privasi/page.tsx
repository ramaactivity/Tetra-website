import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import Divider from "@/components/Divider";
import { LEGAL, EMAIL, waLink, waMessage } from "@/lib/site";

const TITLE = "Kebijakan Privasi";
const DESCRIPTION =
  "Kebijakan privasi Tetra Photobooth: data apa yang dikumpulkan dari tamu dan klien, tujuan penggunaannya, masa simpan, serta cara meminta penghapusan data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privasi" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/privasi",
    siteName: "Tetra Photobooth",
    title: `${TITLE} — Tetra Photobooth`,
    description: DESCRIPTION,
  },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Ringkasan",
    p: [
      `Kebijakan ini menjelaskan bagaimana ${LEGAL.business} mengumpulkan, menggunakan, dan menyimpan data pribadi tamu maupun klien. Pengelolaan data mengikuti Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.`,
      "Prinsip kami sederhana: kami hanya mengumpulkan yang benar-benar dibutuhkan untuk mengirimkan hasil foto, dan tidak pernah memperjualbelikan data siapa pun.",
    ],
  },
  {
    h: "2. Data yang kami kumpulkan",
    p: [
      "Foto dan video yang diambil selama sesi berlangsung. Ini adalah inti layanan kami dan selalu diambil dengan sepengetahuan tamu, karena tamu berpose secara sadar di depan perangkat.",
      "Data kontak tamu berupa nama, nomor WhatsApp, atau alamat surel. Data ini bersifat opsional dan hanya dikumpulkan apabila tamu mengisinya sendiri di perangkat untuk menerima salinan hasil foto. Tamu yang memilih tidak mengisi tetap dapat mengunduh hasil foto melalui QR code tanpa memberikan data apa pun.",
      "Data pemesanan klien berupa nama, nomor telepon, alamat surel, serta tanggal dan lokasi acara, yang dibutuhkan untuk penjadwalan dan penagihan.",
      "Untuk pembayaran non-tunai, transaksi diproses oleh penyedia layanan pembayaran berlisensi. Kami menerima konfirmasi status pembayaran dan identitas transaksi, namun tidak pernah menyimpan nomor kartu maupun kredensial pembayaran Anda.",
    ],
  },
  {
    h: "3. Tujuan penggunaan data",
    p: [
      "Mengirimkan dan menyediakan akses unduh hasil foto kepada tamu dan klien.",
      "Mengelola pemesanan, penjadwalan, penagihan, dan pengembalian dana.",
      "Menjawab pertanyaan serta memberikan dukungan selama dan setelah acara.",
      "Sebagian hasil foto dapat digunakan sebagai portofolio di kanal resmi kami. Klien berhak menolak penggunaan ini kapan saja, dan materi terkait akan kami turunkan.",
    ],
  },
  {
    h: "4. Masa simpan",
    p: [
      "Halaman unduh untuk tamu aktif selama 30 (tiga puluh) hari sejak acara.",
      "Galeri lengkap untuk klien dapat diakses selama 90 (sembilan puluh) hari sejak acara.",
      "Setelah masa tersebut berakhir, berkas dapat kami hapus dari penyimpanan aktif. Data kontak yang diberikan tamu dihapus mengikuti masa simpan yang sama, kecuali data pemesanan klien yang kami simpan lebih lama sepanjang dibutuhkan untuk keperluan pembukuan dan kewajiban hukum.",
    ],
  },
  {
    h: "5. Pembagian data",
    p: [
      "Kami tidak menjual, menyewakan, atau menukarkan data pribadi kepada pihak ketiga untuk kepentingan pemasaran.",
      "Data hanya dibagikan kepada penyedia layanan yang kami perlukan untuk menjalankan layanan, seperti penyedia penyimpanan berkas dan penyedia layanan pembayaran, sebatas yang diperlukan, atau apabila diwajibkan oleh peraturan perundang-undangan yang berlaku.",
    ],
  },
  {
    h: "6. Hak Anda",
    p: [
      "Anda berhak meminta akses terhadap data pribadi Anda yang kami simpan, meminta koreksi apabila terdapat kekeliruan, meminta penghapusan, serta menarik persetujuan yang sebelumnya diberikan.",
      "Anda juga berhak meminta agar foto Anda tidak digunakan sebagai portofolio, termasuk meminta penurunan materi yang sudah tayang.",
      "Permintaan dapat diajukan melalui kontak pada bagian 9 dan kami tindak lanjuti paling lama 7 (tujuh) hari kerja sejak permintaan diterima dan identitas pemohon dapat kami pastikan.",
    ],
  },
  {
    h: "7. Keamanan",
    p: [
      "Akses ke berkas hasil sesi dibatasi melalui tautan khusus dan hanya dapat dibuka oleh pihak yang memegang tautan atau memindai QR code di lokasi.",
      "Perangkat dan akun penyimpanan kami lindungi dengan kredensial yang hanya dipegang pihak internal. Meski demikian, tidak ada sistem yang sepenuhnya bebas risiko; apabila terjadi kebocoran data yang berdampak pada Anda, kami akan memberitahukannya sesuai ketentuan yang berlaku.",
    ],
  },
  {
    h: "8. Perubahan kebijakan",
    p: [
      `Kebijakan ini dapat kami perbarui sewaktu-waktu. Versi yang berlaku adalah versi yang tercantum di halaman ini. Terakhir diperbarui pada ${LEGAL.updated}.`,
    ],
  },
];

const url = "https://tetraphoto.com/privasi";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${TITLE} — ${LEGAL.business}`,
  url,
  description: DESCRIPTION,
  inLanguage: "id-ID",
  publisher: { "@id": "https://tetraphoto.com/#business" },
};

export default function PrivasiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <section className="gx-hero">
        <div className="wrap">
          <span className="eyebrow" data-rv>
            Legal
          </span>
          <h1 className="gx-title" data-rv>
            Kebijakan <span className="it">Privasi</span>.
          </h1>
          <p className="gx-lead" data-rv>
            Bagaimana kami memperlakukan foto dan data pribadi tamu maupun klien.
            Berlaku sejak {LEGAL.updated}.
          </p>
        </div>
      </section>

      <Divider />

      <section className="area-faqsec">
        <div className="wrap">
          <div className="area-faq">
            {SECTIONS.map((s) => (
              <div className="area-qa" data-rv key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((text) => (
                  <p key={text.slice(0, 32)}>{text}</p>
                ))}
              </div>
            ))}

            <div className="area-qa" data-rv>
              <h2>9. Kontak</h2>
              <p>
                Permintaan terkait data pribadi dapat disampaikan melalui{" "}
                <a href={waLink(waMessage({ halaman: "Privasi" }))} target="_blank" rel="noopener noreferrer">
                  WhatsApp 0852-1352-6630
                </a>{" "}
                atau <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
              <p>
                Penanggung jawab data: {LEGAL.owner},{" "}
                <a href={`mailto:${LEGAL.adminEmail}`}>{LEGAL.adminEmail}</a>.
              </p>
            </div>
          </div>

          <p className="area-others" data-rv>
            Lihat juga <a href="/syarat-ketentuan">Syarat &amp; Ketentuan</a> dan{" "}
            <a href="/kebijakan-refund">Kebijakan Refund &amp; Pembatalan</a>.
          </p>
        </div>
      </section>

      <CtaFooter />
    </>
  );
}
