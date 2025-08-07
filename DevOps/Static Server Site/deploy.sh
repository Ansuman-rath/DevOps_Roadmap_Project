#!/bin/bash

# Check if IP address is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <server-ip>"
  exit 1
fi

# Deploy files using rsync
rsync -avz -e "ssh -i ~/.ssh/id_rsa_user1" ./ lemon@$1:/var/www/mysite
