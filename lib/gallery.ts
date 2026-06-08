// Gallery data — sourced verbatim from reference/index.html (#ggrid markup).
// Until Sanity CMS lands (deferred), this is the single source for the gallery.

export type GalleryCategory = "wed" | "corp" | "bday" | "grad";

export interface GalleryItem {
  i: number;
  src: string;
  /** caption title (.t) */
  title: string;
  /** caption sub (.s) */
  sub: string;
  cat: GalleryCategory;
}

export interface GalleryTab {
  cat: "all" | GalleryCategory;
  label: string;
}

export const GALLERY_TABS: GalleryTab[] = [
  { cat: "all", label: "Semua" },
  { cat: "wed", label: "Wedding" },
  { cat: "corp", label: "Corporate" },
  { cat: "bday", label: "Ulang Tahun" },
  { cat: "grad", label: "Wisuda" },
];

export const GALLERY: GalleryItem[] = [
  { i: 0, src: "/images/g-wed1.jpg", title: "Ami & Awal", sub: "Wedding · Polaroid", cat: "wed" },
  { i: 1, src: "/images/g-corp1.jpg", title: "Indocement", sub: "Corporate · 4R", cat: "corp" },
  { i: 2, src: "/images/g-strip2.jpg", title: "Nerissa 14th", sub: "Ulang Tahun · 2R", cat: "bday" },
  { i: 3, src: "/images/g-wed2.jpg", title: "Marsya & Iwan", sub: "Wedding · Polaroid", cat: "wed" },
  { i: 4, src: "/images/g-grad1.jpg", title: "SDIT Al-Hidayah", sub: "Wisuda · 4R", cat: "grad" },
  { i: 5, src: "/images/g-strip1.jpg", title: "Koempoel Jadoel", sub: "Reuni · 2R", cat: "bday" },
  { i: 6, src: "/images/g-strip3.jpg", title: "Implora Glam", sub: "Activation · 2R", cat: "corp" },
  { i: 7, src: "/images/g-bday1.jpg", title: "Mia's Sweet 17", sub: "Ulang Tahun · 4R", cat: "bday" },
  { i: 8, src: "/images/g-corp2.jpg", title: "Kemenag DKI", sub: "Corporate · 4R", cat: "corp" },
  { i: 9, src: "/images/g-grad2.jpg", title: "MTs Umdatur", sub: "Wisuda · 4R", cat: "grad" },
];
