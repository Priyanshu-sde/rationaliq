'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * First-load intro: the RationalIQ wordmark fades in centered on the
 * dark base, then the veil lifts to reveal the page. Runs once per
 * session; skipped entirely under prefers-reduced-motion.
 */
export function IntroLoader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (reduce) return
    if (sessionStorage.getItem('riq-intro-seen')) return
    sessionStorage.setItem('riq-intro-seen', '1')
    setShow(true)
    const t = setTimeout(() => setShow(false), 1000)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#07080F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          aria-hidden="true"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
            className="font-display text-3xl tracking-tight text-(--text-primary)"
          >
            Rational<span className="italic text-(--gold)">IQ</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
