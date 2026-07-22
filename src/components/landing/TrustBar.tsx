'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { urlForImage } from "@/sanity/lib/image"

/**
 * Section 2.5 - Trust Bar. Infinite horizontal marquee of client logos.
 */
export function TrustBar({ logos = [] }: { logos?: any[] }) {
  const reduce = useReducedMotion()

  const validLogos = (logos || []).filter((l) => l && (l.logo || l.name || l.url))

  if (validLogos.length === 0) {
    return null
  }

  // Repeat enough times to span screen widths smoothly without bloat
  const repeatCount = Math.max(6, Math.ceil(12 / validLogos.length))
  const repeatedLogos = [...Array(repeatCount)].flatMap(() => validLogos)

  return (
    <section
      className="border-y border-(--border) bg-zinc-900/70 py-10 overflow-hidden select-none"
      aria-label="Trusted By"
    >
      <div className="mx-auto px-6 md:px-12 mb-8">
        <motion.h2
          className="text-label text-center text-(--text-muted) uppercase tracking-widest"
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Trusted By
        </motion.h2>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex w-max items-center shrink-0 will-change-transform transform-gpu"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 120, repeat: Infinity }}
        >
          {/* Render exactly 2 identical halves to ensure a flawless -50% loop mathematically */}
          {[1, 2].map((half) => (
            <div key={half} className="flex shrink-0 items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {repeatedLogos.map((logo, i) => {
                const imgUrl = logo.logo ? urlForImage(logo.logo)?.url() : null
                if (!imgUrl) return null

                return (
                  <div
                    key={`logo-h${half}-i${i}-${logo._id || logo.name || i}`}
                    className="shrink-0 opacity-100 flex items-center justify-center"
                  >
                    {logo.url ? (
                      <a href={logo.url} target="_blank" rel="noopener noreferrer" className="block shrink-0">
                        <img
                          src={imgUrl}
                          alt={logo.name || 'Client logo'}
                          loading="eager"
                          decoding="async"
                          className="h-10 md:h-12 w-auto max-w-none object-contain pointer-events-none"
                        />
                      </a>
                    ) : (
                      <img
                        src={imgUrl}
                        alt={logo.name || 'Client logo'}
                        loading="eager"
                        decoding="async"
                        className="h-10 md:h-12 w-auto max-w-none object-contain pointer-events-none"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
