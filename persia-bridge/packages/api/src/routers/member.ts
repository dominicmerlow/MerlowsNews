import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { router, publicProcedure, approvedMemberProcedure, adminProcedure } from '../trpc'
import { ApplicationSchema, ProfileUpdateSchema, ConnectionRequestSchema } from '@persia-bridge/validations'

export const memberRouter = router({
  // ─── Public: submit application ─────────────────────────────────────
  apply: publicProcedure.input(ApplicationSchema).mutation(async ({ ctx, input }) => {
    const existing = await ctx.db.user.findUnique({ where: { email: input.email } })
    if (existing) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'An account with this email already exists.',
      })
    }

    // Create user + member in one transaction
    const result = await ctx.db.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email: input.email },
      })
      const member = await tx.member.create({
        data: {
          userId: user.id,
          fullName: input.fullName,
          communityIdentity: input.communityIdentity,
          countryCode: input.countryCode,
          linkedInUrl: input.linkedInUrl ?? null,
          applicationStatus: 'PENDING',
          // Store application details in metadata via audit log
        },
      })
      await tx.auditLog.create({
        data: {
          action: 'member.application.submitted',
          entityType: 'Member',
          entityId: member.id,
          metadata: {
            professionalBackground: input.professionalBackground,
            whyJoin: input.whyJoin,
            howHeard: input.howHeard,
            referralCode: input.referralCode,
          },
        },
      })
      return { userId: user.id, memberId: member.id }
    })

    return { success: true, ...result }
  }),

  // ─── Get own profile ─────────────────────────────────────────────────
  me: approvedMemberProcedure.query(async ({ ctx }) => {
    const member = await ctx.db.member.findUniqueOrThrow({
      where: { id: ctx.session.user.memberId! },
      include: {
        expertiseTags: { include: { tag: true } },
        industries: { include: { tag: true } },
        languages: true,
        chapterAffiliations: { include: { chapter: true }, where: { status: 'APPROVED' } },
      },
    })
    return member
  }),

  // ─── Update own profile ───────────────────────────────────────────────
  updateProfile: approvedMemberProcedure
    .input(ProfileUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const memberId = ctx.session.user.memberId!
      const { expertiseTagIds, industryTagIds, languageCodes, ...profileData } = input

      await ctx.db.$transaction(async (tx) => {
        await tx.member.update({
          where: { id: memberId },
          data: profileData,
        })
        if (expertiseTagIds !== undefined) {
          await tx.memberExpertise.deleteMany({ where: { memberId } })
          if (expertiseTagIds.length > 0) {
            await tx.memberExpertise.createMany({
              data: expertiseTagIds.map((tagId) => ({ memberId, tagId })),
            })
          }
        }
        if (industryTagIds !== undefined) {
          await tx.memberIndustry.deleteMany({ where: { memberId } })
          if (industryTagIds.length > 0) {
            await tx.memberIndustry.createMany({
              data: industryTagIds.map((tagId) => ({ memberId, tagId })),
            })
          }
        }
        if (languageCodes !== undefined) {
          await tx.memberLanguage.deleteMany({ where: { memberId } })
          if (languageCodes.length > 0) {
            await tx.memberLanguage.createMany({
              data: languageCodes.map((languageCode) => ({ memberId, languageCode })),
            })
          }
        }
      })

      return { success: true }
    }),

  // ─── Directory search ────────────────────────────────────────────────
  search: approvedMemberProcedure
    .input(
      z.object({
        query: z.string().optional(),
        communityIdentity: z.array(z.string()).optional(),
        countryCode: z.string().optional(),
        page: z.number().int().min(1).default(1),
        pageSize: z.number().int().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { query, communityIdentity, countryCode, page, pageSize } = input
      const skip = (page - 1) * pageSize

      const where = {
        applicationStatus: 'APPROVED' as const,
        deletedAt: null,
        ...(communityIdentity?.length ? { communityIdentity: { in: communityIdentity as never[] } } : {}),
        ...(countryCode ? { countryCode } : {}),
        ...(query
          ? {
              OR: [
                { fullName: { contains: query, mode: 'insensitive' as const } },
                { headline: { contains: query, mode: 'insensitive' as const } },
                { bio: { contains: query, mode: 'insensitive' as const } },
              ],
            }
          : {}),
      }

      const [members, total] = await Promise.all([
        ctx.db.member.findMany({
          where,
          skip,
          take: pageSize,
          select: {
            id: true,
            slug: true,
            fullName: true,
            displayName: true,
            headline: true,
            profilePhotoUrl: true,
            communityIdentity: true,
            countryCode: true,
            city: true,
            tier: true,
            expertiseTags: { include: { tag: true }, take: 3 },
          },
          orderBy: { memberSince: 'desc' },
        }),
        ctx.db.member.count({ where }),
      ])

      return { members, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
    }),

  // ─── Get member by slug ──────────────────────────────────────────────
  bySlug: approvedMemberProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const member = await ctx.db.member.findUnique({
        where: { slug: input.slug, deletedAt: null },
        include: {
          expertiseTags: { include: { tag: true } },
          industries: { include: { tag: true } },
          languages: true,
          chapterAffiliations: { include: { chapter: true }, where: { status: 'APPROVED' } },
        },
      })
      if (!member) throw new TRPCError({ code: 'NOT_FOUND' })
      return member
    }),

  // ─── Send connection request ─────────────────────────────────────────
  connect: approvedMemberProcedure
    .input(ConnectionRequestSchema)
    .mutation(async ({ ctx, input }) => {
      const fromId = ctx.session.user.memberId!

      const existing = await ctx.db.connection.findFirst({
        where: {
          OR: [
            { fromId, toId: input.toMemberId },
            { fromId: input.toMemberId, toId: fromId },
          ],
        },
      })
      if (existing) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Connection already exists or pending' })
      }

      const connection = await ctx.db.connection.create({
        data: {
          fromId,
          toId: input.toMemberId,
          message: input.message,
          status: 'PENDING',
        },
      })

      await ctx.db.notification.create({
        data: {
          memberId: input.toMemberId,
          type: 'connection_request',
          title: 'New connection request',
          linkUrl: `/directory`,
        },
      })

      return connection
    }),

  // ─── Admin: approve application ──────────────────────────────────────
  approveApplication: adminProcedure
    .input(z.object({ memberId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.member.update({
        where: { id: input.memberId },
        data: { applicationStatus: 'APPROVED' },
      })

      await ctx.db.auditLog.create({
        data: {
          actorId: ctx.session.user.id,
          subjectId: input.memberId,
          action: 'member.application.approved',
          entityType: 'Member',
          entityId: input.memberId,
        },
      })

      return member
    }),

  // ─── Admin: list pending applications ────────────────────────────────
  pendingApplications: adminProcedure
    .input(z.object({ page: z.number().default(1), pageSize: z.number().default(20) }))
    .query(async ({ ctx, input }) => {
      const skip = (input.page - 1) * input.pageSize
      const [members, total] = await Promise.all([
        ctx.db.member.findMany({
          where: { applicationStatus: 'PENDING', deletedAt: null },
          skip,
          take: input.pageSize,
          orderBy: { createdAt: 'asc' },
          include: { user: { select: { email: true } } },
        }),
        ctx.db.member.count({ where: { applicationStatus: 'PENDING', deletedAt: null } }),
      ])
      return { members, total }
    }),
})
