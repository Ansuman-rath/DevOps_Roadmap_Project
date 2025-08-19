# ---------- Custom base for Node build ----------
FROM node:22-alpine AS base
WORKDIR /app
USER node

# ---------- Builder ----------
FROM base AS build
USER root
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

# ---------- Runtime (tiny Nginx) ----------
FROM nginx:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD test -s /var/run/nginx.pid || exit 1