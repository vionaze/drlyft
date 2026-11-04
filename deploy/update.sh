#!/usr/bin/env bash
set -euo pipefail

# Ambil kode terbaru dari GitHub, lalu jalankan deploy.
# Pemakaian: bash /opt/dokterlift/deploy/update.sh
APP_DIR="${APP_DIR:-/opt/dokterlift}"
REPO="${REPO:-https://github.com/vionaze/drlyft.git}"

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
fi

git -C "$APP_DIR" pull --ff-only
exec bash "$APP_DIR/deploy/vps-deploy.sh"
