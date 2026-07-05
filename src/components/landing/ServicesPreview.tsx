'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Mic, Landmark, Store, ArrowRight } from 'lucide-react'
import { TiltCard } from '@/components/anim'

const SERVICES = [
  {
    accent: 'var(--blue)',
    glow: 'rgba(59, 130, 246, 0.13)',
    icon: Mic,
    tag: 'Startups & VC Funds',
    title: 'Thought Leadership Content',
    body: 'Content that makes you the voice people quote — not the one playing catch-up.',
    href: '/services/thought-leadership',
  },
  {
    accent: 'var(--amber)',
    glow: 'rgba(245, 158, 11, 0.13)',
    icon: Landmark,
    tag: 'Family-Owned Businesses',
    title: 'Business Professionalisation',
    body: 'Governance, succession planning, and family constitutions that protect what you\u2019ve built across generations.',
    href: '/services/family-business-consulting',
  },
  {
    accent: 'var(--emerald)',
    glow: 'rgba(16, 185, 129, 0.13)',
    icon: Store,
    tag: 'D2C Startups',
    title: 'Retail Presence Strategy',
    body: 'From shelf placement to sales training — everything you need to turn online momentum into physical market share.',
    href: '/services/d2c-retail-strategy',
  },
]

/**
 * Section 3 — Services preview. Three practice cards with accent-tinted
 * hover glows and a gentle 3D tilt on fine pointers.
 */
export function ServicesPreview() {
  const reduce = useReducedMotion()

  return (
    <section id="services" className="relative bg-(--bg-base) py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <motion.p
            className="text-label text-(--gold)"
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            What we do
          </motion.p>
          <motion.h2
            className="font-display text-section mt-5 text-(--text-primary)"
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Three practices.
            <br />
            One standard.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={reduce ? undefined : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: '800px' }}
              >
                <TiltCard
                  max={8}
                  lift={6}
                  className="group relative h-full rounded-2xl border border-(--border) bg-(--bg-card) backdrop-blur-sm transition-[border-color,box-shadow] duration-300"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `0 0 40px ${s.glow}`,
                      border: `1px solid ${s.glow.replace('0.13', '0.4')}`,
                    }}
                    aria-hidden="true"
                  />
                  <Link href={s.href} className="flex h-full flex-col p-8">
                    <span
                      className="flex h-13 w-13 items-center justify-center rounded-xl border transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
                      style={{
                        color: s.accent,
                        borderColor: s.glow.replace('0.13', '0.25'),
                        backgroundColor: s.glow.replace('0.13', '0.08'),
                      }}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="text-label mt-7" style={{ color: s.accent }}>
                      {s.tag}
                    </span>
                    <h3 className="font-display text-card mt-2.5 text-(--text-primary)">
                      {s.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-(--text-secondary)">
                      {s.body}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-(--text-primary)">
                      See the service
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
