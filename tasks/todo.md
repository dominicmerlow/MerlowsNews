# Persia Bridge — Build Plan

## Phase 1: Scaffold (this session)

### 1. Turborepo monorepo init
- [ ] Create `/persia-bridge` directory at repo root
- [ ] Init pnpm workspace (`pnpm-workspace.yaml`)
- [ ] Root `package.json` with Turborepo + shared scripts
- [ ] `turbo.json` pipeline config (build, dev, lint, typecheck)
- [ ] `.gitignore`, `.nvmrc`, `tsconfig.base.json`

### 2. `packages/db` — Prisma schema
- [ ] `package.json` for db package
- [ ] `prisma/schema.prisma` — full schema from PRD Part 07
- [ ] `src/index.ts` — PrismaClient singleton export
- [ ] `tsconfig.json`

### 3. `packages/validations` — Zod schemas
- [ ] Shared Zod schemas for all core entities (members, listings, deals, etc.)
- [ ] Mirror Prisma enums as Zod enums

### 4. `packages/auth` — Auth.js config
- [ ] Auth.js v5 config with: magic link, credentials, Prisma adapter
- [ ] Session type extensions (member ID, roles, tier)

### 5. `packages/ui` — shadcn/ui base
- [ ] `package.json` with Tailwind + shadcn/ui deps
- [ ] `tailwind.config.ts` with RTL-ready logical properties
- [ ] `globals.css` with CSS variables (light/dark theme tokens)
- [ ] Base components: Button, Card, Badge, Input, Avatar, Dialog, Dropdown

### 6. `packages/email` — React Email templates
- [ ] Welcome email
- [ ] Magic link email
- [ ] Application status (approved / rejected)
- [ ] Connection request notification

### 7. `apps/web` — Next.js 14 App Router
- [ ] `create-next-app` scaffold
- [ ] Tailwind + shadcn/ui wired in
- [ ] tRPC client + server setup
- [ ] Auth.js middleware (route protection)
- [ ] Public routes: `/`, `/about`, `/chronicle` (preview), `/apply`
- [ ] Auth routes: `/sign-in`, `/sign-up` (redirect to apply)
- [ ] Member routes (layout with sidebar): `/home`, `/directory`, `/chronicle`, `/knowledge`, `/heritage`, `/chapters`, `/messages`, `/settings`
- [ ] Deal routes: `/bazaar`, `/dealroom`, `/syndicates`
- [ ] i18n config (English only for now; strings externalised)

### 8. `packages/api` — tRPC router
- [ ] Context (session + Prisma client)
- [ ] Procedures: `publicProcedure`, `protectedProcedure`, `adminProcedure`
- [ ] Routers: members, chronicle, knowledge, directory, chapters, notifications

## Phase 2: Core Features (next sessions)
- Application flow + admin review queue
- Member Directory (search, profiles, connections)
- Chronicle (CMS + reading experience)
- Knowledge Base
- Heritage Layer static content
- Chapter Hub + events

## Phase 3: Commerce Layer
- KYC/KYB (Persona integration)
- Bazaar (listings, moderation, enquiry)
- Deal Room (NDA, data room)
- Syndicate Engine

---

## Review

_To be filled after session_
