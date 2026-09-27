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
  },
  {
    slug: "ciawi",
    parent: "bogor",
    name: "Ciawi",
    title: "Sewa Photobooth Ciawi & Gadog",
    description:
      "Sewa photobooth di Ciawi, Gadog, dan Cipayung tanpa biaya transport. Cetak instan unlimited untuk resepsi gedung dan acara di venue kaki gunung, dengan tim yang datang sebelum jalur ramai.",
    h1Tail: "Ciawi",
    lead: "Ciawi adalah gerbangnya. Dari sini jalur bercabang ke Puncak, ke Sukabumi, dan kembali ke kota Bogor, dan kami sudah terbiasa menghitung waktu berangkat mengikuti ritmenya.",
    story: [
      "Ciawi, Gadog, dan Cipayung punya campuran venue yang khas kaki gunung: gedung pertemuan di pinggir jalur utama, restoran dengan area terbuka, dan vila berukuran sedang untuk resepsi keluarga. Semuanya masih Kabupaten Bogor, jadi tidak ada biaya transport sama sekali.",
      "Yang paling menentukan di area ini bukan jarak, melainkan jam. Akhir pekan membuat jalur exit tol Ciawi sampai Gadog padat sejak pagi, dan sistem buka-tutup bisa menggeser perjalanan berjam-jam. Tim kami berangkat jauh lebih awal supaya booth tetap siap sekitar satu jam sebelum tamu pertama datang.",
    ],
    points: [
      {
        h: "Tanpa biaya transport",
        p: "Ciawi, Gadog, Cipayung, dan Megamendung masuk Kabupaten Bogor, jadi bebas biaya perjalanan.",
      },
      {
        h: "Berangkat sebelum jalur padat",
        p: "Kami memperhitungkan buka-tutup jalur Puncak dan keramaian exit tol Ciawi sejak jauh hari, bukan di hari-H.",
      },
      {
        h: "Siap untuk venue semi-terbuka",
        p: "Banyak venue di Ciawi punya area terbuka. Lighting studio kami menjaga cetakan tetap terang meski acara berlanjut sampai senja.",
      },
    ],
    prints: [
      { src: "/images/g-wed7.jpg", alt: "Cetakan photobooth resepsi pernikahan di venue Ciawi" },
      { src: "/images/g-bday3.jpg", alt: "Photobooth acara keluarga di kawasan Gadog" },
      { src: "/images/g-strip2.jpg", alt: "Photostrip 2R hasil photobooth acara kumpul keluarga" },
    ],
    faq: [
      {
        q: "Apakah Ciawi kena biaya transport?",
        a: "Tidak. Ciawi dan sekitarnya termasuk Gadog, Cipayung, dan Megamendung masih Kabupaten Bogor, jadi bebas biaya perjalanan.",
      },
      {
        q: "Bagaimana kalau acaranya bertepatan dengan akhir pekan yang macet?",
        a: "Justru itu yang kami antisipasi. Beri tahu jam mulai acaranya sejak awal, dan tim berangkat lebih pagi agar keterlambatan jalur tidak pernah jadi urusanmu.",
      },
      {
        q: "Bisa untuk resepsi di restoran atau vila kecil?",
        a: "Bisa. Booth kami hanya butuh area sekitar 3×3 meter dan satu sumber listrik, jadi muat di teras restoran maupun ruang keluarga vila.",
      },
    ],
  },
  {
    slug: "dramaga",
    parent: "bogor",
    name: "Dramaga",
    title: "Sewa Photobooth Dramaga & Bogor Barat",
    description:
      "Sewa photobooth di Dramaga dan Bogor Barat tanpa biaya transport. Cetak instan unlimited untuk wisuda, sidang, dan acara kampus di sekitar IPB, sampai resepsi keluarga di Ciampea dan Cibungbulang.",
    h1Tail: "Dramaga",
    lead: "Dramaga hidup oleh kalender kampus. Musim wisuda dan sidang membawa ratusan orang yang ingin berfoto dalam waktu yang sama sempitnya, dan booth kami memang dirancang untuk beban itu.",
    story: [
      "Kawasan Dramaga dan Bogor Barat berputar mengikuti ritme IPB. Wisuda, sidang, pelepasan angkatan, dan syukuran keluarga menumpuk di bulan-bulan tertentu, dan kami sudah terbiasa dengan pola antreannya: ramai serentak setelah prosesi, lalu mengalir sampai acara ditutup.",
      "Di luar kampus, Dramaga, Ciampea, dan Cibungbulang penuh resepsi keluarga yang berlangsung di rumah atau tenda halaman. Booth kami sama mudahnya dipasang di aula kampus maupun di halaman rumah, cukup dengan area sekitar 3×3 meter dan satu sumber listrik.",
    ],
    points: [
      {
        h: "Terbiasa musim wisuda",
        p: "Satu booth sanggup melayani ratusan cetakan dalam beberapa jam, dan untuk angkatan besar kami bisa menyiapkan lebih dari satu titik.",
      },
      {
        h: "Tanpa biaya transport",
        p: "Dramaga, Ciampea, Cibungbulang, dan sekitarnya masih Kabupaten Bogor, jadi bebas biaya perjalanan.",
      },
      {
        h: "Frame bertema almamater",
        p: "Logo kampus, warna angkatan, dan nama acara masuk ke desain frame tanpa biaya tambahan.",
      },
    ],
    prints: [
      { src: "/images/g-grad2.jpg", alt: "Cetakan photobooth wisuda kampus di kawasan Dramaga" },
      { src: "/images/g-grad1.jpg", alt: "Hasil photobooth acara wisuda dengan frame almamater" },
      { src: "/images/g-wed2.jpg", alt: "Photobooth resepsi pernikahan di Bogor Barat" },
    ],
    faq: [
      {
        q: "Bisa untuk acara wisuda dan sidang di kampus?",
        a: "Bisa, dan itu salah satu yang paling sering kami kerjakan di area ini. Sebutkan perkiraan jumlah pesertanya supaya kami bantu hitungkan durasi dan jumlah booth yang pas.",
      },
      {
        q: "Menerima pesanan dari himpunan atau panitia mahasiswa?",
        a: "Tentu. Kami menyiapkan penawaran tertulis dan invoice untuk keperluan laporan kepanitiaan tanpa perlu diminta berkali-kali.",
      },
      {
        q: "Apakah Dramaga kena biaya transport?",
        a: "Tidak. Dramaga dan Bogor Barat masih wilayah Bogor, jadi masuk area bebas biaya perjalanan.",
      },
    ],
  },
  {
    slug: "cibubur",
    parent: "depok",
    name: "Cibubur",
    title: "Sewa Photobooth Cibubur",
    description:
      "Sewa photobooth di Cibubur, Cimanggis, dan sekitarnya. Cetak instan unlimited untuk resepsi gedung, ulang tahun di cluster, dan gathering perusahaan di kawasan Cibubur.",
    h1Tail: "Cibubur",
    lead: "Cibubur duduk di pertemuan tiga wilayah sekaligus. Kami melayaninya dari sisi Bogor, jadi jaraknya dekat dan jadwal kami tetap longgar untuk acaramu di sana.",
    story: [
      "Cibubur adalah salah satu area yang paling sering ditanyakan ke kami setelah kota-kota besarnya sendiri. Wilayahnya menyambung dari Cimanggis di Depok, Jatisampurna di Bekasi, sampai Gunung Putri di Bogor, dan kami mendatanginya dari arah Bogor sehingga perjalanannya singkat.",
      "Acaranya beragam: resepsi di gedung pertemuan, ulang tahun di clubhouse cluster, arisan besar, sampai gathering kantor di kawasan perumahan. Booth kami sama mudahnya berdiri di ballroom maupun di halaman clubhouse, dengan cetakan yang keluar sekitar sepuluh detik per lembar supaya antrean tidak pernah menumpuk.",
    ],
    points: [
      {
        h: "Dekat dari arah Bogor",
        p: "Kami mendatangi Cibubur lewat sisi Gunung Putri, jadi perjalanannya pendek dan biaya transportnya ringan.",
      },
      {
        h: "Cocok untuk acara cluster",
        p: "Clubhouse, taman perumahan, dan halaman rumah semuanya cukup, asal ada listrik dan area sekitar 3×3 meter.",
      },
      {
        h: "Siap untuk gedung besar",
        p: "Untuk resepsi dengan tamu ratusan orang, cetak unlimited kami menjaga antrean tetap bergerak sepanjang acara.",
      },
    ],
    prints: [
      { src: "/images/g-bday4.jpg", alt: "Photobooth ulang tahun di clubhouse kawasan Cibubur" },
      { src: "/images/g-wed4.jpg", alt: "Cetakan photobooth resepsi pernikahan di gedung Cibubur" },
      { src: "/images/g-corp7.jpg", alt: "Photobooth gathering perusahaan di kawasan Cibubur" },
    ],
    faq: [
      {
        q: "Cibubur dihitung area mana?",
        a: "Kami mendatanginya dari sisi Bogor lewat Gunung Putri, jadi biaya transportnya ringan. Sebutkan alamat venue-nya dan kami sampaikan angkanya di awal, bukan di akhir.",
      },
      {
        q: "Bisa untuk acara di clubhouse perumahan?",
        a: "Bisa, dan cukup sering kami kerjakan. Kami hanya butuh area sekitar 3×3 meter dekat sumber listrik.",
      },
      {
        q: "Melayani juga Cimanggis dan Jatisampurna?",
        a: "Ya. Seluruh kawasan Cibubur yang menyambung ke Cimanggis, Jatisampurna, dan Gunung Putri kami layani dengan paket yang sama.",
      },
    ],
  },
  {
    slug: "margonda",
    parent: "depok",
    name: "Margonda",
    title: "Sewa Photobooth Margonda & Depok Kota",
    description:
      "Sewa photobooth di Margonda, Beji, dan pusat kota Depok. Cetak instan unlimited untuk wisuda dan acara kampus di sekitar UI, seminar, sampai resepsi di hotel sepanjang Margonda.",
    h1Tail: "Margonda",
    lead: "Sepanjang Margonda berjejer kampus, hotel, dan gedung pertemuan. Acaranya jarang santai: rundown ketat, tamu banyak, dan waktu bongkar pasang yang sempit.",
    story: [
      "Pusat kota Depok berputar di sekitar Margonda dan Beji, dengan Universitas Indonesia sebagai magnetnya. Wisuda, seminar, pelepasan angkatan, dan job fair membawa ratusan orang yang semuanya ingin berfoto dalam jendela waktu yang sama, dan cetakan kami yang keluar sekitar sepuluh detik per lembar dibuat persis untuk beban itu.",
      "Di luar kampus, hotel dan gedung pertemuan sepanjang Margonda ramai oleh resepsi dan acara perusahaan. Tim kami terbiasa dengan aturan loading gedung dan jadwal bongkar pasang yang ketat, jadi booth tetap siap sekitar satu jam sebelum acara tanpa mengganggu vendor lain.",
    ],
    points: [
      {
        h: "Dirancang untuk antrean kampus",
        p: "Wisuda dan acara angkatan dengan ratusan peserta sudah jadi keseharian kami, termasuk penambahan titik booth kalau dibutuhkan.",
      },
      {
        h: "Terbiasa aturan gedung",
        p: "Jadwal loading, akses lift barang, dan waktu bongkar yang ketat kami ikuti tanpa perlu diingatkan panitia.",
      },
      {
        h: "Dokumen administrasi lengkap",
        p: "Penawaran tertulis dan invoice untuk kampus maupun perusahaan kami siapkan sejak awal.",
      },
    ],
    prints: [
      { src: "/images/g-grad1.jpg", alt: "Cetakan photobooth wisuda kampus di kawasan Margonda Depok" },
      { src: "/images/g-corp3.jpg", alt: "Photobooth acara seminar perusahaan di Depok" },
      { src: "/images/g-wed1.jpg", alt: "Hasil photobooth resepsi pernikahan di hotel Margonda" },
    ],
    faq: [
      {
        q: "Bisa untuk wisuda dan acara kampus di sekitar UI?",
        a: "Bisa, dan itu salah satu jenis acara yang paling sering kami kerjakan. Sebutkan jumlah pesertanya supaya kami bantu tentukan durasi dan jumlah booth yang pas.",
      },
      {
        q: "Bagaimana dengan waktu setup di gedung yang padat jadwal?",
        a: "Kami butuh sekitar satu jam. Kalau gedung memberi jendela bongkar pasang yang lebih sempit, sebutkan sejak awal dan tim datang lebih pagi.",
      },
      {
        q: "Berapa biaya transport ke Depok?",
        a: "Menyesuaikan jarak dari basis kami di Bogor, dan angkanya selalu kami sebutkan di penawaran awal, bukan setelah acara.",
      },
    ],
  },
  {
    slug: "sawangan",
    parent: "depok",
    name: "Sawangan",
    title: "Sewa Photobooth Sawangan & Depok Selatan",
    description:
      "Sewa photobooth di Sawangan, Bojongsari, Cinere, dan Limo. Cetak instan unlimited untuk resepsi rumahan, ulang tahun, dan acara di gedung serbaguna Depok selatan.",
    h1Tail: "Sawangan",
    lead: "Depok selatan adalah wilayah resepsi rumahan: tenda di halaman, tetangga yang datang berombongan, dan suasana yang lebih hangat daripada ballroom manapun.",
    story: [
      "Sawangan, Bojongsari, Limo, dan Cinere adalah sisi Depok yang paling dekat dari basis kami di Bogor, jadi biaya transportnya paling ringan di antara seluruh area Depok. Jadwal kami pun lebih longgar untuk permintaan yang datang agak mendadak.",
      "Sebagian besar acara di sini berlangsung di rumah atau gedung serbaguna berukuran sedang, dengan tamu yang datang bergelombang sepanjang hari. Cetak unlimited membuat setiap rombongan tetap dapat lembarannya sendiri, dan dua crew kami menjaga alur booth tanpa perlu dipandu tuan rumah.",
    ],
    points: [
      {
        h: "Sisi Depok terdekat",
        p: "Dari Bogor, Sawangan dan Bojongsari adalah pintu masuk paling dekat, jadi biaya transportnya paling ringan.",
      },
      {
        h: "Siap untuk resepsi rumahan",
        p: "Booth kami muat di tenda halaman maupun ruang tamu, cukup dengan area sekitar 3×3 meter dan satu sumber listrik.",
      },
      {
        h: "Tetap jalan meski tamu bergelombang",
        p: "Cetakan unlimited berarti rombongan yang datang siang maupun sore sama-sama pulang membawa hasilnya.",
      },
    ],
    prints: [
      { src: "/images/g-wed9.jpg", alt: "Cetakan photobooth resepsi rumahan di Sawangan Depok" },
      { src: "/images/g-bday2.jpg", alt: "Photobooth ulang tahun keluarga di Depok selatan" },
      { src: "/images/g-strip3.jpg", alt: "Photostrip 2R hasil photobooth acara keluarga" },
    ],
    faq: [
      {
        q: "Bisa untuk resepsi di rumah dengan tenda halaman?",
        a: "Bisa, dan itu yang paling sering kami kerjakan di area ini. Kami hanya butuh area sekitar 3×3 meter yang terlindung dan satu sumber listrik.",
      },
      {
        q: "Apakah Sawangan lebih murah transportnya dibanding Depok kota?",
        a: "Ya, karena jaraknya paling dekat dari basis kami di Bogor. Sebutkan alamat venue-nya dan kami sampaikan angkanya di awal.",
      },
      {
        q: "Melayani Cinere dan Limo juga?",
        a: "Melayani, dengan paket dan ketentuan yang sama seperti Sawangan dan Bojongsari.",
      },
    ],
  },
  {
    slug: "jakarta-selatan",
    parent: "jakarta",
    name: "Jakarta Selatan",
    title: "Sewa Photobooth Jakarta Selatan",
    description:
      "Sewa photobooth di Jakarta Selatan: Kemang, Senayan, Pondok Indah, sampai TB Simatupang. Cetak instan unlimited dan frame custom untuk wedding, brand activation, dan acara kantor.",
    h1Tail: "Jakarta Selatan",
    lead: "Jakarta Selatan menuntut booth yang tampilannya sebersih venue-nya. Kami datang dengan setup yang rapi, crew yang paham rundown, dan cetakan yang layak dipajang.",
    story: [
      "Dari Kemang dan Senayan sampai Pondok Indah dan koridor TB Simatupang, Jakarta Selatan adalah wilayah dengan standar visual paling tinggi yang kami layani. Resepsi hotel, peluncuran produk, dan aktivasi brand di sini menuntut booth yang tidak mengganggu desain ruangan, dan setup kami memang dibuat untuk menyatu, bukan menonjol.",
      "Kami datang dari Bogor lewat jalur tol, dan untuk Jakarta Selatan tim selalu berangkat dengan margin waktu tambahan agar kemacetan tidak pernah menggeser jadwal. Booth tetap siap sekitar satu jam sebelum tamu pertama masuk, berapa pun lalu lintas hari itu.",
    ],
    points: [
      {
        h: "Setup yang menyatu dengan venue",
        p: "Backdrop bawaan bisa dilepas agar booth mengikuti dekorasi, bukan melawannya.",
      },
      {
        h: "Datang dengan margin waktu",
        p: "Kami memperhitungkan kemacetan jalur tol sejak awal, sehingga booth tetap siap satu jam sebelum acara.",
      },
      {
        h: "Terbiasa brand activation",
        p: "Frame mengikuti brand guideline, dan 360° spin booth kami sering dipakai untuk aktivasi yang mengejar jangkauan media sosial.",
      },
    ],
    prints: [
      { src: "/images/g-corp3.jpg", alt: "Photobooth brand activation di Jakarta Selatan" },
      { src: "/images/g-wed1.jpg", alt: "Cetakan photobooth pernikahan di hotel Jakarta Selatan" },
      { src: "/images/g-strip3.jpg", alt: "Photostrip 2R hasil photobooth aktivasi brand" },
    ],
    faq: [
      {
        q: "Berapa biaya transport ke Jakarta Selatan?",
        a: "Menyesuaikan jarak dan lokasi venue-nya, dan selalu kami sebutkan di penawaran awal. Tidak pernah muncul sebagai tambahan setelah acara.",
      },
      {
        q: "Bisa untuk acara di hotel dengan aturan vendor yang ketat?",
        a: "Bisa. Kirimkan ketentuan vendor dan jadwal loading dari pihak hotel, lalu kami sesuaikan waktu kedatangan dan kelengkapan dokumennya.",
      },
      {
        q: "Cocok untuk brand activation di mal?",
        a: "Sangat cocok. Untuk aktivasi, 360° spin booth biasanya paling efektif karena videonya langsung dibagikan pengunjung ke media sosial.",
      },
    ],
  },
  {
    slug: "jakarta-timur",
    parent: "jakarta",
    name: "Jakarta Timur",
    title: "Sewa Photobooth Jakarta Timur",
    description:
      "Sewa photobooth di Jakarta Timur: Cawang, Cakung, Duren Sawit, sampai Pulo Gadung. Cetak instan unlimited untuk resepsi gedung, wisuda sekolah, dan gathering karyawan kawasan industri.",
    h1Tail: "Jakarta Timur",
    lead: "Jakarta Timur adalah sisi ibu kota yang paling dekat dari Bogor, dan wilayah dengan gedung resepsi terbanyak yang kami datangi setiap bulannya.",
    story: [
      "Lewat tol Jagorawi, Jakarta Timur adalah bagian ibu kota yang paling cepat kami capai. Cawang, Kramat Jati, Duren Sawit, sampai Cakung penuh gedung pertemuan dan aula serbaguna yang jadwalnya padat oleh resepsi hampir setiap akhir pekan.",
      "Selain resepsi, wilayah ini ramai oleh wisuda sekolah dan gathering karyawan di kawasan industri Pulo Gadung dan Cakung. Dua-duanya berarti antrean panjang dalam waktu singkat, dan cetakan kami yang keluar sekitar sepuluh detik per lembar menjaga alurnya tetap bergerak.",
    ],
    points: [
      {
        h: "Sisi Jakarta terdekat",
        p: "Lewat Jagorawi, Jakarta Timur adalah wilayah ibu kota yang paling cepat kami capai dari Bogor.",
      },
      {
        h: "Terbiasa gedung resepsi",
        p: "Aula serbaguna dan gedung pertemuan dengan ruang booth terbatas sudah jadi keseharian kami.",
      },
      {
        h: "Siap untuk kawasan industri",
        p: "Prosedur izin masuk dan jadwal loading pabrik kami ikuti tanpa membuang waktu di pos keamanan.",
      },
    ],
    prints: [
      { src: "/images/g-wed8.jpg", alt: "Cetakan photobooth resepsi pernikahan di gedung Jakarta Timur" },
      { src: "/images/g-corp5.jpg", alt: "Photobooth gathering karyawan kawasan industri Jakarta Timur" },
      { src: "/images/g-grad2.jpg", alt: "Hasil photobooth wisuda sekolah" },
    ],
    faq: [
      {
        q: "Berapa biaya transport ke Jakarta Timur?",
        a: "Paling ringan di antara wilayah Jakarta karena jaraknya paling dekat lewat Jagorawi. Angkanya kami sebutkan di penawaran awal sesuai alamat venue.",
      },
      {
        q: "Bisa untuk wisuda sekolah dengan ratusan siswa?",
        a: "Bisa. Satu booth cukup untuk sekitar 200 peserta dalam tiga jam; di atas itu kami sarankan dua titik booth agar antrean tetap nyaman.",
      },
      {
        q: "Melayani acara di kawasan industri?",
        a: "Ya. Kirimkan ketentuan izin masuk dan jam loading-nya, lalu tim kami menyesuaikan waktu kedatangan.",
      },
    ],
  },
];

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
