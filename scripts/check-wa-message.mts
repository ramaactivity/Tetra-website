// Cek kontrak pesan WhatsApp. Pesan ini dibaca bot admin Tetra
// (~/tetra-wa-bot/src/lib/smartLead.js → parseWebsite); kalau cek ini gagal,
// bot akan salah membaca lead. Jalankan: node scripts/check-wa-message.mts
import assert from "node:assert/strict";
import { waMessage, sanitize, halamanDariPath } from "../lib/site.ts";

const LENGKAP = `Halo Tetra Photobooth!
Saya dari website Tetra (halaman Wedding) dan mau cek ketersediaan serta rekomendasi paket.

Acara: Wedding
Tanggal: Sabtu, 28 November 2026
Jam photobooth: 18.00 - 21.00
Durasi: 3 jam
Lokasi: Sentul, Bogor
Jumlah tamu: 200 - 300
Paket: Unlimited 3 Jam
Nama: Rizky
Catatan: Tolong siapkan properti bertema rustic`;

assert.equal(
  waMessage({
    halaman: "Wedding",
    acara: "Wedding",
    tanggal: "Sabtu, 28 November 2026",
    jam: "18.00 - 21.00",
    durasi: "3 jam",
    lokasi: "Sentul, Bogor",
    tamu: "200 - 300",
    paket: "Unlimited 3 Jam",
    nama: "Rizky",
    catatan: "Tolong siapkan properti bertema rustic",
  }),
  LENGKAP,
  "pesan lengkap tidak sama persis"
);

const SEBAGIAN = `Halo Tetra Photobooth!
Saya dari website Tetra (halaman Area Bogor) dan mau cek ketersediaan serta rekomendasi paket.

Tanggal: Sabtu, 12 Desember 2026
Lokasi: Bogor`;

assert.equal(
  waMessage({
    halaman: "Area Bogor",
    tanggal: "Sabtu, 12 Desember 2026",
    lokasi: "Bogor",
  }),
  SEBAGIAN,
  "pesan sebagian tidak sama persis"
);

const KOSONG = `Halo Tetra Photobooth!
Saya dari website Tetra (halaman Beranda) dan mau cek ketersediaan serta rekomendasi paket.`;

assert.equal(waMessage({ halaman: "Beranda" }), KOSONG, "pesan kosong tidak sama persis");

// Tidak boleh ada label kosong walau nilai diisi string kosong / spasi.
const jarang = waMessage({ halaman: "Harga", acara: "", lokasi: "   ", nama: "Budi" });
assert.ok(!/^Acara:/m.test(jarang), "label Acara kosong ikut tertulis");
assert.ok(!/^Lokasi:/m.test(jarang), "label Lokasi kosong ikut tertulis");
assert.ok(/^Nama: Budi$/m.test(jarang), "label Nama hilang");

// Karakter perusak deep link tidak boleh lolos, dari field mana pun.
const kotor = waMessage({
  halaman: "Wedding & Resepsi",
  acara: "Wedding + Resepsi #1",
  lokasi: "Diskon 50% di Hotel A & B",
  nama: "Budi 🎉😀",
  tamu: "100 - 200",
});
for (const ch of ["&", "#", "+", "%"]) {
  assert.ok(!kotor.includes(ch), `karakter ${ch} masih lolos ke pesan`);
}
assert.ok(!/\p{Extended_Pictographic}/u.test(kotor), "emoji masih lolos ke pesan");
assert.ok(kotor.includes("Wedding dan Resepsi"), "& tidak diganti jadi 'dan'");
assert.ok(kotor.includes("plus"), "+ tidak diganti jadi 'plus'");

// Nilai dirapikan jadi satu baris dan dipotong 80 karakter.
const panjang = sanitize("a".repeat(200));
assert.equal(panjang.length, 80, "nilai tidak dipotong di 80 karakter");
assert.equal(sanitize("Hotel\n  Santika   Bogor"), "Hotel Santika Bogor", "baris baru tidak diratakan");

// Penamaan halaman dari pathname.
const path: [string, string][] = [
  ["/", "Beranda"],
  ["/harga-sewa-photobooth", "Harga"],
  ["/pricelist", "Pricelist"],
  ["/galeri", "Galeri"],
  ["/photobooth/wedding", "Wedding"],
  ["/photobooth/ulang-tahun", "Ulang Tahun"],
  ["/photobooth/360-spin-booth", "360 Spin Booth"],
  ["/sewa-photobooth/bogor", "Area Bogor"],
  ["/sewa-photobooth/puncak-cisarua", "Area Puncak Cisarua"],
  ["/syarat-ketentuan", "Syarat Ketentuan"],
];
for (const [p, expected] of path) {
  assert.equal(halamanDariPath(p), expected, `halamanDariPath("${p}")`);
}

console.log("OK — kontrak pesan WhatsApp aman (%d pemeriksaan)", 10 + path.length);
