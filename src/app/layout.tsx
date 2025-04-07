import { Link } from 'lucide-react'
import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Brev.ly',
  description: 'Encurtador  de links'
}

const kanit = Kanit({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-kanit'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${kanit.variable}`}>
      <body className="bg-zinc-900 text-white antialiased font-kanit">
        {children}
      </body>
    </html>
  )
}
