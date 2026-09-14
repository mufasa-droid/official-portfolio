import { CertificateCarousel } from '@/components/certificates/certificate-carousel'
import { SectionHeading } from '@/components/ui/section-heading'
import type { CertificateItem } from '@/types/portfolio'

interface CertificatesProps {
  initialCertificates?: CertificateItem[]
}

export function Certificates({ initialCertificates }: CertificatesProps) {
  // Gracefully omit the public section if no visible certificates exist (Rule 21)
  if (!initialCertificates || initialCertificates.length === 0) {
    return null
  }

  return (
    <section
      id="certificates"
      className="py-24 relative border-t border-border scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
    >
      {/* Subtle radial spotlight (pure CSS) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          number="05"
          badge="CREDENTIALS & ACCREDITATIONS"
          title="Verified Certifications & Architectural Mastery"
          description="Industry credentials and verified specializations validating expertise in full-stack performance, type systems, and cloud architecture."
          align="center"
        />

        <CertificateCarousel certificates={initialCertificates} />
      </div>
    </section>
  )
}
