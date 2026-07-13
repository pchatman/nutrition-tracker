# ── Stage 1: Build Angular ────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies (cached unless package.json changes)
COPY package*.json ./
RUN npm ci

# Build production bundle
COPY . .
RUN npm run build -- --configuration production

# ── Stage 2: Serve with nginx ────────────────────────────
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy Angular build output
# Angular 17 standalone apps output to dist/<project-name>/browser
COPY --from=build /app/dist/frontend/browser .

# Copy custom nginx config (handles routing + API proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
