'use client'

import { motion, useReducedMotion } from 'framer-motion'

const CREDENTIALS = ['Grant Thornton', 'EY', 'Sunicon Venture Capital']

/**
 * Section 2.5 — Trust Bar. A quiet strip of institutional pedigree
 * directly beneath the hero. Deliberately the calmest element on the
 * page: no shimmer, no colour, just names that carry weight.
 */
export function TrustBar() {
  const reduce = useReducedMotion()

  return (
    <section
      className="border-y border-(--border) bg-white/[0.02] py-10"
      aria-label="Professional background"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <motion.p
          className="text-label text-center text-(--text-muted)"
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Trained and tested at
        </motion.p>
        <motion.ul
          className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 md:gap-x-16"
          initial={reduce ? undefined : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          {CREDENTIALS.map((name) => (
            <motion.li
              key={name}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
            >
              <span className="inline-block select-none font-display text-xl text-white opacity-40 transition-[opacity,transform] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-90 md:text-2xl">
                {name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
