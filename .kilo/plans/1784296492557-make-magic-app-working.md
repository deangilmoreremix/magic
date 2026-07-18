# Plan: Make the Magic monorepo a working application

## Context
This repo (`dtyq/magic`) is an **all-in-one AI productivity platform** monorepo: a PHP backend
(`backend/magic-service`), a React/TS frontend (`frontend/magic-web`), plus optional Super Magic,
Magic Gateway, and Sandbox Gateway services.

The repo is **designed to run as a Docker Compose stack that pulls prebuilt images from
`ghcr.io/dtyq/...`** — `docker-compose.yaml` references published tags (`:latest`), it does NOT
build from local source. The intended entrypoint is `./bin/magic.sh start`.

### Current gaps preventing it from running
- No `.env` present (only `.env.example`).
- No `config/config.yaml` (only `config/config.yaml.example`).
- Gateway/sandbox env files exist only as `.example` (`config/.env_magic_gateway.example`,
  `config/.env_sandbox_gateway.example`, `config/.env_super_magic.example`).
- `volumes/` directory does not exist (mount targets for db/redis/rabbitmq/qdrant/files).
- This sandbox has **no Docker** (`docker: command not found`), so the app cannot be launched here.
  It must be run on a machine with **Docker 24.0+ and Docker Compose 2.0+** (per README).

### Decision required (pick one)
- **(A) Core stack only** → magic-service, magic-web, db, redis, rabbitmq, caddy, qdrant.
  No LLM key needed; Super Magic features stay disabled. Simplest working app.
- **(B) Full stack** → everything in (A) plus Super Magic + Magic Gateway + Sandbox Gateway.
  Requires a valid OpenAI-compatible LLM API key configured in `config/.env_super_magic`.
  **Recommended default: (A) for a guaranteed-working app; (B) only if an LLM key is available.**

## Goal
Produce a reproducible, working deployment by creating the missing config/volumes and running the
official launcher so the services come up and are reachable:
- API: http://localhost:9501
- Web: http://localhost:8080 (login `13812345678` / `letsmagic.ai`)
- RabbitMQ UI: http://localhost:15672 (`admin` / `magic123456`)

## Steps

### 1. Prerequisites (operator, on a Docker-capable machine)
- Install Docker 24.0+ and Docker Compose 2.0+ (the `bin/magic.sh` script refuses to proceed otherwise).
- Confirm `docker info` works.
- Ensure outbound access to `ghcr.io` to pull images.

### 2. Create environment file
- `cp .env.example .env`
- Leave defaults for local deploy. The launcher will detect architecture and set `PLATFORM`.
- For remote deployment, the launcher interactively updates `MAGIC_SERVICE_BASE_URL`,
  `MAGIC_SOCKET_BASE_URL`, and file hosts with the public IP/domain.

### 3. Create config files
- `cp config/config.yaml.example config/config.yaml` (required by Super Magic path; harmless otherwise).
- If choosing **(B)**: `cp config/.env_super_magic.example config/.env_super_magic` and set a real
  `OPENAI_API_KEY` (or compatible) + base URL inside it. Also ensure `config/.env_magic_gateway`
  and `config/.env_sandbox_gateway` are created (the launcher validates these exist when Super Magic
  is selected).

### 4. Create volume directories (avoids mount errors on first `up`)
- `mkdir -p volumes/db/data volumes/redis/data volumes/rabbitmq/data volumes/rabbitmq/logs`
  `volumes/qdrant volumes/storage/files volumes/caddy/data volumes/caddy/config`
- Also create the external network if not auto-created: `docker network create magic-sandbox-network`.

### 5. Launch
- `./bin/magic.sh start` (foreground) or `./bin/magic.sh daemon` (background).
- On first run the script is interactive: picks language, asks about Super Magic install, asks
  local vs remote deployment, writes `bin/magic.lock` so subsequent runs skip setup.
- For **(B)** answer "Yes" to Super Magic when prompted; the script adds the
  `--profile magic-gateway --profile sandbox-gateway` profiles automatically.

### 6. Verify
- `./bin/magic.sh status` → all core containers `healthy`/`running`.
- `curl -s http://localhost:9501/health` (or API root) returns 200/JSON.
- Open http://localhost:8080 → log in with `13812345678` / `letsmagic.ai`.
- `./bin/magic.sh logs` to inspect boot errors.

## Risks / gotchas
- **No Docker in this sandbox** — steps 1, 4–6 must run on a Docker-capable host, not here.
- Images are `:latest` and pulled on demand; first `up` is slow and needs network access.
- `magic-sandbox-network` is declared `external` in compose — must already exist or `up` fails.
- Super Magic path requires a working LLM key; without it, choose **(A)**.
- Frontend `MAGIC_SERVICE_BASE_URL`/`MAGIC_SOCKET_BASE_URL` must match where the user actually
  reaches the box, or the web app cannot talk to the API.

## Validation
1. `bin/magic.sh status` shows core services up.
2. Web UI reachable and login succeeds with seeded account.
3. API health endpoint responds.

## Out of scope
- Building images from local source (the published `ghcr.io` images are used as-is).
- Local non-Docker dev builds (composer/npm installs) — not needed for the intended deployment.
- Enterprise license / cloud features beyond the community edition.
