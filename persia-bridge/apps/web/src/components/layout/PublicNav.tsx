import Link from 'next/link'
import { Button } from '@persia-bridge/ui'

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-bold text-accord-900">Persia Bridge</span>
          <span className="text-xs uppercase tracking-widest text-persian-500">The Cyrus Accord</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/about/the-cyrus-accord" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/chronicle" className="text-sm text-muted-foreground hover:text-foreground">
            The Chronicle
          </Link>
          <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
            Events
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/apply">Apply</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
