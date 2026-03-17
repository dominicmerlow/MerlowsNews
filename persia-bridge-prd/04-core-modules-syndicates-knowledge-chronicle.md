# Part 04 — Core Modules: Syndicate Engine, Knowledge Base, The Chronicle

**Platform:** Persia Bridge | **Brand:** The Cyrus Accord
**Version:** 1.0 | **Date:** March 2026

---

## 1. Syndicate Engine

### 1.1 Purpose

The Syndicate Engine is the capital formation layer of Persia Bridge. It transforms community membership into coordinated investment action — enabling Lead Investors and Accord Capital to aggregate co-investors, coordinate commitments, and form SPVs for deployment into Iran-focused opportunities.

A syndicate is distinct from a Deal Room entry: a deal is a passive information-sharing object; a syndicate is an active, structured group with defined roles, commitments, documents, governance votes, and an SPV wrapper.

### 1.2 Syndicate Types

| Type | Description | Typical Size |
|------|-------------|-------------|
| **Commercial** | Market-entry JVs, greenfield builds, acquisitions | £500k–£10M |
| **Infrastructure** | Power, water, telecoms, ports — often with sovereign co-investors | £10M–£100M+ |
| **Trade** | Group buying/selling consortia, aggregated trade finance | £100k–£5M |
| **Social Impact** | Blended capital into education, healthcare, women's microfinance | £250k–£5M |
| **Venture** | Angel / early-stage VC — Iranian tech founders globally | £250k–£2M |

### 1.3 Syndicate Lifecycle

```
CREATE (Lead Investor or Accord Capital)
  ↓
CONFIGURE (structure, terms, target, min ticket, member cap)
  ↓
DRAFT (invite-only preview; Lead Investor builds founding co-investor group)
  ↓
OPEN (visible to all Investor Members — or restricted subset)
  ↓
IN PROGRESS (commitments being gathered)
  ↓
CLOSED (target met; SPV formation initiated)
    ├── FUNDED (capital deployed)
    └── WOUND DOWN (deal did not proceed; capital returned)
```

Early access to DRAFT state is a key benefit of higher membership tiers.

---

### 1.4 Syndicate Room

Each syndicate has a dedicated room accessible to members of that syndicate. Sections:

#### Overview Tab
- Syndicate name, type, sector, geography
- Lead Investor(s) with linked profiles
- Target raise, minimum ticket, current committed capital (anonymised aggregate)
- Timeline: open date, close date, expected SPV formation date
- Teaser summary (150 words)
- Full prospectus / investment memo (for committed/signed members)

#### Members Tab (Lead Investor and Deal Manager only)
- List of syndicate members with commitment status
- Provisional commitments vs binding commitments
- Capital table (aggregate view shown to members; full table visible to Lead Investor)
- Invite new members

#### Documents Tab
- Tiered document access:
  - Tier 1 (all syndicate members): teaser, one-pager
  - Tier 2 (post-NDA members): full IM, financial model
  - Tier 3 (committed members): SPV documents, legal pack, wire instructions
- Document version history
- Watermarked on access

#### Discussion Tab
- Private message board for syndicate members
- Threaded discussions
- Lead Investor can pin announcements
- Moderated by Lead Investor (can remove members for misconduct)

#### Votes Tab
- Lead Investor creates votes: simple majority or supermajority
- Vote types: deal terms approval, extension of close date, SPV structure selection
- Anonymous voting (vote counts visible; individual votes not)
- Results posted on close

---

### 1.5 Member Commitment Flow

```
1. Investor Member views Syndicate overview (post-NDA)
2. Submits Indication of Interest (IOI) — provisional amount, currency
3. IOI acknowledged by Lead Investor (or auto-acknowledged)
4. Lead Investor closes IOI phase, requests binding commitments
5. Member submits binding commitment + e-signs commitment letter
6. On SPV formation: member receives SPV onboarding pack
7. Capital call: member wires to SPV account
8. Confirmation of receipt → member registered as LP/shareholder
```

---

### 1.6 SPV Integration

Persia Bridge facilitates SPV formation but does not act as the SPV vehicle itself. The platform:
- Provides document templates (UK LLP, Cayman SPV, UAE SPV — legal review required per structure)
- Tracks commitments and generates capital table export for lawyers
- Generates e-signature workflow for SPV subscription agreements
- Logs all signed documents with timestamps

Accord Capital acts as the general partner / managing member of SPVs where it is involved.

Third-party legal and fund administration partners handle actual SPV registration.

---

### 1.7 Accord Capital Co-Investment Track

When Accord Capital itself is investing alongside syndicate members:
- Syndicate room shows "Accord Capital is co-investing" badge
- Accord Capital's commitment triggers enhanced due diligence disclosure to members
- Co-investment carry and fees disclosed upfront in syndicate terms
- Accord Capital deal team member assigned as Deal Manager for the syndicate

---

### 1.8 Syndicate Analytics (Lead Investor Dashboard)

| Metric | Notes |
|--------|-------|
| Total IOIs | Count + provisional £ |
| Total binding commitments | Count + £ |
| % of target raised | Progress bar |
| Members by tier | Breakdown |
| Document engagement | Views per doc, time spent |
| Vote participation rate | |
| Days to close | Countdown |

---

## 2. Knowledge Base

### 2.1 Purpose

The Knowledge Base is the intelligence layer of Persia Bridge — a curated library of Iran-focused sector research, regulatory guides, market assessments, due diligence frameworks, and practical how-to resources. It serves both the Achaemenid Institute's thought leadership mission and the practical needs of members preparing to invest and trade in Iran.

### 2.2 Content Types

| Type | Description | Produced By |
|------|-------------|-------------|
| **Market Report** | Sector-level analysis of an Iranian industry | Achaemenid Institute / Contributors |
| **Regulatory Guide** | Sanctions landscape, licensing, legal frameworks | Legal partners / Institute |
| **Due Diligence Toolkit** | Checklist, template, process guide for Iran-focused investments | Accord Capital / Contributors |
| **Country Brief** | Macro overview: economy, infrastructure, demographics | Institute |
| **Sector Brief** | Focused on one sector: AgriTech, Healthcare, Fintech, etc. | Institute / Contributors |
| **Case Study** | Anonymised deal or trade transaction outcome | Accord Capital / Contributors |
| **Legal Template** | Contract templates, NDA forms, MOU frameworks | Legal partners |
| **Language Resource** | Farsi / Hebrew business terminology guides | Community contributors |
| **Event Summary** | Written output from chapter events and symposia | Editorial team |

### 2.3 Document Fields

| Field | Notes |
|-------|-------|
| Title | |
| Type | From taxonomy above |
| Abstract / Summary | 200 words max |
| Full document | PDF upload or rich text |
| Author(s) | Linked member profile(s) or Achaemenid Institute |
| Sector tags | Multi-select |
| Geography tags | Country / region |
| Language | |
| Publication date | |
| Last reviewed date | |
| Access level | All members / Investor Members only / Restricted |
| Version | e.g., v1.2 |
| Related documents | Cross-links |
| Citation / source | For externally sourced content |

### 2.4 Contribution Workflow

#### Standard Member submission:
```
Member drafts document (upload PDF or write in-platform editor)
  ↓
Submit for review (with abstract, tags, access level suggested)
  ↓
Editorial Admin reviews (target: 5 business days)
  ↓
Approved → Published (with contributor attribution)
Rejected → Member notified with feedback
```

#### Contributor Member submission:
```
Contributor uploads and tags document
  ↓
Direct publish (or lightweight review — admin-configurable)
  ↓
Live immediately
```

### 2.5 Reading Experience

- In-browser document viewer (PDF.js or equivalent) — no download by default
- Watermark on viewed documents (member name + date — visible or invisible depending on admin config)
- Download enabled per-document at publisher's discretion
- Bookmarking: members can save documents to personal reading list
- Progress tracker: "You've read 3 of 12 documents in this series"
- Print-friendly version available
- Share to connection (internal share, not public link)

### 2.6 Knowledge Base Organisation

**Top-level categories:**
- Getting Started in Iran (for new members)
- Sectors (Agriculture, Technology, Healthcare, Energy, Finance, Real Estate, Infrastructure, Trade, Tourism)
- Regulatory & Legal
- Due Diligence Resources
- Macro & Country Analysis
- Cultural & Language Resources
- Syndicate & Investment Resources
- Achaemenid Institute Publications

**Series:** Documents can be grouped into series (e.g., "Iran AgriTech Series — Parts 1–5"), with series-level navigation.

---

## 3. The Chronicle

### 3.1 Purpose

The Chronicle is the editorial publication of Persia Bridge — the authoritative voice on Iran's new economy, diaspora business, and the rebuilding of the Persia-Israel commercial relationship. It serves dual purposes:

1. **Community cohesion** — gives members shared intellectual content to discuss and connect around
2. **External credibility** — the public-facing Chronicle preview positions Persia Bridge as a serious, credible institution; it drives organic discovery and membership conversion

### 3.2 Content Types

| Type | Description | Frequency |
|------|-------------|-----------|
| **Analysis** | Long-form sector or geopolitical analysis (1,500–3,000 words) | Weekly |
| **Op-Ed** | Member-authored opinion pieces (800–1,500 words) | Weekly |
| **Market Intelligence** | Short, sharp data-driven dispatch (400–600 words) | 2–3x/week |
| **Interview** | Conversation with diaspora leaders, investors, academics | Fortnightly |
| **Syndicate Announcement** | Public announcement of new syndicate opening | As needed |
| **Chapter Coverage** | Event summaries, community news from chapters | As needed |
| **Achaemenid Institute Brief** | Research summaries from the Institute | Monthly |

### 3.3 Article Fields

| Field | Notes |
|-------|-------|
| Title | |
| Subtitle / standfirst | 150 chars max |
| Body | Rich text with inline media |
| Author(s) | Linked member profiles (or "Persia Bridge Editorial Team") |
| Category | From type taxonomy |
| Tags | Sector, geography, theme |
| Hero image | Required (platform stock or uploaded) |
| Reading time | Auto-calculated |
| Publication date | |
| Language | |
| Access level | Public (teaser) / All members (full) / Members only (full, no teaser) |
| SEO title | Optional override |
| SEO description | Optional |
| Related articles | Cross-links |
| Sponsored / Partner content flag | If applicable; disclosed per ASA/FTC standards |

### 3.4 Editorial Workflow

```
Author drafts article in Chronicle CMS (or submits Word/Google Doc)
  ↓
[Optional] Contributor: direct draft in CMS
[Standard Member]: email/upload submission → Editorial Admin creates draft
  ↓
Editorial review (fact check, sub-edit, legal review if required)
  ↓
Author review / sign-off
  ↓
SEO & image check
  ↓
Schedule / Publish
  ↓
Distribution (in-app notifications, email digest, social media — external)
```

### 3.5 Reading Experience

- Distraction-free reading mode (centred column, no sidebar)
- Estimated reading time displayed
- Progress bar on long reads
- Inline pull quotes highlighted in platform accent colour
- Related articles surfaced at end
- Social share buttons (internal: share to connection; external: LinkedIn, X/Twitter, WhatsApp)
- Comment/reaction: members can react (like, insightful, disagree) and leave comments (moderated)
- Bookmarking to reading list
- PDF/print version (for analysis and Institute briefs)

### 3.6 Comment Moderation

- Comments enabled by default on all articles; can be disabled per-article by Editorial Admin
- Comments visible to authenticated members only (never public)
- Moderated: Editorial Admin and Ops Admin can delete, hide, or flag comments
- Authors can reply to comments on their own articles
- Toxic/spam comments: Report button; reviewed within 24 hours

### 3.7 Distribution

#### In-Platform
- New Chronicle articles appear in member home dashboard feed
- Members subscribed to a category receive in-app notification
- Weekly digest email: top 5 articles from the week (personalised by tags member follows)

#### Email
- The Chronicle weekly newsletter (curated editorial selection, not algorithm-driven)
- Breaking Analysis alerts (for major geopolitical / market events — admin-triggered)

#### External (Phase 2)
- LinkedIn page (automated from Chronicle CMS — headline + link)
- X/Twitter (automated)
- Substack mirror (optional — for audience-building before platform scale)

### 3.8 Analytics (Editorial Admin Dashboard)

| Metric | Granularity |
|--------|-------------|
| Article page views | Per article, per day |
| Unique readers | Per article |
| Average time on page | Per article |
| Scroll depth | % of article read |
| Shares (internal) | Per article |
| Comments / reactions | Per article |
| Subscription conversions | Articles that drove membership applications |
| Top articles by engagement | Weekly/monthly ranking |
| Author performance | Per contributor |
| Category performance | Per category |

Analytics visible to:
- Editorial Admin: all content
- Contributors: their own articles only
- Platform Admin: all content
