
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GreenHive.ai — AI Nursery',
  description: 'A dynamic plant nursery with AI assistant, backed by Postgres.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
