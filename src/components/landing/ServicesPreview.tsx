'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mic, Landmark, Store, ArrowRight } from 'lucide-react'
import { TiltCard } from '@/components/anim'
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from '@/components/anim/gsap'
import { SERVICES } from '@/data/services'

export function ServicesPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          // Multiply progress by 6 to make switching fast (happens in the first half of the scroll)
          // The last item (index 3) will stay pinned for the entire second half of the scroll distance!
          const newIndex = Math.min(3, Math.floor(self.progress * 6))
          setActiveIndex(newIndex)
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="relative">
      <div className="absolute inset-0 z-0 bg-black">
        {SERVICES.map((s, i) => (
          <Image
            key={s.title}
            src={s.image}
            alt={`${s.title} Background`}
            fill
            unoptimized
            className={`object-cover transition-opacity duration-1000 ease-in-out ${activeIndex === i ? 'opacity-100' : 'opacity-0'
              }`}
            priority={i === 0}
          />
        ))}
        <div className="absolute inset-0 bg-(--bg-base)/80 backdrop-blur-[2px]" />
      </div>
      {/* 300vh container: 200vh of total scroll distance. 
          Transitions happen quickly in the first 100vh, leaving the last 100vh to read the final service before it scrolls away. */}
      <div ref={containerRef} className="relative h-[300vh]">
        {/* Sticky content that stays in view while scrolling the 300vh parent */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-[1200px] px-6 md:px-12 flex-col">

            {/* Section Header */}
            <div className="mb-12 md:mb-16 max-w-2xl shrink-0">
              <p className="text-label text-(--gold)">
                What we do
              </p>
              <h2 className="font-display text-section mt-5 text-(--text-primary)">
                Four segments.
                <br />
                One standard.
              </h2>
            </div>

            {/* Content Area */}
            <div className="flex flex-col md:flex-row relative items-center gap-16 md:gap-0">

              {/* Left Side: Details */}
              <div className="w-full md:w-1/2 relative h-[380px] md:h-[450px] shrink-0 md:shrink">
                {SERVICES.map((s, i) => {
                  const Icon = s.icon
                  const isActive = activeIndex === i

                  return (
                    <div
                      key={s.title}
                      className={`absolute inset-0 flex items-center justify-center md:justify-start transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive
                        ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                        : 'opacity-0 translate-y-12 pointer-events-none scale-95'
                        }`}
                    >
                      <div className="w-full max-w-md h-full md:h-auto px-4 md:px-0">
                        <TiltCard
                          max={4}
                          lift={0}
                          className="group relative h-full w-full bg-transparent"
                        >
                          <Link href={s.href} className="flex h-full flex-col justify-center p-0 md:p-8">
                            <span className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ color: s.accent }}>
                              {s.tag}
                            </span>
                            <h3 className="font-display text-3xl md:text-4xl mt-5 text-white drop-shadow-md">
                              {s.title}
                            </h3>
                            <p className="mt-5 text-base md:text-lg leading-relaxed text-white/90 drop-shadow max-w-lg">
                              {s.body}
                            </p>
                            <span className="mt-8 inline-flex items-center gap-2 text-base font-medium text-white drop-shadow-md">
                              Explore practice
                              <ArrowRight
                                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                                aria-hidden="true"
                              />
                            </span>
                          </Link>
                        </TiltCard>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right Side: Headings */}
              <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-16 gap-4 md:gap-10">
                {SERVICES.map((s, i) => {
                  const isActive = activeIndex === i

                  return (
                    <div
                      key={s.title}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left flex items-center ${isActive ? 'scale-110 -translate-y-3 opacity-100' : 'scale-100 translate-y-0 opacity-40 hover:opacity-70'
                        }`}
                    >
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-display text-white drop-shadow-xl">
                        {s.title}
                      </h3>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

