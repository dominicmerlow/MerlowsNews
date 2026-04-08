# Part 06 — Tech Stack Recommendations

**Platform:** Persia Bridge | **Brand:** The Cyrus Accord
**Version:** 1.0 | **Date:** March 2026

---

## 1. Stack Philosophy

Persia Bridge is a **trust-gated community and commerce platform** with social networking, content publishing, marketplace, and deal-flow components. The tech stack must satisfy:

1. **Rapid MVP delivery** — founding cohort launch within 6 months of green light
2. **Security-first** — KYC/KYB, financial data, NDA-gated documents, accredited investor data
3. **RTL-ready** — Farsi and Hebrew support from the start
4. **Composable architecture** — MVP modules are standalone but compose cleanly into the full platform
5. **Compliance** — GDPR (UK/EU), sanctions screening API integration, investor regulations
6. **Scale** — designed for 10,000+ members over 3 years without re-architecture

The recommended approach is a **modern full-stack web application** with clearly separated frontend, backend API, and infrastructure layers. No premature microservices — a well-structured monolith with clean module boundaries is the right MVP architecture; break out services only when scale or team demands it.

---

## 2. Frontend

### 2.1 Framework: Next.js (React)

**Recommendation:** Next.js 14+ (App Router)

**Rationale:**
- Industry standard for content-heavy, SEO-relevant web platforms
- App Router enables granular server/client rendering decisions — critical for public SEO (Chronicle) vs authenticated app performance
- Strong ecosystem: Vercel deployment, extensive component libraries, wide talent pool
- Built-in i18n routing — essential for English/Farsi/Hebrew
- PWA support for MVP mobile experience

**Alternatives considered:**
- Remix: Good routing model, smaller ecosystem
- SvelteKit: Excellent performance, smaller talent pool
- Vue/Nuxt: Viable, but React is dominant for this type of platform

### 2.2 UI Component Library: shadcn/ui + Tailwind CSS

**Recommendation:** shadcn/ui with Tailwind CSS v4

**Rationale:**
- shadcn/ui provides composable, accessible, un-opinionated components that are owned in the codebase (not a dependency)
- Tailwind provides utility-first styling with excellent RTL support via `dir` attribute and logical CSS properties
- Radix UI primitives (underlying shadcn) provide WCAG-compliant accessibility out of the box
- Design system can be built on top without fighting the library

**RTL Implementation:**
- Tailwind's logical properties (`ms-`, `me-`, `ps-`, `pe-`) for automatic LTR/RTL flipping
- `dir="rtl"` on `<html>` element per locale
- Farsi and Hebrew font stacks configured as CSS custom properties

### 2.3 State Management

- **Server state:** TanStack Query (React Query) — for API data fetching, caching, and synchronisation
- **Client state:** Zustand — lightweight; for UI state (modals, sidebar, notifications badge)
- **Forms:** React Hook Form + Zod — for all form validation; Zod schemas shared with backend

### 2.4 Rich Text Editor

- **Recommendation:** Tiptap (ProseMirror-based)
- Used in: Chronicle article editor, Knowledge Base submission, member profile bio, chapter announcements
- Supports: bold, italic, headings, lists, blockquotes, inline images, links, mentions, tables
- Extensions available for: character count, collaborative editing (Phase 2), mentions (@member)

---

## 3. Backend

### 3.1 Runtime & Framework: Node.js + tRPC (or REST)

**Recommendation:** Next.js API Routes with tRPC

**Rationale:**
- tRPC provides end-to-end type safety between Next.js frontend and backend without a separate API schema step
- Zod schemas serve as both runtime validation and TypeScript types — single source of truth
- For MVP: Next.js API routes (or Route Handlers in App Router) are sufficient; no separate backend server
- For scale: tRPC router can be extracted to a standalone Node.js server (Fastify) without changing client code

**Alternative if REST preferred:**
- Hono.js on Node — modern, fast, TypeScript-first REST framework; can run on Edge

### 3.2 ORM: Prisma

**Recommendation:** Prisma ORM

**Rationale:**
- Type-safe database queries generated from schema
- Schema migration workflow (Prisma Migrate) is production-grade
- Supports PostgreSQL (primary), with easy extension to read replicas
- Prisma Accelerate for connection pooling at scale (serverless/edge deployments)

### 3.3 Authentication: NextAuth.js v5 (Auth.js)

**Recommendation:** Auth.js (NextAuth v5)

**Rationale:**
- Handles session management, JWT, OAuth providers, and credential auth in one library
- Adapters for Prisma — user session stored in PostgreSQL
- Supports magic link email auth (passwordless — better UX for this audience)
- Extensible for 2FA (required for Super Admin; optional for members)

**Auth flows supported:**
- Magic link (email OTP) — default for members
- Google OAuth — optional SSO
- LinkedIn OAuth — for profile verification
- Password-based — fallback option
- 2FA via TOTP (Google Authenticator) — required for admin roles

---

## 4. Database

### 4.1 Primary Database: PostgreSQL

**Recommendation:** PostgreSQL 16 via managed provider

**Rationale:**
- Relational model fits the platform's heavily relational data (members, connections, syndicates, deals)
- Full-text search via `tsvector` / `tsquery` (sufficient for MVP; Elasticsearch added at scale)
- JSON(B) columns for flexible data (member profile extras, deal metadata, heritage timeline entries)
- Row-level security (RLS) for multi-tenant/permission data isolation
- GDPR deletion cascades implementable via foreign key constraints

**Managed providers:**
- **Recommendation:** Supabase (PostgreSQL + Auth + Storage + Realtime in one) or Neon (serverless PostgreSQL)
- Supabase provides: database, file storage (for documents), realtime subscriptions, and edge functions in one platform — reduces integration complexity significantly in MVP
- Neon is lighter and more portable but requires separate services for storage and realtime

### 4.2 Search: PostgreSQL Full-Text Search (MVP) → Typesense (Scale)

**MVP:** PostgreSQL `tsvector` with `GIN` indexes
- Sufficient for member directory, Chronicle, and Knowledge Base search at < 50,000 records

**Full Build:** Typesense
- Open-source, self-hostable (or Typesense Cloud)
- Typo-tolerant, faceted search
- Fast: sub-10ms query times
- Simpler than Elasticsearch; better suited for this scale

Algolia is an alternative but costs scale poorly for a community platform.

### 4.3 File Storage: Supabase Storage (or AWS S3 + CloudFront)

**Recommendation:** Supabase Storage (MVP) → AWS S3 + CloudFront (scale)

Used for:
- Knowledge Base documents (PDFs)
- Deal Room data room documents
- Member profile photos
- Chronicle and Heritage images
- Video assets (Heritage archive)

**Security requirements:**
- Signed URLs for all non-public documents (time-limited, member-scoped)
- Deal Room documents: signed URLs with expiry of 15 minutes, per-access regeneration
- KYC documents: not stored on platform (third-party KYC provider holds; platform stores reference ID only)

### 4.4 Caching: Redis (Upstash)

**Recommendation:** Upstash Redis (serverless Redis, HTTP API)

Used for:
- API rate limiting (member action throttling, search query limits)
- Session caching
- Notification badge counts
- Bazaar listing search result caching
- Feature flags (short-duration cache)

---

## 5. Infrastructure & Hosting

### 5.1 Hosting: Vercel (Frontend) + Supabase (Backend/DB)

**MVP Recommendation:** Vercel + Supabase

| Layer | Provider | Notes |
|-------|----------|-------|
| Frontend (Next.js) | Vercel | Global CDN, automatic deployments from Git, Edge Network |
| Database | Supabase (PostgreSQL) | Managed, includes Storage and Realtime |
| Cache | Upstash Redis | Serverless, pay-per-use |
| Email | Resend | Transactional + newsletter; React Email for templates |
| File Storage | Supabase Storage → S3 | Escalate when > 50GB |
| KYC/KYB | Persona | Hosted flow; embedded SDK |
| Payments | Stripe | Subscriptions + Stripe Connect (Bazaar vendors) |
| E-Signature | Docuseal | Open-source, self-hostable NDA signing |
| Sanctions Screening | ComplyAdvantage | API integration for vendor/investor screening |
| Maps | Mapbox | Chapter map, member location (country-level only) |
| SMS/OTP | Twilio | Phone verification |
| Push Notifications | (deferred to Full Build) | |

### 5.2 Full Build Infrastructure Migration

When platform scales beyond MVP:

| Layer | Scale Architecture |
|-------|-------------------|
| Frontend | Vercel Enterprise or self-hosted Next.js on AWS ECS |
| Database | AWS RDS PostgreSQL (multi-AZ) with read replicas |
| Search | Typesense Cloud or self-hosted on EC2 |
| Storage | AWS S3 + CloudFront |
| Cache | AWS ElastiCache (Redis) |
| Background jobs | AWS SQS + Lambda or BullMQ on EC2 |
| CDN | CloudFront (US + EU nodes minimum) |

### 5.3 Data Residency

- **EU-primary** (London/Frankfurt) for all member data — GDPR requirement
- US chapter members: data stays in EU under standard contractual clauses
- Review needed before US entity formation or US resident data localisation requirements

---

## 6. Key Third-Party Services

### 6.1 Identity & Compliance

| Service | Purpose | Notes |
|---------|---------|-------|
| **Persona** | KYC (individual) and KYB (business) | Embedded SDK; stores ID docs; platform receives verification status + reference ID only |
| **ComplyAdvantage** | Sanctions screening (OFAC, EU, UK HM Treasury lists) | API call on vendor/investor application; re-check quarterly |
| **Docuseal** | NDA and legal document e-signature | Open-source; self-hostable for data control; DocuSign as enterprise alternative |

### 6.2 Payments

| Service | Purpose | Notes |
|---------|---------|-------|
| **Stripe Billing** | Membership subscription management | Handles recurring billing, upgrades, downgrades, dunning |
| **Stripe Connect** | Bazaar vendor payouts | Marketplace payments with platform commission split |
| **Stripe Tax** | VAT/GST calculation | UK, EU, US required from launch |

### 6.3 Communications

| Service | Purpose | Notes |
|---------|---------|-------|
| **Resend** | Transactional email | Modern API, React Email templates, high deliverability |
| **React Email** | Email template framework | Consistent, responsive email templates in React |
| **Twilio** | SMS OTP verification | Phone verification during KYC upgrade flows |
| **Loops** | Member lifecycle marketing emails | Welcome sequences, re-engagement; or use Resend broadcasts |

### 6.4 Analytics & Monitoring

| Service | Purpose | Notes |
|---------|---------|-------|
| **PostHog** | Product analytics, session replay, feature flags | Self-hostable; privacy-compliant; replaces Mixpanel/Amplitude |
| **Sentry** | Error tracking and performance monitoring | Standard for Next.js apps |
| **Uptime Robot** | Uptime monitoring | Simple; escalate to Better Uptime at scale |

### 6.5 Content Delivery

| Service | Purpose | Notes |
|---------|---------|-------|
| **Cloudinary** | Image optimisation and transformation | Auto-resize, WebP conversion, CDN delivery |
| **Mapbox** | Chapter map, geographic visualisations | Standard Maps JS API |
| **PDF.js** | In-browser PDF viewer | Open-source; self-hosted; no third-party data leakage for sensitive docs |

---

## 7. Security Architecture

### 7.1 Authentication Security
- Magic link tokens: 15-minute expiry, single-use, cryptographically random (CSPRNG)
- Session cookies: `HttpOnly`, `Secure`, `SameSite=Strict`; 30-day expiry with rolling refresh
- Super Admin accounts: mandatory TOTP 2FA; session expiry 8 hours
- Admin accounts: mandatory TOTP 2FA

### 7.2 Authorisation
- Role-based access control (RBAC) enforced at the API layer (tRPC middleware)
- PostgreSQL Row Level Security (RLS) as defence-in-depth for database queries
- All protected routes check session server-side (no client-side auth-only routes)

### 7.3 Data Protection
- All data encrypted at rest (AES-256 via managed database provider)
- All data encrypted in transit (TLS 1.3 minimum)
- Deal Room documents: additional application-level encryption for highest sensitivity documents (Full Build)
- Personal data minimisation: collect only what is necessary for each role

### 7.4 API Security
- Rate limiting on all API endpoints (Upstash Redis + middleware)
- CSRF protection (Next.js built-in for App Router; explicit token for tRPC mutations)
- Input validation: all inputs validated with Zod schemas before processing
- SQL injection: mitigated by Prisma ORM parameterised queries
- XSS: React's default escaping + sanitisation of rich text (DOMPurify) for user-generated content
- Content Security Policy (CSP) headers via Next.js config

### 7.5 Document Security (Deal Room & NDA-Gated Docs)
- All document URLs are signed (time-limited, member-scoped)
- PDF viewer renders in sandboxed iframe; no direct file URL exposed
- Download prevention: `Content-Disposition: inline` + `X-Frame-Options: SAMEORIGIN`
- Document access logged to immutable audit trail (append-only table)
- Watermarking: member name + access timestamp burned into PDF on-the-fly (server-side, Full Build)

### 7.6 Compliance
- GDPR: right to erasure (soft delete → hard delete after 30-day holding period), data export (JSON), consent tracking
- Audit trail: all admin actions, role changes, NDA signings, deal room access logged to append-only `audit_log` table
- Sanctions: ComplyAdvantage API checked on investor/vendor applications; re-screened quarterly

---

## 8. Development Practices

### 8.1 Repository Structure

```
/persia-bridge
├── /apps
│   └── /web              — Next.js application
├── /packages
│   ├── /db               — Prisma schema + generated client
│   ├── /api              — tRPC router definitions
│   ├── /auth             — Auth.js configuration
│   ├── /ui               — Shared component library (shadcn/ui base)
│   ├── /email            — React Email templates
│   └── /validations      — Zod schemas (shared frontend/backend)
├── /infrastructure       — Terraform / deployment config
└── /docs                 — Architecture decision records (ADRs)
```

Monorepo managed with **Turborepo**.

### 8.2 CI/CD

| Stage | Tool | Notes |
|-------|------|-------|
| Version control | GitHub | Private repo; branch protection on `main` |
| CI | GitHub Actions | Type-check, lint, unit tests on every PR |
| Preview deployments | Vercel | Automatic preview URL per PR branch |
| Production deploy | Vercel (automatic on merge to `main`) | |
| Database migrations | Prisma Migrate (CI-run against staging; manual approval for production) | |

### 8.3 Testing Strategy

| Layer | Tool | Coverage Target |
|-------|------|----------------|
| Unit tests | Vitest | Core business logic, Zod schemas, utility functions |
| Integration tests | Vitest + Prisma test client | API routes, RBAC rules |
| E2E tests | Playwright | Critical user flows: signup, RSVP, Bazaar listing, NDA sign |
| Accessibility | axe-core (Playwright plugin) | WCAG 2.1 AA |

### 8.4 Feature Flags

PostHog feature flags used for:
- Gradual rollout of new modules (e.g., Deal Room to Investor Members only)
- A/B testing onboarding flows
- Emergency kill switch for any module

---

## 9. AI / ML Components

### 9.1 MVP (Rule-Based)
- Suggested connections: based on shared sector + location + community tags
- Chronicle recommendations: based on categories the member has engaged with

### 9.2 Full Build (AI-Powered)
- **Connection matching:** embeddings-based similarity search on member profiles
- **Deal matching:** surface relevant deals to Investor Members based on declared investment focus and previous engagement
- **Bazaar matching:** surface relevant listings to buyers based on stated interests
- **Chronicle personalisation:** ranking of articles by predicted engagement
- **Syndicate member suggestions:** recommend Investor Members to Lead Investors based on investment thesis alignment

**Implementation:** OpenAI embeddings (`text-embedding-3-small`) + pgvector (PostgreSQL extension) for similarity search. No external vector database required at this scale.

### 9.3 AI Content Assistance (Full Build)
- Chronicle: AI draft assistant for Contributing Members (Claude API via MCP or direct SDK)
- Knowledge Base: AI-generated document summaries / abstracts
- Member profiles: AI-suggested expertise tags based on bio text
- Deal Room: AI-generated deal summary from uploaded documents (for Deal Managers)

**Note:** All AI-generated content is clearly labelled. No AI-generated content is published without human review.
