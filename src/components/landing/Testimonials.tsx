'use client'

import { useRef } from 'react'
import { DraggableCardContainer, DraggableCardBody } from '@/components/ui/draggable-card'
import { urlForImage } from '@/sanity/lib/image'

const GRADIENTS = [
  'linear-gradient(135deg, var(--amber), var(--gold))',
  'linear-gradient(135deg, var(--indigo), var(--purple))',
  'linear-gradient(135deg, var(--emerald), var(--blue))',
  'linear-gradient(135deg, var(--blue), var(--indigo))',
  'linear-gradient(135deg, var(--gold), var(--emerald))',
  'linear-gradient(135deg, var(--purple), var(--amber))',
  'linear-gradient(135deg, var(--emerald), var(--amber))',
]

const CARD_POSITIONS = [
  'absolute top-12 left-[2%] md:left-[5%] rotate-[-4deg] w-[85vw] sm:w-80 md:w-[28rem]',
  'absolute top-6 left-[40%] md:left-[35%] rotate-[3deg] w-[85vw] sm:w-80 md:w-[28rem]',
  'absolute top-20 right-[2%] md:right-[5%] rotate-[5deg] w-[85vw] sm:w-80 md:w-[28rem]',
  'absolute top-64 left-[10%] md:left-[15%] rotate-[-6deg] w-[85vw] sm:w-80 md:w-[28rem]',
  'absolute top-72 right-[10%] md:right-[20%] rotate-[-3deg] w-[85vw] sm:w-80 md:w-[28rem]',
  'absolute top-96 left-[20%] md:left-[40%] rotate-[4deg] w-[85vw] sm:w-80 md:w-[28rem]',
  'absolute top-[32rem] right-[5%] md:right-[5%] rotate-[6deg] w-[85vw] sm:w-80 md:w-[28rem]',
]

/**
 * Section 6 - Testimonials. Renders ONLY when Sanity returns testimonials data.
 */
export function Testimonials({ items }: { items?: any[] }) {
  const containerRef = useRef<any>(null)

  if (!items || items.length === 0) {
    return null
  }

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

        {items.map((t, i) => {
          const quote = t.quote || ''
          const name = t.clientName || t.name || 'Client'
          const role = t.clientRoleCompany || t.role || ''
          const gradient = GRADIENTS[i % GRADIENTS.length]
          const imgUrl = t.photo ? urlForImage(t.photo)?.url() : null

          return (
            <DraggableCardBody
              key={t._id || i}
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
                  {quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3.5 pointer-events-none select-none">
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={name}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      className="h-11 w-11 shrink-0 rounded-full"
                      style={{ background: gradient }}
                      aria-hidden="true"
                    />
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-(--text-primary)">{name}</span>
                    {role && <span className="block text-xs text-(--text-secondary)">{role}</span>}
                  </span>
                </figcaption>
              </figure>
            </DraggableCardBody>
          )
        })}
      </DraggableCardContainer>
    </section>
  )
}
