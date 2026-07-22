'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from '@/components/anim'

const STATS = [
  { value: 250, suffix: '+', label: 'Family Business Leaders Trained' },
  { value: 5, suffix: 'M+', label: 'Impressions generated on social media' },
  { value: 10, suffix: '+', label: 'Years of experience' },
  { value: 700, suffix: '+', label: 'Hours of training content delivered' },
]

/** Faint network-graph texture behind the stat grid. */
function NetworkTexture() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="#94A3B8" strokeWidth="1" fill="none">
        <path d="M80 120 L240 80 L410 180 L580 90 L720 200" />
        <path d="M120 420 L300 340 L410 180 M300 340 L520 460 L720 380" />
        <path d="M240 80 L300 340 M580 90 L520 460 M80 120 L120 420" />
      </g>
      <g fill="#94A3B8">
        {[
          [80, 120], [240, 80], [410, 180], [580, 90], [720, 200],
          [120, 420], [300, 340], [520, 460], [720, 380],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>
    </svg>
  )
}

/**
 * Section 5 - Impact Numbers. A 2×2 grid of counters with hairline
 * dividers and a soft indigo bloom. Suffixes appear only after each
 * count settles.
 */
export function ImpactStats() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-(--bg-base) py-24 md:py-36">
      <NetworkTexture />
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="mb-16 max-w-2xl md:mb-20">
          <p className="text-label text-(--gold)">The track record</p>
          <h2 className="font-display text-section mt-5 text-(--text-primary)">
            Numbers that
            <br />
            don&apos;t lie.
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 rounded-2xl border border-(--border) sm:grid-cols-2"
          style={{ boxShadow: '0 0 120px rgba(99,102,241,0.1)' }}
          initial={reduce ? undefined : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col justify-center px-8 py-12 md:px-14 md:py-16 ${
                i % 2 === 1 ? 'border-t border-(--border) sm:border-t-0 sm:border-l' : ''
              } ${i >= 2 ? 'border-t border-(--border)' : ''}`}
            >
              <p className="font-display leading-none text-(--text-primary)" style={{ fontSize: 'clamp(4rem, 9vw, 8rem)' }}>
                <CountUp value={s.value} duration={2} />
                {s.suffix && (
                  <motion.span
                    className="text-(--indigo)"
                    initial={reduce ? undefined : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduce ? 0 : 2, duration: 0.4 }}
                  >
                    {s.suffix}
                  </motion.span>
                )}
              </p>
              <p className="mt-4 text-[0.85rem] text-(--text-secondary)">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
