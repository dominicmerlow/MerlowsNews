import { z } from 'zod'
import { router, approvedMemberProcedure } from '../trpc'

export const notificationsRouter = router({
  list: approvedMemberProcedure
    .input(z.object({ unreadOnly: z.boolean().default(false) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.notification.findMany({
        where: {
          memberId: ctx.session.user.memberId!,
          ...(input.unreadOnly ? { isRead: false } : {}),
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
    }),

  markRead: approvedMemberProcedure
    .input(z.object({ ids: z.array(z.string().cuid()) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.notification.updateMany({
        where: { id: { in: input.ids }, memberId: ctx.session.user.memberId! },
        data: { isRead: true },
      })
      return { success: true }
    }),

  markAllRead: approvedMemberProcedure.mutation(async ({ ctx }) => {
    await ctx.db.notification.updateMany({
      where: { memberId: ctx.session.user.memberId!, isRead: false },
      data: { isRead: true },
    })
    return { success: true }
  }),

  unreadCount: approvedMemberProcedure.query(async ({ ctx }) => {
    return ctx.db.notification.count({
      where: { memberId: ctx.session.user.memberId!, isRead: false },
    })
  }),
})
