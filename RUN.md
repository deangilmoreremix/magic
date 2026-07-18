# Running Magic as a Working Application

This guide turns the cloned `dtyq/magic` monorepo into a running application using the
**intended Docker Compose deployment** (the repo pulls prebuilt images from `ghcr.io/dtyq/...`).

> Requires **Docker 24.0+** and **Docker Compose 2.0+**. The setup steps below were prepared in
> this repo; the stack itself must be launched on a Docker-capable host.

## 1. Prepare config & volumes (idempotent)

```bash
./setup.sh
```

This creates:
- `.env` (from `.env.example`, already seeded with Supabase external config)
- `config/config.yaml` (from `config/config.yaml.example`)
- the `volumes/` directory tree mounted by `docker-compose.yaml`
- the external `magic-sandbox-network` docker network

## 2. (Optional) Enable Super Magic + LLM

To use the Super Magic agent features, give it an OpenAI-compatible model key:

```bash
cp config/.env_super_magic.example config/.env_super_magic
# edit config/.env_super_magic and set OPENAI_API_KEY / OPENAI_API_BASE_URL
```

Then answer "Yes" to Super Magic when the launcher asks. The launcher automatically adds the
`--profile magic-gateway --profile sandbox-gateway` profiles.

## 3. Launch

```bash
./bin/magic.sh start     # foreground (see logs live)
./bin/magic.sh daemon    # background
./bin/magic.sh status    # show container health
./bin/magic.sh logs      # follow logs
```

On first run the launcher is interactive (language, Super Magic, local/remote deploy). It writes
`bin/magic.lock` so later runs skip setup.

## 4. Verify

| Service | URL | Credentials |
| --- | --- | --- |
| Web app | http://localhost:8080 | `13812345678` / `letsmagic.ai` |
| API | http://localhost:9501 | — |
| RabbitMQ UI | http://localhost:15672 | `admin` / `magic123456` |

```bash
./bin/magic.sh status
curl -s http://localhost:9501/health        # expect 200 / JSON
```

---

## Supabase as the backend

**Important:** Magic's core datastore is **MySQL** (`DB_DRIVER=mysql`, `mysql:8.0` container,
MySQL-specific migrations). It cannot run on Postgres, so **Supabase Postgres is NOT Magic's
primary database.**

Instead, Supabase is wired in `.env` as an **EXTERNAL application data layer** for *your own*
features — Auth, Storage, and custom tables:

```
SUPABASE_URL=https://bzxohkrxcwodllketcpz.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_DB_CONNECTION_STRING=postgresql://postgres:***@db.bzxohkrxcwodllketcpz.supabase.co:5432/postgres
```

- A ready-to-use client is in `supabase-client.mjs` (verifies DB connectivity via the
  `SUPABASE_DB_CONNECTION_STRING`). Install deps with `npm i @supabase/supabase-js pg dotenv`,
  then `node supabase-client.mjs`.
- To use Supabase Auth inside `frontend/magic-web`, install `@supabase/supabase-js` and initialize
  with `SUPABASE_URL` / `SUPABASE_ANON_KEY` from `.env`. Magic's own user model stays separate.
- Do **not** point Magic's `DB_*` variables at Supabase — that will break migrations.

### Network/host notes
- `MAGIC_SERVICE_BASE_URL` and `MAGIC_SOCKET_BASE_URL` in `.env` must match how clients reach the
  host. For remote deploy, the launcher can rewrite these to your public IP/domain automatically.
- The `magic-sandbox-network` is declared `external` in `docker-compose.yaml`; `setup.sh` creates it.

## Files added/changed for deployment
- `.env` — runtime env (incl. Supabase external config)
- `config/config.yaml` — Super Magic config
- `volumes/` — persistent data mounts
- `setup.sh` — idempotent prep script
- `supabase-client.mjs` — external Supabase client + connectivity check

All of the above are git-ignored where they contain secrets (see `.gitignore`).
