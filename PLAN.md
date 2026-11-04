# Rencana: Landing Page Dokter Lift Indonesia — Lift Barang (Next.js via Better-T-Stack)

**Status:** dieksekusi 27 Okt 2026 — preview berjalan di `http://localhost:3001`. Data cabang & kontak masih placeholder.
**Koreksi penting:** bisnis ini **lift barang / freight lift** (rancang-bangun, instalasi, servis), **bukan** klinik estetika. Semua asumsi kosmetik dibatalkan.
**Workspace:** `/Users/iskavonalia/Documents/dokterlift` (hanya berisi dokumen ini).

---

## 1. Tujuan & hasil

Landing page B2B untuk **Dokter Lift Indonesia** — usaha lift barang dengan **2 cabang** — yang meyakinkan calon klien (pemilik gudang, pabrik, ritel/minimarket, F&B/hotel, rumah sakit, kontraktor) bahwa perusahaan ini bisa **merancang, memasang, dan merawat** lift barang dengan ukuran yang pas untuk gedung mereka.

**Fungsi halaman:** tautan bio Instagram/TikTok, sumber leads utama (**Minta Survey** via WhatsApp), dan URL resmi profil Google Business tiap cabang.

**Hasil:** monorepo Better-T-Stack (Next.js) jalan di `http://localhost:3001`, README, daftar placeholder, screenshot desktop/mobile.

**Kriteria sukses**

- 4 route (`/`, `/disclaimer`, `/kebijakan-privasi`, `not-found`) + `sitemap.xml` & `robots.txt`; tanpa error console/hydration.
- Semua section Server Component; hanya 3 client component (nav, form, sticky CTA). JS < 200 KB gzip, LCP < 2 dtk lokal, CLS < 0,02.
- Tidak ada horizontal scroll di 390/768/1440px; target sentuh ≥44px; axe 0 critical/serious.
- Semua CTA → `wa.me` dengan pesan terisi (jenis lift, kapasitas, lokasi, kebutuhan); aman saat nomor placeholder.
- `pnpm build` + `tsc --noEmit` + `biome check` lulus; `scripts/check.mjs` tanpa link rusak.
- **Tidak ada klaim palsu**: tanpa angka proyek, sertifikasi, garansi, atau kapasitas yang belum dikonfirmasi pemilik.

## 2. Positioning & pesan

- **Kategori:** kontraktor spesialis lift barang (custom fabrication + installation + maintenance), bukan dealer merek.
- **Masalah klien:** lift sering macet saat operasional, kapasitas tidak sesuai kebutuhan, spare part lama, tidak ada yang bisa dipanggil saat darurat.
- **Janji:** ukuran ditentukan dari survey (bukan katalog), pengerjaan terdokumentasi, ada tim yang bisa dihubungi setelah serah terima.
- **Nada copy:** teknis, langsung, tanpa hiperbola. "Survey dulu, baru ukuran." Bukan "solusi terbaik no. 1".
- **Istilah yang dipakai:** lift barang, freight lift, dumbwaiter, lift makanan, lift pasien, kapasitas (kg), tinggi angkat, kabin, pintu, penggerak (hydraulic/traction), uji beban, servis berkala, spare part.

## 3. Stack (dari Better-T-Stack) — tidak berubah

Tervalidasi `--dry-run`:

```
pnpm dlx create-better-t-stack@3.47.0 . \
  --frontend next --backend none --runtime none \
  --database none --orm none --api none --auth none --payments none \
  --addons biome --examples none --db-setup none \
  --web-deploy none --server-deploy none \
  --package-manager pnpm --install --no-git \
  --disable-analytics --no-render-title --directory-conflict merge
```

- `apps/web` (Next 16 App Router, React 19.2, Tailwind v4, shadcn/ui di `packages/ui`), `packages/config`, `bts.jsonc`, Biome, pnpm workspace.
- Node 22.18.0 sudah cukup (Next 16 ≥20.9; CLI BTS ≥22.12). Dev port **3001**.
- Penyesuaian: buang `varlock` + `@varlock/*`, set `output: "export"` + `images.unoptimized`, pertahankan `typedRoutes`; `reactCompiler` dimatikan bila mengganggu build.

## 4. Desain — "Precision Industrial"

Bukan editorial luxury, bukan SaaS pastel. Terasa seperti perusahaan engineering yang serius: grid, garis ukur, label teknis, kontras tinggi.

- **Font:** **Archivo Variable** (display uppercase + body) + **IBM Plex Mono** (label, spesifikasi, nomor). Self-host via `@fontsource`.
- **Palet:** ink `#111310`, graphite `#1B1E19`, steel `#2C302A`, paper `#EDE9E0`, concrete `#E3DED2`, line `#C7C2B4`, oxide orange `#C74A22` (aksen utama), signal yellow `#E7B53C` (sangat hemat), white `#F8F6F0`.
- **Bentuk:** sudut tajam (radius 0–4px), kartu dengan _corner ticks_ + hairline, tombol kotak (bukan pill), ikon stroke 1.5px. Tanpa shadow lembut.
- **Tipografi:** H1 `clamp(48px,8.5vw,132px)` uppercase, tracking -0.03em; H2 `clamp(32px,4.5vw,64px)`; body 17–18px/1.6; label mono 11px uppercase tracking .12em.
- **Grid & ritme:** 12 kolom, maks 1400px, gutter `clamp(20px,4vw,64px)`, section padding `clamp(88px,10vw,160px)`; garis hairline horizontal antar-section; grid blueprint halus di section gelap.
- **Motif:** line-art isometrik lift dengan garis ukur (SVG custom), panah beban ↑, label `01/02/03`, stempel "SURVEY · PASANG · RAWAT", crosshair di sudut kartu.
- **Warna section:** paper → dark graphite (proses) → paper → dark (standar/cabang) untuk ritme.
- **Motion:** line-draw SVG (stroke-dashoffset), reveal via satu IntersectionObserver, marquee kapabilitas; easing `cubic-bezier(.16,.84,.44,1)` 500–700 ms; semua mati saat `prefers-reduced-motion`; konten tetap terlihat tanpa JS.
- **Aset:** belum ada foto → line-art, tipografi, dan slot foto workshop/instalasi berlabel (bukan stok/AI). Bila foto asli tersedia, tinggal ganti slot.

## 5. Section landing page

| #   | Section               | Isi                                                                                                                                   | Catatan desain                                                                                                                                |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Nav                   | Logo teks "DOKTER LIFT", anchor Layanan/Tipe/Proses/Cabang/FAQ, CTA **Minta Survey**                                                  | Bar atas tipis, menempel; versi scroll mengecil; overlay mobile full-screen                                                                   |
| 2   | Hero                  | H1 "Lift barang yang bekerja. Bukan yang bikin berhenti." Sub: rancang-bangun, instalasi, servis untuk gudang–pabrik–ritel–F&B. 2 CTA | Split asimetris; panel teknis kecil (Rancang-bangun / Servis / 2 cabang); line-art lift isometrik                                             |
| 3   | Marquee               | "LIFT BARANG · DUMBWAITER · LIFT MAKANAN · SERVIS · SPARE PART · UJI BEBAN"                                                           | Strip gelap, mono, animasi CSS                                                                                                                |
| 4   | Masalah → solusi      | 3 kartu: lift sering berhenti · ukuran tidak sesuai · spare part lama                                                                 | Angka besar, teks pendek, tanpa ikon klise                                                                                                    |
| 5   | Layanan               | 4 kartu: Rancang-bangun custom · Instalasi & commissioning · Servis & perawatan · Perbaikan & spare part                              | Bento asimetris, panel `<details>` berisi lingkup kerja + CTA per layanan                                                                     |
| 6   | Tipe & konfigurasi    | Lift barang · Dumbwaiter/lift makanan · Lift pasien · Custom (mezzanine/rumah)                                                        | Kartu dengan kolom parameter: kapasitas, tinggi angkat, kabin, pintu, penggerak — **tanpa angka karangan**, semua "ditentukan setelah survey" |
| 7   | Proses                | 6 langkah: Survey & ukur → Desain & penawaran → Fabrikasi → Instalasi → Uji beban & serah terima → Perawatan                          | Band gelap, garis timeline, nomor mono besar                                                                                                  |
| 8   | Sektor                | Gudang/logistik · Pabrik · Ritel/minimarket · F&B/hotel · Kesehatan · Bangunan bertingkat                                             | Grid 6 kartu garis, ikon custom                                                                                                               |
| 9   | Standar kerja         | 4 poin: survey terukur, tim teknisi, dokumentasi uji beban, respons servis                                                            | Checklist dengan tanda kotak; sertifikasi/izin = placeholder `[ISI]`                                                                          |
| 10  | Cabang                | 2 kartu: alamat, jam, telepon, WA, area layanan, Rute                                                                                 | Cascade offset desktop; catatan "workshop / area layanan"                                                                                     |
| 11  | Portofolio            | 3 slot proyek (foto, jenis lift, kapasitas, lokasi)                                                                                   | Section render hanya jika data proyek diisi; jika kosong → CTA ke Instagram, bukan kartu kosong                                               |
| 12  | FAQ                   | 8–10: kapasitas custom, lama pengerjaan, izin & uji riksa, garansi, servis luar kota, lift lama, spare part, biaya survey             | `<details>` native, plus/minus                                                                                                                |
| 13  | Form **Minta Survey** | Nama, perusahaan, WhatsApp, kota/lokasi, jenis lift, kapasitas/tinggi, jumlah lantai, kebutuhan (baru/servis/perbaikan), catatan      | Validasi inline, `aria-live`, susun pesan WA                                                                                                  |
| 14  | Footer                | NAP 2 cabang, jam, sosial, disclaimer, legal, tautan Instagram/TikTok                                                                 | 4 kolom, mono kecil                                                                                                                           |
| +   | Sticky CTA mobile     | WhatsApp + Telepon setelah hero                                                                                                       | <768px, safe-area, tidak menutupi footer                                                                                                      |

**Copy hero alternatif** (pilih saat implementasi): "Rancang, pasang, rawat lift barang — sesuai gedung, bukan sesuai katalog."

## 6. WhatsApp & form

- `lib/wa.ts`: normalisasi `08xx`/`+62` → `62…`, validasi, `encodeURIComponent`, deteksi placeholder.
- Template pesan: "Halo Dokter Lift, saya [nama] dari [perusahaan]. Butuh [baru/servis/perbaikan] lift barang di [kota]. Jenis: [..], kapasitas: [..], lantai: [..]. Bisa survey?"
- Semua CTA dirender server (jalan tanpa JS); form hanya enhancement + prefill `?layanan=&cabang=`.
- Placeholder → notice jelas + fallback email, bukan tautan rusak.

## 7. Data & placeholder

`apps/web/src/data/site.ts`:

```
site: { name, legalName:"[ISI]", tagline, description, socials, email, serviceArea }
branches: 2 × { id, label, address, hours, phoneE164, whatsappE164, mapsQuery, mapsEmbed?, type:"workshop"|"service-area" }
capabilities: { certified:"[ISI]", warranty:"[ISI]", response:"[ISI]" }
projects: []   // diisi nanti
```

`services.ts` (4 layanan), `types.ts` (4 tipe lift), `faqs.ts` (10). Semua nilai belum pasti ditulis `[ISI: …]`, terdaftar di `PLACEHOLDERS.md`, dilaporkan `scripts/check.mjs`, dan disorot `DevRibbon` hanya di dev.

## 8. SEO

- Title: "Lift Barang Custom: Rancang, Instalasi & Servis — Dokter Lift Indonesia" (≤60).
- Description: "Jasa pembuatan, instalasi, servis, dan spare part lift barang untuk gudang, pabrik, ritel, dan F&B. Survey lokasi dan penawaran. 2 cabang." (≤155).
- Kata kunci target: lift barang, jasa lift barang, servis lift barang, dumbwaiter, lift makanan, lift pasien, fabrikasi lift, lift barang custom.
- JSON-LD: `Organization` (+`sameAs` IG/TikTok), `WebSite`, 2× `GeneralContractor`/`LocalBusiness` per cabang, `Service` per layanan, `FAQPage`. **Tanpa** `aggregateRating`, `award`, atau klaim sertifikasi.
- `metadataBase` dari `SITE_URL`; canonical; OG image 1200×630; `lang="id"`; sitemap + robots (`Disallow: /` bila `SITE_URL` kosong).
- Catatan: halaman `/layanan/…` dan `/cabang/…` adalah fase berikutnya untuk SEO lokal.

## 9. QA

| Cek                                         | Ambang                                                            |
| ------------------------------------------- | ----------------------------------------------------------------- |
| `pnpm build`, `tsc --noEmit`, `biome check` | 0 error                                                           |
| `scripts/check.mjs`                         | tanpa link rusak; title/desc/canonical; sisa placeholder tercetak |
| Screenshot 1440/1024/768/390                | tiap section, direview manual                                     |
| axe-core                                    | 0 critical/serious                                                |
| Form + CTA                                  | URL WA & prefill benar; placeholder → notice                      |
| reduced-motion + JS off                     | konten & navigasi tetap berfungsi                                 |
| Bobot output                                | JS < 200 KB gzip, tanpa request pihak ketiga                      |

QA memakai hasil `next build` (static export) yang disajikan `scripts/serve.mjs`, bukan dev server.

## 10. Urutan implementasi

1. Scaffold BTS, install, verifikasi dev/build; buang varlock + starter.
2. Config static export, font Archivo + Plex Mono, token Tailwind industrial, layout, favicon/OG.
3. Data + `wa.ts`/seo helper + placeholder detector + dev ribbon.
4. Nav, footer, motion, marquee.
5. Hero + line-art SVG lift (komponen utama desain).
6. Masalah/solusi, layanan, tipe & konfigurasi.
7. Proses, sektor, standar kerja.
8. Cabang, portofolio (conditional), FAQ.
9. Form survey + sticky CTA.
10. Legal, 404, sitemap, robots, JSON-LD.
11. Scripts QA, screenshot, axe, perbaikan visual.
12. README + PLACEHOLDERS.md; QA penuh; serahkan URL + screenshot.

## 11. Risiko

- **Klaim teknis/legal**: sertifikasi, izin, garansi, kapasitas, pengalaman — semua placeholder sampai dikonfirmasi. Referensi uji riksa (Permenaker 8/2020) hanya sebagai edukasi, bukan klaim.
- **Next 16 + React Compiler**: matikan bila build bermasalah.
- **pnpm build scripts**: `pnpm approve-builds` hanya untuk paket terpercaya bila diminta.
- **Data placeholder**: robots disallow tanpa `SITE_URL`, dev ribbon, laporan placeholder.
- **Foto asli** belum ada → jangan pakai stok yang terlihat seperti proyek perusahaan.

## 12. Di luar cakupan

Halaman detail layanan/cabang, CMS, backend booking, foto/proyek asli, domain/deploy, versi Inggris, iklan, katalog harga.

---

## Lampiran A — Yang berubah dari versi sebelumnya

- Industri: kosmetik → **lift barang**; seluruh copy, section, ikon, dan schema diganti.
- Desain: editorial luxury krem/serif → **industrial presisi** graphite/orange, Archivo + Plex Mono, sudut tajam.
- Schema: `MedicalClinic` → `GeneralContractor`/`LocalBusiness` + `Service`.
- Form: booking konsultasi → **permintaan survey** (lokasi, jenis lift, kapasitas, lantai).
- Portofolio & sertifikasi: ditambahkan sebagai slot yang hanya tampil bila data asli tersedia.

## Lampiran B — Data yang perlu diisi

Nama legal & NIB/KBLI · alamat + jam 2 cabang · telepon/WA per cabang · area layanan · jenis & kapasitas lift yang benar-benar dikerjakan · garansi · sertifikasi/izin yang dimiliki · foto workshop/instalasi · 3 proyek (jenis, kapasitas, lokasi, foto) · domain.

## Lampiran C — Catatan Google Business Profile 2 cabang (dikoreksi untuk bisnis jasa)

Bukan bagian rencana ini.

- Tentukan per cabang: **storefront** (workshop/showroom yang bisa dikunjungi, ada papan nama permanen, staffed) atau **service-area** (alamat disembunyikan, set area layanan). Jangan pakai alamat virtual office.
- Satu profil per lokasi; nama **identik** di semua cabang (jangan tambah "Cabang X"); kategori utama sama.
- Telepon berbeda per cabang agar tidak dianggap duplikat.
- Kategori GBP yang paling dekat: kontraktor/elevator service — cek daftar kategori saat membuat profil.
- Verifikasi video ≥30 dtk: papan nama workshop → peralatan/workshop → bukti pengelolaan; review hingga 5 hari kerja.
- Bulk/business group hanya untuk ≥10 lokasi; untuk 2 cabang cukup satu akun + manager staff.
- Field website tiap profil → `https://domain/#cabang-1` / `#cabang-2`.

## Langkah selanjutnya

1. Setujui rencana ini.
2. Saya scaffold Better-T-Stack + bangun landing page industrial, lalu serahkan URL lokal + screenshot.
3. Setelah itu saya jawab ringkas cara membuat Google Business Profile 2 cabang (atau PDF bila diminta).

---

## Catatan implementasi (27 Okt 2026)

- Stack: Better-T-Stack 3.47 → Next.js 16.4.3, React 19.2, Tailwind v4, Biome. Static export untuk preview produksi.
- Desain akhir: industrial presisi dengan identitas asli (merah/hitam/putih) dari file logo yang diunggah; font Archivo + IBM Plex Mono.
- Tambahan dari Q&A pemilik: penjelasan biaya (void, bahan, kapasitas, kategori produk), pengukuran void (lantai → atap), listrik 1 phase 220 V / 3 phase 380 V, jangkauan Jawa–Bali–Sumatera–Kalimantan–NTT, survey luar Jabodetabek via online/video.
- Tidak ada section dokter (usaha ini perusahaan, bukan praktik perorangan). Portofolio disembunyikan sampai foto asli tersedia.
- Koreksi: 3 phase ditulis 380 V (standar), bukan 330 V.
- QA: axe 0 pelanggaran critical/serious, CLS 0, LCP ~140 ms lokal, JS ~185 KB gzip, seluruh CTA WhatsApp berfungsi.
- Panduan Google Business Profile 2 cabang belum dibuat sebagai dokumen; ringkasannya dijawab di chat.

## Iterasi lift interaktif (4 Nov 2026)

- Panel lantai kanan (desktop) + konsol bawah (mobile): G, 01 Layanan, 02 Tipe, 03 Proses, 04 Cabang, 05 FAQ, 06 Survey.
- Pintu lift menutup/membuka saat pindah lantai (GSAP); LED menampilkan lantai tujuan saat bergerak.
- Shaft kiri dengan kabin yang mengikuti scroll dan tick lantai aktif.
- Scene 3D Three.js di hero (kabin, rel, counterweight, label lantai, drag-rotate), lazy-loaded hanya desktop + WebGL + tanpa reduced-motion; fallback SVG di mobile.
- Section memakai label "LANTAI 01–06"; penanda menyala saat section tiba (IntersectionObserver).
- Tanpa JS: pintu disembunyikan, panel/konsol tetap anchor, padding via noscript. Reduced motion: tanpa animasi, scroll instan.
- Polish 4 Nov: sound FX lift lengkap (klik tombol, pintu relay+thud, motor, chime ding-dong; Web Audio, default mati, toggle SND + localStorage), pulse saat tiba, display lantai live di scene 3D, pintu lebih cepat (~0,4/0,85/0,72 dtk).
- QA ulang: axe 0 critical/serious, CLS 0, LCP 76–124 ms lokal, JS total 351 KB gzip (Three.js 133 KB hanya desktop; mobile ~218 KB), keyboard panel berfungsi.
