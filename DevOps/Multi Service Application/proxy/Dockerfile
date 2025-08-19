FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD test -s /var/run/nginx.pid || exit 1