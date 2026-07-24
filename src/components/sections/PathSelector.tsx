'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mouse, ChevronDown } from 'lucide-react'
import { gsap } from '@/components/anim/gsap'
import { useIsomorphicLayoutEffect } from '@/components/anim/gsap'
import { cn } from '@/lib/utils'
import { SERVICES as paths } from '@/data/services'

export function PathSelector() {
  const containerRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

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
      className="relative z-[100] min-h-[100svh] md:h-[100svh] w-full bg-[#0a0a0e] md:overflow-hidden font-sans flex flex-col md:block"
    >
      <div className="relative pt-12 pb-6 px-4 md:absolute md:top-24 md:left-12 md:p-0 md:z-40 md:pointer-events-none">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
          RationalIQ
        </p>
        <h1 className="mt-3 font-serif italic text-3xl md:text-5xl text-balance max-w-[14ch] text-white">
          Get Started: Choose your path.
        </h1>
      </div>

      <main
        className="md:h-full w-full grid grid-cols-2 md:flex md:flex-row flex-1"
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
              className={cn(
                "group relative overflow-hidden border-b border-r md:border-b-0 border-white/5 cursor-pointer transition-[flex-basis,filter,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "h-[35svh] md:h-auto md:min-h-0", // fixed height on mobile grid
                "md:[flex-basis:var(--desktop-flex-basis)] md:[filter:var(--desktop-filter)] md:[opacity:var(--desktop-opacity)]"
              )}
              style={{
                "--desktop-flex-basis": isActive ? "48%" : isDim ? "17.33%" : "25%",
                "--desktop-filter": isDim ? "grayscale(0.5)" : "none",
                "--desktop-opacity": isDim ? 0.55 : 1,
              } as React.CSSProperties}
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
                className="absolute inset-x-0 bottom-0 h-3/4 opacity-100 md:opacity-70 mix-blend-screen transition-opacity duration-700 md:[opacity:var(--desktop-overlay-opacity)]"
                style={{
                  background: `radial-gradient(ellipse at bottom, ${a.color}88, transparent 70%)`,
                  "--desktop-overlay-opacity": isActive ? 0.8 : 0,
                } as React.CSSProperties}
              />
              <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-12">
                <div className="flex items-start justify-between">
                  <span
                    className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] md:[color:var(--desktop-code-color)]"
                    style={{ 
                      color: a.color,
                      "--desktop-code-color": isActive ? a.color : 'rgba(255,255,255,0.4)'
                    } as React.CSSProperties}
                  >
                    {a.code}
                  </span>
                  <span className="hidden md:block text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
                    {a.tag}
                  </span>
                </div>
                <div>
                  <h2
                    className="font-serif italic leading-[1.1] md:leading-[0.95] transition-all duration-500 text-[clamp(1.5rem,5vw,2rem)] md:[font-size:var(--desktop-font-size)]"
                    style={{
                      "--desktop-font-size": isActive ? "clamp(3rem, 6vw, 5.5rem)" : "clamp(2rem, 3.2vw, 3.5rem)",
                      color: "white",
                    } as React.CSSProperties}
                  >
                    {a.name}
                  </h2>
                  <div
                    className="overflow-hidden transition-[max-height,opacity] duration-700 ease-out hidden md:block md:max-h-0 md:opacity-0 group-hover:md:max-h-[320px] group-hover:md:opacity-100 md:[max-height:var(--desktop-max-height)] md:[opacity:var(--desktop-opacity)]"
                    style={{
                      "--desktop-max-height": isActive ? "320px" : "0px",
                      "--desktop-opacity": isActive ? 1 : 0,
                    } as React.CSSProperties}
                  >
                    <p className="mt-6 max-w-md font-medium drop-shadow-md leading-relaxed text-sm md:text-base"
                      style={{
                        color: "white",
                      }}>
                      {a.blurb}
                    </p>

                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </main>

      <footer className="absolute bottom-4 md:bottom-6 inset-x-0 z-40 flex flex-col items-center justify-center pointer-events-none gap-3">
        <span className="hidden md:block text-[10px] font-mono uppercase tracking-[0.35em] text-white/80 drop-shadow-md">
          Hover to focus / Click to enter
        </span>
        <span className="md:hidden text-[10px] font-mono uppercase tracking-[0.35em] text-white/80 drop-shadow-md">
          Tap to enter
        </span>
        
        <div className="flex flex-col items-center gap-1.5 opacity-100 drop-shadow-md">
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/90">Scroll for more</span>
          <div className="animate-bounce mt-1">
            <Mouse className="hidden md:block w-4 h-4 text-white/90" />
            <ChevronDown className="md:hidden w-4 h-4 text-white/90" />
          </div>
        </div>
      </footer>
    </section>
  )
}
