import { z } from 'zod'
import { DealTypeSchema } from './enums'

export const DealSubmitSchema = z.object({
  title: z.string().min(5).max(100),
  type: DealTypeSchema,
  sectorId: z.string().cuid(),
  countryCode: z.string().length(2),
  targetRaiseMin: z.number().int().positive().optional(),
  targetRaiseMax: z.number().int().positive().optional(),
  minTicket: z.number().int().positive().optional(),
  currency: z.string().length(3).default('GBP'),
  summary: z.string().min(50).max(500),
})

export const DealNDASignSchema = z.object({
  dealId: z.string().cuid(),
})

export const DealIOISchema = z.object({
  dealId: z.string().cuid(),
  amount: z.number().int().positive().optional(),
  currency: z.string().length(3).default('GBP'),
  notes: z.string().max(500).optional(),
  isBinding: z.boolean().default(false),
})

export type DealSubmit = z.infer<typeof DealSubmitSchema>
export type DealIOI = z.infer<typeof DealIOISchema>
