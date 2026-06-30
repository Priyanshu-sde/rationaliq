'use client'

import { useRef } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from './gsap'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Max tilt in degrees. */
  max?: number
  /** Lift on hover in px. */
  lift?: number
}

/**
 * Subtle 3D tilt that tracks the cursor, with a lift + glare sheen.
 * Springs back to rest on leave. Falls back gracefully without motion.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  lift = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const glareRef = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || !prefersMotion()) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rotY(px * max)
      rotX(-py * max)
      if (glareRef.current) {
        gsap.to(glareRef.current, {
          opacity: 0.12,
          duration: 0.4,
          background: `radial-gradient(circle at ${(px + 0.5) * 100}% ${
            (py + 0.5) * 100
          }%, rgba(255,255,255,0.9), transparent 60%)`,
        })
      }
    }
    const onEnter = () => yTo(-lift)
    const onLeave = () => {
      rotX(0)
      rotY(0)
      yTo(0)
      if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.4 })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max, lift])

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0"
      />
      {children}
    </div>
  )
}
