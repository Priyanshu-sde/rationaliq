'use client'

import { useRef, ElementType } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from './gsap'

interface ParallaxProps {
  children: React.ReactNode
  as?: ElementType
  className?: string
  /** Positive moves slower (drifts down), negative moves faster (drifts up). */
  speed?: number
}

/** Scroll-linked parallax translation. */
export function Parallax({
  children,
  as,
  className,
  speed = 0.2,
}: ParallaxProps) {
  const ref = useRef<HTMLElement | null>(null)
  const Tag = (as || 'div') as ElementType

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || !prefersMotion()) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [speed])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
