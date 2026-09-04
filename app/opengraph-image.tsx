import { ImageResponse } from "next/og";

// Branded OG card for link shares (WhatsApp, Instagram, etc.) — dark-luxury
// skin matching the site tokens (paper #15120e, gold #c8a96a).
export const alt =
  "Tetra Photobooth — Sewa Photobooth Premium Bogor & Jabodetabek";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#15120e",
          backgroundImage:
            "radial-gradient(80% 120% at 50% -20%, #2a2216 0%, #15120e 60%)",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.35em",
            color: "#c8a96a",
            textTransform: "uppercase",
          }}
        >
          Sewa Photobooth Premium
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 96,
            color: "#efe7da",
            display: "flex",
          }}
        >
          Tetra Photobooth
        </div>
        <div
          style={{
            marginTop: 20,
            width: 120,
            height: 2,
            background: "#c8a96a",
          }}
        />
        <div
          style={{
            marginTop: 26,
            fontSize: 30,
            color: "#a99b87",
          }}
        >
          Bogor · Jakarta · Depok · Tangerang · Bekasi
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            color: "#c8a96a",
          }}
        >
          Cetak instan unlimited · Frame custom gratis · tetraphoto.com
        </div>
      </div>
    ),
    { ...size }
  );
}
