# Part 01 — Information Architecture

**Platform:** Persia Bridge | **Brand:** The Cyrus Accord
**Version:** 1.0 | **Date:** March 2026

---

## 1. Overview

The information architecture (IA) of Persia Bridge is structured around three concentric rings of access, reflecting the platform's trust-based, community-first philosophy:

```
┌─────────────────────────────────────────────────────┐
│                  PUBLIC SURFACE                     │
│   Landing / About / Chronicle Preview / Apply       │
├─────────────────────────────────────────────────────┤
│                MEMBER COMMONS                       │
│   Directory / Knowledge Base / Chapter Hub /        │
│   Heritage Layer / The Chronicle (full)             │
├─────────────────────────────────────────────────────┤
│                 DEAL LAYER                          │
│   The Bazaar / Deal Room / Syndicate Engine /       │
│   Accord Capital Deal Flow                          │
└─────────────────────────────────────────────────────┘
```

---

## 2. Site Map

### 2.1 Public Surface (No Auth Required)

```
/ (Root)
├── /about
│   ├── /about/the-cyrus-accord          — Mission, history, founding principles
│   ├── /about/persia-bridge             — Platform overview
│   ├── /about/achaemenid-institute      — Think-tank overview
│   └── /about/accord-capital           — Investment vehicle overview
│
├── /chronicle                           — Public-facing news/analysis feed (preview mode)
│   └── /chronicle/[article-slug]        — Individual article (teaser, CTA to join)
│
├── /apply                               — Membership application form
│   ├── /apply/individual
│   └── /apply/organisation
│
├── /events                              — Public event listings (no RSVP)
├── /contact
└── /legal
    ├── /legal/terms
    ├── /legal/privacy
    └── /legal/cookies
```

### 2.2 Member Commons (Auth Required — All Verified Members)

```
/home                                    — Personalised member dashboard
│
/directory                               — Member Directory
│   ├── /directory/search               — Search & filter members
│   ├── /directory/[member-id]          — Member profile (granular privacy)
│   └── /directory/organisations        — Organisation profiles
│
/chronicle                               — Full access to all articles
│   ├── /chronicle/[article-slug]
│   ├── /chronicle/categories/[slug]
│   └── /chronicle/authors/[slug]
│
/knowledge                               — Knowledge Base
│   ├── /knowledge/library              — Reports, white papers, guides
│   ├── /knowledge/[document-id]        — Individual document viewer
│   ├── /knowledge/categories/[slug]
│   └── /knowledge/contribute           — Submit content (verified members)
│
/chapters                                — Chapter Hub
│   ├── /chapters/map                   — Geographic chapter map
│   ├── /chapters/[chapter-id]          — Chapter page (events, members, lead)
│   └── /chapters/[chapter-id]/events  — Chapter-specific events
│
/heritage                                — Heritage Layer
│   ├── /heritage/timeline              — Interactive historical timeline
│   ├── /heritage/cultures              — Persian / Jewish / Israeli cultural guides
│   ├── /heritage/language              — Farsi / Hebrew language resources
│   └── /heritage/archive              — Historical documents & media
│
/events                                  — Full event access + RSVP
│   ├── /events/[event-id]
│   └── /events/[event-id]/register
│
/messages                                — Direct messaging
/notifications                           — Notification centre
/settings                                — Account & profile settings
│   ├── /settings/profile
│   ├── /settings/privacy
│   ├── /settings/notifications
│   └── /settings/billing
```

### 2.3 Deal Layer (Elevated Access — Verified + Deal-Enabled Members)

```
/bazaar                                  — The Bazaar Marketplace
│   ├── /bazaar/browse                  — Browse all listings
│   ├── /bazaar/categories/[slug]       — Category view
│   ├── /bazaar/listing/[id]            — Individual listing
│   ├── /bazaar/my-listings             — Seller dashboard
│   ├── /bazaar/my-orders               — Buyer dashboard
│   └── /bazaar/post                    — Create new listing
│
/dealroom                                — Deal Room
│   ├── /dealroom/browse                — Browse open deals (access-gated)
│   ├── /dealroom/deal/[id]             — Deal detail (NDA-gated)
│   ├── /dealroom/my-deals              — Deals I'm involved in
│   └── /dealroom/submit                — Submit a deal for review
│
/syndicates                              — Syndicate Engine
│   ├── /syndicates/browse              — Browse open syndicates (invite/apply)
│   ├── /syndicates/[syndicate-id]      — Syndicate room (members only)
│   │   ├── /syndicates/[id]/overview
│   │   ├── /syndicates/[id]/documents
│   │   ├── /syndicates/[id]/discussion
│   │   ├── /syndicates/[id]/votes
│   │   └── /syndicates/[id]/members
│   └── /syndicates/create              — Create a syndicate (Accord Capital approval req.)
```

### 2.4 Admin & Operator Layer (Internal — Staff Only)

```
/admin
│   ├── /admin/dashboard                — Platform KPIs overview
│   ├── /admin/members                  — Member management & verification queue
│   ├── /admin/applications             — Application review queue
│   ├── /admin/chronicle                — Editorial CMS
│   ├── /admin/knowledge                — Knowledge Base moderation
│   ├── /admin/bazaar                   — Marketplace moderation
│   ├── /admin/dealroom                 — Deal review & approval
│   ├── /admin/syndicates               — Syndicate oversight
│   ├── /admin/chapters                 — Chapter management
│   ├── /admin/events                   — Event management
│   ├── /admin/heritage                 — Heritage Layer CMS
│   ├── /admin/reports                  — Abuse & content reports
│   ├── /admin/financials               — Billing, subscriptions, transaction ledger
│   └── /admin/settings                 — Platform configuration
```

---

## 3. Navigation Architecture

### 3.1 Primary Navigation (Member-Authenticated)

The primary nav is a left sidebar (desktop) / bottom tab bar (mobile) with the following structure:

| Icon | Label | Route | Access Level |
|------|-------|--------|--------------|
| House | Home | /home | Member |
| Users | Directory | /directory | Member |
| Newspaper | The Chronicle | /chronicle | Member |
| BookOpen | Knowledge Base | /knowledge | Member |
| MapPin | Chapters | /chapters | Member |
| Landmark | Heritage | /heritage | Member |
| ShoppingBag | The Bazaar | /bazaar | Deal-Enabled |
| Briefcase | Deal Room | /dealroom | Deal-Enabled |
| BarChart2 | Syndicates | /syndicates | Deal-Enabled |
| Calendar | Events | /events | Member |
| MessageSquare | Messages | /messages | Member |

### 3.2 Secondary Navigation (Top Bar)

- Search (global)
- Notifications bell
- Profile avatar → dropdown: Profile, Settings, Billing, Sign Out

### 3.3 Public Navigation

- Logo (links to /)
- About (dropdown: The Cyrus Accord, Persia Bridge, The Achaemenid Institute, Accord Capital)
- The Chronicle (preview)
- Events (public)
- Apply (CTA button)
- Sign In

---

## 4. Search Architecture

### 4.1 Global Search Scope (by entity type)

| Entity | Searchable Fields | Access Required |
|--------|-------------------|-----------------|
| Members | Name, expertise, industry, location, languages | Member |
| Organisations | Name, sector, country of operation | Member |
| Chronicle Articles | Title, author, tags, body | Member (full), Public (preview) |
| Knowledge Docs | Title, tags, abstract | Member |
| Bazaar Listings | Title, description, category, location | Deal-Enabled |
| Deals | Title, sector, stage (summary only) | Deal-Enabled |
| Events | Title, date, location, chapter | Member |
| Heritage | Timeline entries, cultural guides | Member |

### 4.2 Search Filters

- **Global:** Entity type, date range
- **Directory:** Community (Iranian diaspora / Jewish/Israeli diaspora / Other), Industry, Expertise, Location (country/city), Language, Membership tier
- **Bazaar:** Category, Price range, Location, Listing type (product / service / partnership)
- **Chronicle:** Category, Author, Date, Language

---

## 5. Content Architecture

### 5.1 Content Types

| Type | Owner | Workflow | CMS |
|------|-------|----------|-----|
| Chronicle Article | Editorial team / Contributing members | Draft → Review → Publish | Admin CMS |
| Knowledge Document | Members / Achaemenid Institute staff | Submit → Review → Approve | Admin CMS |
| Bazaar Listing | Verified sellers | Create → Moderation review → Live | Self-serve + moderation |
| Deal Submission | Deal-enabled members | Submit → Admin review → Deal Room | Admin workflow |
| Syndicate | Accord Capital / Lead investors | Create (approval required) → Open → Closed | Managed |
| Event | Admin / Chapter leads | Create → Publish → Post-event | Admin + Chapter lead |
| Heritage Entry | Admin / Achaemenid Institute | Create → Review → Publish | Admin CMS |
| Member Profile | Individual member | Self-authored, verified fields locked | Self-serve |

### 5.2 Taxonomy

**Shared Tags (cross-module):**
- Community: `iranian-diaspora`, `jewish-diaspora`, `israeli-diaspora`, `sephardic`, `persian-jewish`
- Geography: Country, Region (Middle East, Europe, North America, APAC, etc.)
- Sector: Technology, Real Estate, Finance, Trade, Agriculture, Energy, Healthcare, Creative Industries, Legal & Professional Services, FMCG
- Theme: `post-regime-iran`, `reconstruction`, `peace-dividend`, `trade-routes`, `cultural-bridge`
- Stage: (for deals/syndicates) `seed`, `series-a`, `growth`, `real-estate`, `infrastructure`, `trade-finance`

---

## 6. URL & Routing Conventions

- All slugs are lowercase hyphenated: `/chronicle/persian-renaissance-in-tech`
- Member IDs are UUID-based with vanity slugs optional: `/directory/dariush-tehrani` or `/directory/m-a1b2c3`
- Deal IDs and Syndicate IDs are never exposed in URLs (internal UUIDs only); access is via authenticated route `/dealroom/deal/[uuid]`
- Admin routes are entirely separate subdomain: `admin.persiabridge.com` (or `/admin` behind internal IP restriction in MVP)

---

## 7. Internationalisation (i18n)

### 7.1 MVP Languages
- English (default)

### 7.2 Full Build Languages
- English
- Farsi (RTL support required — full UI flip)
- Hebrew (RTL support required)

### 7.3 i18n Architecture Notes
- All UI strings externalised to i18n JSON files from day one, even if only English is populated in MVP
- RTL layout system must be architected into the CSS design system from the start — retrofitting RTL is expensive
- Content (articles, knowledge docs) can be in any language; language tag on content, filter by language in search
- Member profiles support multilingual bio fields

---

## 8. Notification Architecture

### 8.1 Notification Types

| Event | In-App | Email | Push (future) |
|-------|--------|-------|---------------|
| New connection request | ✅ | ✅ | — |
| Message received | ✅ | ✅ (digest option) | — |
| New Chronicle article in subscribed category | ✅ | ✅ (weekly digest) | — |
| Deal Room update (deals I'm in) | ✅ | ✅ | — |
| Syndicate vote opened | ✅ | ✅ | — |
| Bazaar: new message from buyer/seller | ✅ | ✅ | — |
| Bazaar: listing approved/rejected | ✅ | ✅ | — |
| Event reminder | ✅ | ✅ | — |
| Chapter announcement | ✅ | ✅ | — |
| Application status update | — | ✅ | — |
| Account/billing alert | ✅ | ✅ | — |

### 8.2 Notification Preferences
Members control notification preferences at the module level. Each module can be set to: Immediate / Daily digest / Weekly digest / Off.

---

## 9. Mobile Architecture

### 9.1 MVP Approach
Responsive web-first. No native app in MVP. PWA capabilities (installable, offline-friendly for reading content).

### 9.2 Full Build
Native apps (iOS + Android) — React Native. Member Directory, Messages, and The Bazaar are the highest-value mobile modules.

### 9.3 Mobile Navigation Pattern
- Bottom tab bar: Home, Directory, Chronicle, Bazaar, Messages
- Deal Room and Syndicates accessible via main menu drawer
- Admin features mobile-optimised for Chapter Leads (event management, member approval)
