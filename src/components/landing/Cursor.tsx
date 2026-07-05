'use client'

import { useEffect, useRef } from 'react'
import { prefersMotion } from '@/components/anim/gsap'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .cursor-hover'

/**
 * Custom cursor: a 12px dot that lags the pointer slightly, with a
 * larger lagged ring. Interactive elements grow the dot; elements with
 * `data-cursor-text` show a label inside the ring (hero CTA).
 *
 * Only mounts its behaviour on fine pointers; touch devices keep the
 * native (absent) cursor. Respects prefers-reduced-motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (!prefersMotion()) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.body.classList.add('has-custom-cursor')
    dot.style.opacity = '0'
    ring.style.opacity = '0'

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const dotPos = { ...target }
    const ringPos = { ...target }
    let hovering = false
    let seen = false
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!seen) {
        seen = true
        dotPos.x = ringPos.x = target.x
        dotPos.y = ringPos.y = target.y
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE)
      hovering = !!el
      const text = el?.closest?.('[data-cursor-text]')?.getAttribute('data-cursor-text') ?? ''
      label.textContent = text
      ring.dataset.label = text ? 'true' : 'false'
      dot.style.transform = hovering
        ? 'translate(-50%, -50%) scale(3)'
        : 'translate(-50%, -50%) scale(1)'
      dot.style.borderRadius = hovering ? '4px' : '50%'
      ring.style.width = text ? '64px' : '40px'
      ring.style.height = text ? '64px' : '40px'
    }

    const loop = () => {
      // ~80ms lag for the dot, longer for the ring
      dotPos.x += (target.x - dotPos.x) * 0.22
      dotPos.y += (target.y - dotPos.y) * 0.22
      ringPos.x += (target.x - ringPos.x) * 0.12
      ringPos.y += (target.y - ringPos.y) * 0.12
      dot.style.left = `${dotPos.x}px`
      dot.style.top = `${dotPos.y}px`
      ring.style.left = `${ringPos.x}px`
      ring.style.top = `${ringPos.y}px`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-[transform,border-radius] duration-300 md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 mix-blend-difference transition-[width,height] duration-300 md:flex"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <span
          ref={labelRef}
          className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white"
        />
      </div>
    </>
  )
}
