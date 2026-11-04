# Deploy ke VPS (dokterlift.com)

Target: **161.97.130.68** (Ubuntu 24.04, Nginx). Website disajikan sebagai
static export dari `apps/web/out` — tidak butuh Node.js berjalan di VPS.

## 1. Pertama kali di VPS

Dari komputer lokal (butuh akses SSH root):

```bash
scp -r deploy root@161.97.130.68:/root/
ssh root@161.97.130.68 'bash /root/deploy/bootstrap-vps.sh'
```

Lalu kirim build pertama:

```bash
./deploy/deploy.sh
```

Cek dari VPS (tanpa DNS):

```bash
curl -I -H 'Host: dokterlift.com' http://127.0.0.1/
```

## 2. DNS Cloudflare

Di Cloudflare → DNS:

| Type  | Name  | Content          | Proxy   |
| ----- | ----- | ---------------- | ------- |
| A     | `@`   | `161.97.130.68`  | Proxied |
| CNAME | `www` | `dokterlift.com` | Proxied |

Hapus record A/AAAA/CNAME lama untuk `@` dan `www` yang masih mengarah ke
server lain, termasuk URL forwarding lama (saat ini `@` masih 302 ke `www`
lewat Namecheap URL Forward). Jangan hapus record MX/TXT milik email.

## 3. SSL (Let's Encrypt)

DNS harus mengarah ke VPS dulu. Untuk menerbitkan sertifikat, **matikan proxy**
(grey cloud) sementara pada record `@` dan `www`, lalu di VPS:

```bash
certbot certonly --webroot -w /var/www/dokterlift \
  -d dokterlift.com -d www.dokterlift.com \
  --non-interactive --agree-tos -m dokterlift9@gmail.com --no-eff-email
```

Setelah sertifikat terbit, jalankan `bash /opt/dokterlift/deploy/vps-deploy.sh`
sekali lagi agar server block 443 dipasang (script mendeteksi sertifikat).
Lalu nyalakan proxy lagi dan set Cloudflare:

- SSL/TLS → Overview → **Full (strict)**
- Always Use HTTPS → ON

Alternatif tanpa membuka proxy: gunakan **Cloudflare Origin Certificate**
(SSL/TLS → Origin Server), simpan cert/key di VPS, lalu set Nginx ke sertifikat itu.

## 4. Deploy langsung di VPS (tanpa PM2)

Website ini **static export** — tidak ada proses Node yang perlu dijaga PM2.
Nginx yang menyajikan file. Kalau mau build & deploy dari VPS:

```bash
# sekali saja
git clone https://github.com/vionaze/drlyft.git /opt/dokterlift
bash /opt/dokterlift/deploy/vps-deploy.sh
```

Untuk update berikutnya (pull + build + deploy):

```bash
bash /opt/dokterlift/deploy/update.sh
```

Script `vps-deploy.sh` akan:

1. memakai checkout di `/opt/dokterlift`
2. menulis `apps/web/.env.local`
3. install dependency dengan pnpm 11
4. build static export
5. rsync ke `/var/www/dokterlift`
6. pasang server block Nginx khusus domain ini
7. `nginx -t` + reload

Tidak ada port baru, tidak ada PM2, dan server block situs lain tidak diubah.

## 5. Soal PM2

**Jangan** jalankan `pm2 start pnpm start` — project ini tidak punya server
Next.js (`output: export`), jadi tidak ada proses yang bisa dijalankan PM2.
Nginx sudah menjadi web server-nya.

Kalau tetap ingin proses Node (tidak disarankan), baru gunakan static server
seperti `pm2 serve /var/www/dokterlift 3002 --name dokterlift --spa` lalu proxy
Nginx ke `127.0.0.1:3002`. Tapi ini menambah port dan proses tanpa manfaat.

## 6. Deploy update dari laptop

```bash
./deploy/deploy.sh
```

Script akan build ulang, rsync ke `/var/www/dokterlift`, chown ke `deploy`,
test Nginx, dan reload.

## Catatan

- `apps/web/.env.local` **tidak** ikut Git. Isinya:
  `NEXT_PUBLIC_SITE_URL=https://dokterlift.com`
- Config ini **hanya** menambah server block untuk `dokterlift.com` di port
  80/443. Port lain (3000, 3001, 8080, mail, dll.) dan server block situs lain
  tidak disentuh.
- Jangan menyentuh server block situs lain di `/etc/nginx/sites-enabled/`.
- Log: `/var/log/nginx/dokterlift.access.log` dan `dokterlift.error.log`.
