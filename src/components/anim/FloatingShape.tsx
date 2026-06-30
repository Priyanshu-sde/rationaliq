'use client'

import { useRef } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from './gsap'

interface FloatingShapeProps {
  className?: string
  /** Drift amplitude in px. */
  amplitude?: number
  duration?: number
  delay?: number
  rotate?: number
}

/** Continuously floating decorative element (infinite, eased yoyo). */
export function FloatingShape({
  className,
  amplitude = 24,
  duration = 6,
  delay = 0,
  rotate = 0,
}: FloatingShapeProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || !prefersMotion()) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: amplitude,
        x: amplitude * 0.4,
        rotate,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, el)

    return () => ctx.revert()
  }, [amplitude, duration, delay, rotate])

  return <div ref={ref} className={className} aria-hidden="true" />
}
