
# Configuration Management



## Project Overview

This project automates the configuration of a Linux web server using **Ansible**.
It installs and configures **Nginx**, uploads a static website, sets up basic security tools, and adds an SSH public key for secure login.

---

## Features

* **Base server setup**:

  * Updates apt packages
  * Installs basic utilities
  * Installs and configures `fail2ban`
* **Nginx role**:

  * Installs Nginx
  * Starts and enables the service
* **App deployment role**:

  * Uploads and extracts a static website tarball
* **SSH role**:

  * Adds your public SSH key to the server
* **Tagged roles** so you can run only specific tasks

---

## Project Structure

```
ansible-project/
│── inventory.ini                # List of servers to configure
│── setup.yml                     # Main playbook
│
├── roles/
│   ├── base/
│   │   ├── tasks/main.yml
│   │
│   ├── nginx/
│   │   ├── tasks/main.yml
│   │
│   ├── app/
│   │   ├── tasks/main.yml
│   │   ├── files/static-site.tar.gz
│   │
│   ├── ssh/
│       ├── tasks/main.yml
│       ├── files/id_rsa_user1.pub
│
└── README.md
```

---

##  How to Run

### 1️} Install Ansible

```bash
sudo apt update
sudo apt install ansible -y
```

### 2️} Configure Your Inventory

Edit `inventory.ini` and add your server IP and SSH details:

```ini
[webservers]
209.38.123.141 ansible_user=lemon ansible_ssh_private_key_file=~/.ssh/id_rsa_user1
```

### 3️} Prepare Required Files

* `roles/app/files/static-site.tar.gz` → Tarball of your static website
* `roles/ssh/files/id_rsa_user1.pub` → Public SSH key you want to add to the server

### 4️} Run the Playbook

Run all roles:

```bash
ansible-playbook -i inventory.ini setup.yml --ask-become-pass
```

Run only specific role (example: app role):

```bash
ansible-playbook -i inventory.ini setup.yml --tags "app" --ask-become-pass
```

---

## Role Details

### 🔹 Base Role

* Updates system packages
* Installs curl, git, unzip, fail2ban

### 🔹 Nginx Role

* Installs nginx
* Enables and starts nginx

### 🔹 App Role

* Uploads static site tarball
* Extracts site into `/var/www/html`

### 🔹 SSH Role

* Adds provided public key to `~/.ssh/authorized_keys`

---

## 🔍 Verification

### Test SSH login:

```bash
ssh -i ~/.ssh/id_rsa_user1 lemon@209.38.123.141
```

### Test website:

Visit:

```
http://209.38.123.141
```

---


* Make sure your `.pub` file exists in `roles/ssh/files/`



