'use client'

import { useRef } from 'react'
import { gsap, useIsomorphicLayoutEffect, prefersMotion } from '@/components/anim/gsap'

const STEPS = [
  {
    num: '01',
    title: 'Listen',
    body: 'A confidential conversation to understand where you are — no pitch, no pressure.',
  },
  {
    num: '02',
    title: 'Diagnose',
    body: 'A clear, honest assessment of the gap between where you are and where you want to be.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'A tailored plan — governance framework, content system, or retail strategy — built for your specific context.',
  },
  {
    num: '04',
    title: 'Sustain',
    body: 'Ongoing support so the system keeps working after the engagement ends, not just during it.',
  },
]

/**
 * Section 4.5 — How We Work. Four-step engagement process connected by
 * a scroll-drawn line (horizontal on desktop, vertical on mobile).
 * Built to make a cautious family-business owner feel the engagement
 * is a predictable process, not a leap of faith.
 */
export function HowWeWork() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current
    if (!section || !prefersMotion()) return

    const ctx = gsap.context(() => {
      const hLine = section.querySelector('[data-line-h]')
      const vLine = section.querySelector('[data-line-v]')
      if (hLine) {
        gsap.fromTo(
          hLine,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 70%', end: 'center center', scrub: 1 },
          }
        )
      }
      if (vLine) {
        gsap.fromTo(
          vLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 80%', scrub: 1 },
          }
        )
      }
      gsap.from(section.querySelectorAll('[data-step]'), {
        scrollTrigger: { trigger: section, start: 'top 72%', toggleActions: 'play none none none' },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-(--bg-base) py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="mb-16 max-w-2xl md:mb-24">
          <p className="text-label text-(--gold)">The Process</p>
          <h2 className="font-display text-section mt-5 text-(--text-primary)">
            How an engagement
            <br />
            actually works.
          </h2>
        </div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div
            className="absolute top-[26px] right-0 left-0 hidden h-px bg-white/[0.06] md:block"
            aria-hidden="true"
          />
          <div
            data-line-h
            className="absolute top-[26px] right-0 left-0 hidden h-px md:block"
            style={{ background: 'linear-gradient(90deg, #6366F1, #D4A853)' }}
            aria-hidden="true"
          />
          {/* Mobile connecting line */}
          <div
            className="absolute top-0 bottom-0 left-[26px] w-px bg-white/[0.06] md:hidden"
            aria-hidden="true"
          />
          <div
            data-line-v
            className="absolute top-0 bottom-0 left-[26px] w-px md:hidden"
            style={{ background: 'linear-gradient(180deg, #6366F1, #D4A853)' }}
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((s) => (
              <li key={s.num} data-step className="relative flex gap-6 md:block md:pt-0">
                <span
                  className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-(--border) bg-(--bg-base)"
                  aria-hidden="true"
                >
                  <span className="font-display text-lg text-(--text-secondary)">{s.num}</span>
                </span>
                <div className="md:mt-8">
                  <h3 className="font-display text-xl text-(--text-primary)">{s.title}</h3>
                  <p className="mt-2.5 max-w-[26ch] text-[0.9rem] leading-relaxed text-(--text-secondary)">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
