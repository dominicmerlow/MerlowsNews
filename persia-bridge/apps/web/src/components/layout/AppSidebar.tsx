'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  Newspaper,
  BookOpen,
  Landmark,
  MapPin,
  ShoppingBag,
  Briefcase,
  BarChart2,
  Calendar,
  MessageSquare,
} from 'lucide-react'
import { cn } from '@persia-bridge/ui'
import type { Session } from 'next-auth'

interface AppSidebarProps {
  session: Session
}

const memberNav = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: Users, label: 'Directory', href: '/directory' },
  { icon: Newspaper, label: 'The Chronicle', href: '/chronicle' },
  { icon: BookOpen, label: 'Knowledge Base', href: '/knowledge' },
  { icon: Landmark, label: 'Heritage', href: '/heritage' },
  { icon: MapPin, label: 'Chapters', href: '/chapters' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
]

const dealNav = [
  { icon: ShoppingBag, label: 'The Bazaar', href: '/bazaar' },
  { icon: Briefcase, label: 'Deal Room', href: '/dealroom' },
  { icon: BarChart2, label: 'Syndicates', href: '/syndicates' },
]

export function AppSidebar({ session }: AppSidebarProps) {
  const pathname = usePathname()
  const isDealEnabled = session.user.roles.some((r) =>
    ['INVESTOR', 'LEAD_INVESTOR', 'VENDOR', 'DEAL_MANAGER', 'PLATFORM_ADMIN', 'SUPER_ADMIN'].includes(r),
  )

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-e bg-card lg:flex">
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <p className="font-bold text-accord-900">Persia Bridge</p>
        <p className="text-xs uppercase tracking-widest text-persian-500">The Cyrus Accord</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {memberNav.map(({ icon: Icon, label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  pathname.startsWith(href)
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {isDealEnabled && (
          <>
            <div className="my-3 px-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Deal Layer
              </p>
            </div>
            <ul className="space-y-0.5">
              {dealNav.map(({ icon: Icon, label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                      pathname.startsWith(href)
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  )
}
