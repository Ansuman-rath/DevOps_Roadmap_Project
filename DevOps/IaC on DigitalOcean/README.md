
# Terraform DigitalOcean Droplet

This project demonstrates the basics of **Infrastructure as Code (IaC)** using **Terraform**.
It provisions a Linux server (**Droplet**) on DigitalOcean with a public IP and SSH access using a specified SSH key.

---

## Project Goals

* Learn how to define infrastructure using Terraform.
* Create and manage a DigitalOcean Droplet.
* Configure SSH access with a pre-generated key.
* Understand how to destroy infrastructure cleanly when no longer needed.

---

## Requirements

* **Terraform** installed ([Download here](https://developer.hashicorp.com/terraform/downloads)).
* A **DigitalOcean account** and **Personal Access Token**.
* An **SSH key** added to your DigitalOcean account.
* Basic terminal knowledge.

---

## Project Structure

```plaintext
.
├── main.tf            # Main Terraform configuration
├── variables.tf       # Input variables
├── terraform.tfvars   # Variable values (token, region, ssh key ID)
├── outputs.tf         # Output values (droplet IP)
```

---

## Setup Instructions

### Generate / Use an SSH Key

If you don’t have an SSH key:

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa_user1
```

Add the public key to your DigitalOcean account via the web dashboard.
Copy the SSH key **ID** from the DigitalOcean dashboard or CLI:

```bash
doctl compute ssh-key list
```

---

### Configure Variables

In **terraform.tfvars**, set:

```hcl
do_token      = "YOUR_DIGITALOCEAN_API_TOKEN"
region        = "nyc3"
ssh_key_ids   = ["YOUR_SSH_KEY_ID"]
```

---

### Initialize Terraform

```bash
terraform init
```

---

### Review the Plan

```bash
terraform plan
```

---

### Apply the Configuration

```bash
terraform apply
```

Type `yes` when prompted.
Terraform will output the Droplet’s IP address.

---

### Connect to Your Droplet

```bash
ssh -i ~/.ssh/id_rsa_user1 root@<DROPLET_IP>
```

---

## Destroy the Droplet

When you’re done, clean up resources:

```bash
terraform destroy
```

---

## Notes

* If you change SSH keys in DigitalOcean, update `terraform.tfvars` before running `apply`.

---

## Stretch Goal

Use your **Ansible playbook** from the previous project to automatically configure the droplet after creation.

---
