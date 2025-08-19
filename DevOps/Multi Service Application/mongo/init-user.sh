#!/usr/bin/env bash
set -e

# The official mongo image will run any *.sh in this dir on first launch.
# We read secrets from mounted files so credentials don't live in env variables.

if [ -z "${MONGO_APP_USERNAME}" ]; then
  echo "MONGO_APP_USERNAME not set"; exit 1
fi

if [ -z "${MONGO_INITDB_DATABASE}" ]; then
  echo "MONGO_INITDB_DATABASE not set"; exit 1
fi

if [ -z "${MONGO_APP_PASSWORD_FILE}" ]; then
  echo "MONGO_APP_PASSWORD_FILE not set"; exit 1
fi

APP_PW="$(cat "${MONGO_APP_PASSWORD_FILE}")"

echo "Creating application user '${MONGO_APP_USERNAME}' for database '${MONGO_INITDB_DATABASE}'..."

mongosh <<EOF
use ${MONGO_INITDB_DATABASE};
db.createUser({
  user: "${MONGO_APP_USERNAME}",
  pwd: "${APP_PW}",
  roles: [ { role: "readWrite", db: "${MONGO_INITDB_DATABASE}" } ]
});
EOF

echo "MongoDB app user created."