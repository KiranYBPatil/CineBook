# ============================================
# Stage 1: Build - Compile TypeScript to JS
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (layer caching)
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies for tsc)
RUN npm ci

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript → dist/
RUN npm run build

# ============================================
# Stage 2: Production - Lean runtime image
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

# Copy only production manifests
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Copy entrypoint script for auto-seeding
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Expose the backend port
EXPOSE 9000

# Run seeds then start server
CMD ["./entrypoint.sh"]
