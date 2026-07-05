'use client'

import { useRef } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from './gsap'

interface RotatingWord {
  text: string
  className?: string
}

interface RotatingWordsProps {
  words: RotatingWord[]
  /** Seconds each word stays fully visible before rotating. */
  interval?: number
  /** Duration of the slide transition in seconds. */
  duration?: number
  className?: string
}

/**
 * Shows one word at a time, cycling through the list. Each word slides up
 * and out while the next slides up into its place — a vertical scroll loop.
 */
export function RotatingWords({
  words,
  interval = 2,
  duration = 0.6,
  className,
}: RotatingWordsProps) {
  const wrapRef = useRef<HTMLSpanElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const items = Array.from(
      wrap.querySelectorAll<HTMLElement>('[data-rotating-word]')
    )
    if (items.length === 0) return

    if (!prefersMotion() || items.length === 1) {
      gsap.set(items, { yPercent: 0, opacity: 0 })
      gsap.set(items[0], { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Stack all words; only the first is visible to start.
      gsap.set(items, { yPercent: 100, opacity: 0 })
      gsap.set(items[0], { yPercent: 0, opacity: 1 })

      const tl = gsap.timeline({ repeat: -1 })

      items.forEach((_, i) => {
        const current = items[i]
        const next = items[(i + 1) % items.length]

        tl.to({}, { duration: interval })
          .set(next, { yPercent: 100, opacity: 0 })
          .to(
            current,
            { yPercent: -100, opacity: 0, duration, ease: 'power3.inOut' },
            '<'
          )
          .to(
            next,
            { yPercent: 0, opacity: 1, duration, ease: 'power3.inOut' },
            '<'
          )
      })
    }, wrap)

    return () => ctx.revert()
  }, [interval, duration, words.length])

  // Width is driven by the longest word so the layout doesn't jump.
  const longest = words.reduce(
    (a, b) => (b.text.length > a.length ? b.text : a),
    ''
  )

  return (
    <span
      ref={wrapRef}
      className={`relative inline-grid overflow-hidden align-bottom ${className ?? ''}`}
    >
      {/* Invisible sizer keeps the inline box at the widest word. */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
      </span>
      {words.map((w, i) => (
        <span
          key={`${w.text}-${i}`}
          data-rotating-word
          className={`col-start-1 row-start-1 whitespace-nowrap ${w.className ?? ''}`}
        >
          {w.text}
        </span>
      ))}
    </span>
  )
}
