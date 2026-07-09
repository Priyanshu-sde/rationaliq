'use client'

import { useRef } from 'react'
import { DraggableCardContainer, DraggableCardBody } from '@/components/ui/draggable-card'

const TESTIMONIALS = [
  {
    quote:
      'Working with Hitesh gave our family business a governance framework we actually understand and use. The family constitution process alone resolved conflicts we’d been avoiding for years.',
    name: 'Business Owner',
    role: '3rd-gen Manufacturing Family',
    gradient: 'linear-gradient(135deg, var(--amber), var(--gold))',
  },
  {
    quote:
      'The thought leadership content strategy Hitesh built for us moved us from unknown to quoted in our industry within 4 months.',
    name: 'Founder',
    role: 'Early-stage SaaS Startup',
    gradient: 'linear-gradient(135deg, var(--indigo), var(--purple))',
  },
  {
    quote:
      'Hitesh’s understanding of the VC ecosystem made him invaluable when we were preparing our fundraising materials. He knows what investors are actually looking for.',
    name: 'Founder',
    role: 'D2C Brand',
    gradient: 'linear-gradient(135deg, var(--emerald), var(--blue))',
  },
  {
    quote:
      'RationalIQ helped us navigate a complex intergenerational transition. Hitesh’s neutral, structured approach saved our family dynamic while ensuring business continuity.',
    name: 'Managing Director',
    role: '2nd-gen Retail Chain',
    gradient: 'linear-gradient(135deg, var(--blue), var(--indigo))',
  },
  {
    quote:
      'The depth of insight Hitesh brings to offline expansion strategy is unparalleled. We successfully launched our physical footprint without the common pitfalls D2C brands face.',
    name: 'CEO',
    role: 'D2C FMCG Brand',
    gradient: 'linear-gradient(135deg, var(--gold), var(--emerald))',
  },
  {
    quote:
      'Our next-gen leaders went through Hitesh’s coaching program. The shift in their strategic thinking and operational maturity has been incredible.',
    name: 'Chairman',
    role: 'Family Conglomerate',
    gradient: 'linear-gradient(135deg, var(--purple), var(--amber))',
  },
  {
    quote:
      'His guidance on our M&A strategy was spot-on. RationalIQ doesn’t just give advice; they provide actionable frameworks that directly impact the bottom line.',
    name: 'Partner',
    role: 'Private Equity Firm',
    gradient: 'linear-gradient(135deg, var(--emerald), var(--amber))',
  },
]

const CARD_POSITIONS = [
  'absolute top-12 left-[2%] md:left-[5%] rotate-[-4deg] w-80 md:w-[28rem]',
  'absolute top-6 left-[40%] md:left-[35%] rotate-[3deg] w-80 md:w-[28rem]',
  'absolute top-20 right-[2%] md:right-[5%] rotate-[5deg] w-80 md:w-[28rem]',
  'absolute top-64 left-[10%] md:left-[15%] rotate-[-6deg] w-80 md:w-[28rem]',
  'absolute top-72 right-[10%] md:right-[20%] rotate-[-3deg] w-80 md:w-[28rem]',
  'absolute top-96 left-[20%] md:left-[40%] rotate-[4deg] w-80 md:w-[28rem]',
  'absolute top-[32rem] right-[5%] md:right-[5%] rotate-[6deg] w-80 md:w-[28rem]',
]

/**
 * Section 6 — Testimonials. Now using scattered draggable cards.
 */
export function Testimonials() {
  const containerRef = useRef<any>(null)

  return (
    <section className="relative bg-(--bg-base) py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 relative z-10">
        <div className="mb-8 max-w-2xl md:mb-12">
          <p className="text-label text-(--gold)">What clients say</p>
          <h2 className="font-display text-section mt-5 text-(--text-primary)">
            Results that
            <br />
            speak first.
          </h2>
        </div>
      </div>

      <DraggableCardContainer ref={containerRef} className="relative flex min-h-[70vh] w-full items-center justify-center overflow-visible px-6 md:px-12">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl md:text-3xl font-display text-(--text-secondary) opacity-20 pointer-events-none select-none">
          Drag to explore
        </p>
        
        {TESTIMONIALS.map((t, i) => (
          <DraggableCardBody
            key={t.role}
            containerRef={containerRef}
            className={CARD_POSITIONS[i % CARD_POSITIONS.length]}
          >
            <figure className="tier-2 relative flex h-full min-h-[300px] flex-col rounded-3xl border border-(--border-hover) bg-[#11131c] p-10 shadow-[0_24px_54px_rgba(0,0,0,0.6)]">
              <span
                className="font-display pointer-events-none absolute -top-4 left-6 select-none text-[7rem] leading-none text-(--indigo) opacity-30"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="relative mt-8 flex-1 text-lg font-medium tracking-wide leading-[1.8] text-white pointer-events-none select-none">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3.5 pointer-events-none select-none">
                <span
                  className="h-11 w-11 shrink-0 rounded-full"
                  style={{ background: t.gradient }}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-sm font-semibold text-(--text-primary)">{t.name}</span>
                  <span className="block text-xs text-(--text-secondary)">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  )
}
