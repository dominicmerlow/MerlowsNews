import { redirect } from 'next/navigation'
import { auth } from '@persia-bridge/auth'
import { hasRole } from '@persia-bridge/auth'

export default async function DealLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/sign-in')

  const isDealEnabled = hasRole(session.user.roles, 'INVESTOR') || hasRole(session.user.roles, 'VENDOR')
  if (!isDealEnabled) redirect('/home?upgrade=deal')

  return <>{children}</>
}
