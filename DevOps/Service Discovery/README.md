
# Service Discovery with Consul, Dummy Services, and API Gateway

This project demonstrates **service discovery** in a microservices architecture using **HashiCorp Consul**.  
It includes:
- 3 dummy services (`service-a`, `service-b`, `service-c`)
- API Gateway that discovers and routes requests via Consul
- Docker Compose setup for one-command deployment

---

## 📜 Features
- **Self-registration**: Each service registers with Consul on startup.
- **Health checks**: Consul monitors each service's `/info` endpoint.
- **Dynamic service discovery**: API Gateway queries Consul for healthy instances before routing.
- **Scalable**: Add/remove service instances dynamically — the gateway will pick them up without restarts.

---

## 🚀 Getting Started

### 1. Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional) [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install) for Windows users

---

### 2. Clone or Download
```bash
git clone https://github.com/Ansuman-rath/c.git
cd DevOps_Roadmap_Project
````

Or download directly.

---

### 3. Run the stack

```bash
docker compose up --build
```

This will start:

* **Consul** (UI at `http://localhost:8500`)
* **API Gateway** (port `8080`)
* **Service A, B, C** (internal Docker network)

---

### 4. Verify the setup

#### **In Consul UI**

Open: [http://localhost:8500](http://localhost:8500)
You should see `service-a`, `service-b`, `service-c` listed and marked as **passing**.

#### **Through API Gateway**

```bash
curl http://localhost:8080/api/service-a
curl http://localhost:8080/api/service-b
curl http://localhost:8080/api/service-c
```

Each returns JSON like:

```json
{
  "via": "gateway",
  "target": "http://service-a:3001",
  "data": {
    "service": "service-a",
    "timestamp": "2025-08-14T07:26:29.125Z"
  }
}
```

---

### 5. Scaling a service

```bash
docker compose up -d --scale service-a=2
```

Now:

```bash
watch -n 1 curl -s http://localhost:8080/api/service-a
```

You’ll see the `target` alternate between multiple instances.

---

### 6. Stop the stack

```bash
docker compose down -v
```

---

## 📂 Project Structure

```
service-discovery-consul/
├─ docker-compose.yml       # Defines Consul, Gateway, and services
├─ gateway/                 # API Gateway source
│  ├─ Dockerfile
│  ├─ package.json
│  └─ index.js
└─ services/
   └─ dummy/                # Dummy service template (used for A, B, C)
      ├─ Dockerfile
      ├─ package.json
      └─ index.js
```

---

## ⚙️ How It Works

1. **Dummy Services**:

   * Each has `/info` endpoint returning `{service, timestamp}`
   * Registers with Consul via HTTP API
   * Consul health check pings `/info` every 10 seconds
2. **Consul**:

   * Maintains registry of active, healthy services
   * API at `http://localhost:8500/v1/...`
3. **API Gateway**:

   * Looks up healthy services in Consul before routing
   * Implements simple round-robin between multiple instances

---

## 📚 References

* [Consul Documentation](https://developer.hashicorp.com/consul/docs)
* [Docker Compose Docs](https://docs.docker.com/compose/)

