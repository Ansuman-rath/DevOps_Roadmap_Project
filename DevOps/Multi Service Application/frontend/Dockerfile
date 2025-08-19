# ---- Build Stage ----
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy a default nginx config (can be overridden later by reverse proxy)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
