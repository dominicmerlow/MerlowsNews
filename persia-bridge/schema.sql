-- CreateEnum
CREATE TYPE "MembershipTier" AS ENUM ('COMMUNITY', 'FULL', 'INVESTOR', 'LEAD_INVESTOR', 'INSTITUTIONAL', 'HONORARY');

-- CreateEnum
CREATE TYPE "CommunityIdentity" AS ENUM ('IRANIAN_DIASPORA', 'JEWISH_ISRAELI_DIASPORA', 'FRIEND_OF_THE_ACCORD');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('MEMBER', 'CONTRIBUTOR', 'VENDOR', 'INVESTOR', 'LEAD_INVESTOR', 'CHAPTER_LEAD', 'CHAPTER_DEPUTY', 'DEAL_MANAGER', 'OPS_ADMIN', 'EDITORIAL_ADMIN', 'PLATFORM_ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "SuspensionStatus" AS ENUM ('WARNING', 'CONTENT_RESTRICTED', 'MESSAGING_RESTRICTED', 'SUSPENDED', 'PERMANENTLY_BANNED');

-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'CONNECTED', 'IGNORED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "OrgType" AS ENUM ('COMPANY', 'FAMILY_OFFICE', 'FUND', 'NGO', 'GOVERNMENT_BODY', 'OTHER');

-- CreateEnum
CREATE TYPE "ChapterMemberStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ChapterMemberRole" AS ENUM ('MEMBER', 'DEPUTY_LEAD', 'LEAD');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('MEMBER_DINNER', 'SYNDICATE_SUMMIT', 'CYRUS_LECTURE', 'HERITAGE_CELEBRATION', 'WORKING_GROUP', 'VIRTUAL_EVENT', 'OTHER');

-- CreateEnum
CREATE TYPE "EventAccessLevel" AS ENUM ('ALL_MEMBERS', 'CHAPTER_ONLY', 'INVESTOR_ONLY', 'INVITE_ONLY');

-- CreateEnum
CREATE TYPE "RsvpStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'ATTENDED');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('PRODUCT_EXPORT', 'PRODUCT_IMPORT', 'SERVICE_OFFER', 'SERVICE_SOUGHT', 'PARTNERSHIP', 'TENDER_RFP');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'LIVE', 'EXPIRED', 'CLOSED', 'REJECTED', 'REMOVED');

-- CreateEnum
CREATE TYPE "DealType" AS ENUM ('EQUITY', 'REAL_ESTATE', 'INFRASTRUCTURE', 'TRADE_FINANCE', 'VENTURE', 'SOCIAL_IMPACT');

-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('DRAFT', 'UNDER_REVIEW', 'OPEN', 'IN_SYNDICATION', 'CLOSED_FUNDED', 'CLOSED_UNFUNDED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "SyndicateType" AS ENUM ('COMMERCIAL', 'INFRASTRUCTURE', 'TRADE', 'SOCIAL_IMPACT', 'VENTURE');

-- CreateEnum
CREATE TYPE "SyndicateStatus" AS ENUM ('DRAFT', 'OPEN', 'IN_PROGRESS', 'CLOSED_FUNDED', 'WOUND_DOWN');

-- CreateEnum
CREATE TYPE "SyndicateMemberRole" AS ENUM ('LEAD', 'CO_LEAD', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED', 'UNPUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('ANALYSIS', 'OP_ED', 'MARKET_INTELLIGENCE', 'INTERVIEW', 'SYNDICATE_ANNOUNCEMENT', 'CHAPTER_COVERAGE', 'INSTITUTE_BRIEF');

-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('SECTOR', 'EXPERTISE', 'GEOGRAPHY', 'THEME', 'COMMUNITY', 'KNOWLEDGE_CATEGORY', 'CHRONICLE_CATEGORY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "phone" TEXT,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "expiresAt" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "displayName" TEXT,
    "slug" TEXT,
    "communityIdentity" "CommunityIdentity" NOT NULL,
    "headline" VARCHAR(120),
    "bio" TEXT,
    "profilePhotoUrl" TEXT,
    "websiteUrl" TEXT,
    "linkedInUrl" TEXT,
    "countryCode" TEXT,
    "city" TEXT,
    "tier" "MembershipTier" NOT NULL DEFAULT 'COMMUNITY',
    "roles" "MemberRole"[] DEFAULT ARRAY['MEMBER']::"MemberRole"[],
    "memberSince" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicationStatus" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "suspensionStatus" "SuspensionStatus",
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "kycStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "kycReferenceId" TEXT,
    "kybStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "kybReferenceId" TEXT,
    "accreditedInvestor" BOOLEAN NOT NULL DEFAULT false,
    "accreditedVerifiedAt" TIMESTAMP(3),
    "linkedInVerified" BOOLEAN NOT NULL DEFAULT false,
    "trustScore" INTEGER NOT NULL DEFAULT 0,
    "referredById" TEXT,
    "privacySettings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "lastActiveAt" TIMESTAMP(3),

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberExpertise" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "MemberExpertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberIndustry" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "MemberIndustry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberLanguage" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,

    CONSTRAINT "MemberLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "status" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "OrgType" NOT NULL,
    "description" TEXT,
    "websiteUrl" TEXT,
    "logoUrl" TEXT,
    "countryCode" TEXT,
    "kybStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "kybReferenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMember" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',

    CONSTRAINT "OrganizationMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationSector" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "OrganizationSector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "description" TEXT,
    "coverImageUrl" TEXT,
    "venueDescription" TEXT,
    "contactEmail" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterMember" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "status" "ChapterMemberStatus" NOT NULL DEFAULT 'PENDING',
    "role" "ChapterMemberRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChapterMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterAnnouncement" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChapterAnnouncement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "chapterId" TEXT,
    "title" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "description" TEXT,
    "heroImageUrl" TEXT,
    "location" TEXT,
    "virtualUrl" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "capacity" INTEGER,
    "price" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "accessLevel" "EventAccessLevel" NOT NULL DEFAULT 'ALL_MEMBERS',
    "rsvpDeadline" TIMESTAMP(3),
    "dresscode" TEXT,
    "agenda" JSONB,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRsvp" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "status" "RsvpStatus" NOT NULL DEFAULT 'CONFIRMED',
    "isWaitlisted" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "stripePaymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventRsvp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSpeaker" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "memberId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EventSpeaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BazaarListing" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "title" VARCHAR(80) NOT NULL,
    "type" "ListingType" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iranRelevance" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "priceMin" INTEGER,
    "priceMax" INTEGER,
    "currency" TEXT,
    "contactPreference" TEXT NOT NULL DEFAULT 'platform_dm',
    "status" "ListingStatus" NOT NULL DEFAULT 'DRAFT',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "rejectionReason" TEXT,
    "hsCode" TEXT,
    "minOrderQuantity" INTEGER,
    "incoterms" TEXT,
    "engagementType" TEXT,
    "partnershipStructure" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BazaarListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BazaarListingTag" (
    "listingId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "BazaarListingTag_pkey" PRIMARY KEY ("listingId","tagId")
);

-- CreateTable
CREATE TABLE "BazaarListingImage" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BazaarListingImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BazaarEnquiry" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BazaarEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "DealType" NOT NULL,
    "sectorId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "targetRaiseMin" INTEGER,
    "targetRaiseMax" INTEGER,
    "minTicket" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "summary" TEXT NOT NULL,
    "status" "DealStatus" NOT NULL DEFAULT 'DRAFT',
    "openDate" TIMESTAMP(3),
    "closeDate" TIMESTAMP(3),
    "submittedById" TEXT NOT NULL,
    "leadInvestorId" TEXT,
    "isAccordCapital" BOOLEAN NOT NULL DEFAULT false,
    "syndicateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealNDA" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "signedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "signatureRef" TEXT,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DealNDA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealDocument" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "accessTier" INTEGER NOT NULL DEFAULT 2,
    "downloadable" BOOLEAN NOT NULL DEFAULT false,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DealDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealDocumentAccess" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DealDocumentAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealIndicatorOfInterest" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "isBinding" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DealIndicatorOfInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Syndicate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SyndicateType" NOT NULL,
    "sectorId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "targetRaise" INTEGER,
    "minTicket" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "memberCap" INTEGER,
    "summary" TEXT NOT NULL,
    "status" "SyndicateStatus" NOT NULL DEFAULT 'DRAFT',
    "openDate" TIMESTAMP(3),
    "closeDate" TIMESTAMP(3),
    "accessMode" TEXT NOT NULL DEFAULT 'open',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Syndicate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyndicateMember" (
    "id" TEXT NOT NULL,
    "syndicateId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "role" "SyndicateMemberRole" NOT NULL DEFAULT 'PARTICIPANT',
    "ioi" INTEGER,
    "commitment" INTEGER,
    "commitmentSignedAt" TIMESTAMP(3),
    "invitedAt" TIMESTAMP(3),
    "joinedAt" TIMESTAMP(3),
    "removedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyndicateMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyndicateDocument" (
    "id" TEXT NOT NULL,
    "syndicateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fileUrl" TEXT NOT NULL,
    "accessTier" INTEGER NOT NULL DEFAULT 1,
    "downloadable" BOOLEAN NOT NULL DEFAULT false,
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SyndicateDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyndicateDiscussionPost" (
    "id" TEXT NOT NULL,
    "syndicateId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SyndicateDiscussionPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyndicateVote" (
    "id" TEXT NOT NULL,
    "syndicateId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'simple_majority',
    "opensAt" TIMESTAMP(3) NOT NULL,
    "closesAt" TIMESTAMP(3) NOT NULL,
    "result" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyndicateVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyndicateVoteResponse" (
    "id" TEXT NOT NULL,
    "voteId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "choice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SyndicateVoteResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChronicleArticle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" VARCHAR(150),
    "body" TEXT NOT NULL,
    "heroImageUrl" TEXT,
    "type" "ArticleType" NOT NULL,
    "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT',
    "accessLevel" TEXT NOT NULL DEFAULT 'members',
    "readingTimeMin" INTEGER,
    "language" TEXT NOT NULL DEFAULT 'en',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isSponsored" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChronicleArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChronicleArticleAuthor" (
    "articleId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ChronicleArticleAuthor_pkey" PRIMARY KEY ("articleId","memberId")
);

-- CreateTable
CREATE TABLE "ChronicleArticleTag" (
    "articleId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ChronicleArticleTag_pkey" PRIMARY KEY ("articleId","tagId")
);

-- CreateTable
CREATE TABLE "ChronicleComment" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChronicleComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeDoc" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" VARCHAR(1000),
    "type" TEXT NOT NULL,
    "fileUrl" TEXT,
    "bodyJson" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "accessLevel" TEXT NOT NULL DEFAULT 'members',
    "language" TEXT NOT NULL DEFAULT 'en',
    "version" TEXT NOT NULL DEFAULT '1.0',
    "downloadable" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "lastReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "KnowledgeDoc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeDocAuthor" (
    "docId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "KnowledgeDocAuthor_pkey" PRIMARY KEY ("docId","memberId")
);

-- CreateTable
CREATE TABLE "KnowledgeDocTag" (
    "docId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "KnowledgeDocTag_pkey" PRIMARY KEY ("docId","tagId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "TagType" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageThread" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'dm',
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageThreadParticipant" (
    "threadId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReadAt" TIMESTAMP(3),

    CONSTRAINT "MessageThreadParticipant_pkey" PRIMARY KEY ("threadId","memberId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "linkUrl" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "subjectId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_key" ON "Member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_slug_key" ON "Member"("slug");

-- CreateIndex
CREATE INDEX "Member_slug_idx" ON "Member"("slug");

-- CreateIndex
CREATE INDEX "Member_tier_idx" ON "Member"("tier");

-- CreateIndex
CREATE INDEX "Member_communityIdentity_idx" ON "Member"("communityIdentity");

-- CreateIndex
CREATE INDEX "Member_countryCode_idx" ON "Member"("countryCode");

-- CreateIndex
CREATE INDEX "Member_applicationStatus_idx" ON "Member"("applicationStatus");

-- CreateIndex
CREATE UNIQUE INDEX "MemberExpertise_memberId_tagId_key" ON "MemberExpertise"("memberId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberIndustry_memberId_tagId_key" ON "MemberIndustry"("memberId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberLanguage_memberId_languageCode_key" ON "MemberLanguage"("memberId", "languageCode");

-- CreateIndex
CREATE INDEX "Connection_fromId_status_idx" ON "Connection"("fromId", "status");

-- CreateIndex
CREATE INDEX "Connection_toId_status_idx" ON "Connection"("toId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_fromId_toId_key" ON "Connection"("fromId", "toId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMember_organizationId_memberId_key" ON "OrganizationMember"("organizationId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationSector_organizationId_tagId_key" ON "OrganizationSector"("organizationId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_slug_key" ON "Chapter"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterMember_chapterId_memberId_key" ON "ChapterMember"("chapterId", "memberId");

-- CreateIndex
CREATE INDEX "ChapterAnnouncement_chapterId_publishedAt_idx" ON "ChapterAnnouncement"("chapterId", "publishedAt");

-- CreateIndex
CREATE INDEX "Event_startsAt_idx" ON "Event"("startsAt");

-- CreateIndex
CREATE INDEX "Event_chapterId_idx" ON "Event"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "EventRsvp_eventId_memberId_key" ON "EventRsvp"("eventId", "memberId");

-- CreateIndex
CREATE INDEX "BazaarListing_status_idx" ON "BazaarListing"("status");

-- CreateIndex
CREATE INDEX "BazaarListing_type_idx" ON "BazaarListing"("type");

-- CreateIndex
CREATE INDEX "BazaarListing_categoryId_idx" ON "BazaarListing"("categoryId");

-- CreateIndex
CREATE INDEX "BazaarListing_countryCode_idx" ON "BazaarListing"("countryCode");

-- CreateIndex
CREATE UNIQUE INDEX "BazaarEnquiry_listingId_buyerId_key" ON "BazaarEnquiry"("listingId", "buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_syndicateId_key" ON "Deal"("syndicateId");

-- CreateIndex
CREATE INDEX "Deal_status_idx" ON "Deal"("status");

-- CreateIndex
CREATE INDEX "Deal_type_idx" ON "Deal"("type");

-- CreateIndex
CREATE UNIQUE INDEX "DealNDA_dealId_memberId_key" ON "DealNDA"("dealId", "memberId");

-- CreateIndex
CREATE INDEX "DealDocumentAccess_documentId_idx" ON "DealDocumentAccess"("documentId");

-- CreateIndex
CREATE INDEX "DealDocumentAccess_memberId_idx" ON "DealDocumentAccess"("memberId");

-- CreateIndex
CREATE INDEX "DealDocumentAccess_createdAt_idx" ON "DealDocumentAccess"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DealIndicatorOfInterest_dealId_memberId_key" ON "DealIndicatorOfInterest"("dealId", "memberId");

-- CreateIndex
CREATE INDEX "Syndicate_status_idx" ON "Syndicate"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SyndicateMember_syndicateId_memberId_key" ON "SyndicateMember"("syndicateId", "memberId");

-- CreateIndex
CREATE INDEX "SyndicateDiscussionPost_syndicateId_createdAt_idx" ON "SyndicateDiscussionPost"("syndicateId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SyndicateVoteResponse_voteId_memberId_key" ON "SyndicateVoteResponse"("voteId", "memberId");

-- CreateIndex
CREATE UNIQUE INDEX "ChronicleArticle_slug_key" ON "ChronicleArticle"("slug");

-- CreateIndex
CREATE INDEX "ChronicleArticle_status_publishedAt_idx" ON "ChronicleArticle"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "ChronicleArticle_slug_idx" ON "ChronicleArticle"("slug");

-- CreateIndex
CREATE INDEX "ChronicleComment_articleId_createdAt_idx" ON "ChronicleComment"("articleId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeDoc_slug_key" ON "KnowledgeDoc"("slug");

-- CreateIndex
CREATE INDEX "KnowledgeDoc_status_idx" ON "KnowledgeDoc"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Message_threadId_createdAt_idx" ON "Message"("threadId", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_memberId_isRead_idx" ON "Notification"("memberId", "isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberExpertise" ADD CONSTRAINT "MemberExpertise_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberExpertise" ADD CONSTRAINT "MemberExpertise_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberIndustry" ADD CONSTRAINT "MemberIndustry_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberIndustry" ADD CONSTRAINT "MemberIndustry_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberLanguage" ADD CONSTRAINT "MemberLanguage_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationSector" ADD CONSTRAINT "OrganizationSector_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationSector" ADD CONSTRAINT "OrganizationSector_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterMember" ADD CONSTRAINT "ChapterMember_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterMember" ADD CONSTRAINT "ChapterMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterAnnouncement" ADD CONSTRAINT "ChapterAnnouncement_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterAnnouncement" ADD CONSTRAINT "ChapterAnnouncement_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRsvp" ADD CONSTRAINT "EventRsvp_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRsvp" ADD CONSTRAINT "EventRsvp_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSpeaker" ADD CONSTRAINT "EventSpeaker_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BazaarListing" ADD CONSTRAINT "BazaarListing_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BazaarListing" ADD CONSTRAINT "BazaarListing_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BazaarListingTag" ADD CONSTRAINT "BazaarListingTag_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "BazaarListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BazaarListingTag" ADD CONSTRAINT "BazaarListingTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BazaarListingImage" ADD CONSTRAINT "BazaarListingImage_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "BazaarListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BazaarEnquiry" ADD CONSTRAINT "BazaarEnquiry_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "BazaarListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealNDA" ADD CONSTRAINT "DealNDA_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealNDA" ADD CONSTRAINT "DealNDA_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealDocument" ADD CONSTRAINT "DealDocument_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealDocumentAccess" ADD CONSTRAINT "DealDocumentAccess_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "DealDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealIndicatorOfInterest" ADD CONSTRAINT "DealIndicatorOfInterest_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealIndicatorOfInterest" ADD CONSTRAINT "DealIndicatorOfInterest_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syndicate" ADD CONSTRAINT "Syndicate_id_fkey" FOREIGN KEY ("id") REFERENCES "Deal"("syndicateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyndicateMember" ADD CONSTRAINT "SyndicateMember_syndicateId_fkey" FOREIGN KEY ("syndicateId") REFERENCES "Syndicate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyndicateMember" ADD CONSTRAINT "SyndicateMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyndicateDocument" ADD CONSTRAINT "SyndicateDocument_syndicateId_fkey" FOREIGN KEY ("syndicateId") REFERENCES "Syndicate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyndicateDiscussionPost" ADD CONSTRAINT "SyndicateDiscussionPost_syndicateId_fkey" FOREIGN KEY ("syndicateId") REFERENCES "Syndicate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyndicateVote" ADD CONSTRAINT "SyndicateVote_syndicateId_fkey" FOREIGN KEY ("syndicateId") REFERENCES "Syndicate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyndicateVoteResponse" ADD CONSTRAINT "SyndicateVoteResponse_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "SyndicateVote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChronicleArticleAuthor" ADD CONSTRAINT "ChronicleArticleAuthor_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "ChronicleArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChronicleArticleAuthor" ADD CONSTRAINT "ChronicleArticleAuthor_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChronicleArticleTag" ADD CONSTRAINT "ChronicleArticleTag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "ChronicleArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChronicleArticleTag" ADD CONSTRAINT "ChronicleArticleTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChronicleComment" ADD CONSTRAINT "ChronicleComment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "ChronicleArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeDocAuthor" ADD CONSTRAINT "KnowledgeDocAuthor_docId_fkey" FOREIGN KEY ("docId") REFERENCES "KnowledgeDoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeDocAuthor" ADD CONSTRAINT "KnowledgeDocAuthor_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeDocTag" ADD CONSTRAINT "KnowledgeDocTag_docId_fkey" FOREIGN KEY ("docId") REFERENCES "KnowledgeDoc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeDocTag" ADD CONSTRAINT "KnowledgeDocTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageThreadParticipant" ADD CONSTRAINT "MessageThreadParticipant_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "MessageThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageThreadParticipant" ADD CONSTRAINT "MessageThreadParticipant_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "MessageThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

