#!/usr/bin/env bash
set -euo pipefail

# Deploy Dokter Lift langsung di VPS (build static + Nginx).
# Jalankan sebagai root: bash deploy/vps-deploy.sh
# Tidak memakai PM2 dan tidak menyentuh port lain.

DOMAIN="${DOMAIN:-dokterlift.com}"
APP_DIR="${APP_DIR:-/opt/dokterlift}"
WEB_ROOT="${WEB_ROOT:-/var/www/dokterlift}"
REPO="${REPO:-https://github.com/vionaze/drlyft.git}"
PNPM_VERSION="${PNPM_VERSION:-11.1.2}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Jalankan sebagai root."
  exit 1
fi

if [ ! -d "$APP_DIR/.git" ]; then
  mkdir -p "$(dirname "$APP_DIR")"
  git clone "$REPO" "$APP_DIR"
else
  git -C "$APP_DIR" fetch origin main
  git -C "$APP_DIR" reset --hard origin/main
fi

cd "$APP_DIR"

cat > apps/web/.env.local <<ENV
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
ENV

npx -y "pnpm@$PNPM_VERSION" install --frozen-lockfile
npx -y "pnpm@$PNPM_VERSION" --filter web build

install -d -o deploy -g deploy -m 755 "$WEB_ROOT"
rsync -a --delete "$APP_DIR/apps/web/out/" "$WEB_ROOT/"
chown -R deploy:deploy "$WEB_ROOT"

install -m 644 "$APP_DIR/deploy/nginx/dokterlift.com.conf" "/etc/nginx/sites-available/$DOMAIN"
ln -sfn "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"

nginx -t
systemctl reload nginx

echo
echo "Deploy selesai: http://$DOMAIN"
echo "Cek lokal: curl -I -H 'Host: $DOMAIN' http://127.0.0.1/"
echo "SSL (setelah DNS-only mengarah ke VPS): certbot --nginx -d $DOMAIN -d www.$DOMAIN --redirect"
