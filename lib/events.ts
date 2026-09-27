// Halaman layanan per jenis acara — melengkapi lib/areas.ts (SEO per kota).
// Query "photobooth wedding", "photobooth ulang tahun", "sewa 360 photobooth"
// punya niat beli tinggi tapi sebelumnya numpuk di homepage.
// Aturan sama dengan areas.ts: copy ditulis unik per acara, bukan template
// ganti-nama, dan faktanya konsisten dengan homepage — basis Bogor, transport
// gratis se-Jabodetabek, setup ±1 jam sebelum acara, butuh listrik ±500 W + area ±3×4 m.

import { AREA_CLASSIC } from "./facts";

import type { GalleryCategory } from "./gallery";

export interface EventFaq {
  q: string;
  a: string;
}

export interface EventKind {
  slug: string;
  /** Nama acara untuk heading & copy, mis. "Wedding" */
  name: string;
  /** Meta title (template layout menambahkan "— Tetra Photobooth") */
  title: string;
  description: string;
  /** Kata bergaya italic-gold di ujung H1 */
  h1Tail: string;
  lead: string;
  story: [string, string];
  points: { h: string; p: string }[];
  /** Kategori galeri yang ditampilkan; kosong berarti tidak ada strip galeri */
  gallery: GalleryCategory | null;
  faq: EventFaq[];
}

export const EVENTS: EventKind[] = [
  {
    slug: "wedding",
    name: "Wedding",
    title: "Sewa Photobooth Wedding Bogor & Jabodetabek",
    description:
      "Jasa photobooth wedding di Bogor & Jabodetabek. Cetak instan unlimited, frame custom bertema undangan, dan softfile realtime — souvenir yang dibawa pulang setiap tamu.",
    h1Tail: "Wedding",
    lead: "Resepsi berlangsung beberapa jam, cetakannya bertahan bertahun-tahun. Photobooth pernikahan kami memberi setiap tamu sesuatu yang nyata untuk dibawa pulang dari hari besarmu.",
    story: [
      "Wedding adalah acara yang paling sering kami tangani. Kami hafal ritmenya: tamu datang bergelombang setelah akad, menumpuk saat sesi foto keluarga, lalu mengalir lagi menjelang penutup. Karena itu cetakan kami keluar sekitar sepuluh detik per lembar, supaya antrean di booth tidak pernah menahan tamu terlalu lama.",
      "Frame cetakannya kami desain ulang mengikuti tema undanganmu, bukan template yang tinggal ganti nama. Warna, tipografi, dan ornamennya menyesuaikan, sehingga cetakan yang dibawa pulang tamu terasa satu napas dengan seluruh dekorasi acara.",
    ],
    points: [
      {
        h: "Souvenir yang benar-benar disimpan",
        p: "Berbeda dari souvenir yang tertinggal di meja, cetakan berisi wajah tamu sendiri hampir selalu dibawa pulang dan ditempel di rumah.",
      },
      {
        h: "Frame setema undangan",
        p: "Kirimkan undangan atau moodboard-mu, dan frame cetakan kami sesuaikan sebelum hari-H tanpa biaya tambahan.",
      },
      {
        h: "Aman untuk rundown padat",
        p: "Booth siap sekitar satu jam sebelum tamu pertama masuk, dan dua crew kami menjaga alurnya supaya tidak bertabrakan dengan sesi foto keluarga.",
      },
      {
        h: "Softfile untuk tamu jauh",
        p: "Selain cetakan, tamu bisa langsung mengunduh file digitalnya lewat QR code dan mengirimkannya ke keluarga yang tidak bisa hadir.",
      },
    ],
    gallery: "wed",
    faq: [
      {
        q: "Kapan sebaiknya booking photobooth untuk wedding?",
        a: "Idealnya dua sampai tiga bulan sebelum hari-H. Tanggal Sabtu dan Minggu di musim ramai biasanya paling cepat penuh, dan jarak sejauh itu memberi kami waktu mendesain frame sesuai tema undanganmu.",
      },
      {
        q: "Berapa lama durasi yang pas untuk resepsi?",
        a: "Sebagian besar resepsi terlayani baik dengan paket tiga sampai empat jam. Kalau akad dan resepsi digabung dalam satu hari, ambil durasi lebih panjang atau tambahkan jam extend di hari-H.",
      },
      {
        q: "Apakah photobooth mengganggu dekorasi pelaminan?",
        a: `Tidak. Kami hanya butuh area sekitar ${AREA_CLASSIC} di sisi ruangan dekat sumber listrik. Kalau dekorasimu punya area khusus, backdrop bawaan kami bisa dilepas agar menyatu dengan dekorasi venue.`,
      },
      {
        q: "Bisa untuk akad, engagement, atau siraman?",
        a: "Bisa. Paket yang sama berlaku untuk seluruh rangkaian acara pernikahan, termasuk lamaran, siraman, dan unduh mantu.",
      },
    ],
  },
  {
    slug: "ulang-tahun",
    name: "Ulang Tahun",
    title: "Sewa Photobooth Ulang Tahun",
    description:
      "Sewa photobooth ulang tahun di Bogor & Jabodetabek. Cetak instan unlimited, properti seru, dan frame custom bertema — cocok untuk sweet seventeen, milad anak, sampai reuni.",
    h1Tail: "Ulang Tahun",
    lead: "Ulang tahun ramai oleh orang-orang terdekat, dan merekalah yang paling suka berfoto konyol bersama. Photobooth mengubah keramaian itu menjadi tumpukan cetakan yang dibawa pulang semua orang.",
    story: [
      "Pesta ulang tahun punya energi yang berbeda dari acara formal. Tamunya saling kenal, jadi booth kami jarang sepi: satu grup masuk, foto empat pose, tertawa melihat hasilnya, lalu menarik grup berikutnya. Crew kami terbiasa menjaga suasana itu tetap mengalir tanpa perlu dipandu MC.",
      "Format 2R photostrip paling laris di acara ulang tahun karena bentuknya panjang, muat empat pose, dan pas diselipkan di dompet atau ditempel di cermin kamar. Frame-nya kami desain mengikuti tema pestamu, dari sweet seventeen sampai milad anak bertema kartun.",
    ],
    points: [
      {
        h: "Properti yang benar-benar dipakai",
        p: "Kami membawa properti yang diganti berkala dan dipilih menyesuaikan tema, bukan kotak berisi kacamata plastik yang sama sejak bertahun-tahun.",
      },
      {
        h: "Cetak tanpa batas",
        p: "Satu grup bisa berfoto berkali-kali dan setiap orang tetap pulang membawa lembarannya sendiri. Tidak ada hitungan per lembar.",
      },
      {
        h: "Cocok untuk segala umur",
        p: "Booth kami sudah dipakai untuk ulang tahun anak, sweet seventeen, milad keluarga, sampai reuni angkatan.",
      },
      {
        h: "Cetakan tahan lama",
        p: "Lapisan pelindungnya membuat cetakan tahan air dan sidik jari, jadi tetap bagus meski dipegang tamu bergantian sepanjang malam.",
      },
    ],
    gallery: "bday",
    faq: [
      {
        q: "Berapa durasi yang cukup untuk pesta ulang tahun?",
        a: "Dua sampai tiga jam biasanya sudah cukup untuk pesta dengan 50 sampai 150 tamu. Kalau acaranya berlangsung sampai larut, jam extend bisa ditambahkan langsung di hari-H.",
      },
      {
        q: "Bisa untuk ulang tahun di rumah?",
        a: `Bisa. Kami hanya butuh area sekitar ${AREA_CLASSIC} dan satu sumber listrik. Banyak acara ulang tahun yang kami kerjakan berlangsung di ruang tamu atau halaman rumah.`,
      },
      {
        q: "Frame-nya bisa disesuaikan tema pesta?",
        a: "Selalu, dan tanpa biaya tambahan. Kirimkan tema, warna, atau desain undanganmu, lalu kami desain ulang frame cetakannya sebelum hari-H.",
      },
      {
        q: "Ada pilihan selain cetak foto?",
        a: "Ada. Keychain station membuat tamu bisa membawa pulang gantungan kunci berisi fotonya sendiri, dan 360° spin booth merekam video pendek yang langsung bisa dibagikan ke media sosial.",
      },
    ],
  },
  {
    slug: "wisuda",
    name: "Wisuda",
    title: "Sewa Photobooth Wisuda & Graduation",
    description:
      "Sewa photobooth wisuda di Bogor & Jabodetabek. Cetak instan unlimited untuk ratusan siswa dan orang tua, frame bertema almamater, dan softfile realtime lewat QR code.",
    h1Tail: "Wisuda",
    lead: "Wisuda berarti ratusan orang ingin berfoto dalam waktu yang sama sempitnya. Booth kami dirancang agar antrean tetap jalan dan tidak ada yang pulang tanpa cetakan.",
    story: [
      "Acara wisuda sekolah adalah ujian kecepatan. Setelah prosesi selesai, hampir semua siswa dan orang tua bergerak serentak mencari tempat berfoto. Kami menyiapkan alur booth untuk beban itu: cetakan keluar sekitar sepuluh detik, crew mengarahkan grup berikutnya sementara lembaran sebelumnya masih dicetak.",
      "Frame cetakannya kami desain dengan logo dan warna almamater, plus nama angkatan, sehingga cetakan yang dibawa pulang terasa resmi dan layak disimpan, bukan sekadar foto biasa. Panitia juga menerima seluruh file dokumentasi setelah acara.",
    ],
    points: [
      {
        h: "Dirancang untuk antrean panjang",
        p: "Satu booth sanggup melayani ratusan cetakan dalam beberapa jam, dan untuk angkatan besar kami bisa menyiapkan lebih dari satu titik.",
      },
      {
        h: "Frame bertema almamater",
        p: "Logo sekolah, warna angkatan, dan nama acara masuk ke desain frame tanpa biaya tambahan.",
      },
      {
        h: "Softfile untuk seluruh angkatan",
        p: "Setiap siswa bisa mengunduh file digitalnya lewat QR code, dan panitia menerima seluruh dokumentasi dalam flashdisk setelah acara.",
      },
      {
        h: "Terbiasa di aula sekolah",
        p: "Kami sudah biasa bekerja di aula, lapangan beratap, dan gedung serbaguna dengan keterbatasan listrik maupun ruang.",
      },
    ],
    gallery: "grad",
    faq: [
      {
        q: "Berapa booth yang dibutuhkan untuk wisuda satu angkatan?",
        a: "Satu booth cukup untuk angkatan sampai sekitar 200 orang dengan durasi tiga jam. Di atas itu, dua titik booth membuat antrean jauh lebih nyaman. Sebutkan jumlah siswanya dan kami bantu hitungkan.",
      },
      {
        q: "Bisa menerima invoice dan penawaran resmi untuk sekolah?",
        a: "Bisa. Kami terbiasa melayani sekolah dan kampus, termasuk penawaran tertulis dan invoice untuk keperluan administrasi panitia.",
      },
      {
        q: "Apakah orang tua juga boleh ikut berfoto?",
        a: "Tentu, dan biasanya justru itu bagian yang paling ramai. Cetakannya unlimited, jadi siswa, orang tua, maupun guru bisa berfoto berkali-kali.",
      },
      {
        q: "Bagaimana kalau listrik di aula terbatas?",
        a: "Sebutkan sejak awal dan kami sesuaikan konfigurasi perangkatnya. Kebutuhan daya kami tidak besar, tapi lebih baik kami tahu sebelum hari-H daripada menyesuaikan di lokasi.",
      },
    ],
  },
  {
    slug: "corporate-event",
    name: "Corporate Event",
    title: "Sewa Photobooth Corporate Event",
    description:
      "Sewa photobooth corporate event di Bogor & Jabodetabek. Frame ber-branding perusahaan, cetak instan unlimited, dan laporan dokumentasi lengkap untuk gathering, award night, sampai brand activation.",
    h1Tail: "Corporate",
    lead: "Di acara perusahaan, cetakan photobooth adalah media yang dibawa pulang karyawan dan pengunjung, lengkap dengan logo dan pesan kampanyemu di tiap lembarnya.",
    story: [
      "Kami sudah menangani gathering karyawan, malam penghargaan, peluncuran produk, dan brand activation di mal. Kebutuhannya berbeda dari acara keluarga: brand guideline harus dipatuhi, jadwalnya ketat, dan panitia butuh dokumentasi yang rapi setelah acara selesai.",
      "Frame cetakan kami susun mengikuti aset brand yang kamu kirim, dari logo, warna, sampai tagline kampanye. Hasilnya, setiap lembar yang dibawa pulang berfungsi sebagai media cetak berjalan, dan seluruh file dokumentasinya kami serahkan lengkap setelah acara.",
    ],
    points: [
      {
        h: "Frame sesuai brand guideline",
        p: "Kirimkan logo dan panduan warnanya, lalu desain frame kami sesuaikan dan kami kirimkan untuk disetujui sebelum hari-H.",
      },
      {
        h: "Dokumentasi lengkap untuk laporan",
        p: "Seluruh file diserahkan dalam flashdisk, siap dipakai panitia untuk laporan kegiatan maupun konten media sosial perusahaan.",
      },
      {
        h: "Administrasi yang rapi",
        p: "Penawaran tertulis, invoice, dan kelengkapan dokumen vendor kami siapkan tanpa perlu diminta berkali-kali.",
      },
      {
        h: "Crew yang paham acara formal",
        p: "Dua crew kami menjaga booth tetap rapi dan mengikuti rundown panitia, termasuk saat harus berhenti selama sesi sambutan.",
      },
    ],
    gallery: "corp",
    faq: [
      {
        q: "Apakah desain frame bisa mengikuti brand guideline perusahaan?",
        a: "Bisa, dan itu memang standar kami. Kirimkan logo beserta panduan warna dan tipografinya, lalu kami kirimkan draf desain untuk disetujui sebelum hari-H.",
      },
      {
        q: "Bisa menerbitkan invoice dan dokumen vendor?",
        a: "Bisa. Kami terbiasa melengkapi persyaratan administrasi perusahaan, termasuk penawaran tertulis, invoice, dan dokumen legalitas vendor.",
      },
      {
        q: "Cocok untuk brand activation di mal atau pameran?",
        a: "Sangat cocok. Untuk aktivasi, 360° spin booth biasanya paling efektif karena videonya langsung dibagikan pengunjung ke media sosial, dan jangkauannya jauh melebihi jumlah orang yang hadir.",
      },
      {
        q: "Berapa durasi yang biasa diambil untuk acara kantor?",
        a: "Gathering dan malam penghargaan umumnya mengambil empat sampai enam jam. Untuk aktivasi yang berlangsung sepanjang hari, paket delapan jam adalah pilihan yang paling masuk akal.",
      },
    ],
  },
  {
    slug: "360-spin-booth",
    name: "360° Spin Booth",
    title: "Sewa 360 Photobooth Bogor & Jabodetabek",
    description:
      "Sewa 360 photobooth di Bogor & Jabodetabek. Lengan kamera berputar merekam video slow motion yang langsung dibagikan tamu lewat QR code — paling efektif untuk aktivasi brand dan pesta.",
    h1Tail: "360°",
    lead: "Kamera berputar mengelilingi tamu dan merekam beberapa detik slow motion. Hasilnya video pendek yang hampir selalu langsung diunggah, jauh sebelum acaramu selesai.",
    story: [
      "360° spin booth bekerja dengan lengan kamera yang mengitari platform kecil berisi dua sampai empat orang. Rekamannya diproses menjadi klip slow motion bermusik dalam hitungan detik, lalu tamu mengunduhnya lewat QR code tanpa perlu menunggu crew.",
      "Kekuatannya ada pada penyebaran. Satu tamu yang mengunggah klipnya ke Instagram atau TikTok membawa acaramu ke ratusan orang yang tidak hadir, dan itulah alasan format ini paling sering diambil untuk brand activation, ulang tahun remaja, dan after party pernikahan.",
    ],
    points: [
      {
        h: "Video siap unggah",
        p: "Klip keluar dalam format vertikal dengan musik dan efek slow motion, langsung sesuai kebutuhan Instagram Reels maupun TikTok.",
      },
      {
        h: "Dibagikan tanpa antre",
        p: "Tamu memindai QR code dan mengunduh videonya sendiri, jadi tidak ada penumpukan di depan booth.",
      },
      {
        h: "Overlay sesuai tema",
        p: "Logo, nama acara, atau tagar kampanye bisa ditempelkan pada setiap klip yang dihasilkan.",
      },
      {
        h: "Bisa digabung cetak instan",
        p: "Banyak klien menggabungkan 360° spin booth dengan photobooth cetak, supaya tamu pulang membawa video sekaligus lembaran fisik.",
      },
    ],
    gallery: null,
    faq: [
      {
        q: "Berapa harga sewa 360 photobooth?",
        a: "Paket 360° Spin Video Booth dimulai dari Rp 2.500.000 untuk dua jam unlimited. Rincian tiap durasi kami kirim lewat WhatsApp.",
      },
      {
        q: "Butuh ruang seberapa luas?",
        a: "Sekitar 3×3 meter dengan langit-langit yang cukup tinggi, karena lengan kameranya berputar penuh mengelilingi platform. Satu sumber listrik sudah cukup.",
      },
      {
        q: "Berapa orang yang muat dalam satu putaran?",
        a: "Dua sampai empat orang, tergantung seberapa aktif mereka bergerak. Untuk hasil terbaik, dua orang per putaran memberi ruang gerak yang paling leluasa.",
      },
      {
        q: "Apakah tamu tetap dapat cetakan fisik?",
        a: "Paket 360° menghasilkan video, bukan cetakan. Kalau tamu ingin membawa pulang lembaran fisik juga, gabungkan dengan paket Unlimited Photobooth dalam satu acara.",
      },
    ],
  },
];

export function getEvent(slug: string): EventKind | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
