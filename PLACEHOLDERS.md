# Status Go-Live — Dokter Lift

Data utama sudah diisi dari informasi yang kamu kirim dan link Google Maps.
Sisa item di bawah ini yang masih perlu dikonfirmasi/diperbaiki sebelum/sesudah deploy.

---

## 1. Sudah diisi

| Item                 | Nilai                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------- |
| WhatsApp utama       | `+62 822-9548-1900` (`6282295481900`)                                                    |
| Email                | `dokterlift9@gmail.com`                                                                  |
| Domain               | `https://dokterlift.com` — sudah di `apps/web/.env.local`                                |
| Cabang Utama — Legok | Jl. Raya Rancaiyuh, Bojongkamal, Legok, Kab. Tangerang 15820                             |
| Cabang Sunter        | Jl. Cempaka No. 10, RT.6/RW.3, Sunter Agung, Jakarta Utara 14350                         |
| Telepon/WA cabang    | `+6282295481900` (sementara sama untuk keduanya)                                         |
| Google Maps          | Legok: `maps.app.goo.gl/eaUSBR4tyeLu2iaU6` · Sunter: `maps.app.goo.gl/Ptr9EiaRRezQB4yw5` |
| Jenis lokasi         | `Kantor` untuk keduanya                                                                  |
| Jam operasional      | **Belum ada** → ditampilkan “Jam kunjungan dikonfirmasi via WhatsApp”                    |
| Nama legal           | kosong (schema Organization tidak menampilkan `legalName`)                               |

Kanonis, sitemap, robots, dan OG sudah memakai `https://dokterlift.com`.

---

## 2. Masih perlu dari kamu

### Wajib sebelum/sesudah deploy

- [ ] **Jam operasional tiap cabang.** Google Maps: Legok tertulis “Buka 24 jam”,
  Sunter belum punya jam. Kirim jam sebenarnya agar tampil di kartu cabang
  dan schema.
- [ ] **Hosting + DNS.** Domain sudah di-set di build, tapi website belum di-deploy.
  Pilih Netlify/Vercel/Cloudflare Pages:
  - Build: `pnpm build`
  - Output: `apps/web/out`
  - Env: `NEXT_PUBLIC_SITE_URL=https://dokterlift.com`
- [ ] **Cek Google Business Profile**:
  - Nama listing sekarang **berbeda**: “Dokterlift indonesia official” (Legok)
    vs “Dokterlift indonesia office Sunter”. Samakan nama agar tidak dianggap
    duplikat.
  - Kategori juga beda (“Perusahaan Konstruksi” vs “Jasa Konstruksi dan Bangunan”).
    Samakan kategori utama.
  - Nomor telepon sebaiknya berbeda per cabang (sekarang satu nomor untuk keduanya).
  - Isi field Website: `https://dokterlift.com` atau `https://dokterlift.com/#cabang`.

### Opsional

- [ ] **Nama legal PT/CV** (mis. `PT Dokter Lift Indonesia`) untuk schema & footer.
- [ ] **Konfirmasi jenis lokasi.** Sekarang “Kantor”; ubah ke “Workshop” bila pelanggan
  bisa datang melihat unit/produksi.
- [ ] **Peta asli** (`mapsEmbed`) jika ingin iframe Google Maps, bukan peta skematis.
  Catatan: iframe Google memuat pihak ketiga; kebijakan privasi perlu disesuaikan.
- [ ] **Nomor telepon kantor** per cabang (bukan hanya WA).
- [ ] **Foto workshop/instalasi** — section portofolio belum ditampilkan; perlu
  komponen baru / mengaktifkan kembali `Projects`.
- [ ] **Halaman per cabang** (`/cabang/legok`, `/cabang/sunter`) untuk SEO lokal
  dan link GBP yang lebih spesifik.
- [ ] **Testimoni asli** dengan izin klien.
- [ ] **Analytics** (Plausible/GA) — saat ini tidak ada tracking.

---

## 3. File yang dipakai

- Data cabang, WA, email, domain: `apps/web/src/data/site.ts`
- Domain build: `apps/web/.env.local`
- Konten/FAQ: `apps/web/src/data/content.ts`
- Layanan: `apps/web/src/data/services.ts`
- Tipe lift: `apps/web/src/data/types.ts`
- Header/logo: `apps/web/src/components/Header.tsx`
- Jam/catatan cabang: `apps/web/src/components/Branches.tsx`

---

## 4. Verifikasi setelah perubahan

```bash
pnpm build
pnpm preview       # http://127.0.0.1:4173
pnpm qa:check      # link, meta, JSON-LD, placeholder, ukuran JS
pnpm check         # TypeScript + Biome
pnpm qa:axe        # aksesibilitas (preview harus berjalan)
```

Hasil terakhir (data final):

- `qa:check`: **0 placeholder**, 0 link rusak, JSON-LD valid
- axe-core: **0 pelanggaran** critical/serious (1440 & 390)
- canonical: `https://dokterlift.com`
- robots: `Allow: /` + sitemap domain
- JS total ±350 KB gzip (Three.js hanya desktop; mobile ±218 KB)

---

## 5. Catatan

- Nomor `+6282295481900` dipakai untuk telepon dan WhatsApp **kedua cabang**.
  Kalau nanti ada nomor kantor masing-masing, ganti `phoneDisplay`, `phoneE164`,
  `whatsappE164` per cabang.
- `StickyCta.tsx` tidak dipakai (diganti panel/konsol lift).
- `DevRibbon` tidak muncul lagi karena `isPlaceholder` sudah `false`.
- Jangan ubah `id` section (`layanan`, `tipe`, `proses`, `cabang`, `faq`, `survey`)
  karena panel lift memakai id tersebut.
