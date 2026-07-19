'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from '@/components/anim/gsap'
import { useIsomorphicLayoutEffect } from '@/components/anim/gsap'

const paths = [
  {
    id: 'vc',
    name: 'Venture Capital',
    blurb: 'Get seen my top 1% founders through thought leadership IPs. And yes, content creation is not thought leadership.',
    href: '/services/venture-capital',
    image: '/vc.jpg',
    color: '#f59e0b', // amber-500
    code: '01',
    tag: 'ALLOCATORS'
  },
  {
    id: 'startups',
    name: 'D2C Startups',
    blurb: "If you've peaked at selling online and want fractional business intelligence for your offline retail strategy, you're at the right place.",
    href: '/services/startups',
    image: '/startup.jpg',
    color: '#e879f9', // fuchsia-400
    code: '02',
    tag: 'FOUNDERS'
  },
  {
    id: 'family',
    name: 'Family Businesses',
    blurb: 'Leverage the experience of a Chartered Accountant and Certified Family Business Advisor from FFI USA who was born in a business family as a one stop solution.',
    href: '/services/family-businesses',
    image: '/family.jpg',
    color: '#fcd34d', // amber-300
    code: '03',
    tag: 'STEWARDS'
  },
  {
    id: 'education',
    name: 'Education',
    blurb: 'Feel the transformation through education and training initiatives that are always hands on, directly translate to skills and change the way you think.',
    href: '/services/educational-companies',
    image: '/education.jpg',
    color: '#99f6e4', // teal-200
    code: '04',
    tag: 'INSTITUTIONS'
  },
]

export function PathSelector() {
  const containerRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Simulate pinning the landing page content so PathSelector slides over it
      gsap.fromTo('.landing-content', 
        { y: () => -window.innerHeight },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      )

      // Exit transition: the selector recedes into depth (scale, fade,
      // blur) as the hero rises over it. Front-loaded easing so the
      // recede is felt immediately, but synced to the full curtain
      // reveal so there is never a dead scroll gap.
      if (containerRef.current) {
        gsap.to(Array.from(containerRef.current.children), {
          scale: 0.96,
          opacity: 0,
          filter: 'blur(4px)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      const panels = containerRef.current?.querySelectorAll<HTMLElement>("[data-panel]");
      if (panels) {
        panels.forEach((p) => {
          gsap.fromTo(
            p,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "expo.out",
              delay: 0.1 * Number(p.dataset.i),
            }
          );
        });
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative z-[100] h-[100svh] w-full bg-[#0a0a0e] overflow-hidden font-sans"
    >
      <div className="absolute top-24 left-8 md:left-12 z-40 pointer-events-none">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
          Direction 01 / RationalIQ
        </p>
        <h1 className="mt-3 font-serif italic text-4xl md:text-5xl text-balance max-w-[14ch] text-white">
          Move across. Feel the pull.
        </h1>
      </div>

      <main
        className="h-full w-full flex flex-col md:flex-row"
        onMouseLeave={() => setActive(null)}
      >
        {paths.map((a, i) => {
          const isActive = active === i;
          const isDim = active !== null && !isActive;
          return (
            <Link
              href={a.href}
              key={a.id}
              data-panel
              data-i={i}
              onMouseEnter={() => setActive(i)}
              className="group relative overflow-hidden border-r border-white/5 last:border-r-0 cursor-pointer transition-[flex-basis,filter,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                flexBasis: isActive ? "48%" : isDim ? "17.33%" : "25%",
                filter: isDim ? "grayscale(0.5)" : "none",
                opacity: isDim ? 0.55 : 1,
              }}
            >
              <Image
                src={a.image}
                alt={a.name}
                fill
                priority
                className="absolute inset-0 object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, rgba(10,10,14,0.55) 0%, rgba(10,10,14,0.35) 40%, rgba(10,10,14,0.95) 100%)`,
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 opacity-70 mix-blend-screen transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse at bottom, ${a.color}55, transparent 70%)`,
                  opacity: isActive ? 0.8 : 0,
                }}
              />
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
                <div className="flex items-start justify-between">
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.3em]"
                    style={{ color: isActive ? a.color : 'rgba(255,255,255,0.4)' }}
                  >
                    {a.code}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
                    {a.tag}
                  </span>
                </div>
                <div>
                  <h2
                    className="font-serif italic leading-[0.95] transition-all duration-500"
                    style={{
                      fontSize: isActive ? "clamp(3rem, 6vw, 5.5rem)" : "clamp(2rem, 3.2vw, 3.5rem)",
                      color: "white",
                    }}
                  >
                    {a.name}
                  </h2>
                  <div
                    className="overflow-hidden transition-[max-height,opacity] duration-700 ease-out"
                    style={{
                      maxHeight: isActive ? 320 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <p className="mt-6 max-w-md text-white font-medium drop-shadow-md leading-relaxed text-sm md:text-base">
                      {a.blurb}
                    </p>
                    <div
                      className="mt-8 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-white"
                    >
                      Enter portal
                      <span
                        className="block h-px w-8 transition-all"
                        style={{ backgroundColor: a.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </main>

      <footer className="absolute bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/40">
          Hover to focus / Click to enter
        </span>
      </footer>
    </section>
  )
}
