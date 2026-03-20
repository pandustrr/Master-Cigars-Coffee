#!/bin/bash

# Keluar jika ada error
set -e

echo "🚀 Memulai Deployment di Server..."

# 1. Mode Pemeliharaan
echo "🚧 Mengaktifkan Maintenance Mode..."
php artisan down || true

# 2. Pull dari GitHub (Pastikan sudah di-merge ke Main)
echo "📥 Menarik data terbaru dari GitHub..."
git pull origin main

# 3. Instalasi Dependency PHP (Menggunakan composer.phar yang baru diunduh)
echo "🐘 Mengupdate Composer dependencies..."
php composer.phar install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# 4. Migrasi Database
echo "🗄️ Menjalankan migrasi database..."
php artisan migrate --force

# 5. Optimasi & Cache
echo "⚡ Mengoptimalkan performa aplikasi..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 6. Bersihkan Cache lama
echo "🗑️ Membersihkan cache aplikasi..."
php artisan cache:clear

# 7. Selesai: Website Aktif Kembali
echo "🌐 Websiste dionlinekan kembali..."
php artisan up

echo "✅ Deployment Selesai dengan Mantab!"
