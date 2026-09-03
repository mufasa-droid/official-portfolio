"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Copy, Check, CheckCircle2, ArrowUpRight, Clock } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { personalInfo } from "@/lib/data"
import { submitContactMessage } from "@/app/actions/contact"

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const copyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const formData = new FormData(e.currentTarget)
    try {
      const res = await submitContactMessage(null, formData)
      if (res.success) {
        setFormSuccess(true)
      } else {
        setFormError(res.message || "Failed to send message.")
      }
    } catch {
      setFormError("An unexpected error occurred. Please try emailing directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative border-t border-white/[0.08] scroll-mt-20 sm:scroll-mt-24">
      <div className="container-custom">
        <SectionHeading
          number="05"
          badge="GET IN TOUCH"
          title="Let's Build Something Exceptional"
          description="Have a high-impact role, full-stack application, or architectural problem to solve? Send a message or reach out directly."
        />

        <div className="grid lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Direct Contact & Channel Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-wider">
                Direct Channels
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-4">
                Fastest Way to Connect
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                I prioritize async communication, clear requirements, and fast turnaround. Feel free to copy my direct details or send an inquiry.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              {/* Email Card */}
              <div className="glass-card p-4 rounded-xl border border-white/[0.08] flex items-center justify-between group">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3.5 min-w-0"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-zinc-500 uppercase">Email</p>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate group-hover:text-primary transition-colors">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-[background-color,color,transform] duration-150 ease-out-custom active:scale-[0.97]"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="glass-card p-4 rounded-xl border border-white/[0.08] flex items-center justify-between group">
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3.5 min-w-0"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-zinc-500 uppercase">Phone & WhatsApp</p>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate group-hover:text-primary transition-colors">
                      {personalInfo.phone}
                    </p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={copyPhone}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-[background-color,color,transform] duration-150 ease-out-custom active:scale-[0.97]"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="glass-card p-4 rounded-xl border border-white/[0.08] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-zinc-500 uppercase">Location & Timezone</p>
                  <p className="text-xs sm:text-sm font-medium text-zinc-200">
                    {personalInfo.location} • West Africa Time (UTC+1)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-mono text-zinc-500 uppercase">Verified Networks:</span>
              <div className="flex gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 sm:p-8 md:p-10 rounded-3xl border border-white/[0.12]">
              <AnimatePresence mode="wait">
                {formSuccess ? (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Message Sent Successfully
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out! Your message has been received. I will review your requirements and respond promptly.
                    </p>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFormSuccess(false)
                        }}
                      >
                        <span>Send Another Message</span>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    aria-live="polite"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        Send a Direct Message
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Drop a line with your project details, timeline, or open role.
                      </p>
                    </div>

                    {formError && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400">
                        {formError}
                      </div>
                    )}

                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-mono text-zinc-300">
                        YOUR NAME / ORGANIZATION *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="e.g. Alex Morgan (Acme Inc)"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.1] text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-[border-color,box-shadow] duration-150 ease-out-custom font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-mono text-zinc-300">
                        YOUR EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.1] text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-[border-color,box-shadow] duration-150 ease-out-custom font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-xs font-mono text-zinc-300">
                        PROJECT SCOPE & MESSAGE *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Describe what you are looking to build, technical challenges, or timeline…"
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.1] text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-[border-color,box-shadow] duration-150 ease-out-custom resize-none font-sans"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full justify-center h-12"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Transmitting Message&hellip;</span>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
