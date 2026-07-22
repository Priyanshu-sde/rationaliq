'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { urlForImage } from "@/sanity/lib/image"

/**
 * Section 2.5 - Trust Bar. Infinite horizontal marquee of client logos.
 */
export function TrustBar({ logos = [] }: { logos?: any[] }) {
  const reduce = useReducedMotion()

  if (!logos || logos.length === 0) {
    return null
  }

  // Create a highly repeated array of logos so it easily exceeds any screen width
  const repeatedLogos = [...Array(15)].flatMap(() => logos)

  return (
    <section
      className="border-y border-(--border) bg-white/[0.02] py-10 overflow-hidden"
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
          className="flex w-max items-center"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        >
          {/* Render exactly 2 identical halves to ensure a flawless -50% loop mathematically */}
          {[1, 2].map((half) => (
            <div key={half} className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {repeatedLogos.map((logo, i) => (
                <div key={`${logo._id || i}-${half}-${i}`} className="flex-shrink-0 opacity-70 grayscale transition-all hover:grayscale-0">
                  {logo.url ? (
                    <a href={logo.url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={urlForImage(logo.logo)?.url()}
                        alt={logo.name}
                        className="h-10 md:h-12 w-auto object-contain"
                      />
                    </a>
                  ) : (
                    <img
                      src={urlForImage(logo.logo)?.url()}
                      alt={logo.name}
                      className="h-10 md:h-12 w-auto object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
