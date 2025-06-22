import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Octavo',
  description: 'Search with memory. Discover what actually worked through collective intelligence powered by Letta agents.',
  keywords: ['memory search', 'collective intelligence', 'letta agents', 'knowledge discovery'],
  authors: [{ name: 'Octavo Team' }],
  icons: {
    icon: '/favicon.ico',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
