import { redirect } from 'next/navigation'
import { auth } from '@persia-bridge/auth'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { TopBar } from '@/components/layout/TopBar'

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/sign-in')
  if (session.user.applicationStatus !== 'APPROVED') redirect('/apply/pending')

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar session={session} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar session={session} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
