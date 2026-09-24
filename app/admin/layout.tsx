import type { Metadata } from 'next'
import { AdminShell } from '@/components/admin/admin-shell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Portfolio CMS Control Center',
  description: 'Single-owner administration control center for Abdulhammed Mustapha.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShell>{children}</AdminShell>
}
