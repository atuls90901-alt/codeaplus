import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Mono, Outfit } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/AuthContext'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://codeaplus.pro'),
  verification: {
    google: 'zDGGCEcF8_R4GssRkn6VQKtMTFUOiY_j3YW51Tg7oeQ',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  title: {
    default: 'CodeaPlus — Premium Web Agency India | MERN & Next.js Experts',
    template: '%s | CodeaPlus',
  },
  description: 'CodeaPlus is a premium web agency specializing in MERN stack & Next.js. We build high-performance websites, web apps & e-commerce solutions for ambitious businesses across India.',
  keywords: [
    'web agency india', 'next.js development', 'mern stack', 'web design india',
    'ecommerce development', 'react developer india', 'full stack development',
    'website design india', 'web app development', 'nodejs developer',
  ],
  authors: [{ name: 'CodeaPlus', url: 'https://codeaplus.pro' }],
  creator: 'CodeaPlus',
  publisher: 'CodeaPlus',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://codeaplus.pro',
    siteName: 'CodeaPlus',
    title: 'CodeaPlus — Premium Web Agency India',
    description: 'We build high-performance websites & web apps for ambitious businesses.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CodeaPlus Web Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeaPlus — Premium Web Agency India',
    description: 'MERN & Next.js experts building digital experiences.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://codeaplus.pro',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmMono.variable} ${outfit.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}