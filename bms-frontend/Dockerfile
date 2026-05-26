# ============================================
# Stage 1: Build - Create production bundle
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (layer caching)
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm ci

# Copy source code and configs
COPY . .

# Build-time env variable for the API URL
# Override at build: docker build --build-arg VITE_BACKEND_URL=https://api.cinebook.com/api/v1 .
ARG VITE_BACKEND_URL=/api/v1
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build the production bundle
RUN npm run build

# ============================================
# Stage 2: Serve - Nginx for static files
# ============================================
FROM nginx:1.27-alpine AS production

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy the Vite build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
