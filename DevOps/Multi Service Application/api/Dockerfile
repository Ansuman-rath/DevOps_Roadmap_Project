# ---------- Custom base image for Node ----------
FROM node:22-alpine AS base
ENV NODE_ENV=production
# For proper signal handling
RUN apk add --no-cache tini
WORKDIR /app
USER node

# ---------- Dependencies ----------
FROM base AS deps
USER root
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev
USER node

# ---------- Runtime ----------
FROM node:22-alpine AS runner
ENV NODE_ENV=production
# tini again
RUN apk add --no-cache tini
WORKDIR /app
# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
# Copy source
COPY --chown=node:node src ./src
COPY --chown=node:node package*.json ./
EXPOSE 3000
ENTRYPOINT ["/sbin/tini","--"]
CMD ["node","src/index.js"]