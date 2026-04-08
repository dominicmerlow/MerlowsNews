import { auth } from '@persia-bridge/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/about', '/chronicle', '/apply', '/events', '/contact', '/legal', '/sign-in']

export default auth((req: NextRequest & { auth: unknown }) => {
  const { pathname } = req.nextUrl
  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(p + '/'))
  const session = (req as { auth: { user?: unknown } | null }).auth

  if (!isPublic && !session) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
}
