import { z } from 'zod'
import { SyndicateTypeSchema } from './enums'

export const SyndicateCreateSchema = z.object({
  name: z.string().min(3).max(100),
  type: SyndicateTypeSchema,
  sectorId: z.string().cuid(),
  countryCode: z.string().length(2),
  targetRaise: z.number().int().positive().optional(),
  minTicket: z.number().int().positive().optional(),
  currency: z.string().length(3).default('GBP'),
  memberCap: z.number().int().positive().optional(),
  summary: z.string().min(50).max(1000),
  accessMode: z.enum(['open', 'invite_only', 'restricted']).default('open'),
})

export const SyndicateIOISchema = z.object({
  syndicateId: z.string().cuid(),
  amount: z.number().int().positive(),
  currency: z.string().length(3).default('GBP'),
})

export const SyndicateVoteCreateSchema = z.object({
  syndicateId: z.string().cuid(),
  question: z.string().min(10).max(300),
  type: z.enum(['simple_majority', 'supermajority']).default('simple_majority'),
  opensAt: z.coerce.date(),
  closesAt: z.coerce.date(),
})

export const SyndicateVoteResponseSchema = z.object({
  voteId: z.string().cuid(),
  choice: z.enum(['yes', 'no', 'abstain']),
})

export type SyndicateCreate = z.infer<typeof SyndicateCreateSchema>
export type SyndicateIOI = z.infer<typeof SyndicateIOISchema>
