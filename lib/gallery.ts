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

export const GALLERY: GalleryItem[] = [
  { i: 0, src: "/images/g-wed1.jpg", title: "Ami & Awal", sub: "Wedding · Polaroid", cat: "wed" },
  { i: 1, src: "/images/g-corp1.jpg", title: "Indocement", sub: "Corporate · 4R", cat: "corp" },
  { i: 2, src: "/images/g-strip2.jpg", title: "Nerissa 14th", sub: "Ulang Tahun · 2R", cat: "bday" },
  { i: 3, src: "/images/g-wed4.jpg", title: "Nicholas & Felicia", sub: "Wedding · 4R", cat: "wed" },
  { i: 4, src: "/images/g-corp3.jpg", title: "Sharing Legacy", sub: "Corporate · 4R", cat: "corp" },
  { i: 5, src: "/images/g-strip1.jpg", title: "Koempoel Jadoel", sub: "Reuni · 2R", cat: "bday" },
  { i: 6, src: "/images/g-wed5.jpg", title: "Inggit & Agip", sub: "Wedding · 4R", cat: "wed" },
  { i: 7, src: "/images/g-grad1.jpg", title: "SDIT Al-Hidayah", sub: "Wisuda · 4R", cat: "grad" },
  { i: 8, src: "/images/g-corp6.jpg", title: "The 101 Hotel", sub: "Tahun Baru · 2R", cat: "corp" },
  { i: 9, src: "/images/g-bday1.jpg", title: "Mia's Sweet 17", sub: "Ulang Tahun · 4R", cat: "bday" },
  { i: 10, src: "/images/g-wed8.jpg", title: "Defika & Fajri", sub: "Wedding · 4R", cat: "wed" },
  { i: 11, src: "/images/g-strip3.jpg", title: "Implora Glam", sub: "Activation · 2R", cat: "corp" },
  { i: 12, src: "/images/g-corp4.jpg", title: "Patria Award", sub: "Corporate · 4R", cat: "corp" },
  { i: 13, src: "/images/g-wed6.jpg", title: "Rossa & Luthfi", sub: "Wedding · 2R", cat: "wed" },
  { i: 14, src: "/images/g-grad2.jpg", title: "MTs Umdatur", sub: "Wisuda · 4R", cat: "grad" },
  { i: 15, src: "/images/g-wed9.jpg", title: "Endang & Adam", sub: "Wedding · 4R", cat: "wed" },
  { i: 16, src: "/images/g-bday3.jpg", title: "Ayleen's 2nd", sub: "Ulang Tahun · 2R", cat: "bday" },
  { i: 17, src: "/images/g-corp2.jpg", title: "Kemenag DKI", sub: "Corporate · 4R", cat: "corp" },
  { i: 18, src: "/images/g-wed3.jpg", title: "Panca & Melissa", sub: "Wedding · Film", cat: "wed" },
  { i: 19, src: "/images/g-corp7.jpg", title: "Darfest 2026", sub: "Festival · 2R", cat: "corp" },
  { i: 20, src: "/images/g-wed2.jpg", title: "Marsya & Iwan", sub: "Wedding · Polaroid", cat: "wed" },
  { i: 21, src: "/images/g-bday2.jpg", title: "Little Builder", sub: "Ulang Tahun · 4R", cat: "bday" },
  { i: 22, src: "/images/g-corp8.jpg", title: "Pesta Untung", sub: "Activation · 2R", cat: "corp" },
  { i: 23, src: "/images/g-wed7.jpg", title: "Rika & Hendra", sub: "Wedding · 2R", cat: "wed" },
  { i: 24, src: "/images/g-bday4.jpg", title: "Dea's Sweet 17", sub: "Ulang Tahun · 2R", cat: "bday" },
  { i: 25, src: "/images/g-corp5.jpg", title: "Surveyor Indonesia", sub: "Corporate · 4R", cat: "corp" },
];

/** Alt text untuk tiap foto galeri — dipakai di homepage dan /galeri. */
export const galleryAlt = (g: GalleryItem): string =>
  `Hasil photobooth ${g.sub.replace(" · ", " format ")} — ${g.title}`;
