'use client'

import { useRef, ElementType } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from './gsap'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: React.ReactNode
  as?: ElementType
  className?: string
  /** Direction the element travels in from. */
  direction?: Direction
  /** Travel distance in px. */
  distance?: number
  delay?: number
  duration?: number
  /** Animate direct children in sequence instead of the wrapper itself. */
  stagger?: number
  /** Add a subtle scale-in. */
  scale?: boolean
  /** Start position for ScrollTrigger. */
  start?: string
  once?: boolean
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  none: {},
}

export function Reveal({
  children,
  as,
  className,
  direction = 'up',
  distance = 40,
  delay = 0,
  duration = 0.9,
  stagger,
  scale = false,
  start = 'top 85%',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const Tag = (as || 'div') as ElementType

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (!prefersMotion()) {
      gsap.set(stagger ? el.children : el, { opacity: 1, clearProps: 'all' })
      return
    }

    const o = offsets[direction]
    const from = {
      opacity: 0,
      x: (o.x ?? 0) * distance,
      y: (o.y ?? 0) * distance,
      ...(scale ? { scale: 0.94 } : {}),
    }
    const to = {
      opacity: 1,
      x: 0,
      y: 0,
      ...(scale ? { scale: 1 } : {}),
      duration,
      delay,
      ease: 'power3.out',
      ...(stagger ? { stagger } : {}),
    }

    const targets = stagger ? el.children : el
    const ctx = gsap.context(() => {
      gsap.fromTo(targets, from, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [direction, distance, delay, duration, stagger, scale, start, once])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
