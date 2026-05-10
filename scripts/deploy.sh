#!/bin/bash
# ─── CineBook Deploy Script ─────────────────
# Usage: bash deploy.sh [EC2_PUBLIC_IP]
set -e

APP_DIR="/home/ubuntu/CineBook"

# Use argument if provided, otherwise try metadata endpoint, fallback to localhost
if [ -n "$1" ]; then
    EC2_IP="$1"
else
    # IMDSv2 requires a token
    TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600" 2>/dev/null || true)
    if [ -n "$TOKEN" ]; then
        EC2_IP=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo "localhost")
    else
        EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo "localhost")
    fi
fi

echo "🔧 Setting up backend environment (IP: $EC2_IP)..."
cat > "$APP_DIR/bms-backend/.env" << EOF
PORT=9000
MONGO_CONNECTION_STRING=mongodb://mongo:27017/bookmyscreen
JWT_SECRET=cinebook_jwt_secret_2026
ACCESS_TOKEN_SECRET=cinebook_access_token_secret_2026
REFRESH_TOKEN_SECRET=cinebook_refresh_token_secret_2026
HASH_SECRET=cinebook_hash_secret_2026
FRONTEND_URL=http://$EC2_IP
NODEMAILER_EMAIL=
NODEMAILER_PASSWORD=
EOF

echo "✅ .env created with FRONTEND_URL=http://$EC2_IP"

echo "🔧 Setting up swap space..."
if [ ! -f /swapfile ]; then
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo "✅ 2GB swap space created"
else
    sudo swapon /swapfile 2>/dev/null || true
    echo "⏭️ Swap already exists"
fi

echo "🐳 Building and starting containers..."
cd "$APP_DIR"
unset VITE_BACKEND_URL
docker compose up -d --build

echo "✅ Containers rebuilt and started!"
