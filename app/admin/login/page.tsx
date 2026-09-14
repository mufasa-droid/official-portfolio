'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, ArrowRight, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react'
import { loginAdmin } from '@/app/admin/actions/auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get('next') || '/admin'
  const isUnconfigured = searchParams.get('error') === 'unconfigured'

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(
    isUnconfigured ? 'Database environment variables are not yet configured.' : null
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    try {
      const result = await loginAdmin(null, formData)
      if (result.success) {
        router.push(nextUrl)
        router.refresh()
      } else {
        setErrorMessage(result.message || 'Authentication failed.')
      }
    } catch {
      setErrorMessage('An unexpected error occurred during login. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AnimatePresence mode="wait">
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400 font-mono"
            role="alert"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-xs font-mono text-muted-foreground uppercase"
        >
          Owner Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue="Abdulhammedmustapha@gmail.com"
          placeholder="Abdulhammedmustapha@gmail.com"
          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-[border-color,box-shadow] duration-150 ease-out-custom font-mono dark:bg-black/50 dark:border-white/[0.1]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-xs font-mono text-muted-foreground uppercase"
          >
            Master Password *
          </label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••••••"
          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-[border-color,box-shadow] duration-150 ease-out-custom font-mono dark:bg-black/50 dark:border-white/[0.1]"
        />
      </div>

      <Button
        type="submit"
        className="w-full justify-center h-12 mt-2"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span>Verifying Identity&hellip;</span>
        ) : (
          <>
            <span>Authenticate & Enter CMS</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}

function LoginFormFallback() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="h-10 bg-muted/40 rounded-xl" />
      <div className="h-10 bg-muted/40 rounded-xl" />
      <div className="h-12 bg-primary/20 rounded-xl" />
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-grid-technical relative">
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="container-custom max-w-md w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Portfolio</span>
        </Link>
        <span className="font-mono text-xs text-primary font-semibold">
          CMS // CONTROL CENTER
        </span>
      </div>

      {/* Login Card */}
      <div className="container-custom max-w-md w-full mx-auto my-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-8 sm:p-10 rounded-3xl border border-border shadow-2xl dark:border-white/[0.12]"
        >
          {/* Brand Header */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <Badge variant="mono" className="font-mono text-[10px]">
                SINGLE-OWNER RLS
              </Badge>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Portfolio CMS Login
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                Authorized control center for Abdulhammed Mustapha.
              </p>
            </div>
          </div>

          {/* Form inside Suspense boundary for useSearchParams */}
          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>

          {/* Security Guarantee */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-2 text-[11px] font-mono text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>End-to-End Cryptographic Session</span>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container-custom max-w-md w-full mx-auto text-center">
        <p className="text-[11px] font-mono text-muted-foreground/60">
          © 2026 Abdulhammed Mustapha • Official Developer Portfolio
        </p>
      </div>
    </main>
  )
}
