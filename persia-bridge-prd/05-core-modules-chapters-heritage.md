# Part 05 — Core Modules: Chapter Hub, Heritage Layer

**Platform:** Persia Bridge | **Brand:** The Cyrus Accord
**Version:** 1.0 | **Date:** March 2026

---

## 1. Chapter Hub

### 1.1 Purpose

The Chapter Hub is the geographic community layer of Persia Bridge. Chapters are city-based nodes of The Cyrus Accord — each with its own community, events programme, and leadership. The Chapter Hub gives members a local identity within the global network, and gives Chapter Leads the tools to build and manage their community.

Founding chapters: **London**, **Tel Aviv**, **Dubai**.
Planned: Los Angeles, Toronto, New York, Paris, Stockholm, Frankfurt.

---

### 1.2 Chapter Profile

Each chapter has a public-facing page visible to all members with:

| Field | Notes |
|-------|-------|
| Chapter name | e.g., "London Chapter" |
| City / Country | |
| Chapter Lead name + profile link | |
| Deputy Chapter Lead (if applicable) | |
| Cover image | City or venue photography |
| Description | About the chapter, its focus and community |
| Member count | Total affiliated members |
| Upcoming events | Next 3 events (with RSVP) |
| Past event highlights | Gallery / summary cards |
| Chapter announcements feed | Latest 5 announcements |
| Primary venue / base | e.g., "Members' Club, Mayfair, London" |
| Contact | Chapter email (routing to Chapter Lead) |

---

### 1.3 Chapter Membership & Affiliation

- Members can affiliate with **one primary chapter** (the chapter in their city / region)
- Members can join **multiple chapters** as non-primary affiliates (e.g., a London-based member who attends events in Dubai)
- Chapter affiliation is visible on member profile (city badge)
- Chapter Lead approves primary affiliations (or can set to auto-approve)
- Affiliation benefits: chapter event notifications, chapter feed on dashboard, listed in chapter member directory

---

### 1.4 Chapter Events

#### Event Types

| Type | Description |
|------|-------------|
| **Member Dinner** | Intimate monthly/quarterly dinner, typically 20–40 members |
| **Syndicate Summit** | Quarterly: deal showcases, syndicate updates, co-investor networking |
| **Cyrus Lecture** | Annual flagship keynote: major speaker, broader audience |
| **Heritage Celebration** | Nowruz, Passover, cultural/community occasions |
| **Working Group** | Small-group sessions on specific sectors or topics |
| **Virtual Event** | Online-only event accessible to all chapters |

#### Event Fields

| Field | Notes |
|-------|-------|
| Title | |
| Type | From taxonomy above |
| Chapter | |
| Date & Time | With timezone |
| End time | |
| Location | Venue name + address (or "Online") |
| Virtual link | (if applicable — hidden until RSVP confirmed) |
| Description | Rich text |
| Hero image | |
| Capacity | Max attendees (for RSVP cutoff) |
| Access level | All members / Chapter members only / Investor Members / Invite only |
| RSVP deadline | |
| Price | Free / Paid (Stripe) |
| Dress code | Optional |
| Agenda | Optional structured agenda |
| Speakers | Linked member profiles + external speakers |
| Sponsors | Optional |

#### RSVP Flow

```
Member browses events → Clicks "RSVP" / "Register"
  ↓
If paid: Stripe checkout
  ↓
Confirmation email with calendar invite (.ics)
  ↓
Reminder email 24 hours before
  ↓
[For virtual events]: reminder with virtual link 1 hour before
  ↓
Post-event: feedback form (optional, admin-configurable)
```

**Waitlist:** When event is at capacity, member is offered waitlist position. On cancellation, next on waitlist is notified.

**Guest policy:** Members can bring guests (non-members) at Chapter Lead's discretion. Guest details captured for security and future membership outreach.

---

### 1.5 Chapter Announcements

- Chapter Leads post announcements from their chapter admin dashboard
- Announcements appear in:
  - Chapter page feed
  - Home dashboard feed for chapter-affiliated members
  - In-app notification (optional per member's preferences)
  - Optional: email to chapter members

**Types:** General update, event announcement, member spotlight, deal alert, community news.

---

### 1.6 Chapter Admin Dashboard (Chapter Lead View)

| Section | Capability |
|---------|-----------|
| **Dashboard** | Member count, recent RSVPs, upcoming events, engagement stats |
| **Members** | View all chapter-affiliated members; approve/decline affiliation requests; message chapter members |
| **Events** | Create/edit/delete events; manage RSVPs; export attendee list; manage waitlist |
| **Announcements** | Create, schedule, and publish chapter announcements |
| **Analytics** | Monthly member growth, event attendance trends, top content engagement from chapter members |
| **Settings** | Chapter description, cover image, primary venue, affiliation approval mode (manual/auto) |

---

### 1.7 Global Chapter Map

Accessible at `/chapters/map`:
- Interactive map (Mapbox or Google Maps) with chapter pins
- Click pin: chapter summary card with member count, upcoming event, and "View Chapter" link
- List view option
- "Your Chapter" highlighted
- "Chapters near me" (geolocation opt-in)

---

### 1.8 Inter-Chapter Features

- **Global events** — flagged as "All Chapters" events; visible and RSVP-able from any chapter
- **Chapter leader coordination** — private group between all Chapter Leads + Platform Admin (in /messages group thread)
- **Global Council** — in Full Build: a governance body of Chapter Chairs with voting rights on platform decisions (referenced in pitch deck as "Global Council of Chapter Chairs")

---

## 2. Heritage Layer

### 2.1 Purpose

The Heritage Layer is the cultural and historical foundation of Persia Bridge. It is not decorative — it is strategically central to the platform's identity, legitimacy, and community cohesion. The platform's architecture is built on the 539 BC covenant between Persia and Israel (the Cyrus Declaration), and the Heritage Layer makes that covenant alive and tangible for members.

The Heritage Layer serves three functions:
1. **Onboarding** — new members understand *why* this community exists through shared history
2. **Bonding** — Persian and Jewish/Israeli members find common cultural ground
3. **Legitimacy** — academic and historical grounding strengthens The Accord's credibility with institutions and investors

---

### 2.2 Historical Timeline

**Route:** `/heritage/timeline`

An interactive, visual timeline spanning from 539 BC to the present:

| Era | Key Events |
|-----|-----------|
| **539 BC** | The Cyrus Declaration — world's first human rights charter; freeing of the Jewish people from Babylon |
| **539–330 BC** | Achaemenid Empire — Persian-Jewish partnership; rebuilding of Jerusalem Temple; Esther, Ezra, Nehemiah |
| **330 BC–224 AD** | Hellenistic / Parthian period |
| **224–651 AD** | Sassanid Empire — Jewish academies thrive in Babylon/Persia |
| **651–1500s** | Islamic era — Jewish community in Persia; Persian civilisation and trade |
| **1800s–1900s** | Iranian modernisation; Jewish community flourishes in Tehran |
| **Pre-1979** | Shah era — Iran-Israel partnership; 80,000+ Jews in Tehran; bilateral trade and military ties |
| **1979** | Islamic Revolution — severance of Iran-Israel relations |
| **1979–2024** | Exile era — diaspora builds, networks, prepares |
| **2020** | Abraham Accords — Gulf normalisation with Israel |
| **2024+** | The moment: Cyrus Accord founded |

**Timeline UX:**
- Horizontal scroll (desktop) or vertical swipe (mobile)
- Each event: title, date, 150-word description, archival image (where available), category tag
- Expandable for longer-form historical notes
- Events are categorised: Political, Cultural, Religious, Commercial, Diplomatic
- Filter by category or community (Persian history / Jewish history / Shared history)

---

### 2.3 Cultural Guides

**Route:** `/heritage/cultures`

Two primary guides, with a third planned:

#### Persian Cultural Guide
- **Overview:** Iran's civilisation, geography, language, religion, and diaspora identity
- **Nowruz:** Persian New Year — traditions, meaning, community celebration
- **Persian cuisine:** Food as cultural diplomacy
- **Art & Architecture:** Persian miniature, carpet weaving, poetry (Hafez, Rumi, Ferdowsi)
- **Business culture:** How to build relationships with Iranians; etiquette, trust-building, gift-giving norms
- **Diaspora identity:** The particular psychology of exile; generational differences; the longing for Iran

#### Jewish / Israeli Cultural Guide
- **Overview:** Jewish history, diaspora, and modern Israeli society
- **Passover and Purim:** The Persian connection to Jewish festivals
- **Israeli startup culture:** How the "startup nation" dynamic shapes Israeli business behaviour
- **Business culture:** Israeli directness, speed, network orientation; how to work with Israeli partners
- **Sephardic and Mizrahi communities:** Persian Jewish heritage — their unique position bridging both cultures
- **Abraham Accords context:** What the Accords mean for the region and for Iran-Israel normalisation

#### Gulf / MENA Guide (Phase 2)
- UAE business culture, DIFC ecosystem, Gulf family office networks

---

### 2.4 Language Resources

**Route:** `/heritage/language`

#### Farsi (Persian) Business Starter
- 50 essential Farsi business phrases (with audio pronunciation where possible)
- Farsi script guide: reading and writing basics for non-native speakers
- Numbers, currency, dates in Farsi
- Common Iranian business terms and their cultural context
- Key phrases for meetings, negotiations, greetings

#### Hebrew Business Starter
- 50 essential Hebrew business phrases
- Hebrew script guide
- Key phrases for meetings and negotiations
- Israeli business slang and startup culture vocabulary

**Format:** Cards-based UI (flip cards: English front, translation + phonetic back + audio)

---

### 2.5 Heritage Archive

**Route:** `/heritage/archive`

A curated collection of historical documents and media:

| Item Type | Examples |
|-----------|----------|
| Historical documents | Scanned text of the Cyrus Cylinder (translation); Esther scroll excerpts; pre-1979 Iran-Israel treaty summaries |
| Photography | Historical photos of Jewish community in Tehran; Nowruz celebrations; Persian architectural heritage |
| Video | Documentaries, oral history interviews with diaspora elders (licensed or commissioned) |
| Maps | Historical maps of the Persian Empire, trade routes |
| Poetry | Persian and Hebrew poetry with translations (Hafez, Rumi, selected Psalms) |

**Curation:** All archive content reviewed by Achaemenid Institute before publication. Sources attributed. Copyright compliance mandatory.

---

### 2.6 Heritage Layer CMS

The Heritage Layer has its own CMS area in admin (`/admin/heritage`):

| Section | Capability |
|---------|-----------|
| Timeline entries | Create/edit/delete/publish timeline events; upload images; set era and categories |
| Cultural guides | Edit guide content (rich text); manage sections; update images |
| Language resources | Add/edit phrase cards; upload audio; manage categories |
| Archive items | Upload/describe/tag archive items; manage licensing notes |

**Content ownership:** Achaemenid Institute is the publishing authority for Heritage Layer content. Platform Admin provides CMS access.

---

### 2.7 Heritage Integration Across Platform

The Heritage Layer is not isolated — it weaves through the full platform:

- **Onboarding flow:** New members are shown a 2-minute Heritage micro-journey (3 key moments: 539 BC, pre-1979, today)
- **Chronicle:** Heritage-tagged articles cross-link to relevant Heritage Layer content
- **Chapter events:** Heritage celebration events (Nowruz, Passover) are surfaced prominently in the Chapter Hub
- **Member profiles:** Members optionally add heritage tags ("Persian Jewish", "Iranian-American", "Sephardic") that surface in Directory
- **Seasonal moments:** Platform highlights Nowruz (March), Passover (April), Yom Kippur (September/October) with in-platform moments (banner, featured content)
