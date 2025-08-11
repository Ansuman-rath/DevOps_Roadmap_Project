# Node.js Service - PM2 Setup Guide

This project demonstrates how to run a Node.js application as a background service using **PM2**.

## 📌 Prerequisites
- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **PM2** process manager

---

## 🚀 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. **Install Dependencies**
```bash
npm install
```

3. **Install PM2 Globally**
```bash
npm install -g pm2
```

---

## ▶️ Starting the App with PM2

```bash
pm2 start app.js --name "node-service"
```

- `--name "node-service"` gives your process a readable name.
- You can replace `app.js` with your actual entry file path.

---

## 🔍 Checking Running Processes
```bash
pm2 list
```

To view logs in real-time:
```bash
pm2 logs node-service
```

---

## ⏹ Stopping & Restarting
Stop the process:
```bash
pm2 stop node-service
```

Restart the process:
```bash
pm2 restart node-service
```

Delete the process from PM2:
```bash
pm2 delete node-service
```

---

## 💾 Auto-Start on Server Reboot
```bash
pm2 startup
pm2 save
```

- `pm2 startup` generates a command — copy & run it.
- `pm2 save` saves the current running processes so PM2 can restore them after reboot.

---

## 📂 Project Structure
```
project-folder/
│── app.js
│── package.json
│── README.md
```

---

## 📜 License
This project is licensed under the MIT License.
