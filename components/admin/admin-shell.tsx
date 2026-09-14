'use client'

import { usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // If rendering the login page, render full screen without the dashboard chrome
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row bg-grid-technical">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
