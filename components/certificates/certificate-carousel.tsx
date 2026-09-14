'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  Calendar,
  CheckCircle2,
  FileImage,
  ArrowUpRight,
} from 'lucide-react'
import type { CertificateItem } from '@/types/portfolio'

interface CertificateCarouselProps {
  certificates: CertificateItem[]
}

export function CertificateCarousel({ certificates }: CertificateCarouselProps) {
  const count = certificates.length
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect system reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count)
  }, [count])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  // Calculate shortest circular distance between active index and target index
  const getOffset = (index: number) => {
    if (count <= 1) return 0
    let diff = (index - activeIndex) % count
    if (diff > count / 2) diff -= count
    if (diff < -count / 2) diff += count
    return diff
  }

  // Active certificate
  const activeCert = certificates[activeIndex] || certificates[0]

  // If only 1 certificate exists: Render single featured document presentation
  if (count === 1) {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="glass-card overflow-hidden rounded-3xl border border-border dark:border-white/[0.12] p-5 sm:p-7 shadow-2xl relative">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border dark:border-white/[0.08] bg-muted/40 mb-5">
            {activeCert.imageUrl ? (
              <Image
                src={activeCert.imageUrl}
                alt={`Certificate for ${activeCert.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, 600px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <FileImage className="h-12 w-12" />
              </div>
            )}
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground font-mono tracking-tight">
              {activeCert.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-primary font-medium">
              {activeCert.issuer} • {activeCert.issueDate}
            </p>
            {activeCert.description && (
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 max-w-md mx-auto">
                {activeCert.description}
              </p>
            )}

            {activeCert.credentialUrl && (
              <div className="pt-3">
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold hover:bg-primary/90 transition-colors shadow-md min-h-[44px]"
                  aria-label={`Verify ${activeCert.title} credential`}
                >
                  <span>View Verified Credential</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Multiple certificates: Center-focused carousel
  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Professional Certifications & Accreditations"
    >
      {/* 3D / Layered Carousel Stage */}
      <div className="relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] w-full flex items-center justify-center overflow-hidden select-none py-2">
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {certificates.map((cert, index) => {
            const offset = getOffset(index)
            const isCenter = offset === 0
            const isLeft = offset === -1
            const isRight = offset === 1
            const isVisible = Math.abs(offset) <= 1

            // Compute positions and scales
            let xOffset = '0%'
            let scale = 1.0
            let opacity = 1.0
            let zIndex = 30

            if (isLeft) {
              xOffset = '-54%'
              scale = 0.74
              opacity = 0.42
              zIndex = 10
            } else if (isRight) {
              xOffset = '54%'
              scale = 0.74
              opacity = 0.42
              zIndex = 10
            } else if (!isCenter) {
              // Far cards hidden
              xOffset = offset > 0 ? '100%' : '-100%'
              scale = 0.5
              opacity = 0
              zIndex = 0
            }

            const transitionConfig = prefersReducedMotion
              ? { duration: 0.01 }
              : { duration: 0.38, ease: [0.23, 1, 0.32, 1] }

            return (
              <motion.div
                key={cert.id}
                initial={false}
                animate={{
                  x: xOffset,
                  scale,
                  opacity: isVisible ? opacity : 0,
                  zIndex,
                }}
                transition={transitionConfig}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -35) {
                    handleNext()
                  } else if (info.offset.x > 35) {
                    handlePrev()
                  }
                }}
                onClick={() => {
                  if (isLeft) handlePrev()
                  if (isRight) handleNext()
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${cert.title} by ${cert.issuer} (${index + 1} of ${count})`}
                aria-hidden={!isCenter}
                className={`absolute top-0 bottom-0 my-auto flex items-center justify-center w-[78%] sm:w-[68%] md:w-[62%] lg:w-[58%] max-w-[560px] aspect-[16/10] cursor-pointer transition-shadow ${
                  isCenter
                    ? 'cursor-grab active:cursor-grabbing'
                    : 'cursor-pointer hover:opacity-75'
                }`}
                style={{
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
              >
                {/* Certificate Document Frame */}
                <div
                  className={`w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border bg-card/95 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
                    isCenter
                      ? 'border-primary/40 shadow-2xl dark:border-white/[0.2] dark:shadow-primary/5 ring-1 ring-primary/20'
                      : 'border-border/60 shadow-lg dark:border-white/[0.06]'
                  }`}
                >
                  <div className="relative w-full h-full bg-muted/40">
                    {cert.imageUrl ? (
                      <Image
                        src={cert.imageUrl}
                        alt={`Certificate for ${cert.title}`}
                        fill
                        className="object-cover"
                        priority={isCenter}
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 560px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center space-y-2">
                        <Award className="h-10 w-10 text-primary/60" />
                        <span className="font-mono text-xs font-semibold">{cert.title}</span>
                      </div>
                    )}

                    {/* Gradient Protection Overlay for Active Focus */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Active Watermark Indicator */}
                    {isCenter && (
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>ACCREDITED</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Active Certificate Metadata & Actions */}
      <div className="mt-6 sm:mt-8 text-center space-y-3.5 max-w-2xl mx-auto px-4">
        {/* Animated Metadata Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCert.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-2"
          >
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground font-mono [text-wrap:balance]">
              {activeCert.title}
            </h3>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-primary font-medium">
              <span>{activeCert.issuer}</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary/70" />
                <span>{activeCert.issueDate}</span>
              </span>
            </div>

            {activeCert.description && (
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto pt-1 font-sans [text-wrap:pretty]">
                {activeCert.description}
              </p>
            )}

            {/* Credential Action CTA */}
            {activeCert.credentialUrl && (
              <div className="pt-2">
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 transition-opacity shadow-lg"
                  aria-label={`Verify ${activeCert.title} external credential`}
                >
                  <span>View Verified Credential</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls & Pagination Row */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/[0.1] active:scale-95"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Numeric Slide Counter */}
          <div className="px-3.5 py-1.5 rounded-full bg-muted/40 border border-border text-xs font-mono text-muted-foreground tabular-nums select-none dark:border-white/[0.08]">
            <span className="text-foreground font-semibold">0{activeIndex + 1}</span>
            <span className="opacity-40 mx-1">/</span>
            <span>0{count}</span>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/[0.1] active:scale-95"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
