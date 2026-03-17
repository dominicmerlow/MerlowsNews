import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@persia-bridge/ui/globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Persia Bridge — The Cyrus Accord',
    template: '%s | Persia Bridge',
  },
  description:
    'The digital community and commerce platform connecting Iranian and Jewish/Israeli diaspora communities to rebuild and invest in a post-regime Iran.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://persiabridge.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
