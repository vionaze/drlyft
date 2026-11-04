# Dokter Lift — Landing Page

Landing page untuk **Dokter Lift** (lift barang, lift makanan & lift rumahan): rancang-bangun, instalasi, servis, dan spare part. Kapasitas lift barang **500 kg – 10 ton**, dua cabang, melayani seluruh Indonesia.

Dibangun dengan **Better-T-Stack**: Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + Biome, dalam struktur monorepo pnpm.

---

## Prasyarat

- Node.js **≥ 22.12** (mesin ini: 22.18)
- pnpm **11** (`corepack enable` bila belum ada)

## Menjalankan di laptop

```bash
pnpm install
pnpm dev
```

Buka **http://localhost:3001** (bukan `127.0.0.1` — Next 16 memblokir resource dev dari origin lain; `allowedDevOrigins` sudah ditambahkan untuk berjaga-jaga).

## Build & preview statis

```bash
pnpm build     # menghasilkan apps/web/out (static export)
pnpm preview   # menyajikan apps/web/out di http://127.0.0.1:4173
```

Build memakai `NEXT_STATIC_EXPORT=1` (lihat `apps/web/next.config.ts`). Dev server tidak memakai mode export.

---

## Struktur penting

```
apps/web/src/
  app/                 halaman: /, /disclaimer, /kebijakan-privasi, 404
                       + sitemap.ts, robots.ts, icon.svg, apple-icon.png
  components/          Nav, Hero, Layanan, Tipe, Proses, Cabang, FAQ, Form Survey, Footer
  components/lift/     panel lantai, pintu, shaft, provider GSAP, scene 3D, hero instrument
  data/site.ts         brand, sosial, 2 cabang (alamat/jam/telepon/WA), area layanan
  data/content.ts      masalah, proses, biaya, sektor, standar kerja, FAQ
  data/floors.ts       7 lantai lift (G, 01–06) + label
  data/services.ts     4 layanan
  data/types.ts        4 tipe lift + parameter
  lib/wa.ts            normalisasi nomor + penyusun pesan WhatsApp
  lib/seo.ts           canonical, JSON-LD (Organization, WebSite, Service, FAQ)
  fonts/               Archivo + IBM Plex Mono (self-host)
  index.css            design token + komponen dasar + antarmuka lift
packages/ui/           komponen shadcn bawaan scaffold (belum dipakai)
scripts/               serve, screenshot QA, cek link/meta, axe
```

## Mengubah konten

| Ingin mengubah                        | File                            |
| ------------------------------------- | ------------------------------- |
| Alamat, jam, telepon, WA, area cabang | `apps/web/src/data/site.ts`     |
| Nama legal, email, nomor WA default   | `apps/web/src/data/site.ts`     |
| Layanan & lingkup pekerjaannya        | `apps/web/src/data/services.ts` |
| Kapasitas/parameter per tipe lift     | `apps/web/src/data/types.ts`    |
| FAQ, proses, alasan biaya, sektor     | `apps/web/src/data/content.ts`  |
| Kalimat di hero / section             | `apps/web/src/components/*.tsx` |

Setelah mengubah data, ganti semua nilai bertanda `[ISI: …]` dan nomor contoh. Daftar lengkapnya ada di [PLACEHOLDERS.md](PLACEHOLDERS.md).

## Interaksi lift (GSAP + Three.js)

Halaman ini bekerja seperti panel lift:

- **Panel lantai** menempel di kanan (desktop). Tekan G / 01–06 untuk pindah section.
  Di ponsel panel berubah menjadi **konsol bawah** dengan LED, tombol lantai, dan CALL SURVEY.
- **Pintu lift** menutup saat berpindah lantai, lalu membuka setelah section tujuan tercapai.
  LED menampilkan lantai tujuan saat bergerak, dan lantai aktif setelah tiba.
- **Shaft** di kiri menampilkan posisi kabin mengikuti scroll; tick lantai menyala sesuai posisi.
- **Scene 3D** di hero (Three.js): kabin bergerak di shaft, bisa di-drag untuk diputar,
  plus **display lantai live** yang ikut berubah saat kabin melewati lantai.
  Scene hanya dimuat di layar ≥1024px, tanpa reduced-motion, dan jika WebGL tersedia.
  Di ponsel / browser tanpa WebGL, tampil ilustrasi CAD SVG sebagai fallback.
- **Sound FX lift** disintesis penuh (Web Audio, tanpa file audio): klik tombol, pintu
  menutup (relay + hentakan), dengung motor selama perjalanan, lalu **ding-dong metalik**
  saat tiba. Default **mati**; tombol **SND ON/OFF** ada di panel & konsol, preferensi
  disimpan di `localStorage`. Saat diaktifkan, chime diputar sebagai preview.
- **GSAP** dipakai untuk animasi pintu, scroll antar-lantai, intro hero, dan status panel.
  Durasi: pintu menutup ±0,4 dtk, perpindahan ±0,85 dtk, pintu membuka ±0,72 dtk.
- **Pulse saat tiba**: LED panel dan konsol menyala sebentar ketika lantai tercapai.
- **Tanpa JS**: pintu disembunyikan, panel/konsol tetap berupa tautan anchor, body padding
  disiapkan lewat `<noscript>`.
- **Reduced motion**: pintu langsung terbuka, perpindahan lantai instan, scene 3D tidak dimuat.

File utama: `components/lift/LiftProvider.tsx`, `LiftPanel.tsx`, `LiftDoors.tsx`,
`LiftShaft.tsx`, `HeroInstrument.tsx`, `mountLiftScene.ts`, `data/floors.ts`.

## Domain & SEO

Canonical, sitemap, dan OG memakai `NEXT_PUBLIC_SITE_URL`. Untuk build produksi:

```bash
# apps/web/.env.local
NEXT_PUBLIC_SITE_URL=https://dokterlift.com
```

Tanpa variabel itu, `robots.txt` otomatis **Disallow: /** agar preview localhost tidak terindeks. Setelah domain diisi, build ulang.

## Deploy

Static export bisa ditaruh di Netlify, Vercel, Cloudflare Pages, atau hosting statis lain:

- Build command: `pnpm build`
- Output directory: `apps/web/out`
- Environment: `NEXT_PUBLIC_SITE_URL=https://dokterlift.com`

Hosting statis perlu mendukung clean URL (`/disclaimer` → `disclaimer.html`). Netlify/Vercel menangani ini otomatis; `scripts/serve.mjs` sudah menangani untuk preview lokal.

## QA

```bash
pnpm check-types                 # TypeScript
pnpm qa:check                    # link, meta, JSON-LD, placeholder, ukuran JS
pnpm qa:axe                      # axe-core (butuh preview di :4173)
node scripts/shoot.mjs http://127.0.0.1:4173 .qa/screens
```

Hasil terakhir: axe 0 pelanggaran critical/serious, CLS 0, LCP ~76–124 ms (lokal),
JS total ~351 KB gzip — termasuk chunk Three.js ~133 KB yang **hanya dimuat di desktop**;
beban awal ponsel ~218 KB gzip. Panel lantai & pintu tetap berfungsi tanpa JavaScript
(sebagai anchor), dan animasi dimatikan untuk `prefers-reduced-motion`.

## Catatan teknis

- **Tanpa backend.** Form survey hanya menyusun pesan lalu membuka WhatsApp; tidak ada data yang disimpan di server.
- **Tanpa foto asli.** Ilustrasi lift adalah SVG; slot portofolio otomatis tersembunyi sampai `projects` diisi.
- **Tanpa harga.** Harga memang harus setelah survey; halaman menjelaskan 4 faktor biaya dan alasan proposal tertulis.
- **Listrik 3 phase ditulis 380 V** (standar Indonesia). Q&A menyebut 330 V — dikoreksi; ubah bila instalasi Anda memang 330 V.
- Profil Google cabang Sunter memakai tautan share yang Anda kirim. Sebaiknya ganti dengan URL Google Maps kanonik setelah profil final.
- `packages/ui` dan `biome.json` berasal dari scaffold Better-T-Stack. `bts.jsonc` disimpan agar `create-better-t-stack add` masih bisa dipakai.

## Belum termasuk

Halaman detail per layanan/cabang, CMS, backend booking, foto proyek asli, harga, sertifikasi/izin yang belum dikonfirmasi, versi bahasa Inggris.
