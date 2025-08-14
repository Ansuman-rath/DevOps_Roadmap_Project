FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY index.js ./
EXPOSE 8080
CMD ["node", "index.js"]
