#!/bin/sh
echo "🌱 Running database seeds..."

echo "📍 Seeding theaters..."
node dist/scripts/seed-theaters.js

echo "🎬 Seeding movies..."
node dist/scripts/seed-movies.js

echo "🎟️ Seeding shows..."
node dist/scripts/seed-shows.js

echo "✅ Seeding complete! Starting server..."
exec node dist/server.js
