'use client'

import { useRef } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from './gsap'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  /** How strongly the element follows the cursor (0-1). */
  strength?: number
}

/**
 * Magnetic hover: the element is gently pulled toward the cursor and
 * springs back on leave. Pointer-fine devices only.
 */
export function Magnetic({
  children,
  className,
  strength = 0.4,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || !prefersMotion()) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      xTo(relX * strength)
      yTo(relY * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </div>
  )
}
