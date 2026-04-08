import { z } from 'zod'
import { EventTypeSchema } from './enums'

export const EventCreateSchema = z.object({
  title: z.string().min(3).max(200),
  type: EventTypeSchema,
  chapterId: z.string().cuid().optional(),
  description: z.string().min(20).max(5000).optional(),
  location: z.string().max(300).optional(),
  startsAt: z.coerce.date(),
  endsAt: z.coerce.date().optional(),
  timezone: z.string().default('UTC'),
  capacity: z.number().int().positive().optional(),
  price: z.number().int().min(0).default(0),
  currency: z.string().length(3).default('GBP'),
  accessLevel: z
    .enum(['ALL_MEMBERS', 'CHAPTER_ONLY', 'INVESTOR_ONLY', 'INVITE_ONLY'])
    .default('ALL_MEMBERS'),
  rsvpDeadline: z.coerce.date().optional(),
  dresscode: z.string().max(100).optional(),
})

export const ChapterAnnouncementSchema = z.object({
  chapterId: z.string().cuid(),
  title: z.string().min(3).max(200),
  body: z.string().min(10).max(5000),
})

export type EventCreate = z.infer<typeof EventCreateSchema>
export type ChapterAnnouncement = z.infer<typeof ChapterAnnouncementSchema>
