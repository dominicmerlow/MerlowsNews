import { z } from 'zod'
import { CommunityIdentitySchema } from './enums'

export const ApplicationSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  communityIdentity: CommunityIdentitySchema,
  countryCode: z.string().length(2),
  professionalBackground: z.string().min(10).max(2000),
  whyJoin: z.string().min(20).max(1000),
  linkedInUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal('')),
  howHeard: z.string().max(500).optional(),
  referralCode: z.string().max(50).optional(),
})

export const ProfileUpdateSchema = z.object({
  displayName: z.string().max(60).optional(),
  headline: z.string().max(120).optional(),
  bio: z.string().max(3000).optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  linkedInUrl: z.string().url().optional().or(z.literal('')),
  countryCode: z.string().length(2).optional(),
  city: z.string().max(100).optional(),
  expertiseTagIds: z.array(z.string()).max(10).optional(),
  industryTagIds: z.array(z.string()).max(5).optional(),
  languageCodes: z.array(z.string().length(2)).max(10).optional(),
})

export const ConnectionRequestSchema = z.object({
  toMemberId: z.string().cuid(),
  message: z.string().max(300).optional(),
})

export type Application = z.infer<typeof ApplicationSchema>
export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>
export type ConnectionRequest = z.infer<typeof ConnectionRequestSchema>
