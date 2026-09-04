import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tetra Photobooth",
    short_name: "Tetra",
    description:
      "Jasa sewa photobooth premium di Bogor & Jabodetabek — cetak instan unlimited untuk wedding, ulang tahun & corporate event.",
    start_url: "/",
    display: "browser",
    background_color: "#15120e",
    theme_color: "#15120e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
