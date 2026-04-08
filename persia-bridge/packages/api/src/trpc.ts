import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { auth } from '@persia-bridge/auth'
import { db } from '@persia-bridge/db'
import type { MemberRole } from '@persia-bridge/db'

// ─── Context ───────────────────────────────────────────────────────────────

export async function createContext(_req?: Request) {
  const session = await auth()
  return { session, db }
}

export type Context = Awaited<ReturnType<typeof createContext>>

// ─── tRPC Init ─────────────────────────────────────────────────────────────

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory
export const router = t.router
export const publicProcedure = t.procedure

// ─── Protected procedures ──────────────────────────────────────────────────

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user?.memberId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  })
})

export const approvedMemberProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.applicationStatus !== 'APPROVED') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Membership not yet approved' })
  }
  return next({ ctx })
})

export const dealProcedure = approvedMemberProcedure.use(({ ctx, next }) => {
  const dealRoles: MemberRole[] = ['INVESTOR', 'LEAD_INVESTOR', 'VENDOR', 'DEAL_MANAGER', 'PLATFORM_ADMIN', 'SUPER_ADMIN']
  const hasDealAccess = ctx.session.user.roles.some((r: MemberRole) => dealRoles.includes(r))
  if (!hasDealAccess) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Deal layer access required' })
  }
  return next({ ctx })
})

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  const adminRoles: MemberRole[] = ['OPS_ADMIN', 'EDITORIAL_ADMIN', 'DEAL_MANAGER', 'PLATFORM_ADMIN', 'SUPER_ADMIN']
  const isAdmin = ctx.session.user.roles.some((r: MemberRole) => adminRoles.includes(r))
  if (!isAdmin) {
    throw new TRPCError({ code: 'FORBIDDEN' })
  }
  return next({ ctx })
})
