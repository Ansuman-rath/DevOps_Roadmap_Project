# Dockerized Service Deployment

[Dockerized Service Deployment](https://roadmap.sh/projects/dockerized-service-deployment)

A Node.js service with Docker containerization and GitHub Actions CI/CD deployment.

## Features

- Node.js API with Basic Auth
- Docker containerization
- GitHub Actions automated deployment
- Remote server deployment

## API Endpoints

- `GET /` - Returns "Hello, world!"
- `GET /secret` - Protected endpoint (Basic Auth required)

## Quick Start

### Local Development

1. **Clone and setup**
   ```bash
   git clone <repo-url>
   cd dockerized-service-deployment
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your values:
   # SECRET_MESSAGE=Your secret message
   # USERNAME=your_username  
   # PASSWORD=your_password
   ```

3. **Run locally**
   ```bash
   npm start
   # Test: curl http://localhost:3000/
   # Protected: curl -u username:password http://localhost:3000/secret
   ```

### Docker

```bash
# Build and run
docker build -t dockerized-service .
docker run -p 3000:3000 --env-file .env dockerized-service
```

## Deployment

### GitHub Actions Setup

Add these secrets to your GitHub repository:

- `DOCKER_USERNAME` / `DOCKER_PASSWORD` - Docker Hub credentials
- `SERVER_HOST` / `SERVER_USER` / `SERVER_SSH_KEY` - Server access
- `SECRET_MESSAGE` / `APP_USERNAME` / `APP_PASSWORD` - App config

### Server Requirements

- Linux server with Docker installed
- SSH access configured

### Manual Deploy

```bash
# On your server
docker pull your-username/dockerized-service:latest
docker run -d --name dockerized-service -p 80:3000 \
  -e SECRET_MESSAGE="Your secret" \
  -e USERNAME="user" \
  -e PASSWORD="pass" \
  your-username/dockerized-service:latest
```

## Project Structure

```
├── src/app.js              # Main application
├── .github/workflows/      # GitHub Actions
├── Dockerfile              # Docker config
├── .env.example           # Environment template
└── package.json           # Dependencies
```

## Testing

```bash
# Public endpoint
curl http://your-server/

# Protected endpoint  
curl -u username:password http://your-server/secret
```

## Troubleshooting

- Check logs: `docker logs dockerized-service`
- Verify environment variables are set
- Ensure server ports are accessible

---

Built following [roadmap.sh DevOps practices](https://roadmap.sh/projects/dockerized-service-deployment)
