
# Multi-Service Docker Application

This project demonstrates how to containerize and run a **full-stack application** using **Docker Compose**.  
It consists of multiple services (frontend, backend, database, cache, and reverse proxy) running in isolated containers, communicating through a common network.

[Multi-Service Application](https://roadmap.sh/projects/multiservice-docker)

---

## 🚀 Objectives
- Containerize multiple services (frontend, backend, database, cache, reverse proxy).
- Connect services via Docker networks.
- Use volumes for data persistence (MongoDB, Redis).
- Securely manage credentials using Docker secrets.
- Configure Nginx as a reverse proxy for routing traffic.
- Practice debugging real-world Docker Compose issues (ports, mounts, configs).

---

## 🛠️ Services
1. **Frontend (React)**  
   - Built into a container and served via **Nginx**.  
   - Accessible on port `3001` (mapped to container port `80`).  

2. **Backend (API)**  
   - Connects with MongoDB & Redis.  
   - Handles core application logic.  

3. **MongoDB**  
   - Password-protected using **Docker secrets** (`mongo_root_password.txt`, `mongo_app_password.txt`).  
   - Data persisted via `mongo-data` volume.  

4. **Redis**  
   - In-memory caching service.  
   - Data persisted via `redis-data` volume.  

5. **Nginx**  
   - Configured with `nginx.conf` to reverse-proxy requests between frontend and API.  

---

## 📂 Project Structure
```

multi-service-docker-app/
│── api/                 # Backend service
│── frontend/            # Frontend service (React)
│── proxy/
│   └── nginx.conf       # Custom Nginx reverse proxy config
│── secrets/
│   ├── mongo\_root\_password.txt
│   └── mongo\_app\_password.txt
│── docker-compose.yml   # Main orchestration file
│── README.md            # Project documentation

````

---

## ⚡ Running the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/multi-service-docker-app.git
   cd multi-service-docker-app


2. Make sure Docker & Docker Compose are installed.

3. Start services:

   ```bash
   docker compose up -d --build
   ```

4. Access the application:

   * Frontend: [http://localhost:3001](http://localhost:3001)
   * Backend API: runs inside Docker network (proxied via Nginx).

---


## 🧑‍💻 Accomplishments

* Successfully containerized **frontend, backend, DB, cache, and proxy**.
* Connected services with **Docker networks**.
* Implemented **persistent storage** with Docker volumes.
* Secured MongoDB with **secrets**.
* Fixed common Docker issues:

  * Port conflicts (`3000` → changed to `3001`).
  * Missing secret files.
  * File vs directory mount errors in Nginx.

---

## ✅ Conclusion

This project simulates a **production-style environment** with multiple services working seamlessly via Docker Compose.
It’s a solid foundation for learning **DevOps, CI/CD, and scalable deployments**.




