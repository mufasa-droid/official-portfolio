import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { personalInfo } from "@/lib/data"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://abdulhammedmustapha.com"),
  title: {
    default: "Abdulhammed Mustapha — Senior Frontend Developer & Architect",
    template: "%s | Abdulhammed Mustapha",
  },
  description:
    "Senior Frontend Developer specializing in React, Next.js, and TypeScript architectures. Crafting high-performance web applications and AI-integrated digital products.",
  keywords: [
    "Abdulhammed Mustapha",
    "Senior Frontend Developer",
    "Frontend Architect",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "TraderMind AI",
    "Web Application Architecture",
    "Lagos Frontend Developer",
    "Remote Frontend Engineer",
  ],
  authors: [{ name: "Abdulhammed Mustapha", url: "https://abdulhammedmustapha.com" }],
  creator: "Abdulhammed Mustapha",
  publisher: "Abdulhammed Mustapha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdulhammedmustapha.com",
    siteName: "Abdulhammed Mustapha — Senior Frontend Developer",
    title: "Abdulhammed Mustapha — Senior Frontend Developer & Architect",
    description:
      "Senior Frontend Developer specializing in React, Next.js, and TypeScript architectures. Crafting high-performance web systems and AI tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulhammed Mustapha — Senior Frontend Developer",
    description:
      "Senior Frontend Developer building resilient, high-performance web systems with React & Next.js.",
    creator: "@mufasa_droid",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://abdulhammedmustapha.com/#person",
        name: personalInfo.name,
        jobTitle: personalInfo.role,
        url: "https://abdulhammedmustapha.com",
        sameAs: [
          personalInfo.socials.github,
          personalInfo.socials.linkedin,
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "Nigeria",
        },
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "Software Architecture",
          "Artificial Intelligence Integration",
          "Web Performance Optimization",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://abdulhammedmustapha.com/#website",
        url: "https://abdulhammedmustapha.com",
        name: "Abdulhammed Mustapha — Official Portfolio",
        publisher: {
          "@id": "https://abdulhammedmustapha.com/#person",
        },
      },
    ],
  }

  const themeScript = `
    (function() {
      try {
        var stored = localStorage.getItem('theme');
        var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
          document.documentElement.classList.add('dark');
          document.documentElement.style.colorScheme = 'dark';
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.style.colorScheme = 'light';
        }
      } catch (e) {}
    })()
  `

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground selection:bg-primary/25 selection:text-primary">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
