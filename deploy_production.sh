#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Production Deployment on Server..."

# 1. Maintenance Mode
echo "🚧 Switching to Maintenance Mode..."
php artisan down || true

# 2. Pull latest changes from Main branch
echo "📥 Pulling latest changes from Main branch..."
git pull origin main

# 3. Install/Update PHP dependencies
echo "🐘 Updating Composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# 4. Migrate database
echo "🗄️ Running database migrations..."
php artisan migrate --force

# 5. Optimization & Caching
echo "⚡ Optimizing application performance..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 6. Build is already pushed to GitHub, so we just clear cache
echo "🗑️ Clearing old application cache..."
php artisan cache:clear

# 7. Final Step: Exit Maintenance Mode
echo "🌐 Taking application back online..."
php artisan up

echo "✅ Deployment finished successfully!"
    