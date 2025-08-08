terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

variable "do_token" {}
variable "ssh_key_id" {}
variable "droplet_name" {
  default = "terraform-droplet"
}
variable "region" {
  default = "nyc3"
}
variable "size" {
  default = "s-1vcpu-1gb"
}

resource "digitalocean_droplet" "web" {
  name   = var.droplet_name
  region = var.region
  size   = var.size
  image  = "ubuntu-22-04-x64"

  ssh_keys = [var.ssh_key_id]
}

output "droplet_ip" {
  value = digitalocean_droplet.web.ipv4_address
}

