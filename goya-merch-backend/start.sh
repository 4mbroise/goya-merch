#!/bin/sh
cd /server/apps/backend

echo "Running database migrations..."
npx medusa db:migrate

echo "Seeding database..."
npx medusa exec ./src/scripts/seed-goya-catalog.ts || echo "Catalog seed failed, continuing..."
npx medusa exec ./src/scripts/seed-goya-stock.ts || echo "Stock seed failed, continuing..."

echo "Starting Medusa development server..."
npx medusa develop
