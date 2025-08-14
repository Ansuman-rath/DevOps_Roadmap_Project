# Server Monitoring Stack (Prometheus + Node Exporter + Grafana)

![Prometheus](./Screenshot_p.png)

---

![Grafana](./Screenshot_g.png)

[Prometheus and Grafana](https://roadmap.sh/projects/monitoring)

This project sets up a complete server monitoring solution using **Prometheus**, **Node Exporter**, and **Grafana** running in Docker containers.

---

## 📌 Features
- **Real-time system monitoring** (CPU, RAM, Disk, Network usage)
- **Prometheus** for time-series data collection
- **Node Exporter** for server metrics
- **Grafana** for rich visual dashboards
- Pre-configured **Node Exporter Full Dashboard** (ID: 1860)
- Runs entirely via **Docker Compose**

---

## 📂 Project Structure
```

.
├── docker-compose.yml
└── prometheus/
└── prometheus.yml

````

---

## ⚙️ Prerequisites
- Docker & Docker Compose installed
- Internet connection for pulling images

---

## 🚀 Setup Instructions

### 1️⃣ Clone this repository
```bash
git clone https://github.com/Ansuman-rath/DevOps_Roadmap_Project.git
cd DevOps_Roadmap_Project
````

### 2️⃣ Configure Prometheus

Edit `prometheus/prometheus.yml` and ensure Node Exporter is added:

```yaml
scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['<server-ip>:9100']
```

### 3️⃣ Start the services

```bash
docker compose up -d
```

### 4️⃣ Access the UIs

* **Grafana** → http\://<server-ip>:3000

  * Default username: `admin`
  * Default password: `admin` (change on first login)
* **Prometheus** → http\://<server-ip>:9090
* **Node Exporter metrics** → http\://<server-ip>:9100/metrics

---

## 📊 Setting up Grafana Dashboard

1. Open Grafana and log in.
2. Go to **Configuration → Data Sources** and add **Prometheus** with:

   ```
   URL: http://prometheus:9090
   ```
3. Go to **+ → Import** and enter dashboard ID:

   ```
   1860
   ```
4. Select your Prometheus data source and click **Import**.

---

## 🛑 Stopping the Stack

```bash
docker compose down
```

---

## 🔔 Optional: Alerts

You can set up alert rules in Prometheus or Grafana to get notified via email, Slack, or other channels when thresholds are breached.


## 🙌 Credits

* [Prometheus](https://prometheus.io/)
* [Node Exporter](https://github.com/prometheus/node_exporter)
* [Grafana](https://grafana.com/)


