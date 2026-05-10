#!/bin/sh

SEED_MARKER="/app/.seeded"

# Only seed the database on first run
if [ ! -f "$SEED_MARKER" ]; then
  echo "🌱 First run — seeding database..."

  echo "📍 Seeding theaters..."
  node dist/scripts/seed-theaters.js

  echo "🎬 Seeding movies..."
  node dist/scripts/seed-movies.js

  echo "🎟️ Seeding shows..."
  node dist/scripts/seed-shows.js

  # Mark as seeded so we don't re-run on restart
  touch "$SEED_MARKER"
  echo "✅ Seeding complete!"
else
  echo "⏭️ Database already seeded — skipping."
fi

echo "🚀 Starting server..."
exec node dist/server.js

