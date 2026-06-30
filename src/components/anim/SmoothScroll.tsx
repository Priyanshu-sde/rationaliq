'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersMotion } from './gsap'

/**
 * Provides buttery smooth scrolling via Lenis and syncs it with
 * GSAP ScrollTrigger. Respects prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!prefersMotion()) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Expose for anchor links / programmatic scroll.
    ;(window as unknown as { lenis?: Lenis }).lenis = lenis

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      ;(window as unknown as { lenis?: Lenis }).lenis = undefined
    }
  }, [])

  return <>{children}</>
}
