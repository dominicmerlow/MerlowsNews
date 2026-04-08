import Link from 'next/link'
import { Bell, Search, Settings, LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage, Button } from '@persia-bridge/ui'
import { signOut } from '@persia-bridge/auth'
import type { Session } from 'next-auth'

interface TopBarProps {
  session: Session
}

export function TopBar({ session }: TopBarProps) {
  const initials = session.user.name
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? '?'

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Search className="h-4 w-4" />
        <span className="text-sm">Search...</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications">
            <Bell className="h-4 w-4" />
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image ?? undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
