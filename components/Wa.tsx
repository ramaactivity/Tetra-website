"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { halamanDariPath, waLink, waMessage, type WaDetail } from "@/lib/site";
import { getLenis } from "@/lib/lenis";

// Semua jalan menuju WhatsApp lewat satu pintu:
//  - <WaProvider> memegang mini-form dan dipasang sekali di root layout;
//  - <WaButton> merender <a href> asli (tetap jalan tanpa JS) dan, kalau JS
//    hidup, mencegat klik untuk membuka mini-form;
//  - <WaSticky> adalah bar chat khusus layar HP.
// Tidak ada komponen lain yang boleh merakit waLink() sendiri.
//
// Date & time picker sengaja dibuat sendiri, bukan input type="date"/"time":
// kontrol bawaan browser tampil di luar gaya situs dan, di desktop, butuh
// banyak klik. Tidak ada dependensi baru.

type Prefill = Partial<Omit<WaDetail, "halaman">> & { halaman?: string };

const WaCtx = createContext<((prefill: Prefill) => void) | null>(null);

const ACARA = [
  "Wedding",
  "Lamaran",
  "Ulang Tahun",
  "Sweet Seventeen",
  "Wisuda",
  "Corporate Event",
  "Gathering",
  "Reuni",
  "Brand Activation",
  "Lainnya",
];

const TAMU = ["Kurang dari 100", "100 - 200", "200 - 300", "Lebih dari 300"];

const PAKET = [
  "Belum tahu, minta rekomendasi",
  "Unlimited Photobooth",
  "360° Spin Video Booth",
  "Magazine Box",
  "Photo Stage",
];

const HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const hariIni = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const fmtTanggalPanjang = (d: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);

const fmtBulan = (y: number, m: number) =>
  new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(
    new Date(y, m, 1)
  );

/** Pilihan jam tiap 30 menit, rentang yang masuk akal untuk acara. */
const JAM_OPSI = Array.from({ length: 32 }, (_, i) => {
  const menit = 8 * 60 + i * 30; // 08.00 sampai 23.30
  return `${String(Math.floor(menit / 60)).padStart(2, "0")}.${String(
    menit % 60
  ).padStart(2, "0")}`;
});

/** "10.00" + "15.00" -> "5 jam". Koma desimal mengikuti kebiasaan Indonesia. */
function hitungDurasi(mulai: string, selesai: string): string {
  if (!mulai || !selesai) return "";
  const men = (t: string) => {
    const [h, m] = t.split(".").map(Number);
    return h * 60 + m;
  };
  const delta = men(selesai) - men(mulai);
  if (delta <= 0) return "";
  const jam = delta / 60;
  return `${Number.isInteger(jam) ? jam : jam.toFixed(1).replace(".", ",")} jam`;
}

/* ------------------------------------------------------------------ */
/* Popover kecil dipakai date & time picker. Menutup saat klik di luar */
/* atau Esc; Esc-nya ditahan agar tidak ikut menutup dialog induknya.  */
/* ------------------------------------------------------------------ */
function Popover({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.parentElement?.contains(e.target as Node)) {
        onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="wa-pop" ref={ref} role="dialog" aria-label={label}>
      {children}
    </div>
  );
}

function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const awal = value ? new Date(value) : hariIni();
  const [view, setView] = useState({ y: awal.getFullYear(), m: awal.getMonth() });

  const min = hariIni();
  const pertama = new Date(view.y, view.m, 1);
  const jumlahHari = new Date(view.y, view.m + 1, 0).getDate();
  const offset = pertama.getDay();

  const pilih = (hari: number) => {
    onChange(iso(new Date(view.y, view.m, hari)));
    setOpen(false);
  };

  return (
    <div className="wa-picker">
      <button
        type="button"
        className={`wa-input wa-trigger${value ? " filled" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {value ? fmtTanggalPanjang(new Date(value)) : "Pilih tanggal"}
        <span className="wa-caret" aria-hidden />
      </button>

      <Popover open={open} onClose={() => setOpen(false)} label="Pilih tanggal acara">
        <div className="wa-cal-head">
          <button
            type="button"
            className="wa-cal-nav"
            aria-label="Bulan sebelumnya"
            onClick={() =>
              setView((v) =>
                v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 }
              )
            }
          >
            ‹
          </button>
          <span className="wa-cal-title">{fmtBulan(view.y, view.m)}</span>
          <button
            type="button"
            className="wa-cal-nav"
            aria-label="Bulan berikutnya"
            onClick={() =>
              setView((v) =>
                v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 }
              )
            }
          >
            ›
          </button>
        </div>
        <div className="wa-cal-grid" role="grid">
          {HARI.map((h) => (
            <span className="wa-cal-dow" key={h}>
              {h}
            </span>
          ))}
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`x${i}`} />
          ))}
          {Array.from({ length: jumlahHari }, (_, i) => i + 1).map((hari) => {
            const d = new Date(view.y, view.m, hari);
            const lampau = d < min;
            const terpilih = value === iso(d);
            return (
              <button
                key={hari}
                type="button"
                className={`wa-cal-day${terpilih ? " on" : ""}`}
                disabled={lampau}
                aria-pressed={terpilih}
                onClick={() => pilih(hari)}
              >
                {hari}
              </button>
            );
          })}
        </div>
      </Popover>
    </div>
  );
}

function TimePicker({
  value,
  onChange,
  min,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  min?: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const opsi = min ? JAM_OPSI.filter((t) => t > min) : JAM_OPSI;

  return (
    <div className="wa-picker">
      <button
        type="button"
        className={`wa-input wa-trigger${value ? " filled" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={label}
      >
        {value || "--.--"}
        <span className="wa-caret" aria-hidden />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} label={label}>
        <div className="wa-time-list">
          {opsi.map((t) => (
            <button
              key={t}
              type="button"
              className={`wa-time${value === t ? " on" : ""}`}
              onClick={() => {
                onChange(t);
                setOpen(false);
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </Popover>
    </div>
  );
}

type Form = {
  acara: string;
  acaraLain: string;
  tanggalPasti: boolean;
  tanggal: string;
  bulan: string;
  jamMulai: string;
  jamSelesai: string;
  lokasi: string;
  tamu: string;
  paket: string;
  nama: string;
  catatan: string;
};

const KOSONG: Form = {
  acara: "",
  acaraLain: "",
  tanggalPasti: true,
  tanggal: "",
  bulan: "",
  jamMulai: "",
  jamSelesai: "",
  lokasi: "",
  tamu: "",
  paket: "",
  nama: "",
  catatan: "",
};

export function WaProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [prefill, setPrefill] = useState<Prefill>({});
  const [form, setForm] = useState<Form>(KOSONG);
  const pathname = usePathname();

  const halaman = prefill.halaman ?? halamanDariPath(pathname ?? "/");

  const open = useCallback((p: Prefill) => {
    setPrefill(p);
    setForm({
      ...KOSONG,
      acara: p.acara && ACARA.includes(p.acara) ? p.acara : p.acara ? "Lainnya" : "",
      acaraLain: p.acara && !ACARA.includes(p.acara) ? p.acara : "",
      lokasi: p.lokasi ?? "",
      paket: p.paket && PAKET.includes(p.paket) ? p.paket : "",
    });
    dialogRef.current?.showModal();
  }, []);

  const tutup = useCallback(() => dialogRef.current?.close(), []);

  // Kunci scroll latar selama sheet terbuka.
  // overflow:hidden saja tidak cukup — Lenis menggulir lewat scrollTo
  // programatik, jadi ia harus benar-benar dihentikan. Pola yang sama dipakai
  // lightbox galeri.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const sync = () => {
      document.documentElement.classList.toggle("wa-open", el.open);
      if (el.open) getLenis()?.stop();
      else getLenis()?.start();
    };
    el.addEventListener("close", sync);
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["open"] });
    return () => {
      el.removeEventListener("close", sync);
      mo.disconnect();
      document.documentElement.classList.remove("wa-open");
      getLenis()?.start();
    };
  }, []);

  const detail: WaDetail = useMemo(() => {
    const acara =
      form.acara === "Lainnya" ? form.acaraLain : form.acara || prefill.acara || "";
    const tanggal = form.tanggalPasti
      ? form.tanggal
        ? fmtTanggalPanjang(new Date(form.tanggal))
        : ""
      : form.bulan
        ? `${fmtBulan(
            Number(form.bulan.split("-")[0]),
            Number(form.bulan.split("-")[1]) - 1
          )} (tanggal belum pasti)`
        : "";
    const jam =
      form.jamMulai && form.jamSelesai ? `${form.jamMulai} - ${form.jamSelesai}` : "";
    return {
      halaman,
      acara,
      tanggal,
      jam,
      durasi: hitungDurasi(form.jamMulai, form.jamSelesai),
      lokasi: form.lokasi,
      tamu: form.tamu,
      paket: form.paket || prefill.paket || "",
      nama: form.nama,
      catatan: form.catatan,
    };
  }, [form, halaman, prefill]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const terisi = Object.entries(form).filter(
    ([k, v]) => k !== "tanggalPasti" && v
  ).length;

  return (
    <WaCtx.Provider value={open}>
      {children}
      <dialog className="wa-sheet" ref={dialogRef} aria-labelledby="wa-sheet-judul">
        {/* data-lenis-prevent: tanpa ini Lenis membajak wheel dan yang
            bergulir justru halaman di belakang dialog. */}
        <div className="wa-scroll" data-lenis-prevent>
          <form method="dialog" className="wa-close-form">
            <button className="wa-x" aria-label="Tutup" type="submit">
              <span aria-hidden>×</span>
            </button>
          </form>

          <div className="wa-head">
            <h2 id="wa-sheet-judul">Biar admin langsung cek jadwal</h2>
            <p className="wa-sub">
              Isi yang kamu tahu saja, sisanya bisa lewat chat.
            </p>
          </div>

          <div className="wa-cols">
            <div className="wa-col">
              <div className="wa-field">
                <span className="wa-label" id="wa-acara-label">
                  Jenis acara
                </span>
                <div className="wa-chips" role="group" aria-labelledby="wa-acara-label">
                  {ACARA.map((a, i) => (
                    <button
                      key={a}
                      type="button"
                      autoFocus={i === 0}
                      className={`wa-chip${form.acara === a ? " on" : ""}`}
                      aria-pressed={form.acara === a}
                      onClick={() => set("acara", form.acara === a ? "" : a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                {form.acara === "Lainnya" && (
                  <input
                    className="wa-input"
                    type="text"
                    maxLength={80}
                    placeholder="Acara apa?"
                    aria-label="Jenis acara lainnya"
                    value={form.acaraLain}
                    onChange={(e) => set("acaraLain", e.target.value)}
                  />
                )}
              </div>

              <div className="wa-field">
                <span className="wa-label">Tanggal acara</span>
                {form.tanggalPasti ? (
                  <DatePicker
                    value={form.tanggal}
                    onChange={(v) => set("tanggal", v)}
                  />
                ) : (
                  <input
                    className="wa-input"
                    type="month"
                    aria-label="Bulan acara"
                    min={iso(hariIni()).slice(0, 7)}
                    value={form.bulan}
                    onChange={(e) => set("bulan", e.target.value)}
                  />
                )}
                <label className="wa-toggle">
                  <input
                    type="checkbox"
                    checked={!form.tanggalPasti}
                    onChange={(e) => set("tanggalPasti", !e.target.checked)}
                  />
                  Belum pasti, baru tahu bulannya
                </label>
              </div>

              <div className="wa-field">
                <span className="wa-label">Jam photobooth</span>
                <div className="wa-row">
                  <TimePicker
                    label="Jam mulai"
                    value={form.jamMulai}
                    onChange={(v) => {
                      set("jamMulai", v);
                      if (form.jamSelesai && form.jamSelesai <= v)
                        set("jamSelesai", "");
                    }}
                  />
                  <span className="wa-dash" aria-hidden>
                    –
                  </span>
                  <TimePicker
                    label="Jam selesai"
                    value={form.jamSelesai}
                    min={form.jamMulai}
                    onChange={(v) => set("jamSelesai", v)}
                  />
                </div>
                {detail.durasi && (
                  <p className="wa-hint" aria-live="polite">
                    Durasi {detail.durasi}
                  </p>
                )}
              </div>

              <div className="wa-field">
                <label className="wa-label" htmlFor="wa-lokasi">
                  Lokasi acara
                </label>
                <input
                  className="wa-input"
                  id="wa-lokasi"
                  type="text"
                  maxLength={80}
                  placeholder="Kota atau nama venue"
                  value={form.lokasi}
                  onChange={(e) => set("lokasi", e.target.value)}
                />
              </div>
            </div>

            <div className="wa-col">
              <div className="wa-field">
                <span className="wa-label" id="wa-tamu-label">
                  Perkiraan tamu
                </span>
                <div className="wa-chips" role="group" aria-labelledby="wa-tamu-label">
                  {TAMU.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`wa-chip${form.tamu === t ? " on" : ""}`}
                      aria-pressed={form.tamu === t}
                      onClick={() => set("tamu", form.tamu === t ? "" : t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="wa-field">
                <span className="wa-label" id="wa-paket-label">
                  Paket yang diminati
                </span>
                <div className="wa-chips" role="group" aria-labelledby="wa-paket-label">
                  {PAKET.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`wa-chip${form.paket === p ? " on" : ""}`}
                      aria-pressed={form.paket === p}
                      onClick={() => set("paket", form.paket === p ? "" : p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="wa-field">
                <label className="wa-label" htmlFor="wa-nama">
                  Nama kamu
                </label>
                <input
                  className="wa-input"
                  id="wa-nama"
                  type="text"
                  maxLength={80}
                  placeholder="Siapa yang kami sapa?"
                  value={form.nama}
                  onChange={(e) => set("nama", e.target.value)}
                />
              </div>

              <div className="wa-field">
                <label className="wa-label" htmlFor="wa-catatan">
                  Catatan <span className="wa-opt">(opsional)</span>
                </label>
                <input
                  className="wa-input"
                  id="wa-catatan"
                  type="text"
                  maxLength={80}
                  placeholder="Tema acara, permintaan khusus, dll."
                  value={form.catatan}
                  onChange={(e) => set("catatan", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="wa-foot">
            <a
              className="btn fill wa-go"
              href={waLink(waMessage(detail))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={tutup}
            >
              Lanjut ke WhatsApp
              {terisi > 0 && <span className="wa-count">{terisi} terisi</span>}
            </a>
            <a
              className="wa-plain"
              href={waLink(waMessage({ halaman }))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={tutup}
            >
              Chat langsung tanpa isi
            </a>
          </div>
        </div>
      </dialog>
    </WaCtx.Provider>
  );
}

type WaButtonProps = Prefill & {
  label: string;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
};

/**
 * Tombol menuju WhatsApp. Tanpa JS ia tetap sebuah tautan wa.me berisi pesan
 * dua baris pembuka; dengan JS ia membuka mini-form lebih dulu.
 */
export function WaButton({
  label,
  className = "btn fill",
  ariaLabel,
  children,
  ...prefill
}: WaButtonProps) {
  const open = useContext(WaCtx);
  const pathname = usePathname();
  const halaman = prefill.halaman ?? halamanDariPath(pathname ?? "/");

  return (
    <a
      className={className}
      href={waLink(waMessage({ ...prefill, halaman }))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={(e) => {
        if (!open) return; // tanpa provider: biarkan tautan asli jalan
        e.preventDefault();
        open({ ...prefill, halaman });
      }}
    >
      {children ?? label}
    </a>
  );
}

/**
 * Bar chat bawah khusus layar HP. Muncul setelah CTA atas keluar layar dan
 * sembunyi lagi saat blok kontak di footer terlihat, supaya tidak dobel.
 * /pricelist sudah punya barnya sendiri (StickyActions).
 */
export function WaSticky() {
  const [tampil, setTampil] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (pathname === "/pricelist") return;
    const atas = document.querySelector("#hc, .area-cta");
    const bawah = document.querySelector("#kontak");
    if (!atas && !bawah) return;

    const terlihat = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) terlihat.set(e.target, e.isIntersecting);
        setTampil(![...terlihat.values()].some(Boolean));
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    if (atas) io.observe(atas);
    if (bawah) io.observe(bawah);
    return () => io.disconnect();
  }, [pathname]);

  if (pathname === "/pricelist") return null;

  return (
    <div className={`wa-sticky${tampil ? " on" : ""}`} aria-hidden={!tampil}>
      {/* visibility:hidden saat tersembunyi → ikut keluar dari urutan tab */}
      <WaButton label="Chat Admin" className="wa-sticky-btn" />
    </div>
  );
}
