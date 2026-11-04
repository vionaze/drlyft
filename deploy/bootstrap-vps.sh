#!/usr/bin/env bash
set -euo pipefail

# Jalankan sebagai root di VPS sekali saja, setelah folder deploy/ sudah di-copy.
# Pemakaian: bash bootstrap-vps.sh
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOMAIN="${DOMAIN:-dokterlift.com}"

install -d -o deploy -g deploy -m 755 /var/www/dokterlift

install -m 644 "$ROOT/nginx/dokterlift.com.conf" "/etc/nginx/sites-available/$DOMAIN"
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  cat "$ROOT/nginx/dokterlift.com.ssl.conf" >> "/etc/nginx/sites-available/$DOMAIN"
fi
ln -sfn "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"

nginx -t
systemctl reload nginx

echo "Nginx siap untuk $DOMAIN"
echo "Berikutnya: arahkan DNS, lalu jalankan certbot --nginx -d $DOMAIN -d www.$DOMAIN"
