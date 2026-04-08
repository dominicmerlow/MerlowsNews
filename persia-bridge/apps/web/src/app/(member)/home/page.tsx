import { auth } from '@persia-bridge/auth'

export const metadata = { title: 'Home' }

export default async function MemberHomePage() {
  const session = await auth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-accord-900">
          Welcome back{session?.user.name ? `, ${session.user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening in The Accord</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Placeholder cards — populated in next sprint */}
        {[
          { label: 'New connections', value: '—' },
          { label: 'Unread messages', value: '—' },
          { label: 'Open deals', value: '—' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold text-accord-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 font-semibold">Latest from The Chronicle</h2>
        <p className="text-sm text-muted-foreground">Articles will appear here once published.</p>
      </div>
    </div>
  )
}
