'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HEADLINE: Array<Array<{ text: string; italic?: boolean }>> = [
  [{ text: 'Rational', italic: true }, { text: 'intelligence.' }],
  [{ text: 'Undeniable' }],
  [{ text: 'authority.' }],
]

const wordVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.4 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

/**
 * Section 2 — Hero / Manifesto. Full-viewport dark hero with a slow
 * gradient mesh, word-staggered serif headline, and two CTAs.
 * Subtle mouse parallax on fine pointers; static under reduced motion.
 */
export function LandingHero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const blobARef = useRef<HTMLDivElement | null>(null)
  const blobBRef = useRef<HTMLDivElement | null>(null)
  const headRef = useRef<HTMLHeadingElement | null>(null)

  // Mouse parallax — blobs drift against the cursor, headline with it.
  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const section = sectionRef.current
    if (!section) return

    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width - 0.5
      target.y = (e.clientY - r.top) / r.height - 0.5
    }
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.05
      pos.y += (target.y - pos.y) * 0.05
      if (blobARef.current)
        blobARef.current.style.translate = `${pos.x * -40}px ${pos.y * -40}px`
      if (blobBRef.current)
        blobBRef.current.style.translate = `${pos.x * 40}px ${pos.y * 40}px`
      if (headRef.current)
        headRef.current.style.translate = `${pos.x * 10}px ${pos.y * 10}px`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    section.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', onMove)
    }
  }, [reduce])

  let wordIndex = -1

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--bg-base)"
    >
      {/* Background: gradient mesh + grid texture */}
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        ref={blobARef}
        aria-hidden="true"
        className="mesh-a pointer-events-none absolute -top-1/4 right-[-15%] h-[70vh] w-[70vh] rounded-full will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 65%)' }}
      />
      <div
        ref={blobBRef}
        aria-hidden="true"
        className="mesh-b pointer-events-none absolute bottom-[-25%] left-[-15%] h-[65vh] w-[65vh] rounded-full will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.09), transparent 65%)' }}
      />

      <div className="relative mx-auto flex max-w-[860px] flex-col items-center px-6 py-32 text-center md:px-12">
        <motion.p
          className="text-label text-(--gold)"
          variants={fadeUp}
          initial={reduce ? 'visible' : 'hidden'}
          animate="visible"
          custom={0.2}
        >
          {/* Thought Leadership &middot; Family Business &middot; D2C Strategy */}
        </motion.p>

        <h1 ref={headRef} className="font-display text-hero mt-7 text-(--text-primary) will-change-transform">
          {HEADLINE.map((line, li) => (
            <span key={li} className="block whitespace-nowrap">
              {line.map((word) => {
                wordIndex += 1
                return (
                  <motion.span
                    key={`${li}-${word.text}`}
                    className={`inline-block ${word.italic ? 'italic' : ''}`}
                    variants={wordVariants}
                    initial={reduce ? 'visible' : 'hidden'}
                    animate="visible"
                    custom={wordIndex}
                  >
                    {word.text}
                    {'\u00A0'}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
          variants={fadeUp}
          initial={reduce ? 'visible' : 'hidden'}
          animate="visible"
          custom={1.1}
        >
          <a
            href="mailto:hitesh@rationaliq.com"
            data-cursor-text="Click"
            className="btn-shimmer tier-2 press group inline-flex h-13 items-center gap-2.5 rounded-xl bg-(--indigo) px-8 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.4)]"
          >
            Email Hitesh
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <Link
            href="/contact"
            className="tier-2 press inline-flex h-13 items-center rounded-xl border border-(--border) px-8 text-sm font-medium text-(--text-secondary) hover:border-(--border-hover) hover:text-white"
          >
            Request a callback
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        variants={fadeUp}
        initial={reduce ? 'visible' : 'hidden'}
        animate="visible"
        custom={1.5}
        aria-hidden="true"
      >
        <span className="scroll-cue block h-10 w-px bg-gradient-to-b from-transparent via-(--text-secondary) to-transparent" />
      </motion.div>
    </section>
  )
}
