import type { NextConfig } from 'next'

const config: NextConfig = {
  transpilePackages: [
    '@persia-bridge/ui',
    '@persia-bridge/auth',
    '@persia-bridge/api',
    '@persia-bridge/email',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

export default config
