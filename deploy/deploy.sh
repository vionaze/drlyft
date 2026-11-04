#!/usr/bin/env bash
set -euo pipefail

# Build landing page lokal lalu kirim hasil static export ke VPS.
# Pemakaian: ./deploy/deploy.sh
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VPS="${VPS:-root@161.97.130.68}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/dokterlift}"

cd "$ROOT"

if [ ! -f apps/web/.env.local ]; then
  echo "apps/web/.env.local tidak ada. Buat dulu: NEXT_PUBLIC_SITE_URL=https://dokterlift.com"
  exit 1
fi

pnpm --filter web build

rsync -az --delete "apps/web/out/" "$VPS:$REMOTE_DIR/"

ssh "$VPS" "chown -R deploy:deploy $REMOTE_DIR && nginx -t && systemctl reload nginx"

echo "Deployed: https://dokterlift.com"
