'use client'

import { useRef } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from './gsap'

interface CountUpProps {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

/** Counts from 0 to `value` when scrolled into view. */
export function CountUp({
  value,
  className,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const format = (n: number) =>
      `${prefix}${n.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`

    if (!prefersMotion()) {
      el.textContent = format(value)
      return
    }

    const obj = { val: 0 }
    el.textContent = format(0)

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => {
          el.textContent = format(obj.val)
        },
      })
    }, el)

    return () => ctx.revert()
  }, [value, prefix, suffix, duration, decimals])

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}
