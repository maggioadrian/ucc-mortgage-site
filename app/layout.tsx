import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AIChatWidget } from '@/components/ai-chat-widget'
import './globals.css'

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans"
});

export const metadata: Metadata = {
  title: 'UCC Mortgage Co. | Windsor Ontario Mortgage Broker Since 1974',
  description: 'Windsor\'s trusted mortgage broker since 1974. Residential, commercial, and private mortgages. 50+ years experience, $1.2B+ mortgages placed, 40+ lending partners.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="font-sans antialiased">
        {children}
        <AIChatWidget />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
