'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from './gsap'

/** Thin gold progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })
      gsap.to(el, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[200] h-[2px]">
      <div ref={ref} className="h-full w-full bg-(--indigo)" />
    </div>
  )
}
