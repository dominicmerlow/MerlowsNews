import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { router, approvedMemberProcedure, adminProcedure } from '../trpc'
import { EventCreateSchema, ChapterAnnouncementSchema } from '@persia-bridge/validations'

export const chaptersRouter = router({
  // ─── List all active chapters ────────────────────────────────────────
  list: approvedMemberProcedure.query(async ({ ctx }) => {
    return ctx.db.chapter.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { members: { where: { status: 'APPROVED' } } } },
        events: {
          where: { publishedAt: { not: null }, startsAt: { gte: new Date() }, deletedAt: null },
          orderBy: { startsAt: 'asc' },
          take: 3,
          select: { id: true, title: true, startsAt: true, type: true },
        },
      },
      orderBy: { name: 'asc' },
    })
  }),

  // ─── Get chapter by slug ─────────────────────────────────────────────
  bySlug: approvedMemberProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const chapter = await ctx.db.chapter.findUnique({
        where: { slug: input.slug, isActive: true },
        include: {
          members: {
            where: { status: 'APPROVED', role: { in: ['LEAD', 'DEPUTY_LEAD'] } },
            include: { member: { select: { fullName: true, profilePhotoUrl: true, slug: true } } },
          },
          events: {
            where: { publishedAt: { not: null }, startsAt: { gte: new Date() }, deletedAt: null },
            orderBy: { startsAt: 'asc' },
            take: 5,
          },
          announcements: {
            where: { publishedAt: { not: null }, deletedAt: null },
            orderBy: { publishedAt: 'desc' },
            take: 5,
          },
          _count: { select: { members: { where: { status: 'APPROVED' } } } },
        },
      })
      if (!chapter) throw new TRPCError({ code: 'NOT_FOUND' })
      return chapter
    }),

  // ─── Affiliate with a chapter ────────────────────────────────────────
  affiliate: approvedMemberProcedure
    .input(z.object({ chapterId: z.string().cuid(), isPrimary: z.boolean().default(false) }))
    .mutation(async ({ ctx, input }) => {
      const memberId = ctx.session.user.memberId!
      const existing = await ctx.db.chapterMember.findUnique({
        where: { chapterId_memberId: { chapterId: input.chapterId, memberId } },
      })
      if (existing) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Already affiliated with this chapter' })
      }
      return ctx.db.chapterMember.create({
        data: { chapterId: input.chapterId, memberId, isPrimary: input.isPrimary, status: 'PENDING' },
      })
    }),

  // ─── RSVP to an event ────────────────────────────────────────────────
  rsvp: approvedMemberProcedure
    .input(z.object({ eventId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const memberId = ctx.session.user.memberId!
      const event = await ctx.db.event.findUnique({
        where: { id: input.eventId, deletedAt: null },
        include: { _count: { select: { rsvps: { where: { status: 'CONFIRMED' } } } } },
      })
      if (!event) throw new TRPCError({ code: 'NOT_FOUND' })

      const isWaitlisted = !!(event.capacity && event._count.rsvps >= event.capacity)

      const existing = await ctx.db.eventRsvp.findUnique({
        where: { eventId_memberId: { eventId: input.eventId, memberId } },
      })
      if (existing) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Already RSVP\'d to this event' })
      }

      return ctx.db.eventRsvp.create({
        data: { eventId: input.eventId, memberId, status: 'CONFIRMED', isWaitlisted },
      })
    }),

  // ─── Chapter Lead / Admin: create event ──────────────────────────────
  createEvent: adminProcedure.input(EventCreateSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.event.create({ data: input })
  }),

  // ─── Chapter Lead / Admin: post announcement ─────────────────────────
  announce: adminProcedure
    .input(ChapterAnnouncementSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chapterAnnouncement.create({
        data: { ...input, authorId: ctx.session.user.memberId!, publishedAt: new Date() },
      })
    }),
})
