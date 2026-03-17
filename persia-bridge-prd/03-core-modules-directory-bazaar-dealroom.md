# Part 03 — Core Modules: Member Directory, The Bazaar, Deal Room

**Platform:** Persia Bridge | **Brand:** The Cyrus Accord
**Version:** 1.0 | **Date:** March 2026

---

## 1. Member Directory

### 1.1 Purpose

The Member Directory is the relational spine of Persia Bridge. It is where the network becomes visible, searchable, and connectable. Every verified member has a profile; the Directory is the primary surface for discovering co-investors, partners, vendors, and collaborators.

### 1.2 Member Profile

#### Profile Fields

| Field | Type | Visibility Default | Editable By |
|-------|------|-------------------|-------------|
| Full name | Text | All members | Member (locked post-KYC) |
| Display name / handle | Text | All members | Member |
| Profile photo | Image | All members | Member |
| Headline | Text (120 chars) | All members | Member |
| Bio / Summary | Rich text | All members | Member |
| Community identity | Select (Iranian Diaspora / Jewish/Israeli Diaspora / Friend of The Accord) | All members | Member |
| Location (city, country) | Select | All members | Member |
| Languages spoken | Multi-select | All members | Member |
| Industry / Sector | Multi-select | All members | Member |
| Expertise tags | Multi-select (taxonomy) | All members | Member |
| LinkedIn URL | URL | Connections only | Member |
| Email | Text | Never public | Member |
| Phone | Text | Never public | Member |
| Website | URL | All members | Member |
| Investment focus | Multi-select (sectors) | Connections only | Member (Investor only) |
| Membership tier | Badge | All members | System |
| Verification badges | Badges | All members | System |
| Chapter affiliation | Select | All members | Member |
| Member since | Date | All members | System |
| Last active | Relative time | Never public | Admin only |

#### Verification Badges (displayed on profile)
- ✅ Email Verified
- 🔐 KYC Verified
- 🏢 KYB Verified (Business)
- 💼 Accredited Investor
- ✍️ Contributor
- 🌍 Chapter Lead

#### Profile Completeness Score
- Displayed to the member only as a progress bar (not public)
- Threshold for full Directory visibility: 60%
- Nudge at 30%, 60%, 80% milestones
- Fields weighted: Photo (15%), Bio (20%), Expertise (15%), Industry (10%), Location (10%), LinkedIn (10%), Languages (5%), Headline (15%)

---

### 1.3 Directory Search & Filters

#### Search Modes
1. **Keyword search** — searches name, headline, bio, expertise tags (full-text)
2. **Filter browse** — structured filter panel without keywords

#### Filter Dimensions

| Filter | Type | Notes |
|--------|------|-------|
| Community identity | Multi-select | Iranian Diaspora, Jewish/Israeli Diaspora, Friend of The Accord |
| Industry / Sector | Multi-select | Platform taxonomy |
| Expertise | Multi-select | Platform taxonomy |
| Location | Country → City drill-down | |
| Language | Multi-select | |
| Membership tier | Multi-select | Community, Full, Investor, etc. |
| Chapter | Select | |
| Verification | Checkbox | KYC Verified, Accredited Investor |
| Has profile photo | Toggle | |
| Connection status | My connections / 2nd degree / All | |

#### Sort Options
- Relevance (default — keyword search)
- Newest members first
- Most connected (connections count)
- Alphabetical

#### Search Results Card
Each result shows: photo, name, headline, community badge, location, top 3 expertise tags, connection status (connect / connected / pending).

---

### 1.4 Connections

#### Connection Model
Persia Bridge uses a **mutual connection model** (like LinkedIn, not Twitter follow):
- Member A sends a connection request with optional personal note
- Member B accepts or ignores
- On acceptance: both members can DM; private fields become visible per each other's privacy settings

#### Connection Request Limits
- Maximum 20 pending outbound requests at a time (prevents spam)
- Members can disable incoming requests in privacy settings

#### Connection Feed
- Home dashboard surfaces recent content and activity from connections (connection graph feed)

---

### 1.5 AI-Powered Matching

**MVP:** Rule-based matching only (same industry + sector + location)

**Full Build:** AI matching engine:
- Weekly "Suggested connections" email digest (top 5 recommendations)
- In-profile "Members you should know" sidebar (3 suggestions)
- Syndicate formation: surface relevant Investor Members for a deal based on declared investment focus
- Matching signals: community, sector, geography, investment stage, language, connection graph proximity

---

### 1.6 Organisation Profiles

In addition to individual profiles, organisations (companies, family offices, funds) can have a profile:

| Field | Notes |
|-------|-------|
| Organisation name | |
| Type | Company / Family Office / Fund / NGO / Government Body |
| Sector(s) | |
| Country of registration | |
| Description | |
| Website | |
| Team members on platform | Linked individual profiles |
| Verified | KYB badge |

Organisation profiles are owned by the founding member who creates them; additional member-admins can be granted edit access.

---

## 2. The Bazaar

### 2.1 Purpose

The Bazaar is the commercial marketplace layer of Persia Bridge. Phase 1 (pre-sanctions relief) focuses on relationship pre-positioning — verified listings, supplier/buyer introductions, and soft deal flow. Phase 2 (post-sanctions) activates transaction facilitation with platform commissions.

The Bazaar is not a general-purpose marketplace. Every listing must have a clear Iran-relevance — either trade with/to/from Iran, or diaspora-to-diaspora B2B commerce between platform members.

### 2.2 Listing Types

| Type | Description | Example |
|------|-------------|---------|
| **Product (Export)** | Physical goods available for export | Iranian saffron, pistachio, handicrafts |
| **Product (Import)** | Goods sought for import to Iran | Construction materials, medical equipment |
| **Service (Offer)** | Services offered by member | Legal counsel, AgriTech consulting, logistics |
| **Service (Sought)** | Services actively being sought | "Looking for: banking partner for Iran entry" |
| **Partnership** | JV, co-investment, or strategic partnership opportunity | "Seeking Iranian dairy processing JV partner" |
| **Tender / RFP** | Formal procurement request | "RFP: 50 units medical imaging equipment" |

### 2.3 Listing Fields

#### Core Fields (all types)

| Field | Type | Required |
|-------|------|----------|
| Title | Text (80 chars) | ✅ |
| Type | Select (above) | ✅ |
| Category | Select (taxonomy) | ✅ |
| Sub-category | Select | Optional |
| Description | Rich text | ✅ |
| Country of origin / operation | Select | ✅ |
| Iran relevance statement | Text | ✅ (required for moderation) |
| Price / Budget | Range or "Contact for pricing" | Optional |
| Currency | Select | Optional |
| Listing language | Select | ✅ |
| Images / documents | Upload (max 10 files, 20MB each) | Optional |
| Contact preference | DM via platform / Email / WhatsApp | ✅ |
| Expiry date | Date (default: 90 days, renewable) | ✅ |
| Tags | Multi-select | Optional |

#### Product-specific
- HS code (Harmonised System trade classification)
- Quantity available / minimum order quantity
- Incoterms (shipping terms)
- Certifications (ISO, Halal, Kosher, etc.)

#### Service-specific
- Engagement type (one-off / retainer / project-based)
- Geographies served
- Languages of service delivery

#### Partnership-specific
- Partnership structure sought (JV / Equity / Revenue share / Strategic)
- Minimum investment size (if relevant)

---

### 2.4 Listing Lifecycle

```
Draft → Submit for Review → [Admin Moderation] → Live
                                  ↓
                           Rejected (with reason)
                                  ↓
                             Edit & Resubmit

Live listing → Expired (after 90 days)
           → Renewed by seller
           → Marked "Closed" by seller
           → Removed by admin (policy violation)
```

**Moderation SLA:** 24 business hours for first listing per vendor; subsequent listings from trusted vendors: 4 business hours or auto-approved (admin-configurable per vendor).

---

### 2.5 Buyer Interaction Flow

#### Phase 1 (Pre-Sanctions — Introduction Mode)
1. Buyer browses listings (Deal-Enabled members only)
2. Buyer clicks "Express Interest" or "Send Message"
3. Platform routes a structured message to seller (buyer profile visible to seller)
4. Seller accepts or declines introduction
5. On acceptance: private DM thread opened between buyer and seller
6. Transaction is off-platform (no escrow in Phase 1)
7. Platform logs introduction event for analytics

#### Phase 2 (Post-Sanctions — Transaction Mode)
1. Buyer selects listing and clicks "Buy / Enquire"
2. Offer/counter-offer workflow within platform
3. Terms agreed in platform deal thread
4. Escrow payment initiated (Stripe or specialist trade finance partner)
5. Delivery/service confirmation triggers escrow release
6. Platform takes commission (5–8% suggested; TBD)
7. Both parties leave review/rating

---

### 2.6 Bazaar Categories

**Primary Categories:**
- Agriculture & Food Processing
- Construction & Engineering Materials
- Medical Equipment & Pharmaceuticals
- Technology & Software
- Energy (Oil, Gas, Renewables)
- Financial & Legal Services
- Tourism & Hospitality
- Logistics & Supply Chain
- Consumer Goods & FMCG
- Education & Training
- Media & Creative Industries
- Infrastructure & Utilities

---

### 2.7 Bazaar Vendor Dashboard

| Section | Content |
|---------|---------|
| My Listings | All listings: draft, pending, live, expired, closed |
| Enquiries / Messages | Inbound buyer messages per listing |
| Analytics | Views, enquiries, conversion per listing |
| Payout Account | Stripe Connect status (Phase 2) |
| Reviews Received | Buyer ratings and reviews |
| Bazaar Settings | Notification preferences, out-of-office |

---

### 2.8 Trust & Safety — The Bazaar

- All vendors require KYC/KYB before listing
- Iran relevance statement reviewed by ops team during moderation
- No listings that would constitute sanctions violations (legal counsel engaged to define policy)
- Sanctions screening: automated check of seller against OFAC, EU, UK sanctions lists (integrated via third-party API — e.g., ComplyAdvantage)
- Reporting: "Report this listing" button on all listings; reviewed by Ops Admin within 24 hours
- Repeat violators: Vendor access revoked; account flagged for Platform Admin review

---

## 3. Deal Room

### 3.1 Purpose

The Deal Room is the private, NDA-gated space where vetted Investor Members review and engage with investment opportunities curated by Accord Capital and Lead Investors. It is distinct from The Bazaar (which handles trade and commerce) — the Deal Room is exclusively for equity, debt, and structured investment opportunities.

### 3.2 Deal Types

| Type | Description |
|------|-------------|
| **Equity** | Direct equity stake in a company or project |
| **Real Estate** | Property acquisition, development, or income-producing asset |
| **Infrastructure** | Power, water, ports, telecoms — typically larger capital pools |
| **Trade Finance** | Short-duration financing of verified trade transactions |
| **Venture** | Early-stage startup investment (typically via Accord Capital syndicate) |
| **Social Impact** | Blended capital — grant + equity/debt into social infrastructure |

### 3.3 Deal Submission Flow

```
Lead Investor or Accord Capital staff submits deal →
Admin (Deal Manager) reviews →
  ├── Approved → Deal created in Deal Room
  └── Rejected → Submitter notified with reason

Deal creation includes:
  - Deal profile (public to Investor Members)
  - Data room setup (documents, NDA template)
  - Access configuration (open to all Investors / invite-only / tiered)
  - Target raise and minimum ticket size
  - Timeline (open date, close date)
```

### 3.4 Deal Profile Fields

| Field | Visibility | Notes |
|-------|-----------|-------|
| Deal title | Investor Members | Non-identifying headline |
| Deal type | Investor Members | From taxonomy above |
| Sector | Investor Members | |
| Geography | Investor Members | Country/region |
| Target raise | Investor Members | £/€/$ range or exact |
| Minimum ticket | Investor Members | |
| Stage / Structure | Investor Members | |
| Summary (teaser) | Investor Members | 300 words max |
| Full information memorandum | Post-NDA only | PDF upload |
| Financial model | Post-NDA only | Excel or PDF |
| Legal documents | Post-NDA only | |
| Data room (full) | Post-NDA only | Folder structure |
| Lead investor / sponsor | Post-NDA only | With consent |
| Co-investors to date | Post-NDA only | With consent |

### 3.5 NDA Workflow

1. Investor Member views Deal teaser (title, type, sector, geography, raise size, summary)
2. Clicks "Request Full Access"
3. Platform presents NDA (standard Accord Capital template, legally reviewed)
4. Member signs electronically (DocuSign or embedded e-signature — e.g., Docuseal)
5. Platform records signature, timestamps, IP address
6. Full Deal Room access granted immediately for that deal
7. NDA signing event logged to audit trail

**NDA Management:**
- Each deal has its own NDA instance (not a blanket platform NDA)
- Investor Members can view all deals they have signed NDAs for from `/dealroom/my-deals`
- Deal Manager can revoke access to a deal room at any time (e.g., if investor is no longer eligible)

### 3.6 Deal Room — Data Room Structure

Each deal has a structured data room folder hierarchy:

```
📁 Deal Room — [Deal Name]
├── 📄 Information Memorandum
├── 📁 Financials
│   ├── Historical financials
│   ├── Financial model / projections
│   └── Audit reports
├── 📁 Legal
│   ├── Term sheet
│   ├── Shareholders agreement (draft)
│   ├── Company registration docs
│   └── Regulatory/licensing docs
├── 📁 Market & Technical
│   ├── Market research
│   ├── Technical assessments
│   └── Third-party reports
├── 📁 Management
│   ├── Team bios
│   └── Org chart
└── 📁 Other
    └── Press / media / reference letters
```

- Documents are watermarked with the accessing member's name and access timestamp
- No download permitted by default (view-only in browser); download can be enabled per document by Deal Manager
- All document access events logged (view, download, duration)

### 3.7 Deal Status Lifecycle

| Status | Description |
|--------|-------------|
| `draft` | Being prepared by submitter |
| `under_review` | Submitted, pending Deal Manager approval |
| `open` | Live in Deal Room; accepting NDA requests and co-investor interest |
| `in_syndication` | Syndicate being formed (linked to Syndicate Engine) |
| `closed_funded` | Target raise met; deal closed |
| `closed_unfunded` | Deal did not close |
| `withdrawn` | Removed by submitter or admin |

### 3.8 Investor Interest Tracking

Once post-NDA access is granted, Investor Members can:
- Mark deal as "Interested" (soft signal, not binding)
- Mark as "Not interested" (removes from active deal feed)
- Submit a non-binding "Indication of Interest" (IOI) with provisional ticket size
- Convert IOI to binding commitment when deal moves to syndication

Deal Manager dashboard shows: NDA count, IOI count, provisional capital committed, investor list.

### 3.9 Deal Room Notifications

| Event | Notified To |
|-------|------------|
| New deal added to Deal Room | All Investor Members (in-app + weekly digest) |
| Deal closing in 7 days | All investors who signed NDA on that deal |
| New document uploaded to data room | All investors who signed NDA on that deal |
| IOI accepted / acknowledged | Submitting investor |
| Deal status change | All investors who signed NDA on that deal |
| Syndicate formation announced | All investors who expressed interest |
