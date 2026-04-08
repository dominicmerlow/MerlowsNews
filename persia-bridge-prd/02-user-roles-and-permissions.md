# Part 02 — User Roles & Permissions

**Platform:** Persia Bridge | **Brand:** The Cyrus Accord
**Version:** 1.0 | **Date:** March 2026

---

## 1. Role Philosophy

Persia Bridge is a **trust-gated platform**. Access expands as identity is verified, community participation grows, and financial/professional credentials are confirmed. There is no anonymous participation in the core platform. Every role above Guest requires a verified identity baseline.

The role model has two dimensions:
1. **Access Tier** — what parts of the platform a user can reach
2. **Functional Role** — what a user can *do* within those areas (read, post, moderate, manage)

---

## 2. Role Hierarchy

```
Super Admin
│
├── Platform Admin
│   ├── Editorial Admin (Chronicle + Knowledge)
│   └── Operations Admin (Members + Chapters + Events)
│
├── Accord Capital Staff
│   └── Deal Manager
│
├── Chapter Lead
│
├── Contributor Member          ← verified + elevated posting rights
│   │
│   ├── Investor Member         ← verified + deal/syndicate access
│   │   └── Lead Investor       ← creates/leads syndicates
│   │
│   └── Vendor Member           ← verified + Bazaar selling rights
│
├── Standard Member             ← verified, core platform access
│
├── Applicant                   ← applied, pending review
│
└── Guest (Public)              ← no auth, public surface only
```

---

## 3. Role Definitions

### 3.1 Guest (Public)

**Who:** Unauthenticated visitors to the platform.

**Access:**
- Public marketing pages (`/about`, `/events` listings, `/contact`, `/legal`)
- The Chronicle — teaser previews only (first 200 words + CTA to join)
- Application form (`/apply`)

**Restrictions:**
- No access to Member Directory, Knowledge Base, Heritage Layer, or any deal-related modules
- Cannot RSVP to events
- Cannot message anyone
- Cannot see full member profiles

---

### 3.2 Applicant

**Who:** Someone who has submitted a membership application but has not yet been approved.

**Onboarding Flow:**
1. Submits application (`/apply/individual` or `/apply/organisation`)
2. Receives confirmation email
3. Admin reviews application (target: 72-hour SLA)
4. On approval: promoted to Standard Member, onboarding email sent
5. On rejection: rejection email with optional explanation

**Access during application review:**
- Read-only access to a holding area with: welcome content, The Accord's mission materials, one featured Chronicle article

**Data captured at application:**
- Full legal name
- Email (verified via OTP)
- Phone (optional, verified via OTP)
- Community self-identification: Iranian Diaspora / Jewish/Israeli Diaspora / Friend of The Accord
- Country of residence
- Professional background (free text + LinkedIn URL optional)
- How did you hear about us
- Brief statement: why do you want to join?
- LinkedIn / professional URL (optional but encouraged)
- Referral code (if referred by existing member)

---

### 3.3 Standard Member

**Who:** Verified member of The Cyrus Accord community. The baseline authenticated experience.

**Verification Requirement:**
- Email verified
- Application approved by admin
- Identity not yet KYC-verified (that unlocks Investor/Vendor tier)

**Access:**
- Full Member Directory (search, view profiles, send connection requests)
- Full Chronicle (all articles, categories, archive)
- Full Knowledge Base (read all documents, submit content for review)
- Heritage Layer (all content)
- Chapter Hub (view chapters, RSVP to events, view chapter members)
- Events (RSVP, virtual event access)
- Messaging (send/receive DMs with connected members)
- Public Bazaar browsing (can see listings, cannot transact without Vendor/Buyer upgrade)

**Cannot access:**
- Deal Room
- Syndicate Engine
- Bazaar transacting (buying/selling)
- Accord Capital content
- Admin tools
- Chronicle publishing (can submit for editorial review only)

**Profile completeness gates:**
- Incomplete profiles (< 60% complete) are shown a nudge banner and have reduced visibility in Directory search results

---

### 3.4 Contributor Member

**Who:** A Standard Member who has been granted elevated content rights — typically journalists, analysts, academics, think-tank fellows, or community leaders.

**Elevation:** Granted by Editorial Admin or Platform Admin. Not self-requested.

**Additional Access vs Standard Member:**
- Can publish Chronicle articles directly (bypassing editorial queue, or with lighter-touch review depending on admin config)
- Can upload and publish Knowledge Base documents without review queue
- Contributor badge displayed on profile and bylines
- Access to author analytics dashboard (views, shares, engagement on their content)

**Still Cannot:**
- Access Deal Room or Syndicate Engine (unless also granted Investor access)
- Sell on The Bazaar (unless also granted Vendor access)

---

### 3.5 Vendor Member

**Who:** A Standard Member who has been approved to sell on The Bazaar.

**Elevation Requirements:**
- Standard Member in good standing (no active warnings/bans)
- Completed KYC/KYB verification (identity or business registration)
- Accepted Bazaar Vendor Terms
- Admin approval of first listing (subsequent listings auto-live after initial approval, subject to moderation)

**Additional Access vs Standard Member:**
- Can create and manage Bazaar listings (products, services, partnership listings)
- Access to Vendor dashboard (orders, messages, analytics, revenue)
- Can receive payments via platform escrow
- Vendor badge on profile

**Payment & Financials:**
- Platform takes a commission on completed transactions (rate TBD, suggested 5–8%)
- Vendors set up payout account (Stripe Connect or equivalent) during onboarding
- Dispute resolution: standard Bazaar dispute workflow

---

### 3.6 Investor Member

**Who:** A verified member with confirmed accredited investor status or institutional backing, granted access to the Deal Room and Syndicate Engine.

**Elevation Requirements:**
- Standard Member in good standing
- KYC identity verification (Persona, Onfido or equivalent)
- Self-certified accredited investor declaration (jurisdiction-dependent; legal review required)
- Accepted Deal Room Terms & Conditions
- Admin approval

**Additional Access vs Standard Member:**
- Full Deal Room access: browse deals, sign NDAs electronically, access deal data rooms
- Syndicate Engine: view and apply to join syndicates
- Accord Capital deal flow (curated pipeline, visible only to Investor Members)
- Investment activity displayed on profile (opt-in: can show sectors invested in, not amounts)

**Cannot (without Lead Investor elevation):**
- Create syndicates
- Lead a deal on the platform

---

### 3.7 Lead Investor

**Who:** An Investor Member who has been approved to originate and lead syndicates on the platform. Typically HNWIs, family offices, or institutional players who bring deal flow to The Accord.

**Elevation:** By invitation or application, approved by Accord Capital Staff.

**Additional Access vs Investor Member:**
- Can create and configure a Syndicate (structure, terms, target raise, member cap)
- Can invite specific Investor Members to a Syndicate
- Can open Syndicate to apply (restricted to Investor Members)
- Full Syndicate Lead dashboard: member management, document upload, vote creation, co-invest tracking
- Lead Investor badge on profile (visible to all members)
- Access to Accord Capital co-investment workflows (if applicable)

---

### 3.8 Chapter Lead

**Who:** The designated community leader for a geographic chapter of The Cyrus Accord (e.g., "London Chapter," "New York Chapter," "Dubai Chapter").

**Elevation:** Appointed by Platform Admin. One Chapter Lead per chapter; can have Deputy Chapter Lead (same permissions).

**Access:**
- All Standard Member access
- Chapter admin dashboard for their chapter:
  - Create and manage chapter events
  - Post chapter announcements (appear in chapter page and chapter members' notification feeds)
  - View and message chapter members
  - Approve chapter membership (members can affiliate with a chapter; Chapter Lead approves)
  - View chapter analytics (member growth, event attendance, engagement)
- Chapter Lead badge on profile
- Early access to admin notifications relevant to their chapter

**Cannot:**
- Access other chapters' admin tools
- Access Deal Room or Syndicates (unless separately granted Investor Member access)
- Modify platform-level settings

---

### 3.9 Deal Manager (Accord Capital Staff)

**Who:** Internal staff member of Accord Capital responsible for managing the deal pipeline.

**Access:**
- All Investor Member access
- Full Deal Room admin:
  - Review and approve/reject deal submissions
  - Configure deal visibility and access controls
  - Manage NDA workflow
  - Upload and manage deal room documents
  - Message all parties in a deal
- Full Syndicate oversight:
  - View all syndicates (including private)
  - Pause or terminate a syndicate
  - Override syndicate settings
- Access to financial reporting for deal transactions
- Cannot access general member admin or Chronicle CMS

---

### 3.10 Operations Admin

**Who:** Internal staff responsible for member management, events, and chapter operations.

**Access:**
- All Standard Member access
- Member admin: view all member profiles, approve/reject applications, upgrade/downgrade member roles, issue warnings, suspend accounts
- Chapter admin: create/edit/delete chapters, assign Chapter Leads
- Events admin: create/edit/delete platform-wide events
- Reports queue: review and action abuse/content reports
- Read-only access to financial/billing data

---

### 3.11 Editorial Admin

**Who:** Internal staff responsible for content across The Chronicle and Knowledge Base.

**Access:**
- All Contributor Member access
- Chronicle CMS: create/edit/publish/unpublish/delete all articles
- Knowledge Base CMS: approve/reject submitted documents, edit, publish
- Manage Contributor Member status (grant/revoke)
- Manage categories, tags, and taxonomy
- Content analytics dashboard (all content, not just own)

---

### 3.12 Platform Admin

**Who:** Senior internal staff or technical administrators. Has near-full platform access.

**Access:**
- All role permissions combined (Operations Admin + Editorial Admin + Deal Manager)
- Platform configuration settings
- Billing and subscription management
- API key management
- Feature flag controls
- Cannot: execute financial transfers (segregation of duties)

---

### 3.13 Super Admin

**Who:** Founders / lead technical staff only. Full platform access including financial controls and destructive operations (account deletion, data export).

**Access:** Unrestricted.

**Controls:**
- 2FA mandatory (hardware key strongly recommended)
- All Super Admin actions logged to immutable audit trail
- Maximum 3 Super Admin accounts

---

## 4. Permission Matrix

### 4.1 Content Permissions

| Action | Guest | Std Member | Contributor | Vendor | Investor | Chapter Lead | Ops Admin | Editorial Admin | Deal Manager | Platform Admin | Super Admin |
|--------|-------|-----------|-------------|--------|----------|--------------|-----------|-----------------|--------------|----------------|-------------|
| Read public Chronicle | ✅ (preview) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Read full Chronicle | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit Chronicle article | — | ✅ (queue) | ✅ (direct) | ✅ (queue) | ✅ (queue) | ✅ (queue) | — | ✅ | — | ✅ | ✅ |
| Publish Chronicle article | — | — | ✅* | — | — | — | — | ✅ | — | ✅ | ✅ |
| Read Knowledge Base | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit Knowledge doc | — | ✅ (queue) | ✅ (direct) | ✅ (queue) | ✅ (queue) | ✅ (queue) | — | ✅ | — | ✅ | ✅ |
| Publish Knowledge doc | — | — | ✅* | — | — | — | — | ✅ | — | ✅ | ✅ |
| Read Heritage Layer | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit Heritage content | — | — | — | — | — | — | — | — | — | ✅ | ✅ |

*Subject to admin configuration (direct publish may require editorial review toggle)

### 4.2 Community Permissions

| Action | Guest | Std Member | Contributor | Vendor | Investor | Chapter Lead | Ops Admin |
|--------|-------|-----------|-------------|--------|----------|--------------|-----------|
| View Directory | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View member profile (public fields) | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| View member profile (private fields) | — | Connected only | Connected only | Connected only | Connected only | Chapter members | ✅ |
| Send connection request | — | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Send DM | — | Connected only | Connected only | Connected only | Connected only | Chapter members | ✅ |
| View chapter | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Affiliate with chapter | — | ✅ | ✅ | ✅ | ✅ | — | — |
| RSVP to events | — | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Create events | — | — | — | — | — | ✅ (own chapter) | ✅ |

### 4.3 Deal Permissions

| Action | Std Member | Investor | Lead Investor | Deal Manager | Platform Admin | Super Admin |
|--------|-----------|----------|---------------|--------------|----------------|-------------|
| View Bazaar listings | ✅ (browse only) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Buy on Bazaar | — | ✅ | ✅ | — | — | — |
| Sell on Bazaar | — | — | — | — | — | ✅ |
| Sell on Bazaar (Vendor) | — | Vendor+Investor | Vendor+Lead | — | ✅ | ✅ |
| View Deal Room (browse) | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| Access deal data room (post-NDA) | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit a deal | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| Approve deals | — | — | — | ✅ | ✅ | ✅ |
| View Syndicate listings | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| Join a Syndicate | — | ✅ (by invite/apply) | ✅ | ✅ | — | ✅ |
| Create a Syndicate | — | — | ✅ | ✅ | ✅ | ✅ |
| Override Syndicate | — | — | — | ✅ | ✅ | ✅ |

---

## 5. Membership Tiers & Billing

Roles are linked to membership tiers. The billing model is:

| Tier | Annual Fee (suggested) | Roles Enabled | Notes |
|------|------------------------|---------------|-------|
| **Community Member** | Free or £99/yr | Standard Member | Entry level; covers basic community access |
| **Full Member** | £499/yr | Standard + Contributor (if granted) + Vendor (if KYC complete) | Core active member |
| **Investor Member** | £1,499/yr | All above + Investor | Includes Deal Room access; KYC required |
| **Lead Investor** | £4,999/yr or bespoke | All above + Lead Investor | By invitation; may be waived for major LPs |
| **Institutional / Corporate** | £9,999/yr+ | Custom | Organisation accounts; multiple seats |
| **Chapter Lead** | Complimentary Full Member | Chapter Lead role | Recognition, not commercial |
| **Staff / Admin** | Internal | All applicable roles | No charge |
| **Honorary Member** | Complimentary | Standard Member | Founding cohort, advisors, supporters |

**Notes:**
- Pricing to be validated in go-to-market phase; these are indicative
- Founding member cohort (first 500) should receive lifetime discounted rate as incentive
- Organisation accounts include a defined number of seats (e.g., 3 seats for base corporate tier)
- Billing via Stripe; VAT handling per jurisdiction

---

## 6. Verification & Identity Architecture

### 6.1 Verification Levels

| Level | Method | Required For | Provider |
|-------|--------|--------------|----------|
| **Email Verified** | OTP to email | All members | Platform (Resend / SendGrid) |
| **Phone Verified** | OTP to SMS | Optional baseline; required for Vendor/Investor | Twilio |
| **Admin Reviewed** | Human application review | Standard Member | Internal ops |
| **KYC (Individual)** | Government ID + selfie | Investor Member, Vendor Member | Persona / Onfido |
| **KYB (Business)** | Company registration docs | Institutional / Vendor (business) | Persona / Onfido |
| **Accredited Investor** | Self-cert + supporting docs | Investor Member | Legal-reviewed workflow |
| **LinkedIn Linked** | OAuth link | Optional; boosts trust score | LinkedIn OAuth |

### 6.2 Trust Score

A non-displayed internal trust score informs admin prioritisation of applications and flags unusual activity. Components:

- Email verified: +20
- Phone verified: +15
- Referred by existing member in good standing: +25
- LinkedIn linked and matches application: +20
- KYC complete: +30
- Application quality score (admin-rated 1–5): up to +50
- Active member (last login within 30 days): +10
- Previous warning: -30
- Account suspension history: -100

Trust score is not gamified or shown to members. It is an internal moderation signal.

### 6.3 Privacy Controls (Member-Controlled)

Members control profile visibility at field level:

| Field | Visibility Options |
|-------|--------------------|
| Full name | All members / Connections only / Hidden |
| Profile photo | All members / Connections only |
| Location (city) | All members / Connections only / Hidden |
| Industry | All members / Connections only |
| Bio / Summary | All members / Connections only |
| LinkedIn URL | All members / Connections only / Hidden |
| Email address | Never shown publicly / Connections only |
| Phone | Never shown publicly |
| Investment focus | All members / Connections only / Hidden |
| Deals participated in | All members (sector only) / Connections only / Hidden |

---

## 7. Onboarding Flows by Role

### 7.1 Standard Member Onboarding

```
1. Apply → Approval email
2. Set password (magic link)
3. Guided profile builder (name, photo, bio, expertise, location — target: 5 mins)
4. Community self-identification (Iranian diaspora / Jewish/Israeli diaspora / Friend of The Accord)
5. Choose primary chapter (optional)
6. Choose notification preferences
7. Welcome screen: 3 recommended actions (connect with 3 members, read 1 Chronicle article, explore Heritage)
8. Land on /home dashboard
```

### 7.2 Investor Member Upgrade Onboarding

```
1. Click "Upgrade to Investor" (from /settings/billing or prompted by Deal Room access attempt)
2. KYC flow (embedded Persona widget — document upload + selfie)
3. Accredited investor self-certification form (legally reviewed template)
4. Deal Room Terms acceptance (e-signature)
5. Payment upgrade (Stripe)
6. Confirmation email
7. Access unlocked (typically instant post-KYC; admin review for edge cases)
```

### 7.3 Vendor Member Upgrade Onboarding

```
1. Click "Start Selling on The Bazaar"
2. Choose: Individual seller / Business seller
3. KYC / KYB flow (Persona)
4. Bazaar Vendor Terms acceptance
5. Connect payout account (Stripe Connect)
6. Payment upgrade (if separate from current tier)
7. Create first listing (guided)
8. First listing submitted for admin review
9. Confirmation: listing live within 24 hours
```

---

## 8. Role Transition & Escalation Paths

```
Guest
  └──[Apply]──► Applicant
                  └──[Admin Approves]──► Standard Member
                                          ├──[Editorial Grant]──► Contributor Member
                                          ├──[KYC + KYB + Terms]──► Vendor Member
                                          ├──[KYC + Accredited + Terms + Pay]──► Investor Member
                                          │                                         └──[Accord Capital Invite]──► Lead Investor
                                          └──[Platform Admin Appoints]──► Chapter Lead

Standard Member (or above)
  └──[Platform Admin]──► Operations Admin
  └──[Platform Admin]──► Editorial Admin
  └──[Accord Capital MD]──► Deal Manager
  └──[Founders]──► Platform Admin / Super Admin
```

---

## 9. Suspension & Moderation States

| State | Trigger | Effect | Resolution |
|-------|---------|--------|------------|
| **Warning** | First violation of community standards | Warning badge in admin view; member notified | Expires after 90 days if no further violations |
| **Content Restricted** | Repeated violations | Cannot post/submit content; can still read | Admin review required to lift |
| **Messaging Restricted** | Messaging abuse report | Cannot send DMs | Admin review required to lift |
| **Suspended** | Serious violation or non-payment | Login disabled; 30-day data retention notice | Admin decision; appeal process available |
| **Permanently Banned** | Fraud, illegal activity, severe breach | Account terminated; data processed per GDPR deletion request | Irreversible; Super Admin only |
| **Payment Lapsed** | Subscription expired | Downgraded to Community tier features until renewed | Automatic upgrade on payment |

---

## 10. Audit & Compliance

- All role grants and revocations logged with timestamp, granting admin ID, and reason
- All Deal Room access events logged (browse, NDA sign, document view)
- All admin actions logged to immutable audit trail
- GDPR compliance: members can request data export and deletion; deletion cascades per module retention rules
- Data residency: EU-primary (London + Frankfurt); to be reviewed for US chapter launch
- KYC data stored by Persona / Onfido, not in-platform; platform stores only verification status and reference ID
