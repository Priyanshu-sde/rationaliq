'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote:
      'Working with Hitesh gave our family business a governance framework we actually understand and use. The family constitution process alone resolved conflicts we\u2019d been avoiding for years.',
    name: 'Business Owner',
    role: '3rd-gen Manufacturing Family',
    gradient: 'linear-gradient(135deg, var(--amber), var(--gold))',
  },
  {
    quote:
      'The thought leadership content strategy Hitesh built for us moved us from unknown to quoted in our industry within 4 months.',
    name: 'Founder',
    role: 'Early-stage SaaS Startup',
    gradient: 'linear-gradient(135deg, var(--indigo), var(--purple))',
  },
  {
    quote:
      'Hitesh\u2019s understanding of the VC ecosystem made him invaluable when we were preparing our fundraising materials. He knows what investors are actually looking for.',
    name: 'Founder',
    role: 'D2C Brand',
    gradient: 'linear-gradient(135deg, var(--emerald), var(--blue))',
  },
]

/**
 * Section 6 — Testimonials. Three quiet cards, the middle one slightly
 * elevated. Anonymised placeholders until real testimonials arrive.
 */
export function Testimonials() {
  const reduce = useReducedMotion()

  return (
    <section className="relative bg-(--bg-base) py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="mb-16 max-w-2xl md:mb-20">
          <p className="text-label text-(--gold)">What clients say</p>
          <h2 className="font-display text-section mt-5 text-(--text-primary)">
            Results that
            <br />
            speak first.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.role}
              className={i === 1 ? 'md:-mt-3' : ''}
              initial={reduce ? undefined : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
            <figure className="tier-2 relative flex h-full flex-col rounded-2xl border border-(--border) bg-(--bg-card) p-8 hover:border-(--border-hover) hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
              <span
                className="font-display pointer-events-none absolute -top-2 left-5 select-none text-[6rem] leading-none text-(--indigo) opacity-20"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="relative mt-10 flex-1 text-base italic leading-[1.75] text-(--text-primary)">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3.5">
                <span
                  className="h-11 w-11 shrink-0 rounded-full"
                  style={{ background: t.gradient }}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-sm font-semibold text-(--text-primary)">{t.name}</span>
                  <span className="block text-xs text-(--text-secondary)">{t.role}</span>
                </span>
              </figcaption>
            </figure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
