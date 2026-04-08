import { z } from 'zod'
import { ListingTypeSchema } from './enums'

export const BazaarListingCreateSchema = z.object({
  title: z.string().min(5).max(80),
  type: ListingTypeSchema,
  categoryId: z.string().cuid(),
  description: z.string().min(50).max(5000),
  iranRelevance: z.string().min(20).max(500),
  countryCode: z.string().length(2),
  priceMin: z.number().int().positive().optional(),
  priceMax: z.number().int().positive().optional(),
  currency: z.string().length(3).optional(),
  contactPreference: z.enum(['platform_dm', 'email', 'whatsapp']).default('platform_dm'),
  hsCode: z.string().max(10).optional(),
  minOrderQuantity: z.number().int().positive().optional(),
  incoterms: z.string().max(10).optional(),
  engagementType: z.enum(['one_off', 'retainer', 'project']).optional(),
  partnershipStructure: z.enum(['jv', 'equity', 'revenue_share', 'strategic']).optional(),
  tagIds: z.array(z.string()).max(10).optional(),
})

export const BazaarEnquirySchema = z.object({
  listingId: z.string().cuid(),
  message: z.string().min(10).max(1000),
})

export type BazaarListingCreate = z.infer<typeof BazaarListingCreateSchema>
export type BazaarEnquiry = z.infer<typeof BazaarEnquirySchema>
