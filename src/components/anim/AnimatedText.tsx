'use client'

import { useRef, ElementType } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from './gsap'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText)
}

interface AnimatedTextProps {
  children: React.ReactNode
  as?: ElementType
  className?: string
  /** Animate per "word" or "char". */
  by?: 'word' | 'char'
  delay?: number
  stagger?: number
  /** Trigger when scrolled into view rather than on mount. */
  onScroll?: boolean
}

/**
 * Masked word/character reveal using GSAP SplitText. Each unit rises up
 * from behind an overflow-hidden mask for a premium editorial feel.
 */
export function AnimatedText({
  children,
  as,
  className,
  by = 'word',
  delay = 0,
  stagger = 0.08,
  onScroll = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement | null>(null)
  const Tag = (as || 'div') as ElementType

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (!prefersMotion()) {
      gsap.set(el, { opacity: 1 })
      return
    }

    let split: SplitText | null = null
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: by === 'char' ? 'chars' : 'words',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        mask: by === 'char' ? 'chars' : 'words',
      })
      const targets = by === 'char' ? split.chars : split.words

      gsap.set(el, { opacity: 1 })
      gsap.from(targets, {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger,
        delay,
        ...(onScroll
          ? { scrollTrigger: { trigger: el, start: 'top 85%' } }
          : {}),
      })
    }, el)

    return () => {
      split?.revert()
      ctx.revert()
    }
  }, [by, delay, stagger, onScroll])

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  )
}
