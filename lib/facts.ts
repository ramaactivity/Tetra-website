// Fakta layanan yang muncul di lebih dari satu tempat.
//
// Ini sumber kebenaran tunggal untuk halaman, FAQ, JSON-LD, dan metadata.
// Sebelum file ini ada, transport/area/pelunasan ditulis ulang di tiap halaman
// dan akhirnya saling bertentangan (dan berbeda dengan yang dikatakan admin ke
// klien). Kalau sebuah fakta muncul di dua tempat, taruh di sini.
//
// Keputusan owner 27 Sep 2026. Bot WA memakai sumber yang sama
// (~/tetra-wa-bot/docs/FAQ-KLIEN.md) — perbarui keduanya bersamaan.
// PDF pricelist di /public dibuat di Canva dan diperbarui manual oleh owner.

/** Paket yang transportnya gratis se-Jabodetabek. */
export const TRANSPORT_FREE = "Free transport seluruh area Jabodetabek";

/** Kalimat panjang untuk FAQ/body. */
export const TRANSPORT_SENTENCE =
  "Seluruh Jabodetabek bebas biaya transport: Bogor, Jakarta, Depok, Tangerang, dan Bekasi. Di luar Jabodetabek ada biaya transport yang kami sebutkan di penawaran awal, bukan di akhir.";

/** Magazine Box dikecualikan dari transport gratis. */
export const TRANSPORT_MAGAZINE_EXCLUDED =
  "Biaya transport tidak termasuk, nominalnya kami infokan di awal";

/** Photobooth Classic & Photo Stage. */
export const AREA_CLASSIC = "3 × 4 meter";
export const LISTRIK_CLASSIC = "±500 watt";
export const MEJA_KURSI = "1 meja dan 2 kursi";

/** Kalimat kebutuhan venue yang dipakai berulang di FAQ area & acara. */
export const VENUE_SENTENCE = `Kami butuh area sekitar ${AREA_CLASSIC}, ${MEJA_KURSI}, dan sumber listrik ${LISTRIK_CLASSIC} di dekat booth.`;

/** 360° Spin punya kebutuhan sendiri — jangan disamakan dengan Classic. */
export const AREA_SPIN = "3 × 3 meter";
export const SPIN_KAPASITAS = "2–4 orang (maks. 250 kg)";

/** Magazine Box. */
export const AREA_MAGAZINE = "4 × 5 meter";
export const LISTRIK_MAGAZINE = "±700 watt";

export const DP_MIN = "Rp 500.000";
export const PELUNASAN =
  "Pelunasan dilakukan paling lambat H-1 sebelum acara";

export const CREW_SENTENCE =
  "Dua crew datang paling lambat 1 jam sebelum acara, setup alat sekitar 30 menit";

/** Backdrop basic yang sudah termasuk di paket. Hitam sudah tidak ada. */
export const BACKDROP_BASIC = [
  "Putih",
  "Merah",
  "Gold",
  "Silver",
  "Hijau Emerald",
] as const;

export const BACKDROP_INCLUDE_TEXT = `Backdrop basic pilihan: ${BACKDROP_BASIC.join(", ").replace(/, ([^,]*)$/, ", dan $1")}`;

export const BACKDROP_LUXURY_NOTE =
  "Backdrop luxury atau tema khusus bisa kami adakan dengan biaya tambahan. Kamu juga boleh memakai dekorasi acaramu sendiri.";

/** Jam tambahan. */
export const EXTEND_PER_JAM = "Rp 500.000";
export const DURASI_PANJANG_NOTE = `Butuh lebih dari 8 jam? Ambil paket 8 jam lalu tambah ${EXTEND_PER_JAM} per jam berikutnya.`;

/** Tetra usaha perorangan non-PKP. */
export const PAJAK_NOTE =
  "Harga belum termasuk pajak. Tetra Photobooth adalah usaha perorangan non-PKP, jadi kami tidak memungut PPN. Kalau perusahaanmu perlu pajak dicantumkan di invoice, harga di-gross up 2,5% dan selisihnya ditanggung klien.";

/** Paket mana yang menghasilkan cetakan fisik. */
export const TANPA_CETAK = [
  "360° Spin Video Booth",
  "Photo Stage Only",
  "Magazine Box Only",
] as const;
