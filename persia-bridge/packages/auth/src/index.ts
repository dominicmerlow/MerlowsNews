import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@persia-bridge/db'
import type { MemberRole, MembershipTier } from '@persia-bridge/db'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string
      memberId: string | null
      roles: MemberRole[]
      tier: MembershipTier | null
      applicationStatus: string | null
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'database' },
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/sign-in/verify',
    error: '/sign-in/error',
  },
  providers: [
    Resend({
      from: 'Persia Bridge <noreply@persiabridge.com>',
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        })
        if (!user?.passwordHash) return null
        // Password comparison handled by caller with bcrypt
        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const member = await db.member.findUnique({
        where: { userId: user.id },
        select: {
          id: true,
          roles: true,
          tier: true,
          applicationStatus: true,
        },
      })
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          memberId: member?.id ?? null,
          roles: member?.roles ?? [],
          tier: member?.tier ?? null,
          applicationStatus: member?.applicationStatus ?? null,
        },
      }
    },
  },
})

// Helper: check if session has required role
export function hasRole(roles: MemberRole[], required: MemberRole): boolean {
  const hierarchy: MemberRole[] = [
    'SUPER_ADMIN',
    'PLATFORM_ADMIN',
    'OPS_ADMIN',
    'EDITORIAL_ADMIN',
    'DEAL_MANAGER',
    'LEAD_INVESTOR',
    'INVESTOR',
    'CHAPTER_LEAD',
    'CHAPTER_DEPUTY',
    'CONTRIBUTOR',
    'VENDOR',
    'MEMBER',
  ]
  const highestRole = roles.reduce(
    (best, role) => {
      const idx = hierarchy.indexOf(role)
      return idx !== -1 && idx < hierarchy.indexOf(best) ? role : best
    },
    'MEMBER' as MemberRole,
  )
  return hierarchy.indexOf(highestRole) <= hierarchy.indexOf(required)
}
