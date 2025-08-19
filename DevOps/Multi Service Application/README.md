# Multi-Service Docker Application (React + Node/Express + MongoDB + Redis + Nginx)

An optimized multi-service Docker setup that simulates a real-world production-like stack:

- **Web**: React (Vite) SPA built into a tiny Nginx image (multi-stage build).
- **API**: Node.js + Express with MongoDB (Mongoose) and Redis client.
- **Database**: MongoDB with **secrets** for root and application user passwords, plus an init script.
- **Cache**: Redis for performance (example: counter endpoint).
- **Reverse Proxy**: Nginx front door routing `"/"` to the web app and `"/api"` to the backend.
- **Extras**: Compose networks, volumes, healthchecks, log rotation, custom base stages.

> Default host port: **http://localhost:8080**

---

## Quickstart

1. **Install dependencies**
   - Docker Engine and Docker Compose v2+

2. **Clone or extract this project**
   - If you downloaded a zip, extract it and `cd` into the folder.

3. **Set secrets (recommended)**
   - Secrets are plain text files under `./secrets/`. This repo provides example values so it runs out-of-the-box, but you should change them:
     - `secrets/mongo_root_password.txt`
     - `secrets/mongo_app_password.txt`

4. **Bring up the stack**
   ```bash
   docker compose up -d --build
   ```

5. **Open the app**
   - Visit **http://localhost:8080**
   - API health: **http://localhost:8080/api/health**
   - Counter demo: **http://localhost:8080/api/counter**

6. **Tear down**
   ```bash
   docker compose down
   ```

---

## What’s inside

### Services
- **proxy**: Nginx reverse proxy, public entrypoint (port 8080 → container 80)
- **web**: Nginx serving static React build
- **api**: Node/Express app (port 3000 internal)
- **mongodb**: MongoDB with root + app user created at first start
- **redis**: Redis store with volume for persistence

### Networks & Volumes
- Single app network (Compose default).
- Volumes:
  - `mongo_data`: MongoDB data
  - `redis_data`: Redis data

### Secrets
- Managed by Compose, mounted at `/run/secrets/*`.
- Used for MongoDB root and application user passwords.
- API reads the app password file at runtime.

> Note: Docker Compose secrets are great for local/dev. For production, consider a dedicated secret manager (Vault, AWS/GCP secrets, etc.).

### Healthchecks
- **proxy**/**web**: Nginx pid check
- **api**: HTTP healthcheck (no extra packages needed)
- **mongodb**: `mongosh` ping
- **redis**: `redis-cli ping`

### Logging & Rotation
- All services use Docker's `json-file` logging with rotation: `max-size: 10m`, `max-file: 3`.

---

## Useful Commands

```bash
# See logs
docker compose logs -f api
docker compose logs -f proxy

# Rebuild after code changes
docker compose up -d --build

# Stop + remove containers, keep volumes
docker compose down

# Reset everything (containers + volumes)
docker compose down -v
```

---

## Project Structure

```
.
├── docker-compose.yml
├── README.md
├── .env.example
├── secrets/
│   ├── mongo_root_password.txt
│   └── mongo_app_password.txt
├── mongo/
│   └── init-user.sh
├── api/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── db.js
│       └── redis.js
├── web/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       └── App.jsx
└── proxy/
    ├── Dockerfile
    └── nginx.conf
```

---

## Endpoints (API)

- `GET /api/health` → checks MongoDB & Redis connectivity
- `GET /api/todos` → list todos
- `POST /api/todos` → create todo ({ "text": "..." })
- `DELETE /api/todos/:id` → delete by id
- `GET /api/counter` → increments and returns a Redis-backed counter

---

## Notes

- The **first** `docker compose up` seeds MongoDB root + app users.
- For a clean re-init of Mongo users, run `docker compose down -v` to delete volumes, then `up` again.
- If you change secrets, recreate containers for the new secret to mount (`docker compose up -d --build`).

Happy hacking!