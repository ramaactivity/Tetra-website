// Area landing pages — satu halaman per kota layanan (SEO lokal).
// Konten tiap kota ditulis unik (bukan template ganti-nama-kota) supaya tetap
// bernilai untuk pembaca dan aman dari kebijakan doorway-page Google.
// Fakta yang dipakai di sini harus konsisten dengan klaim di homepage:
// basis Bogor, transport gratis se-Jabodetabek, setup ±1 jam sebelum acara,
// butuh listrik + area ±3×3 m.

export interface AreaFaq {
  q: string;
  a: string;
}

export interface AreaPrint {
  src: string;
  alt: string;
}

export interface Area {
  slug: string;
  /** Slug induk untuk sub-area (mis. "bogor"). Kosong = kota utama. */
  parent?: string;
  /** Nama kota untuk heading & copy */
  name: string;
  /** Meta title (template layout menambahkan "— Tetra Photobooth") */
  title: string;
  description: string;
  /** Kata bergaya italic-gold di ujung H1 */
  h1Tail: string;
  lead: string;
  story: [string, string];
  points: { h: string; p: string }[];
  prints: AreaPrint[];
  faq: AreaFaq[];
  /** Kalimat pembuka chat WhatsApp dari halaman ini */
  waIntro: string;
}

export const AREAS: Area[] = [
  {
    slug: "bogor",
    name: "Bogor",
    title: "Sewa Photobooth Bogor",
    description:
      "Sewa photobooth di Bogor langsung dari basisnya: tanpa biaya transport, respon cepat, cetak instan unlimited, dan frame custom untuk wedding, wisuda, ulang tahun, sampai corporate event.",
    h1Tail: "Bogor",
    lead: "Basis kami memang di Bogor. Dari sinilah tim, kamera, dan printer kami berangkat ke ratusan acara, jadi untuk acaramu di kota hujan, kamilah yang paling dekat.",
    story: [
      "Sewa photobooth di Bogor bersama Tetra berarti tanpa biaya transport sama sekali, jadwal yang lebih fleksibel, dan tim yang hafal medannya: gedung pertemuan di tengah kota, aula sekolah, sampai venue ke arah Sentul dan Puncak.",
      "Semua paket sudah lengkap: cetak unlimited sekitar 10 detik per lembar, dua kru profesional, properti, dan frame yang kami desain ulang mengikuti tema acaramu. Kamu cukup menyiapkan listrik dan area sekitar 3×3 meter.",
    ],
    points: [
      {
        h: "Tanpa biaya transport",
        p: "Kota maupun kabupaten Bogor, semua kami datangi tanpa biaya perjalanan. Yang kamu bayar hanya paketnya.",
      },
      {
        h: "Paling cepat sampai",
        p: "Karena berangkat dari Bogor, tim kami tiba lebih awal dan booth siap sekitar satu jam sebelum tamu pertama datang.",
      },
      {
        h: "Terbiasa segala acara",
        p: "Wisuda sekolah, pernikahan keluarga, sampai gathering perusahaan di Bogor sudah jadi keseharian kami.",
      },
    ],
    prints: [
      { src: "/images/g-grad1.jpg", alt: "Cetakan photobooth wisuda sekolah di Bogor" },
      { src: "/images/g-corp1.jpg", alt: "Photobooth corporate event dengan cetak 4R" },
      { src: "/images/g-grad2.jpg", alt: "Hasil photobooth acara wisuda" },
    ],
    faq: [
      {
        q: "Apakah ada biaya transport untuk area Bogor?",
        a: "Tidak ada. Bogor adalah basis kami, jadi kota dan kabupaten Bogor bebas biaya perjalanan, termasuk arah Sentul, Cibinong, dan Ciawi.",
      },
      {
        q: "Bisa untuk venue ke arah Puncak?",
        a: "Bisa. Untuk venue pegunungan kami hanya minta info lokasi lebih awal supaya tim berangkat lebih pagi dan booth tetap siap sebelum acara mulai.",
      },
      {
        q: "Kapan sebaiknya booking untuk acara di Bogor?",
        a: "Idealnya dua sampai empat minggu sebelum hari-H supaya tanggalmu aman dan frame sempat kami desain sesuai tema. Tanggal mepet tetap boleh ditanyakan, siapa tahu masih kosong.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di Bogor.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
  {
    slug: "jakarta",
    name: "Jakarta",
    title: "Sewa Photobooth Jakarta",
    description:
      "Sewa photobooth di Jakarta dengan transport gratis: cetak instan unlimited, frame custom, dan kru berpengalaman untuk wedding, corporate event, dan brand activation.",
    h1Tail: "Jakarta",
    lead: "Dari ballroom hotel sampai lantai kantor, Jakarta adalah rute yang paling sering kami tempuh setelah Bogor. Transportnya gratis, standarnya sama persis.",
    story: [
      "Untuk acara di Jakarta, Tetra paling sering dipanggil ke corporate event, brand activation, dan wedding. Instansi dan brand yang pernah merayakan bersama kami bisa kamu lihat di halaman utama; sebagian besar acaranya berlangsung di ibu kota.",
      "Kami tiba sekitar satu jam sebelum acara, membawa semua kebutuhan sendiri, dan tamu bisa langsung membawa pulang cetakan sekitar 10 detik setelah berpose. Softfile-nya terkirim ke HP lewat QR, siap diunggah sebelum acara selesai.",
    ],
    points: [
      {
        h: "Transport gratis se-DKI",
        p: "Dari Jakarta Pusat sampai Kepulauan Seribu bagian kota, tidak ada biaya perjalanan tambahan.",
      },
      {
        h: "Terbiasa protokol gedung",
        p: "Loading dock, izin vendor, jam masuk ballroom: kru kami sudah terbiasa mengurusnya, kamu tidak perlu repot.",
      },
      {
        h: "Cocok untuk brand",
        p: "Frame, layout cetak, sampai properti bisa mengikuti identitas brand untuk activation dan gathering kantor.",
      },
    ],
    prints: [
      { src: "/images/g-corp2.jpg", alt: "Photobooth corporate event instansi di Jakarta" },
      { src: "/images/g-strip3.jpg", alt: "Photo strip brand activation dengan frame custom" },
      { src: "/images/g-corp4.jpg", alt: "Cetakan photobooth malam penghargaan" },
    ],
    faq: [
      {
        q: "Apakah ada biaya transport untuk Jakarta?",
        a: "Tidak ada. Seluruh wilayah DKI Jakarta termasuk area transport gratis kami, sama seperti kota Jabodetabek lainnya.",
      },
      {
        q: "Bisa handle acara kantor dan brand activation?",
        a: "Sangat bisa. Frame kami desain mengikuti brand guideline, dan kru kami terbiasa dengan jadwal ketat serta protokol gedung perkantoran dan hotel.",
      },
      {
        q: "Berapa lama sebelum acara tim datang?",
        a: "Sekitar satu jam sebelum acara dimulai booth sudah berdiri dan diuji. Untuk gedung dengan antrean loading dock, kami berangkat lebih awal lagi.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di Jakarta.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
  {
    slug: "depok",
    name: "Depok",
    title: "Sewa Photobooth Depok",
    description:
      "Sewa photobooth di Depok tanpa biaya transport: cetak unlimited 10 detik, frame custom gratis, dan softfile realtime untuk wedding, wisuda kampus, dan ulang tahun.",
    h1Tail: "Depok",
    lead: "Depok itu tetangga dekat: berangkat dari Bogor, tim kami sampai dalam hitungan menit ke Margonda maupun Sawangan. Dekat, gratis transport, dan tanpa drama.",
    story: [
      "Acara di Depok punya rentang yang luas: wisuda dan acara kampus, intimate wedding di rumah keluarga, sampai ulang tahun anak. Karena jaraknya dekat dari basis kami, jadwal sore atau malam pun tetap nyaman kami layani.",
      "Seperti di kota lain, paketnya sudah lengkap: cetak unlimited, dua kru, properti, frame custom, dan galeri digital lewat QR. Cukup siapkan meja, dua kursi, dan colokan listrik.",
    ],
    points: [
      {
        h: "Tetangga sebelah",
        p: "Margonda, Cimanggis, Cinere, sampai Sawangan semuanya dekat dari Bogor. Transport tetap gratis.",
      },
      {
        h: "Pas untuk acara kampus",
        p: "Wisuda, seminar, dan malam keakraban: format photo strip 2R yang hemat dan seru jadi favorit anak kampus.",
      },
      {
        h: "Fleksibel di rumah",
        p: "Booth kami cukup dengan area 3×3 meter, jadi halaman atau garasi rumah untuk acara keluarga pun muat.",
      },
    ],
    prints: [
      { src: "/images/g-wed4.jpg", alt: "Cetakan photobooth pernikahan format 4R" },
      { src: "/images/g-bday1.jpg", alt: "Photobooth ulang tahun sweet seventeen" },
      { src: "/images/g-strip1.jpg", alt: "Photo strip acara reuni dengan frame custom" },
    ],
    faq: [
      {
        q: "Apakah Depok kena biaya transport?",
        a: "Tidak. Depok termasuk area transport gratis kami, dari ujung Margonda sampai Sawangan.",
      },
      {
        q: "Bisa untuk acara di rumah?",
        a: "Bisa sekali. Kami hanya butuh area sekitar 3×3 meter dekat sumber listrik, satu meja, dan dua kursi. Sisanya kami yang bawa.",
      },
      {
        q: "Format apa yang cocok untuk wisuda?",
        a: "Photo strip 2R paling ramai dipilih karena satu sesi menghasilkan dua strip kembar, satu untuk dibawa pulang, satu untuk ditempel di album angkatan.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di Depok.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
  {
    slug: "tangerang",
    name: "Tangerang",
    title: "Sewa Photobooth Tangerang",
    description:
      "Sewa photobooth di Tangerang, BSD, Gading Serpong & Alam Sutera dengan transport gratis: cetak instan unlimited, frame custom, dan kru profesional untuk wedding dan gathering.",
    h1Tail: "Tangerang",
    lead: "Tangerang Raya, dari kota sampai BSD, Gading Serpong, dan Alam Sutera, semuanya masuk rute reguler kami. Jauh di peta, dekat di hati, gratis di transport.",
    story: [
      "Venue di Tangerang berkembang cepat: cluster dan clubhouse, restoran semi-outdoor, sampai ballroom baru di BSD dan Gading Serpong. Booth kami ringkas dan rapi dipasang, cocok untuk venue modern yang menjaga estetika ruangannya.",
      "Untuk wedding, frame kami desain menyatu dengan tema dekorasi. Untuk gathering kantor dan komunitas, layout cetak bisa memuat logo dan tagline acaramu. Semua tetap dengan cetak unlimited dan softfile realtime.",
    ],
    points: [
      {
        h: "Se-Tangerang Raya",
        p: "Kota Tangerang, Tangerang Selatan, BSD, Gading Serpong, Alam Sutera, sampai Bintaro, semuanya bebas biaya transport.",
      },
      {
        h: "Rapi di venue modern",
        p: "Instalasi booth kami ringkas dan bersih, menyatu dengan dekorasi tanpa kabel berantakan.",
      },
      {
        h: "Frame senada dekorasi",
        p: "Kirimkan tema dan palet warnamu, desainer kami membuat frame yang terasa satu paket dengan venue.",
      },
    ],
    prints: [
      { src: "/images/g-wed5.jpg", alt: "Cetakan photobooth wedding format 4R" },
      { src: "/images/g-wed9.jpg", alt: "Hasil photobooth pernikahan dengan frame custom" },
      { src: "/images/g-bday3.jpg", alt: "Photo strip 2R acara ulang tahun" },
    ],
    faq: [
      {
        q: "BSD dan Gading Serpong kena biaya transport?",
        a: "Tidak. Seluruh Tangerang Raya termasuk BSD, Gading Serpong, Alam Sutera, dan Bintaro masuk area transport gratis kami.",
      },
      {
        q: "Bisa pasang di venue semi-outdoor?",
        a: "Bisa, selama area booth terlindung dari hujan dan ada sumber listrik. Lighting kami sudah siap untuk kondisi cahaya sore sampai malam.",
      },
      {
        q: "Booking-nya berapa lama sebelum acara?",
        a: "Dua sampai empat minggu sebelumnya paling ideal, apalagi untuk tanggal akhir pekan di musim wedding. Chat admin untuk cek tanggalmu.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di Tangerang.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
  {
    slug: "bekasi",
    name: "Bekasi",
    title: "Sewa Photobooth Bekasi",
    description:
      "Sewa photobooth di Bekasi dan Cikarang dengan transport gratis: cetak instan unlimited, frame custom gratis, dan dua kru profesional untuk wedding, ulang tahun, dan acara kantor.",
    h1Tail: "Bekasi",
    lead: "Kota Bekasi, kabupaten, sampai kawasan Cikarang: semua kami layani dengan paket yang sama lengkapnya dan transport yang sama gratisnya.",
    story: [
      "Di Bekasi, panggilan kami berimbang antara acara keluarga dan acara kantor: pernikahan di gedung serbaguna, ulang tahun di rumah, sampai gathering dan family day perusahaan kawasan industri Cikarang.",
      "Booth berdiri sekitar satu jam sebelum acara, tamu tinggal berpose, dan cetakan keluar sekitar 10 detik dengan lapisan pelindung yang tahan air dan tidak mudah pudar. Semua softfile terkumpul rapi di galeri digital yang bisa dibagikan lewat QR.",
    ],
    points: [
      {
        h: "Sampai Cikarang",
        p: "Kota dan kabupaten Bekasi termasuk kawasan Cikarang, semuanya tanpa biaya perjalanan.",
      },
      {
        h: "Andalan family day",
        p: "Cetak unlimited artinya seluruh karyawan dan keluarganya bisa foto berkali-kali tanpa hitung-hitungan.",
      },
      {
        h: "Awet untuk kenangan",
        p: "Cetakan berlapis pelindung: tahan air, tahan sidik jari, dan warnanya bertahan bertahun-tahun.",
      },
    ],
    prints: [
      { src: "/images/g-corp3.jpg", alt: "Photobooth gathering perusahaan format 4R" },
      { src: "/images/g-wed8.jpg", alt: "Cetakan photobooth pernikahan dengan frame custom" },
      { src: "/images/g-corp6.jpg", alt: "Photo strip acara tahun baru hotel" },
    ],
    faq: [
      {
        q: "Cikarang termasuk area gratis transport?",
        a: "Termasuk. Kota Bekasi, kabupaten, dan kawasan Cikarang semuanya kami datangi tanpa biaya perjalanan.",
      },
      {
        q: "Bisa untuk family day perusahaan?",
        a: "Bisa dan sering. Cetak unlimited cocok untuk acara ramai, dan layout cetak bisa memuat logo perusahaan. Untuk estimasi antrean, ceritakan perkiraan jumlah tamu ke admin.",
      },
      {
        q: "Acara malam hari bisa?",
        a: "Bisa. Lighting studio kami membuat hasil foto tetap terang dan tajam meski acara berlangsung malam di dalam maupun luar ruangan yang terlindung.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di Bekasi.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
  {
    slug: "sentul",
    parent: "bogor",
    name: "Sentul",
    title: "Sewa Photobooth Sentul",
    description:
      "Sewa photobooth di Sentul dan Sentul City tanpa biaya transport. Cetak instan unlimited, frame custom, dan crew yang hafal venue-venue di kawasan ini.",
    h1Tail: "Sentul",
    lead: "Sentul penuh venue dengan pemandangan bukit dan ruang terbuka yang lapang. Kami sudah sering bekerja di sana, jadi tahu di mana booth sebaiknya berdiri agar tidak kalah oleh cahaya sore.",
    story: [
      "Sentul dan Sentul City hanya sekitar setengah jam dari basis kami, jadi untuk acara di kawasan ini kami tidak menarik biaya transport sama sekali. Tim biasanya berangkat pagi dan booth sudah siap sekitar satu jam sebelum tamu pertama datang.",
      "Sebagian besar venue di Sentul memadukan ruang dalam dan luar ruangan. Kami membawa lighting studio sendiri, jadi hasil cetakan tetap terang dan tajam baik ketika booth berdiri di ballroom tertutup maupun di teras yang menghadap bukit.",
    ],
    points: [
      {
        h: "Tanpa biaya transport",
        p: "Sentul, Sentul City, dan Babakan Madang masuk area bebas biaya perjalanan karena masih wilayah Kabupaten Bogor.",
      },
      {
        h: "Siap untuk venue outdoor",
        p: "Lighting studio kami membuat cetakan tetap bersih meski booth berdiri di area semi-terbuka menjelang senja.",
      },
      {
        h: "Hafal aksesnya",
        p: "Tim kami terbiasa dengan jalur masuk kawasan Sentul City dan aturan loading venue-venue besarnya.",
      },
    ],
    prints: [
      { src: "/images/g-wed5.jpg", alt: "Cetakan photobooth pernikahan di venue kawasan Sentul" },
      { src: "/images/g-corp2.jpg", alt: "Photobooth gathering perusahaan di Sentul" },
      { src: "/images/g-wed6.jpg", alt: "Hasil cetak photobooth 2R acara pernikahan" },
    ],
    faq: [
      {
        q: "Apakah Sentul kena biaya transport?",
        a: "Tidak. Sentul dan Sentul City masih Kabupaten Bogor, jadi masuk area bebas biaya perjalanan sama seperti kota Bogor.",
      },
      {
        q: "Bisa untuk acara outdoor di area bukit?",
        a: "Bisa, selama ada sumber listrik dan area sekitar 3×3 meter yang terlindung dari hujan. Beri tahu kami kalau lokasinya benar-benar terbuka supaya tim membawa penutup tambahan untuk printer.",
      },
      {
        q: "Berapa lama setup di venue Sentul?",
        a: "Sekitar satu jam sebelum acara mulai. Untuk venue dengan akses loading yang jauh dari titik booth, tim kami datang lebih awal lagi.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di Sentul.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
  {
    slug: "cibinong",
    parent: "bogor",
    name: "Cibinong",
    title: "Sewa Photobooth Cibinong",
    description:
      "Sewa photobooth di Cibinong tanpa biaya transport. Cetak instan unlimited untuk resepsi gedung, wisuda sekolah, dan acara kantor pemerintahan di sekitar Cibinong.",
    h1Tail: "Cibinong",
    lead: "Cibinong sibuk oleh resepsi gedung dan acara instansi. Dua-duanya butuh booth yang cepat dan crew yang tidak perlu dipandu, dan itulah cara kami bekerja.",
    story: [
      "Cibinong dekat sekali dari basis kami, jadi tidak ada biaya transport dan jadwal kami jauh lebih fleksibel di sana, termasuk untuk permintaan yang datang mendadak. Kawasan ini juga padat gedung pertemuan, sehingga tim kami sudah hafal pola loading dan pembagian ruangnya.",
      "Banyak acara di Cibinong adalah resepsi dengan tamu yang datang bergelombang, atau kegiatan instansi dengan rundown ketat. Cetakan kami keluar sekitar sepuluh detik per lembar supaya antrean tidak pernah menahan jalannya acara, dan crew kami terbiasa menyesuaikan diri dengan panitia.",
    ],
    points: [
      {
        h: "Paling dekat dari basis",
        p: "Cibinong hanya beberapa menit dari titik berangkat kami, jadi bebas biaya transport dan mudah untuk jadwal mendadak.",
      },
      {
        h: "Terbiasa di gedung pertemuan",
        p: "Kami sudah sering bekerja di gedung serbaguna dan aula instansi di sekitar Cibinong, termasuk yang ruang boothnya terbatas.",
      },
      {
        h: "Dokumen resmi tersedia",
        p: "Untuk acara sekolah maupun instansi, penawaran tertulis dan invoice kami siapkan tanpa perlu diminta berulang.",
      },
    ],
    prints: [
      { src: "/images/g-corp4.jpg", alt: "Photobooth acara instansi di Cibinong" },
      { src: "/images/g-grad1.jpg", alt: "Cetakan photobooth wisuda sekolah" },
      { src: "/images/g-wed8.jpg", alt: "Hasil photobooth resepsi pernikahan di gedung" },
    ],
    faq: [
      {
        q: "Apakah ada biaya transport untuk Cibinong?",
        a: "Tidak ada. Cibinong masuk Kabupaten Bogor dan merupakan salah satu area terdekat dari basis kami.",
      },
      {
        q: "Bisa dipesan mendadak untuk acara minggu ini?",
        a: "Sering bisa, justru karena jaraknya dekat. Chat admin kami dengan tanggalnya, dan kalau slotnya kosong, frame custom tetap sempat kami desain.",
      },
      {
        q: "Melayani acara dinas dan sekolah negeri?",
        a: "Ya. Kami terbiasa melengkapi penawaran tertulis, invoice, dan dokumen vendor untuk kebutuhan administrasi panitia.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di Cibinong.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
  {
    slug: "puncak-cisarua",
    parent: "bogor",
    name: "Puncak & Cisarua",
    title: "Sewa Photobooth Puncak & Cisarua",
    description:
      "Sewa photobooth untuk acara di Puncak, Cisarua, dan Megamendung. Cetak instan unlimited di villa dan resort pegunungan, dengan tim yang berangkat lebih awal agar booth siap tepat waktu.",
    h1Tail: "Puncak",
    lead: "Acara di Puncak hampir selalu berarti villa, resort, atau ruang terbuka yang dingin dan lembap. Kami menyiapkan perangkat dan jadwal berangkat dengan memperhitungkan itu semua.",
    story: [
      "Kawasan Puncak, Cisarua, dan Megamendung ramai oleh gathering perusahaan, retreat, dan pernikahan intim di villa. Tantangan terbesarnya bukan jaraknya, melainkan lalu lintas dan sistem buka-tutup jalurnya, jadi tim kami selalu berangkat jauh lebih awal agar booth tetap siap satu jam sebelum acara.",
      "Udara pegunungan yang lembap bisa mempengaruhi kertas cetak, maka perangkat dan bahan kami simpan dalam wadah tertutup sampai menjelang pemakaian. Hasilnya cetakan tetap kering, tajam, dan tahan lama meski acaranya berlangsung di teras terbuka.",
    ],
    points: [
      {
        h: "Berangkat lebih awal",
        p: "Kami memperhitungkan buka-tutup jalur Puncak sejak awal, jadi keterlambatan lalu lintas tidak pernah jadi urusanmu.",
      },
      {
        h: "Siap untuk udara lembap",
        p: "Kertas dan perangkat kami simpan tertutup sampai menjelang dipakai, supaya cetakan tidak melengkung atau buram.",
      },
      {
        h: "Cocok untuk villa dan resort",
        p: "Booth kami muat di teras maupun ruang keluarga villa, cukup dengan area sekitar 3×3 meter dan satu sumber listrik.",
      },
    ],
    prints: [
      { src: "/images/g-corp6.jpg", alt: "Photobooth gathering perusahaan di villa kawasan Puncak" },
      { src: "/images/g-wed3.jpg", alt: "Cetakan photobooth pernikahan intim di resort" },
      { src: "/images/g-strip1.jpg", alt: "Photostrip 2R hasil photobooth acara kumpul keluarga" },
    ],
    faq: [
      {
        q: "Apakah Puncak kena biaya transport?",
        a: "Puncak dan Cisarua masuk Kabupaten Bogor, jadi bebas biaya transport. Kami hanya minta info lokasi lebih awal supaya tim bisa berangkat sebelum jalur ramai.",
      },
      {
        q: "Bagaimana kalau acaranya di villa tanpa ballroom?",
        a: "Tidak masalah. Booth kami hanya butuh area sekitar 3×3 meter, dan sering kami pasang di teras atau ruang keluarga villa.",
      },
      {
        q: "Cetakan aman di udara dingin dan lembap?",
        a: "Aman. Bahan cetak kami simpan tertutup sampai dipakai, dan lapisan pelindung di permukaannya membuat hasilnya tahan air maupun sidik jari.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di kawasan Puncak/Cisarua.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
  {
    slug: "cileungsi",
    parent: "bogor",
    name: "Cileungsi",
    title: "Sewa Photobooth Cileungsi",
    description:
      "Sewa photobooth di Cileungsi, Gunung Putri, dan Jonggol tanpa biaya transport. Cetak instan unlimited untuk resepsi, ulang tahun, dan acara pabrik di Bogor timur.",
    h1Tail: "Cileungsi",
    lead: "Cileungsi berada di perbatasan Bogor dan Bekasi, dan kami melayaninya sebagai area Bogor: tanpa biaya transport, dengan jadwal yang tetap longgar.",
    story: [
      "Bogor timur, mulai Cileungsi, Gunung Putri, sampai Jonggol, punya campuran acara yang menarik: resepsi keluarga di gedung, pesta ulang tahun di rumah, dan gathering karyawan di kawasan industri. Semuanya kami layani dari basis Bogor tanpa biaya perjalanan.",
      "Untuk acara pabrik dan kawasan industri, kami terbiasa dengan prosedur izin masuk dan jadwal loading yang lebih ketat. Sebutkan saja ketentuan venue-nya sejak awal, dan tim kami menyesuaikan waktu kedatangan supaya booth tetap siap sebelum acara dimulai.",
    ],
    points: [
      {
        h: "Dihitung sebagai area Bogor",
        p: "Meski dekat perbatasan Bekasi, Cileungsi dan sekitarnya tetap bebas biaya transport karena masih Kabupaten Bogor.",
      },
      {
        h: "Terbiasa acara kawasan industri",
        p: "Kami paham prosedur izin masuk dan jadwal loading pabrik, jadi tidak ada waktu terbuang di pos keamanan.",
      },
      {
        h: "Dari rumah sampai gedung",
        p: "Booth kami sama mudahnya dipasang di halaman rumah maupun di aula gedung pertemuan.",
      },
    ],
    prints: [
      { src: "/images/g-bday1.jpg", alt: "Photobooth pesta ulang tahun di rumah kawasan Cileungsi" },
      { src: "/images/g-corp5.jpg", alt: "Photobooth gathering karyawan kawasan industri" },
      { src: "/images/g-wed9.jpg", alt: "Cetakan photobooth resepsi pernikahan di gedung" },
    ],
    faq: [
      {
        q: "Cileungsi masuk area Bogor atau Bekasi?",
        a: "Kami menghitungnya sebagai Bogor, jadi bebas biaya transport. Begitu juga Gunung Putri, Jonggol, dan Citeureup.",
      },
      {
        q: "Bisa untuk acara di dalam kawasan pabrik?",
        a: "Bisa. Kirimkan ketentuan izin masuk dan jam loading venue-nya, lalu kami sesuaikan waktu kedatangan tim.",
      },
      {
        q: "Bisa untuk acara kecil di rumah?",
        a: "Bisa. Kami hanya butuh area sekitar 3×3 meter dan satu sumber listrik, dan banyak acara rumahan yang kami kerjakan berlangsung di ruang tamu atau halaman.",
      },
    ],
    waIntro:
      "Halo Tetra Photobooth!\n\nSaya mau tanya paket photobooth untuk acara di Cileungsi.\nBoleh dibantu cek ketersediaan & rekomendasi paketnya?",
  },
];

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
