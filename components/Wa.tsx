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

// Semua jalan menuju WhatsApp lewat satu pintu:
//  - <WaProvider> memegang mini-form dan dipasang sekali di root layout;
//  - <WaButton> merender <a href> asli (tetap jalan tanpa JS) dan, kalau JS
//    hidup, mencegat klik untuk membuka mini-form;
//  - <WaSticky> adalah bar chat khusus layar HP.
// Tidak ada komponen lain yang boleh merakit waLink() sendiri.

type Prefill = Partial<Omit<WaDetail, "halaman">> & { halaman?: string };

const WaCtx = createContext<((prefill: Prefill) => void) | null>(null);

const ACARA = ["Wedding", "Ulang Tahun", "Wisuda", "Corporate Event", "Lainnya"];
const TAMU = [
  "Kurang dari 100",
  "100 - 200",
  "200 - 300",
  "Lebih dari 300",
  "Belum tahu",
];

const hariIni = () => new Date().toISOString().slice(0, 10);

/** "2026-11-28" → "Sabtu, 28 November 2026" */
function formatTanggal(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}

/** "2026-11" → "November 2026 (tanggal belum pasti)" */
function formatBulan(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m) return "";
  const bulan = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date(y, m - 1, 1));
  return `${bulan} (tanggal belum pasti)`;
}

/** "18:00" + "21:00" → "18.00 - 21.00" */
function formatJam(mulai: string, selesai: string): string {
  if (!mulai || !selesai) return "";
  return `${mulai.replace(":", ".")} - ${selesai.replace(":", ".")}`;
}

type Form = {
  acara: string;
  acaraLain: string;
  tanggalPasti: boolean;
  tanggal: string;
  bulan: string;
  jamTahu: boolean;
  jamMulai: string;
  jamSelesai: string;
  lokasi: string;
  tamu: string;
  nama: string;
};

const KOSONG: Form = {
  acara: "",
  acaraLain: "",
  tanggalPasti: true,
  tanggal: "",
  bulan: "",
  jamTahu: true,
  jamMulai: "",
  jamSelesai: "",
  lokasi: "",
  tamu: "",
  nama: "",
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
    });
    dialogRef.current?.showModal();
  }, []);

  const tutup = useCallback(() => dialogRef.current?.close(), []);

  // Kunci scroll latar selama sheet terbuka (Lenis tetap jalan kalau tidak).
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const sync = () => document.documentElement.classList.toggle("wa-open", el.open);
    el.addEventListener("close", sync);
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["open"] });
    return () => {
      el.removeEventListener("close", sync);
      mo.disconnect();
      document.documentElement.classList.remove("wa-open");
    };
  }, []);

  const detail: WaDetail = useMemo(() => {
    const acara =
      form.acara === "Lainnya" ? form.acaraLain : form.acara || prefill.acara || "";
    const tanggal = form.tanggalPasti
      ? formatTanggal(form.tanggal)
      : formatBulan(form.bulan);
    return {
      halaman,
      acara,
      tanggal,
      jam: form.jamTahu ? formatJam(form.jamMulai, form.jamSelesai) : "",
      lokasi: form.lokasi,
      tamu: form.tamu === "Belum tahu" ? "" : form.tamu,
      paket: prefill.paket ?? "",
      nama: form.nama,
    };
  }, [form, halaman, prefill]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <WaCtx.Provider value={open}>
      {children}
      <dialog className="wa-sheet" ref={dialogRef} aria-labelledby="wa-sheet-judul">
        <form method="dialog" className="wa-sheet-close-form">
          <button className="wa-x" aria-label="Tutup" type="submit">
            <span aria-hidden>×</span>
          </button>
        </form>

        <h2 id="wa-sheet-judul">Biar admin langsung cek jadwal</h2>
        <p className="wa-sub">Isi yang kamu tahu saja, sisanya bisa lewat chat.</p>

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
          <label className="wa-label" htmlFor="wa-tanggal">
            Tanggal acara
          </label>
          {form.tanggalPasti ? (
            <input
              className="wa-input"
              id="wa-tanggal"
              type="date"
              min={hariIni()}
              value={form.tanggal}
              onChange={(e) => set("tanggal", e.target.value)}
            />
          ) : (
            <input
              className="wa-input"
              id="wa-tanggal"
              type="month"
              min={hariIni().slice(0, 7)}
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
          <span className="wa-label" id="wa-jam-label">
            Jam photobooth
          </span>
          {form.jamTahu && (
            <div className="wa-row" role="group" aria-labelledby="wa-jam-label">
              <input
                className="wa-input"
                type="time"
                aria-label="Jam mulai"
                value={form.jamMulai}
                onChange={(e) => set("jamMulai", e.target.value)}
              />
              <span className="wa-dash" aria-hidden>
                –
              </span>
              <input
                className="wa-input"
                type="time"
                aria-label="Jam selesai"
                value={form.jamSelesai}
                onChange={(e) => set("jamSelesai", e.target.value)}
              />
            </div>
          )}
          <label className="wa-toggle">
            <input
              type="checkbox"
              checked={!form.jamTahu}
              onChange={(e) => set("jamTahu", !e.target.checked)}
            />
            Belum tahu jamnya
          </label>
        </div>

        <div className="wa-field">
          <label className="wa-label" htmlFor="wa-lokasi">
            Lokasi
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
          <label className="wa-label" htmlFor="wa-nama">
            Nama <span className="wa-opt">(opsional)</span>
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

        <a
          className="btn fill wa-go"
          href={waLink(waMessage(detail))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={tutup}
        >
          Lanjut ke WhatsApp
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
      </dialog>
    </WaCtx.Provider>
  );
}

type WaButtonProps = Prefill & {
  label: string;
  className?: string;
  /** Kelas ikon/aria-only, mis. tombol ikon WhatsApp di SocialIcons. */
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
