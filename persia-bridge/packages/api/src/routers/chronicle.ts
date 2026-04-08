import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { router, publicProcedure, approvedMemberProcedure, adminProcedure } from '../trpc'
import { ArticleCreateSchema, CommentCreateSchema } from '@persia-bridge/validations'

export const chronicleRouter = router({
  // ─── Public: list published articles (teaser mode for guests) ────────
  list: publicProcedure
    .input(
      z.object({
        page: z.number().int().min(1).default(1),
        pageSize: z.number().int().min(1).max(20).default(12),
        category: z.string().optional(),
        language: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, category, language } = input
      const skip = (page - 1) * pageSize
      const isAuthenticated = !!ctx.session?.user

      const articles = await ctx.db.chronicleArticle.findMany({
        where: {
          status: 'PUBLISHED',
          deletedAt: null,
          ...(language ? { language } : {}),
          ...(category ? { tags: { some: { tag: { slug: category } } } } : {}),
          // Members-only articles hidden from public
          ...(!isAuthenticated ? { accessLevel: { not: 'members_only' } } : {}),
        },
        skip,
        take: pageSize,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          subtitle: true,
          heroImageUrl: true,
          type: true,
          readingTimeMin: true,
          publishedAt: true,
          accessLevel: true,
          authors: {
            include: { member: { select: { fullName: true, profilePhotoUrl: true, slug: true } } },
            orderBy: { order: 'asc' },
          },
          tags: { include: { tag: true } },
        },
      })

      // Truncate body for public preview (body not selected above — efficient)
      return articles
    }),

  // ─── Public/Member: get article by slug ──────────────────────────────
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const isAuthenticated = !!ctx.session?.user

      const article = await ctx.db.chronicleArticle.findUnique({
        where: { slug: input.slug, status: 'PUBLISHED', deletedAt: null },
        include: {
          authors: {
            include: { member: { select: { fullName: true, profilePhotoUrl: true, slug: true, headline: true } } },
            orderBy: { order: 'asc' },
          },
          tags: { include: { tag: true } },
          comments: {
            where: { isHidden: false, deletedAt: null },
            orderBy: { createdAt: 'asc' },
            include: { article: false },
          },
        },
      })

      if (!article) throw new TRPCError({ code: 'NOT_FOUND' })

      // Members-only articles: gate for unauthenticated
      if (article.accessLevel === 'members_only' && !isAuthenticated) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      // Public teaser: return only first 200 chars of body
      if (!isAuthenticated && article.accessLevel === 'public_teaser') {
        return { ...article, body: article.body.slice(0, 200) + '…', isTeaser: true }
      }

      return { ...article, isTeaser: false }
    }),

  // ─── Member: post a comment ──────────────────────────────────────────
  addComment: approvedMemberProcedure
    .input(CommentCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const article = await ctx.db.chronicleArticle.findUnique({
        where: { id: input.articleId, status: 'PUBLISHED' },
        select: { id: true },
      })
      if (!article) throw new TRPCError({ code: 'NOT_FOUND' })

      return ctx.db.chronicleComment.create({
        data: {
          articleId: input.articleId,
          authorId: ctx.session.user.memberId!,
          body: input.body,
        },
      })
    }),

  // ─── Editorial Admin: create/update article ──────────────────────────
  upsert: adminProcedure.input(ArticleCreateSchema.extend({ id: z.string().cuid().optional() })).mutation(
    async ({ ctx, input }) => {
      const { id, tagIds, ...data } = input
      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

      if (id) {
        return ctx.db.chronicleArticle.update({
          where: { id },
          data: {
            ...data,
            ...(tagIds
              ? {
                  tags: {
                    deleteMany: {},
                    create: tagIds.map((tagId) => ({ tagId })),
                  },
                }
              : {}),
          },
        })
      }

      return ctx.db.chronicleArticle.create({
        data: {
          ...data,
          slug,
          ...(tagIds ? { tags: { create: tagIds.map((tagId) => ({ tagId })) } } : {}),
        },
      })
    },
  ),

  // ─── Editorial Admin: publish article ────────────────────────────────
  publish: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chronicleArticle.update({
        where: { id: input.id },
        data: { status: 'PUBLISHED', publishedAt: new Date() },
      })
    }),
})
