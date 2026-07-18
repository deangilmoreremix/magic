#!/bin/bash
#
# setup.sh - Prepare the Magic monorepo for a working Docker Compose deployment.
#
# What this does (all idempotent, safe to re-run):
#   1. Creates .env from .env.example if missing (keeps existing .env).
#   2. Creates config/config.yaml from the example if missing.
#   3. Creates the volumes/ directory tree that docker-compose mounts.
#   4. Creates the external docker network referenced by docker-compose.yaml.
#
# It does NOT start the stack. Run ./bin/magic.sh start afterwards (needs Docker 24+).
#
# NOTE on Supabase:
#   Magic's primary datastore is the bundled MySQL (DB_DRIVER=mysql). Supabase is
#   wired in .env as an EXTERNAL Postgres for your own app features / Auth / Storage.
#   It is intentionally NOT pointed at Magic's DB_* variables.

set -euo pipefail

cd "$(dirname "$0")"

echo "==> Preparing Magic deployment files"

# 1. .env
if [ ! -f .env ]; then
  cp .env.example .env
  echo "    created .env from .env.example (includes Supabase external config)"
else
  echo "    .env already exists, leaving it untouched"
fi

# 2. config/config.yaml
if [ ! -f config/config.yaml ]; then
  cp config/config.yaml.example config/config.yaml
  echo "    created config/config.yaml from example"
else
  echo "    config/config.yaml already exists, leaving it untouched"
fi

# 3. volumes tree
mkdir -p \
  volumes/db/data \
  volumes/redis/data \
  volumes/rabbitmq/data \
  volumes/rabbitmq/logs \
  volumes/qdrant \
  volumes/storage/files \
  volumes/caddy/data \
  volumes/caddy/config
echo "    ensured volumes/ tree exists"

# 4. external network (compose declares it 'external')
NETWORK="magic-sandbox-network"
if docker network inspect "$NETWORK" >/dev/null 2>&1; then
  echo "    network $NETWORK already exists"
else
  if command -v docker >/dev/null 2>&1; then
    docker network create "$NETWORK" >/dev/null 2>&1 && echo "    created network $NETWORK" || echo "    WARN: could not create $NETWORK (run 'docker network create $NETWORK')"
  else
    echo "    WARN: docker not found here; create the network on the Docker host: docker network create $NETWORK"
  fi
fi

echo ""
echo "==> Done. Next steps on a Docker 24+ host:"
echo "    1. (optional) edit .env to add an LLM key for Super Magic"
echo "    2. ./bin/magic.sh start      # foreground"
echo "       ./bin/magic.sh daemon     # background"
echo "    3. Open http://localhost:8080  (login 13812345678 / letsmagic.ai)"
echo ""
echo "==> Supabase (external app data layer) is configured in .env under SUPABASE_*."
echo "    Magic core still uses the bundled MySQL container."
