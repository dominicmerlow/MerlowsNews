# Part 07 — Data Models

**Platform:** Persia Bridge | **Brand:** The Cyrus Accord
**Version:** 1.0 | **Date:** March 2026

---

## 1. Overview

This section defines the core data models for Persia Bridge, expressed as Prisma schema entities. These are the canonical models — implementation may extend with indexes, computed fields, and soft-delete patterns as needed.

All models include:
- `id`: UUID (CUID2 via Prisma)
- `createdAt` / `updatedAt`: timestamps
- Soft delete where noted (`deletedAt`)

---

## 2. Core Schema

### 2.1 Users & Authentication

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  phone         String?
  phoneVerified Boolean   @default(false)
  passwordHash  String?   // null if magic-link-only
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime? // soft delete

  // Relations
  member        Member?
  accounts      Account[]  // OAuth accounts (NextAuth)
  sessions      Session[]  // NextAuth sessions
  auditLogs     AuditLog[] @relation("actor")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String  // "oauth" | "email" | "credentials"
  provider          String  // "google" | "linkedin" | "email"
  providerAccountId String
  accessToken       String?
  refreshToken      String?
  expiresAt         Int?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}
```

---

### 2.2 Members & Profiles

```prisma
enum MembershipTier {
  COMMUNITY
  FULL
  INVESTOR
  LEAD_INVESTOR
  INSTITUTIONAL
  HONORARY
}

enum CommunityIdentity {
  IRANIAN_DIASPORA
  JEWISH_ISRAELI_DIASPORA
  FRIEND_OF_THE_ACCORD
}

enum MemberRole {
  MEMBER
  CONTRIBUTOR
  VENDOR
  INVESTOR
  LEAD_INVESTOR
  CHAPTER_LEAD
  CHAPTER_DEPUTY
  DEAL_MANAGER
  OPS_ADMIN
  EDITORIAL_ADMIN
  PLATFORM_ADMIN
  SUPER_ADMIN
}

enum VerificationStatus {
  PENDING
  VERIFIED
  REJECTED
}

model Member {
  id                  String            @id @default(cuid())
  userId              String            @unique
  user                User              @relation(fields: [userId], references: [id])

  // Identity
  fullName            String
  displayName         String?
  slug                String?           @unique  // vanity URL: /directory/dariush-tehrani
  communityIdentity   CommunityIdentity

  // Profile
  headline            String?           @db.VarChar(120)
  bio                 String?           @db.Text
  profilePhotoUrl     String?
  websiteUrl          String?
  linkedInUrl         String?

  // Location
  countryCode         String?           // ISO 3166-1 alpha-2
  city                String?

  // Membership
  tier                MembershipTier    @default(COMMUNITY)
  roles               MemberRole[]      @default([MEMBER])
  memberSince         DateTime          @default(now())

  // Status
  applicationStatus   ApplicationStatus @default(PENDING)
  suspensionStatus    SuspensionStatus?

  // Verification
  emailVerified       Boolean           @default(false)
  phoneVerified       Boolean           @default(false)
  kycStatus           VerificationStatus @default(PENDING)
  kycReferenceId      String?           // Persona reference; doc stored at Persona
  kybStatus           VerificationStatus @default(PENDING)
  kybReferenceId      String?
  accreditedInvestor  Boolean           @default(false)
  accreditedVerifiedAt DateTime?
  linkedInVerified    Boolean           @default(false)

  // Trust
  trustScore          Int               @default(0)
  referredById        String?
  referredBy          Member?           @relation("Referrals", fields: [referredById], references: [id])
  referrals           Member[]          @relation("Referrals")

  // Privacy settings
  privacySettings     Json              @default("{}")

  // Metadata
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt
  deletedAt           DateTime?
  lastActiveAt        DateTime?

  // Relations
  chapterAffiliations ChapterMember[]
  connections         Connection[]      @relation("ConnectionFrom")
  connectionsTo       Connection[]      @relation("ConnectionTo")
  messages            Message[]
  expertiseTags       MemberExpertise[]
  industries          MemberIndustry[]
  languages           MemberLanguage[]
  organizationMembers OrganizationMember[]
  bazaarListings      BazaarListing[]
  dealNDAs            DealNDA[]
  syndicateMemberships SyndicateMember[]
  chronicleAuthors    ChronicleArticleAuthor[]
  knowledgeDocs       KnowledgeDocAuthor[]
  eventRsvps          EventRsvp[]
  notifications       Notification[]
  auditLogs           AuditLog[]        @relation("subject")

  @@index([slug])
  @@index([tier])
  @@index([communityIdentity])
  @@index([countryCode])
}

enum ApplicationStatus {
  PENDING
  APPROVED
  REJECTED
  WITHDRAWN
}

enum SuspensionStatus {
  WARNING
  CONTENT_RESTRICTED
  MESSAGING_RESTRICTED
  SUSPENDED
  PERMANENTLY_BANNED
}

model MemberExpertise {
  id         String   @id @default(cuid())
  memberId   String
  member     Member   @relation(fields: [memberId], references: [id], onDelete: Cascade)
  tagId      String
  tag        Tag      @relation(fields: [tagId], references: [id])
  @@unique([memberId, tagId])
}

model Connection {
  id          String           @id @default(cuid())
  fromId      String
  from        Member           @relation("ConnectionFrom", fields: [fromId], references: [id])
  toId        String
  to          Member           @relation("ConnectionTo", fields: [toId], references: [id])
  status      ConnectionStatus @default(PENDING)
  message     String?
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  @@unique([fromId, toId])
}

enum ConnectionStatus {
  PENDING
  CONNECTED
  IGNORED
  BLOCKED
}
```

---

### 2.3 Organisations

```prisma
enum OrgType {
  COMPANY
  FAMILY_OFFICE
  FUND
  NGO
  GOVERNMENT_BODY
  OTHER
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  type        OrgType
  description String?  @db.Text
  websiteUrl  String?
  logoUrl     String?
  countryCode String?
  kybStatus   VerificationStatus @default(PENDING)
  kybReferenceId String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?

  members     OrganizationMember[]
  sectors     OrganizationSector[]
}

model OrganizationMember {
  id             String       @id @default(cuid())
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  memberId       String
  member         Member       @relation(fields: [memberId], references: [id])
  role           String       @default("member") // "admin" | "member"
  @@unique([organizationId, memberId])
}
```

---

### 2.4 Chapters & Events

```prisma
model Chapter {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  city        String
  countryCode String
  description String?  @db.Text
  coverImageUrl String?
  venueDescription String?
  contactEmail String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  members     ChapterMember[]
  events      Event[]
  announcements ChapterAnnouncement[]
}

model ChapterMember {
  id        String              @id @default(cuid())
  chapterId String
  chapter   Chapter             @relation(fields: [chapterId], references: [id])
  memberId  String
  member    Member              @relation(fields: [memberId], references: [id])
  isPrimary Boolean             @default(false)
  status    ChapterMemberStatus @default(PENDING)
  role      ChapterMemberRole   @default(MEMBER)
  joinedAt  DateTime?
  createdAt DateTime            @default(now())
  @@unique([chapterId, memberId])
}

enum ChapterMemberStatus {
  PENDING
  APPROVED
  REJECTED
}

enum ChapterMemberRole {
  MEMBER
  DEPUTY_LEAD
  LEAD
}

model Event {
  id          String    @id @default(cuid())
  chapterId   String?
  chapter     Chapter?  @relation(fields: [chapterId], references: [id])
  title       String
  type        EventType
  description String?   @db.Text
  heroImageUrl String?
  location    String?
  virtualUrl  String?   // hidden until RSVP confirmed
  startsAt    DateTime
  endsAt      DateTime?
  timezone    String    @default("UTC")
  capacity    Int?
  price       Int       @default(0) // pence/cents
  currency    String    @default("GBP")
  accessLevel EventAccessLevel @default(ALL_MEMBERS)
  rsvpDeadline DateTime?
  dresscode   String?
  agenda      Json?
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  deletedAt   DateTime?

  rsvps       EventRsvp[]
  speakers    EventSpeaker[]
}

enum EventType {
  MEMBER_DINNER
  SYNDICATE_SUMMIT
  CYRUS_LECTURE
  HERITAGE_CELEBRATION
  WORKING_GROUP
  VIRTUAL_EVENT
  OTHER
}

enum EventAccessLevel {
  ALL_MEMBERS
  CHAPTER_ONLY
  INVESTOR_ONLY
  INVITE_ONLY
}

model EventRsvp {
  id        String     @id @default(cuid())
  eventId   String
  event     Event      @relation(fields: [eventId], references: [id])
  memberId  String
  member    Member     @relation(fields: [memberId], references: [id])
  status    RsvpStatus @default(CONFIRMED)
  isWaitlisted Boolean @default(false)
  paidAt    DateTime?
  stripePaymentId String?
  createdAt DateTime   @default(now())
  @@unique([eventId, memberId])
}

enum RsvpStatus {
  CONFIRMED
  CANCELLED
  ATTENDED
}
```

---

### 2.5 The Bazaar

```prisma
enum ListingType {
  PRODUCT_EXPORT
  PRODUCT_IMPORT
  SERVICE_OFFER
  SERVICE_SOUGHT
  PARTNERSHIP
  TENDER_RFP
}

enum ListingStatus {
  DRAFT
  PENDING_REVIEW
  LIVE
  EXPIRED
  CLOSED
  REJECTED
  REMOVED
}

model BazaarListing {
  id                 String        @id @default(cuid())
  sellerId           String
  seller             Member        @relation(fields: [sellerId], references: [id])
  title              String        @db.VarChar(80)
  type               ListingType
  categoryId         String
  category           Category      @relation(fields: [categoryId], references: [id])
  description        String        @db.Text
  iranRelevance      String        @db.Text
  countryCode        String
  priceMin           Int?
  priceMax           Int?
  currency           String?
  contactPreference  String        @default("platform_dm")
  status             ListingStatus @default(DRAFT)
  expiresAt          DateTime
  rejectionReason    String?
  hsCode             String?       // product only
  minOrderQuantity   Int?          // product only
  incoterms          String?       // product only
  engagementType     String?       // service only
  partnershipStructure String?     // partnership only
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt
  deletedAt          DateTime?

  tags               BazaarListingTag[]
  images             BazaarListingImage[]
  enquiries          BazaarEnquiry[]

  @@index([status])
  @@index([type])
  @@index([categoryId])
  @@index([countryCode])
}

model BazaarEnquiry {
  id        String   @id @default(cuid())
  listingId String
  listing   BazaarListing @relation(fields: [listingId], references: [id])
  buyerId   String
  message   String   @db.Text
  status    String   @default("pending") // pending | accepted | declined
  createdAt DateTime @default(now())
  @@unique([listingId, buyerId])
}
```

---

### 2.6 Deal Room

```prisma
enum DealType {
  EQUITY
  REAL_ESTATE
  INFRASTRUCTURE
  TRADE_FINANCE
  VENTURE
  SOCIAL_IMPACT
}

enum DealStatus {
  DRAFT
  UNDER_REVIEW
  OPEN
  IN_SYNDICATION
  CLOSED_FUNDED
  CLOSED_UNFUNDED
  WITHDRAWN
}

model Deal {
  id               String     @id @default(cuid())
  title            String
  type             DealType
  sectorId         String
  sector           Tag        @relation(fields: [sectorId], references: [id])
  countryCode      String
  targetRaiseMin   Int?       // pence
  targetRaiseMax   Int?
  minTicket        Int?
  currency         String     @default("GBP")
  summary          String     @db.Text      // teaser — visible pre-NDA
  status           DealStatus @default(DRAFT)
  openDate         DateTime?
  closeDate        DateTime?
  submittedById    String
  leadInvestorId   String?
  isAccordCapital  Boolean    @default(false)
  syndicateId      String?    @unique
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
  deletedAt        DateTime?

  ndas             DealNDA[]
  documents        DealDocument[]
  indicators       DealIndicatorOfInterest[]
  syndicate        Syndicate? @relation(fields: [syndicateId], references: [id])

  @@index([status])
  @@index([type])
}

model DealNDA {
  id           String   @id @default(cuid())
  dealId       String
  deal         Deal     @relation(fields: [dealId], references: [id])
  memberId     String
  member       Member   @relation(fields: [memberId], references: [id])
  signedAt     DateTime
  ipAddress    String?
  signatureRef String?  // Docuseal reference
  revokedAt    DateTime?
  createdAt    DateTime @default(now())
  @@unique([dealId, memberId])
}

model DealDocument {
  id           String   @id @default(cuid())
  dealId       String
  deal         Deal     @relation(fields: [dealId], references: [id])
  title        String
  description  String?
  fileUrl      String   // signed URL base path (actual URL generated on-demand)
  fileSize     Int?
  mimeType     String?
  accessTier   Int      @default(2) // 1=all NDA signers, 2=post-NDA, 3=committed only
  downloadable Boolean  @default(false)
  uploadedById String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  deletedAt    DateTime?

  accessLogs   DealDocumentAccess[]
}

model DealDocumentAccess {
  id         String   @id @default(cuid())
  documentId String
  document   DealDocument @relation(fields: [documentId], references: [id])
  memberId   String
  action     String   // "view" | "download"
  ipAddress  String?
  createdAt  DateTime @default(now())
}

model DealIndicatorOfInterest {
  id           String   @id @default(cuid())
  dealId       String
  deal         Deal     @relation(fields: [dealId], references: [id])
  memberId     String
  isBinding    Boolean  @default(false)
  amount       Int?     // pence
  currency     String   @default("GBP")
  notes        String?
  status       String   @default("submitted") // submitted | acknowledged | accepted | declined
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@unique([dealId, memberId])
}
```

---

### 2.7 Syndicates

```prisma
enum SyndicateType {
  COMMERCIAL
  INFRASTRUCTURE
  TRADE
  SOCIAL_IMPACT
  VENTURE
}

enum SyndicateStatus {
  DRAFT
  OPEN
  IN_PROGRESS
  CLOSED_FUNDED
  WOUND_DOWN
}

model Syndicate {
  id              String          @id @default(cuid())
  name            String
  type            SyndicateType
  sectorId        String
  countryCode     String
  targetRaise     Int?
  minTicket       Int?
  currency        String          @default("GBP")
  memberCap       Int?
  summary         String          @db.Text
  status          SyndicateStatus @default(DRAFT)
  openDate        DateTime?
  closeDate       DateTime?
  accessMode      String          @default("open") // "open" | "invite_only" | "restricted"
  createdById     String
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  deletedAt       DateTime?

  deal            Deal?
  members         SyndicateMember[]
  documents       SyndicateDocument[]
  discussions     SyndicateDiscussionPost[]
  votes           SyndicateVote[]

  @@index([status])
}

model SyndicateMember {
  id                String              @id @default(cuid())
  syndicateId       String
  syndicate         Syndicate           @relation(fields: [syndicateId], references: [id])
  memberId          String
  member            Member              @relation(fields: [memberId], references: [id])
  role              SyndicateMemberRole @default(PARTICIPANT)
  ioi               Int?                // provisional amount in pence
  commitment        Int?                // binding commitment in pence
  commitmentSignedAt DateTime?
  invitedAt         DateTime?
  joinedAt          DateTime?
  removedAt         DateTime?
  createdAt         DateTime            @default(now())
  @@unique([syndicateId, memberId])
}

enum SyndicateMemberRole {
  LEAD
  CO_LEAD
  PARTICIPANT
}

model SyndicateVote {
  id          String       @id @default(cuid())
  syndicateId String
  syndicate   Syndicate    @relation(fields: [syndicateId], references: [id])
  question    String
  type        String       @default("simple_majority") // "simple_majority" | "supermajority"
  opensAt     DateTime
  closesAt    DateTime
  result      String?      // stored after close
  createdAt   DateTime     @default(now())

  responses   SyndicateVoteResponse[]
}

model SyndicateVoteResponse {
  id      String        @id @default(cuid())
  voteId  String
  vote    SyndicateVote @relation(fields: [voteId], references: [id])
  memberId String
  choice  String        // "yes" | "no" | "abstain"
  createdAt DateTime    @default(now())
  @@unique([voteId, memberId])
}
```

---

### 2.8 Chronicle & Knowledge Base

```prisma
enum ArticleStatus {
  DRAFT
  IN_REVIEW
  APPROVED
  PUBLISHED
  UNPUBLISHED
  ARCHIVED
}

enum ArticleType {
  ANALYSIS
  OP_ED
  MARKET_INTELLIGENCE
  INTERVIEW
  SYNDICATE_ANNOUNCEMENT
  CHAPTER_COVERAGE
  INSTITUTE_BRIEF
}

model ChronicleArticle {
  id           String        @id @default(cuid())
  slug         String        @unique
  title        String
  subtitle     String?       @db.VarChar(150)
  body         String        @db.Text         // rich text JSON (Tiptap)
  heroImageUrl String?
  type         ArticleType
  status       ArticleStatus @default(DRAFT)
  accessLevel  String        @default("members") // "public_teaser" | "members" | "members_only"
  readingTimeMin Int?
  language     String        @default("en")
  seoTitle     String?
  seoDescription String?
  isSponsored  Boolean       @default(false)
  publishedAt  DateTime?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  deletedAt    DateTime?

  authors      ChronicleArticleAuthor[]
  tags         ChronicleArticleTag[]
  comments     ChronicleComment[]
  relatedArticles ChronicleRelated[] @relation("ArticleFrom")

  @@index([status])
  @@index([publishedAt])
  @@index([slug])
}

model ChronicleArticleAuthor {
  articleId String
  article   ChronicleArticle @relation(fields: [articleId], references: [id])
  memberId  String
  member    Member @relation(fields: [memberId], references: [id])
  order     Int    @default(0)
  @@id([articleId, memberId])
}

model ChronicleComment {
  id        String           @id @default(cuid())
  articleId String
  article   ChronicleArticle @relation(fields: [articleId], references: [id])
  authorId  String
  body      String           @db.Text
  isHidden  Boolean          @default(false)
  createdAt DateTime         @default(now())
  updatedAt DateTime         @updatedAt
  deletedAt DateTime?
}

// Knowledge Base follows same pattern as Chronicle
model KnowledgeDoc {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  abstract    String?  @db.VarChar(1000)
  type        String   // KnowledgeDocType enum
  fileUrl     String?  // PDF
  bodyJson    String?  @db.Text // rich text alternative
  status      String   @default("draft")
  accessLevel String   @default("members")
  language    String   @default("en")
  version     String   @default("1.0")
  downloadable Boolean @default(false)
  publishedAt DateTime?
  lastReviewedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?

  authors     KnowledgeDocAuthor[]
  tags        KnowledgeDocTag[]

  @@index([status])
}
```

---

### 2.9 Shared Taxonomy

```prisma
model Tag {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  type        TagType
  description String?
  createdAt   DateTime @default(now())

  memberExpertise    MemberExpertise[]
  bazaarListingTags  BazaarListingTag[]
  chronicleTags      ChronicleArticleTag[]
  knowledgeTags      KnowledgeDocTag[]
  dealSectors        Deal[]
  syndicateSectors   Syndicate[]          @relation(fields: [id], references: [sectorId])
}

enum TagType {
  SECTOR
  EXPERTISE
  GEOGRAPHY
  THEME
  COMMUNITY
  KNOWLEDGE_CATEGORY
  CHRONICLE_CATEGORY
}

model Category {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  type        String   // "bazaar" | "knowledge" | "chronicle"
  parentId    String?
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  bazaarListings BazaarListing[]
  createdAt   DateTime @default(now())
}
```

---

### 2.10 Messaging & Notifications

```prisma
model Message {
  id          String   @id @default(cuid())
  threadId    String
  thread      MessageThread @relation(fields: [threadId], references: [id])
  senderId    String
  sender      Member   @relation(fields: [senderId], references: [id])
  body        String   @db.Text
  isRead      Boolean  @default(false)
  createdAt   DateTime @default(now())
  deletedAt   DateTime?
}

model MessageThread {
  id          String   @id @default(cuid())
  type        String   @default("dm") // "dm" | "group" | "system"
  title       String?  // for group threads
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  messages    Message[]
  participants MessageThreadParticipant[]
}

model MessageThreadParticipant {
  threadId  String
  thread    MessageThread @relation(fields: [threadId], references: [id])
  memberId  String
  member    Member        @relation(fields: [memberId], references: [id])
  joinedAt  DateTime      @default(now())
  lastReadAt DateTime?
  @@id([threadId, memberId])
}

model Notification {
  id        String   @id @default(cuid())
  memberId  String
  member    Member   @relation(fields: [memberId], references: [id])
  type      String   // enum: connection_request, message, deal_update, etc.
  title     String
  body      String?
  linkUrl   String?
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([memberId, isRead])
  @@index([createdAt])
}
```

---

### 2.11 Audit Log

```prisma
model AuditLog {
  id          String   @id @default(cuid())
  actorId     String?  // null for system actions
  actor       User?    @relation("actor", fields: [actorId], references: [id])
  subjectId   String?  // the member/entity being acted on
  subject     Member?  @relation("subject", fields: [subjectId], references: [id])
  action      String   // "member.role.granted" | "deal.nda.signed" | "document.accessed" etc.
  entityType  String?  // "Member" | "Deal" | "Syndicate" etc.
  entityId    String?
  metadata    Json?    // additional context
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())

  // Append-only: no update or delete on this table
  @@index([actorId])
  @@index([entityType, entityId])
  @@index([createdAt])
}
```

---

## 3. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| UUIDs (CUID2) for all IDs | No sequential IDs exposed in URLs; prevents enumeration attacks |
| Soft delete (`deletedAt`) for most entities | Enables GDPR deletion flow (hard delete after 30-day hold) and data recovery |
| `AuditLog` is append-only | Database trigger or application enforces no UPDATE/DELETE; compliance requirement |
| KYC docs not stored in platform DB | Only `kycReferenceId` stored; Persona holds actual documents; minimises breach exposure |
| Signed URLs for documents | File storage URLs never static; regenerated per-access with expiry |
| `privacySettings` as JSON | Flexible field-level privacy controls without schema changes |
| `roles` as array on `Member` | A member can hold multiple roles (e.g., Investor + Contributor + Chapter Lead) |
| `trustScore` not exposed | Internal moderation signal only; never shown to members |
| Tags + Categories separate | Tags are cross-cutting (sector, expertise, community); Categories are module-scoped hierarchies |
