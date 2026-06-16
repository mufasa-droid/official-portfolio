import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Abdulhammed Mustapha - Senior Frontend Developer',
  description: 'Frontend Developer building fast, scalable web applications with React, Next.js, and TypeScript. Specializing in modern web technologies and user-centric design.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Web Development', 'JavaScript'],
  authors: [{ name: 'Abdulhammed Mustapha' }],
  creator: 'Abdulhammed Mustapha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdulhammedmustapha.com',
    title: 'Abdulhammed Mustapha - Senior Frontend Developer',
    description: 'Frontend Developer building fast, scalable web applications',
    siteName: 'Abdulhammed Mustapha Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulhammed Mustapha - Senior Frontend Developer',
    description: 'Frontend Developer building fast, scalable web applications',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
