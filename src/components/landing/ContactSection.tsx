'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, Mail, Check, Loader2 } from 'lucide-react'

const SERVICES = [
  'Family Business',
  'Education',
  'D2C Startups',
  'Brands and IPs',
  'Other',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClasses =
  'w-full rounded-xl border border-(--border) bg-white/[0.04] px-4 py-3.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) transition-[border-color,box-shadow] duration-300 focus:border-(--indigo) focus:shadow-[0_0_0_3px_var(--indigo-muted)] focus:outline-none'

/**
 * Section 8 - CTA + Contact. A radial indigo bloom behind the closing
 * ask, then a compact form that posts to /api/contact. Inline
 * validation on blur; the submit button morphs in place while sending.
 */
export function ContactSection() {
  const reduce = useReducedMotion()
  const formRef = useRef<HTMLDivElement | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [values, setValues] = useState({
    name: '',
    email: '',
    service: SERVICES[0],
    message: '',
    honeypot: '',
  })

  const validateField = (field: string, value: string): string => {
    if (field === 'name' && !value.trim()) return 'Please tell us your name.'
    if (field === 'email') {
      if (!value.trim()) return 'Please add your email so we can reply.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'That email doesn\u2019t look right - please check it.'
    }
    if (field === 'message' && !value.trim()) return 'A short message helps us prepare for the call.'
    return ''
  }

  const onBlur = (field: string) => {
    const err = validateField(field, values[field as keyof typeof values] as string)
    setErrors((e) => ({ ...e, [field]: err }))
  }

  const scrollToForm = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: Element, o?: object) => void } }).lenis
    if (formRef.current) {
      if (lenis) lenis.scrollTo(formRef.current, { offset: -80 })
      else formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    for (const f of ['name', 'email', 'message']) {
      const err = validateField(f, values[f as keyof typeof values] as string)
      if (err) nextErrors[f] = err
    }
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xwvgnodq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          service: values.service,
          message: values.message,
          _gotcha: values.honeypot,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="noise relative overflow-hidden bg-(--bg-base) py-24 md:py-36">
      {/* Radial indigo bloom behind the heading */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[560px] w-[860px] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(99,102,241,0.15), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-hero text-(--text-primary)">
            Ready to build
            <br />
            your <span className="italic">authority?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-lg text-(--text-secondary)">
            Book a free 30-minute strategy call - or send a message. Hitesh
            reads every enquiry personally.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              data-cursor-text="Click"
              className="btn-shimmer tier-2 press inline-flex h-13 items-center gap-2.5 rounded-xl bg-(--indigo) px-8 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.4)]"
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Book a call
            </Link>
            <button
              type="button"
              onClick={scrollToForm}
              className="tier-2 press inline-flex h-13 items-center gap-2.5 rounded-xl border border-(--border) px-8 text-sm font-medium text-(--text-secondary) hover:border-(--border-hover) hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Send a message
            </button>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          ref={formRef}
          className="mx-auto mt-24 max-w-[600px] scroll-mt-24"
          initial={reduce ? undefined : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center rounded-2xl border border-(--border) bg-(--bg-card) px-8 py-16 text-center" role="status">
              <motion.span
                className="flex h-16 w-16 items-center justify-center rounded-full bg-(--indigo)"
                initial={reduce ? undefined : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <Check className="h-8 w-8 text-white" aria-hidden="true" />
              </motion.span>
              <p className="font-display mt-6 text-2xl text-(--text-primary)">Message sent.</p>
              <p className="mt-2 text-(--text-secondary)">Hitesh will be in touch shortly.</p>
            </div>
          ) : (
            <form action="https://formspree.io/f/xwvgnodq" method="POST" onSubmit={onSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-(--text-primary)">
                  Name <span className="text-(--gold)" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  onBlur={() => onBlur('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={inputClasses}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-2 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-(--text-primary)">
                  Email <span className="text-(--gold)" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  onBlur={() => onBlur('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={inputClasses}
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="mt-2 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-service" className="mb-2 block text-sm font-medium text-(--text-primary)">
                  Service interested in
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={values.service}
                  onChange={(e) => setValues((v) => ({ ...v, service: e.target.value }))}
                  className={`${inputClasses} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-[#0B0D1A]">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-(--text-primary)">
                  Message <span className="text-(--gold)" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  onBlur={() => onBlur('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={inputClasses}
                  placeholder={'Tell us a little about your business and what you\u2019re looking for.'}
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="mt-2 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot - hidden from humans and screen readers */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={values.honeypot}
                onChange={(e) => setValues((v) => ({ ...v, honeypot: e.target.value }))}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-shimmer press flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-(--indigo) text-sm font-semibold text-white transition-[opacity,box-shadow] duration-300 hover:shadow-[0_8px_40px_rgba(99,102,241,0.4)] disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-label="Sending" />
                ) : (
                  <>Send message &rarr;</>
                )}
              </button>

              {status === 'error' && (
                <p role="alert" className="text-center text-sm text-red-400">
                  Something went wrong sending your message. Please retry, or
                  email us directly - we answer everything.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
