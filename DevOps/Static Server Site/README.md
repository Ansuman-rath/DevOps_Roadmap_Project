# Static Site Deployment with Nginx and rsync over SSH

This project demonstrates how to set up and deploy a static website to a remote Linux server using **Nginx** and **rsync over SSH**.

[Static Server Site](https://roadmap.sh/projects/static-site-server)

## Objective

Learn how to:
- Set up a remote Linux server
- Use SSH key-based login
- Install and configure **Nginx** to serve static files
- Deploy site changes using a simple `deploy.sh` script with **rsync**
- (Optional) Point a domain to the server

---

##  Technologies Used

- 🔒 SSH
- 🌐 Nginx
- 🔁 rsync
- 🐧 Ubuntu 25.04 (remote server)
- 🖥️ DigitalOcean (or any other VPS provider)

---

## Setup Steps

### 1. 🔑 Generate SSH Keys
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_user1
```
> Upload the `.pub` file to your server provider's SSH settings.

---

### 2. 🖥️ Connect to the Server
```bash
ssh -i ~/.ssh/id_rsa_user1 lemon@<your-ip>
```

---

### 3. 🌐 Install Nginx on Server
```bash
sudo apt update
sudo apt install nginx -y
```

---

### 4. 📁 Upload Static Website (HTML, CSS, Images)

#### On your **local machine**, place your site files under:
```
~/projects/static-site/
```

#### Create `deploy.sh` in that folder:
```bash
#!/bin/bash
rsync -avz -e "ssh -i ~/.ssh/id_rsa_user1" ~/projects/static-site/ lemon@<your-ip>:/var/www/mysite
```
Make it executable:
```bash
chmod +x deploy.sh
```

#### Run the deployment:
```bash
./deploy.sh
```

---

### 5. ⚙️ Configure Nginx

#### On the server:
Create a file:
```bash
sudo nano /etc/nginx/sites-available/mysite
```

Paste this:
```nginx
server {
    listen 80;
    server_name _;

    root /var/www/mysite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable it:
```bash
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/
```

Disable default config (optional but recommended):
```bash
sudo rm /etc/nginx/sites-enabled/default
```

Test and reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

### 6. 🌍 Visit Your Site

Open in your browser:
```
http://<your-ip>/
```

---

## ✅ Outcome

By the end of this project:
- You can SSH into a remote server with keys.
- You have a working static site deployed via Nginx.
- You can deploy new versions using a single command: `./deploy.sh`.

---

## 🔒 Optional: Add Security

Consider integrating:
- `fail2ban` for brute-force protection
- `ufw` firewall setup
- SSL with Let's Encrypt

---

## 🧠 Credits

Project inspired by the [roadmap.sh](https://roadmap.sh/) DevOps learning path.

---

## 📜 License

MIT License — feel free to use and modify.
