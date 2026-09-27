import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import Divider from "@/components/Divider";
import { LEGAL, EMAIL, waLink, waMessage } from "@/lib/site";

const TITLE = "Kebijakan Refund & Pembatalan";
const DESCRIPTION =
  "Kebijakan pengembalian dana dan pembatalan Tetra Photobooth: ketentuan DP, pembatalan acara oleh klien, penjadwalan ulang, pembatalan dari pihak kami, serta refund photobox QRIS per sesi.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kebijakan-refund" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/kebijakan-refund",
    siteName: "Tetra Photobooth",
    title: `${TITLE} — Tetra Photobooth`,
    description: DESCRIPTION,
  },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Ringkasan",
    p: [
      "Kebijakan ini mengatur dua hal yang terpisah: pembatalan pemesanan acara (sewa photobooth per paket) dan pengembalian dana layanan photobox yang dibayar per sesi melalui QRIS.",
      "Uang muka (DP) berfungsi sebagai pengunci tanggal. Begitu DP diterima, tanggal tersebut kami tutup untuk klien lain, karena itu DP diperlakukan berbeda dari pelunasan.",
    ],
  },
  {
    h: "2. Biaya pembatalan dan uang muka (DP)",
    p: [
      "Setiap pembatalan pemesanan acara dikenakan biaya pembatalan (cancellation fee) sebesar Rp 500.000. Biaya ini menutup tanggal yang sudah kami kunci untuk Anda dan tidak lagi dapat ditawarkan kepada klien lain.",
      "Uang muka (DP) minimal Rp 500.000 diperhitungkan sebagai biaya pembatalan tersebut, sehingga DP yang sudah dibayarkan tidak dapat dikembalikan.",
      "Karena itu, tidak ada skema pengembalian dana sebesar 100% dari total nilai pemesanan. Biaya pembatalan selalu diperhitungkan terlebih dahulu.",
    ],
  },
  {
    h: "3. Pembatalan acara oleh klien setelah pelunasan",
    p: [
      "Apabila klien sudah melakukan pelunasan lalu membatalkan acara, besaran pengembalian dihitung dari nilai pelunasan (di luar DP) berdasarkan jarak waktu pembatalan terhadap tanggal acara:",
      "Lebih dari 14 hari sebelum acara: nilai pelunasan dikembalikan seluruhnya, sedangkan DP ditahan sebagai biaya pembatalan.",
      "Antara 14 hari sampai 3 hari sebelum acara: nilai pelunasan dikembalikan sebesar 50%, dan DP ditahan sebagai biaya pembatalan.",
      "Kurang dari 3 hari sebelum acara: tidak ada pengembalian dana, namun klien tetap dapat mengajukan penjadwalan ulang apabila tanggal pengganti tersedia.",
    ],
  },
  {
    h: "4. Penjadwalan ulang (reschedule)",
    p: [
      "Penjadwalan ulang dapat diajukan paling lambat 30 (tiga puluh) hari sebelum acara dan hanya dapat dilakukan apabila tanggal pengganti masih tersedia.",
      "Penjadwalan ulang memindahkan seluruh nilai pemesanan, termasuk DP, ke tanggal baru tanpa dikenakan biaya pembatalan. Apabila paket pada tanggal baru memiliki nilai berbeda, selisihnya disesuaikan pada invoice berikutnya.",
    ],
  },
  {
    h: "5. Pembatalan dari pihak Tetra Photobooth",
    p: [
      "Apabila pembatalan berasal dari pihak kami, misalnya kerusakan peralatan yang tidak dapat digantikan atau keadaan kahar di pihak kami, seluruh dana yang sudah Anda bayarkan kami kembalikan, termasuk DP. Biaya pembatalan tidak dikenakan, karena pembatalan tidak berasal dari pihak Anda.",
      "Sebelum membatalkan, kami akan lebih dahulu mengupayakan penggantian perangkat setara atau menawarkan penjadwalan ulang tanpa biaya pembatalan, sehingga acara Anda tetap dapat berjalan.",
    ],
  },
  {
    h: "6. Layanan photobox per sesi (QRIS)",
    p: [
      "Pembayaran photobox dilakukan di muka melalui QRIS sebelum sesi dimulai. Setelah pembayaran berhasil, perangkat otomatis menjalankan sesi dan mencetak lembar sesuai paket yang dibayar, termasuk apabila tamu meninggalkan lokasi sebelum proses cetak selesai. Sesi yang sudah berjalan dengan normal tidak dapat direfund.",
      "Apabila pembayaran berhasil tetapi sesi gagal karena kendala pada perangkat kami, tamu berhak memilih sesi ulang tanpa biaya tambahan atau pengembalian dana sesi tersebut seluruhnya. Biaya pembatalan pada bagian 2 tidak berlaku di sini, karena yang terjadi adalah layanan gagal kami berikan, bukan pembatalan oleh tamu.",
      "Pembayaran ganda atas satu sesi yang sama dikembalikan sepenuhnya.",
    ],
  },
  {
    h: "7. Cara mengajukan pengembalian dana",
    p: [
      "Ajukan klaim kepada admin kami melalui WhatsApp atau surel dengan menyertakan bukti pembayaran atau ID transaksi, tanggal dan lokasi acara atau sesi, serta nomor rekening tujuan pengembalian.",
      "Klaim yang memenuhi ketentuan diproses paling lama 7 (tujuh) hari kerja sejak dokumen lengkap kami terima. Waktu tiba dana di rekening tujuan dapat berbeda mengikuti kebijakan bank atau penyedia layanan pembayaran.",
    ],
  },
];

const url = "https://tetraphoto.com/kebijakan-refund";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${TITLE} — ${LEGAL.business}`,
  url,
  description: DESCRIPTION,
  inLanguage: "id-ID",
  publisher: { "@id": "https://tetraphoto.com/#business" },
};

export default function KebijakanRefundPage() {
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
            Kebijakan <span className="it">Refund</span> &amp; Pembatalan.
          </h1>
          <p className="gx-lead" data-rv>
            Ketentuan pengembalian dana untuk pemesanan acara dan layanan photobox per
            sesi. Berlaku sejak {LEGAL.updated}.
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
              <h2>8. Kontak</h2>
              <p>
                Pengajuan dan pertanyaan seputar pengembalian dana:{" "}
                <a href={waLink(waMessage({ halaman: "Kebijakan Refund" }))} target="_blank" rel="noopener noreferrer">
                  WhatsApp 0852-1352-6630
                </a>{" "}
                atau <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
              <p>
                Kontak administratif: {LEGAL.owner},{" "}
                <a href={`mailto:${LEGAL.adminEmail}`}>{LEGAL.adminEmail}</a>, telepon{" "}
                {LEGAL.adminPhone}.
              </p>
            </div>
          </div>

          <p className="area-others" data-rv>
            Lihat juga <a href="/syarat-ketentuan">Syarat &amp; Ketentuan</a>,{" "}
            <a href="/privasi">Kebijakan Privasi</a>, dan{" "}
            <a href="/harga-sewa-photobooth">Harga &amp; Paket</a>.
          </p>
        </div>
      </section>

      <CtaFooter />
    </>
  );
}
