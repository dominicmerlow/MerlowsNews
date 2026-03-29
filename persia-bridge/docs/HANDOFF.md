# Persia Bridge — Session Handoff
**Branch:** `claude/persia-bridge-prd-VIN92`
**Date:** 2026-03-29

---

## What This Branch Is For

This branch scaffolds the full **Persia Bridge** platform — a private, invite-only community and deal platform for the Iranian and Jewish/Israeli diaspora, branded as **The Cyrus Accord**. The PRD lives in `docs/persia-bridge-prd/`. The monorepo lives at `/persia-bridge/`.

---

## What's Done (Phase 1 Scaffold — Complete)

The entire monorepo skeleton is built and TypeScript-clean:

### Infrastructure
- Turborepo monorepo with pnpm workspaces
- `turbo.json` pipeline: build, dev, lint, typecheck
- `tsconfig.base.json` shared config

### `packages/db`
- Full Prisma schema (`packages/db/prisma/schema.prisma`) covering: Members, Accounts, Sessions, Applications, Chapters, Chronicle (posts/sections), Knowledge Base, Connections, Messages, Listings (Bazaar), Deals, Deal Rooms, Syndicates, Payments, Notifications, Audit Log
- `schema.sql` — Prisma-generated raw SQL for direct Supabase setup (at `/persia-bridge/schema.sql`)
- PrismaClient singleton export

### `packages/auth`
- Auth.js v5 with Prisma adapter
- Providers: Resend magic link + Credentials (password)
- Session extended with: `memberId`, `roles[]`, `tier`, `applicationStatus`
- Auth pages pointed to `/sign-in`, `/sign-in/verify`, `/sign-in/error`

### `packages/validations`
- Zod schemas mirroring all Prisma models and enums

### `packages/ui`
- shadcn/ui base: Button, Card, Badge, Input, Avatar
- Tailwind config with RTL-ready logical properties
- CSS variables for light/dark theming (`accord-*` and `persian-*` color tokens)

### `packages/email`
- React Email templates: WelcomeEmail, MagicLinkEmail, ApplicationStatusEmail

### `packages/api` (tRPC)
- Context: session + Prisma client
- Procedures: `publicProcedure`, `protectedProcedure`, `adminProcedure`
- Routers: `member`, `chronicle`, `chapters`, `notifications`
- **Note:** The tRPC procedure for membership application is named `submitApplication` (not `apply`) — `apply` is a reserved word in tRPC router context.

### `apps/web` (Next.js 15 App Router)
- Route groups: `(public)`, `(auth)`, `(member)`, `(deal)`, `admin`
- Public routes: `/`, `/about`, `/apply`, `/chronicle`, `/contact`, `/events`
- Auth routes: `/sign-in`
- Member routes: `/home`, `/directory`, `/chronicle`, `/knowledge`, `/heritage`, `/chapters`, `/messages`, `/settings`
- Deal routes: `/bazaar`, `/dealroom`, `/syndicates`
- Shared components: `ApplicationForm`, `SignInForm`
- Layout components: `AppSidebar`, `PublicNav`, `TopBar`
- tRPC wired up: `apps/web/src/trpc/client.ts` + `server.ts`
- Auth.js middleware protecting member/deal/admin routes

---

## What's In Progress

**Nothing actively in-flight.** The scaffold is complete. The next session should start Phase 2.

The `tasks/todo.md` items are all structurally complete but the checkboxes were never ticked — they reflect the original plan, not current state. Treat them as done for Phase 1.

---

## Decisions Made That Aren't in the Docs

1. **Next.js 15, not 14** — The todo.md says "Next.js 14" but the scaffold uses 15 (latest). Minor but worth noting for any version-specific API lookups.

2. **No Supabase connection from CI/sandbox** — DNS resolution fails for all Supabase endpoints in this environment. `prisma db push` must be run locally with a real `DATABASE_URL`. The `schema.sql` file was generated as an alternative — it can be pasted directly into the Supabase SQL editor without needing the CLI.

3. **`exactOptionalPropertyTypes` disabled** — Was causing widespread TS errors with Auth.js's session types. Removed from `tsconfig.base.json`.

4. **`@radix-ui/react-badge` does not exist** — shadcn/ui's Badge is a pure CSS component, not a Radix primitive. The dep was removed; Badge is implemented locally.

5. **`serverExternalPackages` used instead of `experimental.serverComponentsExternalPackages`** — Next.js 15 moved this config key. Needed for `@prisma/client` and `bcryptjs`.

6. **Credentials provider included alongside magic link** — Not in the PRD explicitly, but needed for admin/dev access without email infrastructure being live. Can be removed or gated later.

7. **No `.env.local` committed** — The web app needs these vars set manually:
   - `DATABASE_URL` — Supabase Postgres connection string
   - `AUTH_SECRET` — random 32+ char string (`openssl rand -base64 32`)
   - `AUTH_RESEND_KEY` — Resend API key
   - `NEXT_PUBLIC_APP_URL` — e.g. `http://localhost:3000`

8. **`ConnectionRequest` email template not built** — The todo listed it as part of email package; it was deprioritised. The three critical path emails (welcome, magic link, application status) are done.

---

## Next Steps (Phase 2)

Start here in the next session:

### Immediate (unblock the platform)
1. **Provision Supabase** — Create project, run `schema.sql` in the SQL editor, grab `DATABASE_URL`, set env vars in Vercel and locally.
2. **Deploy to Vercel** — Connect the monorepo, set root to `/persia-bridge`, build command `turbo build --filter=web`, output `apps/web/.next`.
3. **Smoke test auth** — Magic link sign-in end-to-end; verify session has `memberId`/`roles`.

### Phase 2 Features (in order)
1. **Application flow** — `ApplicationForm` submits to `member.submitApplication` tRPC procedure; admin queue at `/admin/applications` to approve/reject; trigger `ApplicationStatusEmail` on status change.
2. **Member Directory** — Search by name/community/tier, profile pages, connection request flow.
3. **Chronicle** — Admin post creation (rich text), public preview, full member reading experience.
4. **Knowledge Base** — Categorised articles, member submissions.
5. **Chapter Hub** — Chapter pages, event listings.

### Phase 3 (Commerce)
- KYC/KYB via Persona
- Bazaar listings + moderation
- Deal Room (NDA gate, data room)
- Syndicate Engine

---

## Repo Layout Quick Reference

```
persia-bridge/
├── apps/
│   └── web/                  # Next.js 15 app
├── packages/
│   ├── api/                  # tRPC routers
│   ├── auth/                 # Auth.js v5
│   ├── db/                   # Prisma schema + client
│   ├── email/                # React Email templates
│   ├── ui/                   # shadcn/ui base components
│   └── validations/          # Zod schemas
├── schema.sql                # Raw SQL for Supabase SQL editor
└── docs/
    └── persia-bridge-prd/    # Full PRD (Parts 01–08)
```

---

## Key Commands

```bash
# From /persia-bridge
pnpm install                          # install all deps
pnpm dev                              # run all apps/packages in dev mode
pnpm build                            # turbo build
pnpm --filter=@persia-bridge/db exec prisma db push   # push schema to DB (needs DATABASE_URL)
pnpm --filter=@persia-bridge/db exec prisma studio    # browse DB locally
```
