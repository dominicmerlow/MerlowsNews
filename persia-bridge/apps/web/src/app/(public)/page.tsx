import Link from 'next/link'
import { Button } from '@persia-bridge/ui'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-persian-500">
          The Cyrus Accord
        </p>
        <h1 className="mb-6 max-w-3xl text-5xl font-bold tracking-tight text-accord-900 md:text-6xl">
          Rebuilding the oldest bridge in the world
        </h1>
        <p className="mb-10 max-w-2xl text-xl text-muted-foreground">
          Persia Bridge connects Iranian and Jewish/Israeli diaspora communities — the networks,
          capital, and knowledge to invest in a post-regime Iran.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/apply">Apply for membership</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about/the-cyrus-accord">Learn about The Accord</Link>
          </Button>
        </div>
      </section>

      {/* Three pillars */}
      <section className="border-t bg-muted/40 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-accord-900">
            Three layers. One mission.
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Community',
                subtitle: 'Persia Bridge',
                description:
                  'A verified network of Iranian and Jewish/Israeli diaspora — connected through trust, not algorithms.',
              },
              {
                title: 'Intelligence',
                subtitle: 'The Achaemenid Institute',
                description:
                  'Sector research, regulatory analysis, and due diligence resources for the new Iran economy.',
              },
              {
                title: 'Capital',
                subtitle: 'Accord Capital',
                description:
                  'Syndicated investment into Iran-focused deals — equity, real estate, infrastructure, and trade.',
              },
            ].map((pillar) => (
              <div key={pillar.title} className="rounded-lg border bg-background p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-persian-500">
                  {pillar.subtitle}
                </p>
                <h3 className="mb-3 text-xl font-bold text-accord-900">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
