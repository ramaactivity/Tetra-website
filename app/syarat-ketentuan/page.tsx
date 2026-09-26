import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import Divider from "@/components/Divider";
import { LEGAL, EMAIL, WA_NUMBER } from "@/lib/site";

// Halaman legal. Isinya diturunkan dari ketentuan yang sudah dikirim ke klien
// lewat pricelist PDF, supaya tidak ada versi ketentuan yang berbeda-beda.
// Nomor rekening sengaja TIDAK ditulis di sini (halaman publik); detail
// rekening hanya diberikan lewat invoice.

const TITLE = "Syarat & Ketentuan";
const DESCRIPTION =
  "Syarat dan ketentuan layanan Tetra Photobooth: ruang lingkup layanan, pemesanan dan pembayaran, kewajiban penyewa, hasil foto, perlindungan data pribadi, dan batas tanggung jawab.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/syarat-ketentuan" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/syarat-ketentuan",
    siteName: "Tetra Photobooth",
    title: `${TITLE} — Tetra Photobooth`,
    description: DESCRIPTION,
  },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Identitas usaha",
    p: [
      `Layanan ini diselenggarakan oleh ${LEGAL.business}, usaha perorangan milik ${LEGAL.owner}, dengan Nomor Induk Berusaha (NIB) ${LEGAL.nib}, bidang usaha KBLI ${LEGAL.kbli}.`,
      `Alamat usaha: ${LEGAL.address}.`,
      "Dengan memesan atau menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan di halaman ini.",
    ],
  },
  {
    h: "2. Ruang lingkup layanan",
    p: [
      "Kami menyediakan dua jenis layanan. Pertama, sewa photobooth untuk acara, mencakup Unlimited Photobooth, 360° Spin Video Booth, Magazine Box, Photo Stage, dan Keychain Photobooth Station, yang dipesan per paket dan per durasi.",
      "Kedua, layanan photobox mandiri yang dibayar per sesi oleh tamu di lokasi. Rincian paket, durasi, dan harga tersedia di halaman Harga, serta pricelist lengkap yang dikirim admin lewat WhatsApp.",
    ],
  },
  {
    h: "3. Pemesanan dan pembayaran acara",
    p: [
      "Tanggal acara diamankan dengan uang muka (DP) minimal Rp 500.000. Tanggal baru dianggap terkunci setelah DP diterima, bukan pada saat tanya-jawab ketersediaan.",
      "Pelunasan dilakukan paling lambat 3 (tiga) hari sebelum acara. Pembayaran melalui transfer bank ke rekening resmi atas nama pemilik usaha; detail rekening diberikan bersama invoice, bukan di halaman publik ini.",
      "Untuk pembayaran yang diproses melalui wedding organizer atau event organizer, harap dikonfirmasikan terlebih dahulu paling lambat 7 (tujuh) hari sebelum pembayaran dilakukan.",
    ],
  },
  {
    h: "4. Pemesanan dan pembayaran photobox per sesi",
    p: [
      "Pada layanan photobox, tamu membayar di muka melalui QRIS sebelum sesi dimulai. Setelah pembayaran berhasil, perangkat otomatis menjalankan sesi dan mencetak lembar sesuai paket yang telah dibayar, termasuk apabila tamu meninggalkan lokasi sebelum proses cetak selesai.",
      "Ketentuan pengembalian dana untuk layanan ini diatur terpisah pada halaman Kebijakan Refund & Pembatalan.",
    ],
  },
  {
    h: "5. Kewajiban penyewa dan venue",
    p: [
      "Penyewa menyediakan area minimal 3 × 4 meter, 1 (satu) meja dan 2 (dua) kursi, serta sumber listrik yang memadai di area photobooth. Khusus paket Magazine Box, dibutuhkan area minimal 4 × 5 meter, daya listrik sekitar 700 watt, dan penempatan hanya di dalam ruangan.",
      "Untuk lokasi terbuka, area photobooth tidak boleh terkena sinar matahari langsung. Penyewa wajib menyediakan tenda atau pelindung, serta lokasi alternatif apabila turun hujan.",
      "Penyewa juga memastikan akses masuk dan jalur loading peralatan tersedia, serta memberikan nomor kontak penanggung jawab (PIC, panitia, atau event organizer) yang dapat dihubungi selama acara berlangsung.",
    ],
  },
  {
    h: "6. Pelaksanaan acara",
    p: [
      "Dua orang crew tiba sekitar 1 (satu) jam sebelum acara untuk persiapan, dan layanan berakhir tepat sesuai durasi yang dipesan. Khusus acara pernikahan, tersedia sesi khusus pengantin selama 15 menit.",
      "Setelah peralatan terpasang, peralatan tidak dapat dipindahkan. Apabila pemindahan terpaksa dilakukan, durasi layanan tetap mengikuti waktu pemesanan dan tidak dapat dijeda maupun diperpanjang.",
      "Penambahan waktu, perubahan jadwal pada hari pelaksanaan, maupun waktu istirahat (break time) wajib diinformasikan terlebih dahulu kepada crew.",
    ],
  },
  {
    h: "7. Hasil foto dan masa simpan",
    p: [
      "Hasil foto dapat diunduh tamu secara langsung melalui QR code yang tersedia di lokasi. Halaman unduh untuk tamu aktif selama 30 (tiga puluh) hari sejak acara.",
      "Galeri lengkap untuk klien dapat diakses selama 90 (sembilan puluh) hari sejak acara. Pada paket tertentu, seluruh berkas dokumentasi juga diserahkan dalam bentuk flashdisk.",
      "Kami menyarankan klien mengunduh dan menyimpan salinan berkas sebelum masa simpan berakhir. Setelah masa simpan lewat, berkas dapat dihapus dari penyimpanan kami.",
    ],
  },
  {
    h: "8. Penggunaan hasil foto untuk portofolio",
    p: [
      "Sebagian hasil foto dapat kami tampilkan sebagai portofolio di website dan media sosial resmi Tetra Photobooth.",
      "Klien berhak menolak penggunaan ini. Sampaikan penolakan kepada admin sebelum atau setelah acara, dan materi terkait tidak akan kami tampilkan, atau kami turunkan apabila sudah terlanjur tayang.",
    ],
  },
  {
    h: "9. Data pribadi tamu",
    p: [
      "Pengambilan data tamu seperti nama, nomor WhatsApp, atau alamat surel bersifat opsional dan hanya dilakukan apabila tamu memberikan persetujuan secara sadar di perangkat.",
      "Data tersebut digunakan semata-mata untuk mengirimkan hasil foto dan tidak diperjualbelikan. Pengelolaan data mengikuti Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, dan dijelaskan lebih rinci pada halaman Kebijakan Privasi.",
    ],
  },
  {
    h: "10. Batas tanggung jawab",
    p: [
      "Kami tidak bertanggung jawab atas gangguan yang berada di luar kendali kami, termasuk namun tidak terbatas pada pemadaman listrik, daya listrik venue yang tidak mencukupi, gangguan jaringan internet venue, cuaca buruk, bencana alam, serta pembatasan atau keadaan kahar lain (force majeure).",
      "Apabila gangguan tersebut terjadi, kami akan mengupayakan solusi terbaik di lokasi bersama penyewa, namun hal tersebut tidak menjadi dasar pembatalan sepihak maupun tuntutan ganti rugi.",
      "Tanggung jawab kami dalam kondisi apa pun dibatasi paling banyak sebesar nilai pemesanan yang telah dibayarkan untuk layanan terkait.",
    ],
  },
  {
    h: "11. Perubahan ketentuan",
    p: [
      `Ketentuan ini dapat kami perbarui sewaktu-waktu. Versi yang berlaku adalah versi yang tercantum di halaman ini. Terakhir diperbarui pada ${LEGAL.updated}.`,
    ],
  },
  {
    h: "12. Hukum yang berlaku",
    p: [
      "Syarat dan ketentuan ini tunduk pada hukum Negara Republik Indonesia. Setiap perselisihan diupayakan diselesaikan terlebih dahulu secara musyawarah sebelum ditempuh jalur hukum yang berlaku.",
    ],
  },
];

const url = "https://tetraphoto.com/syarat-ketentuan";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${TITLE} — ${LEGAL.business}`,
  url,
  description: DESCRIPTION,
  inLanguage: "id-ID",
  publisher: { "@id": "https://tetraphoto.com/#business" },
};

export default function SyaratKetentuanPage() {
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
            Syarat &amp; <span className="it">Ketentuan</span>.
          </h1>
          <p className="gx-lead" data-rv>
            Ketentuan layanan sewa photobooth dan photobox Tetra Photobooth. Berlaku
            sejak {LEGAL.updated}.
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
              <h2>13. Kontak</h2>
              <p>
                Pertanyaan umum, pemesanan, dan bantuan selama acara:{" "}
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp 0852-1352-6630
                </a>{" "}
                atau <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
              <p>
                Kontak legal dan administratif, termasuk urusan pembayaran, penagihan,
                dan pengembalian dana: {LEGAL.owner},{" "}
                <a href={`mailto:${LEGAL.adminEmail}`}>{LEGAL.adminEmail}</a>, telepon{" "}
                {LEGAL.adminPhone}.
              </p>
              <p>Alamat usaha: {LEGAL.address}.</p>
            </div>
          </div>

          <p className="area-others" data-rv>
            Lihat juga <a href="/kebijakan-refund">Kebijakan Refund &amp; Pembatalan</a>,{" "}
            <a href="/privasi">Kebijakan Privasi</a>, dan{" "}
            <a href="/harga-sewa-photobooth">Harga &amp; Paket</a>.
          </p>
        </div>
      </section>

      <CtaFooter />
    </>
  );
}
