import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../apps/web/src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Persia Bridge brand
        persian: {
          50:  'hsl(24, 100%, 97%)',
          100: 'hsl(24, 100%, 93%)',
          500: 'hsl(24, 85%, 50%)',  // Persian gold
          600: 'hsl(24, 85%, 42%)',
          900: 'hsl(24, 60%, 18%)',
        },
        accord: {
          50:  'hsl(215, 60%, 97%)',
          500: 'hsl(215, 70%, 38%)',  // Accord navy
          900: 'hsl(215, 70%, 12%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        farsi: ['var(--font-farsi)', 'Tahoma', 'Arial', 'sans-serif'],
        hebrew: ['var(--font-hebrew)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
