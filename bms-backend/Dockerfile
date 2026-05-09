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

# Expose the backend port
EXPOSE 9000

# Run the compiled server
CMD ["node", "dist/server.js"]
