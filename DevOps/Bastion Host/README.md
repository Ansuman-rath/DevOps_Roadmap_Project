
# Bastion Host Setup Project

[Bastion Host](https://roadmap.sh/projects/bastion-host)

## Overview
This project demonstrates how to set up a Bastion Host to securely manage access to private infrastructure in a cloud environment.  
A bastion host acts as a secure gateway for SSH access to private servers, reducing the attack surface by exposing only a single entry point to the public internet.

---

## Architecture

- **Bastion Host:** Publicly accessible server with a public IP address. Acts as a jump server.
- **Private Server:** Server without a public IP, accessible only from the bastion host’s private IP.

---

## Cloud Provider & Servers

- Provider: *Your cloud provider here (e.g., DigitalOcean)*
- Bastion Host IP: `<bastion-host-public-ip>`
- Private Server IP (private network): `<private-server-private-ip>`

---

## Setup Steps

### 1. Create Servers
- Created two Ubuntu 22.04 LTS servers: bastion host (public) and private server (private network).
- Enabled private networking on both servers.

### 2. Configure SSH Key Authentication
- Generated SSH key pairs locally.
- Uploaded public keys to both servers in `~/.ssh/authorized_keys`.
- Tested SSH connection to bastion host:
  
  ssh -i ~/.ssh/<your-private-key> <user>@<bastion-host-public-ip>


* From bastion host, SSH to private server using its private IP:

  ```bash
  ssh <user>@<private-server-private-ip>
  ```

### 3. Setup SSH ProxyJump for seamless connection

* Edited local SSH config `~/.ssh/config`:

  ```
  Host bastion
      HostName <bastion-host-public-ip>
      User <user>
      IdentityFile ~/.ssh/<your-private-key>

  Host private-server
      HostName <private-server-private-ip>
      User <user>
      ProxyJump bastion
      IdentityFile ~/.ssh/<your-private-key>
  ```
* Now you can SSH directly to private server via bastion:

  ```bash
  ssh private-server
  ```

### 4. (Optional) Harden Security with MFA

* Installed Google Authenticator PAM module on bastion host:

  ```bash
  sudo apt update
  sudo apt install libpam-google-authenticator
  ```
* Configured MFA per-user using `google-authenticator` command.
* Enabled MFA in SSH and PAM configs.
* (Later removed MFA due to access complications.)

### 5. (Optional) Firewall Rules

* Configured `iptables` to restrict SSH access to bastion host by source IP.
* Allowed SSH port 22 only from trusted IP addresses.

---

## Important Notes

* Root SSH login was enabled for simplicity; in production, use a non-root user.
* MFA setup caused SSH connectivity issues and was reverted; it can be re-applied carefully.
* Never share private SSH keys or sensitive IP addresses publicly.
* Always keep a console/web access method to servers in case of SSH lockout.

---

## Conclusion

This project successfully demonstrates setting up a bastion host, securing private servers by restricting direct public access, and managing SSH access through the bastion host with key authentication and optional MFA.

---

## References

* [DigitalOcean Private Networking](https://www.digitalocean.com/docs/networking/private-networking/)
* [OpenSSH ProxyJump Documentation](https://man.openbsd.org/ssh_config#ProxyJump)
* [Google Authenticator PAM Module](https://github.com/google/google-authenticator-libpam)

