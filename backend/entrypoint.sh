#!/bin/sh
set -e

# Wait for MySQL
until nc -z mysql 3306; do
  echo "⏳ Waiting for MySQL..."
  sleep 2
done

echo "✅ MySQL is up!"

# Run Alembic migrations
echo "🚀 Running Alembic migrations..."
alembic upgrade head || true

# Start FastAPI
echo "▶️ Starting FastAPI..."
exec "$@"
