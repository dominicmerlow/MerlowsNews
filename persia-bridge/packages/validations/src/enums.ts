import { z } from 'zod'

export const MembershipTierSchema = z.enum([
  'COMMUNITY',
  'FULL',
  'INVESTOR',
  'LEAD_INVESTOR',
  'INSTITUTIONAL',
  'HONORARY',
])

export const CommunityIdentitySchema = z.enum([
  'IRANIAN_DIASPORA',
  'JEWISH_ISRAELI_DIASPORA',
  'FRIEND_OF_THE_ACCORD',
])

export const MemberRoleSchema = z.enum([
  'MEMBER',
  'CONTRIBUTOR',
  'VENDOR',
  'INVESTOR',
  'LEAD_INVESTOR',
  'CHAPTER_LEAD',
  'CHAPTER_DEPUTY',
  'DEAL_MANAGER',
  'OPS_ADMIN',
  'EDITORIAL_ADMIN',
  'PLATFORM_ADMIN',
  'SUPER_ADMIN',
])

export const ApplicationStatusSchema = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
  'WITHDRAWN',
])

export const ListingTypeSchema = z.enum([
  'PRODUCT_EXPORT',
  'PRODUCT_IMPORT',
  'SERVICE_OFFER',
  'SERVICE_SOUGHT',
  'PARTNERSHIP',
  'TENDER_RFP',
])

export const DealTypeSchema = z.enum([
  'EQUITY',
  'REAL_ESTATE',
  'INFRASTRUCTURE',
  'TRADE_FINANCE',
  'VENTURE',
  'SOCIAL_IMPACT',
])

export const SyndicateTypeSchema = z.enum([
  'COMMERCIAL',
  'INFRASTRUCTURE',
  'TRADE',
  'SOCIAL_IMPACT',
  'VENTURE',
])

export const ArticleTypeSchema = z.enum([
  'ANALYSIS',
  'OP_ED',
  'MARKET_INTELLIGENCE',
  'INTERVIEW',
  'SYNDICATE_ANNOUNCEMENT',
  'CHAPTER_COVERAGE',
  'INSTITUTE_BRIEF',
])

export const EventTypeSchema = z.enum([
  'MEMBER_DINNER',
  'SYNDICATE_SUMMIT',
  'CYRUS_LECTURE',
  'HERITAGE_CELEBRATION',
  'WORKING_GROUP',
  'VIRTUAL_EVENT',
  'OTHER',
])
