# Repo Feature Audit — vs. Upstream (dtyq/magic)

**Date:** 2026-07-18
**Scope:** Compare advertised product features (README.md) against actual source in this clone.
**Verdict:** All *shipped* upstream features are present in source. Only "Coming soon" items are absent (by design). No features need to be added.

## Shipped features — present in source ✅

| Feature | Backend | Frontend |
| --- | --- | --- |
| Super Magic (multi-agent, planning, tools) | `backend/super-magic` (Python), `backend/super-magic-module` | `frontend/magic-web/src/opensource/pages/superMagic`, `super` |
| Magic Flow (visual workflow, nodes) | `backend/magic-service/app/Domain/Flow/*`, `backend/flow-expr-engine` | `frontend/magic-flow`, `pages/flow` |
| Magic IM (chat, group, contacts, knowledge base) | `app/Domain/{Chat,Group,Contact,KnowledgeBase}` + Interfaces APIs | `pages/chatNew`, `contacts`, `vectorKnowledge` |
| Gateways / sandbox / code-exec / scheduler | `magic-gateway`, `sandbox*`, `code-executor`, `task-scheduler`, `tiptap`, etc. | — |
| Docs (EN/ZH) | `docs/en`, `docs/zh` | — |

NOTE: "Magic IM" is not a separately named package; it is implemented under generic
`Chat`/`Group`/`Contact`/`KnowledgeBase` domains. Functionally complete.

## Advertised "Coming soon" — correctly absent ⚠️ (matches upstream)

- Teamshare OS (Magic Table, Magic Doc)
- Magic Lens, Magic Space, Sandbox OS
- Agentlang, Magic Use (the `magic_use` matches are the Super Magic browser *tool*, not a product)

These have no source in upstream either, so this clone is a faithful copy.

## Deployment coverage

- `setup.sh` + `docker-compose.yaml` (core) + Super Magic/Gateway/Sandbox profiles: covered.
- `render.yaml`: deploys core + Super Magic + Gateway (Sandbox Gateway omitted — needs host Docker socket, unavailable on Render).
- Supabase wired as EXTERNAL Postgres (`.env` SUPABASE_*, `supabase-client.mjs`); Magic core stays on bundled MySQL.

## Action items

- No feature additions required.
- Remaining work is deployment correctness (Render Blueprint schema/build) + filling `sync: false` secrets.
