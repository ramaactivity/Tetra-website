# Deploy — Tetra Photobooth

## Jalur deploy (CI-token, BUKAN native Git integration)

Deploy = **`git push` ke branch `main` → GitHub Actions** ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)),
yang men-deploy ke Vercel pakai **token** (`secrets.VERCEL_TOKEN`).

- **Native Vercel Git integration di-DISCONNECT** untuk project ini, dan akun
  GitHub **TIDAK** di-connect ke akun Vercel.
- **Kenapa pola ini?** Satu akun GitHub cuma bisa "login-connect" ke satu akun
  Vercel dalam satu waktu. Karena banyak project tersebar di beberapa akun
  Vercel berbeda, native Git integration antar-project saling rebutan koneksi
  GitHub → koneksi lepas → deploy ke-block. Pola CI-token tidak bergantung pada
  koneksi GitHub↔Vercel, jadi permanen dan tidak saling rebutan.

## Akun & domain

- **Vercel:** `visualtetra@gmail.com` — scope/team `visualtetra-9970s-projects`
  (whoami: `visualtetra-9970`), project `tetra-photobooth`.
- **GitHub:** account `ramaactivity`, push as `rama.activity98@gmail.com`.
  Repo: https://github.com/ramaactivity/Tetra-website (private, branch `main`).
- **Production domain:** https://tetraphoto.com (+ www). Fallback alias:
  https://tetra-photobooth.vercel.app

## IDs (bukan rahasia — di-inline ke workflow sebagai env)

- `VERCEL_ORG_ID`  = `team_dTn9InAoDuNiGiK1ca7VOSBB`
- `VERCEL_PROJECT_ID` = `prj_UMTPpuz64purvnsKa7beiC5kQL8d`

Sumber: `.vercel/project.json` (di-gitignore, lokal saja).

## Catatan penting tentang workflow

- **`rm -rf .git` itu WAJIB.** Vercel Hobby memblok deploy yang commit-author
  email-nya tak cocok dengan anggota team ("commit email could not be matched").
  Karena GitHub login sengaja tidak di-connect, kita buang metadata git supaya
  deploy diatribusikan ke pemilik token (anggota team) → lolos.
- **Build DI VERCEL, bukan prebuilt.** Jangan pakai `vercel build` /
  `vercel deploy --prebuilt` di runner — sempat menggantung di "Building…" dan
  butuh setup package manager (pnpm) di runner. Biarkan Vercel yang install &
  build; runner tidak perlu package manager apa pun.
- **Token TIDAK pernah masuk repo.** Disimpan sebagai GitHub secret
  `VERCEL_TOKEN`. `.env*` dan `.vercel` sudah di-gitignore.

## Setup token (sekali saja)

1. Vercel → https://vercel.com/account/settings/tokens → **Create Token** →
   scope ke team `visualtetra-9970s-projects` → **No Expiration** → copy.
2. GitHub repo → Settings → Secrets and variables → Actions → **New repository
   secret** → nama `VERCEL_TOKEN` (HURUF BESAR SEMUA) → paste token.

## Troubleshooting

- **Blocked "commit email could not be matched"** → step `rm -rf .git` hilang
  dari workflow. Kembalikan step itu.
- **Run Actions merah / gagal auth** → token expired atau salah scope. Bikin
  token baru (langkah Setup di atas), update secret `VERCEL_TOKEN`, re-run.
- **Dobel-deploy** → native Git integration masih nyambung. Vercel project →
  Settings → Git → **Disconnect**.
