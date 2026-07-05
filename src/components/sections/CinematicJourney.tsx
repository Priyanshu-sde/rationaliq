'use client'

import { useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect, prefersMotion } from "@/components/anim/gsap"

export interface Milestone {
  period: string
  title: string
  description: string
  image: string
  imageAlt: string
}

interface CinematicJourneyProps {
  milestones: Milestone[]
}

export function CinematicJourney({ milestones }: CinematicJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup images initial state
      gsap.set(imageRefs.current, { opacity: 0, scale: 1.1 })
      if (imageRefs.current[0]) {
        gsap.set(imageRefs.current[0], { opacity: 1, scale: 1.05 })
      }

      if (!prefersMotion()) {
        gsap.set(textRefs.current, { opacity: 1, y: 0 })
        // On reduced motion, just let the images sit or use native sticky without crossfade? 
        // Actually we can keep the crossfade, just remove the zoom.
      }

      // Animate text reveal
      textRefs.current.forEach((textRef, i) => {
        if (!textRef) return

        if (prefersMotion()) {
          gsap.fromTo(
            textRef,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textRef,
                start: "top 75%",
                end: "bottom 25%",
                toggleActions: "play reverse play reverse",
              },
            }
          )
        }

        // Image crossfade logic
        ScrollTrigger.create({
          trigger: textRef,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => transitionToImage(i),
          onEnterBack: () => transitionToImage(i),
        })
      })

      let currentImgIndex = 0;
      function transitionToImage(index: number) {
        if (index === currentImgIndex) return;
        
        const prevImg = imageRefs.current[currentImgIndex];
        if (prevImg) {
          gsap.to(prevImg, { opacity: 0, scale: 1.1, duration: 1, ease: "power2.inOut", overwrite: "auto" })
        }
        
        const nextImg = imageRefs.current[index];
        if (nextImg) {
          gsap.fromTo(nextImg, 
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1.05, duration: 1, ease: "power2.inOut", overwrite: "auto" }
          )
          
          if (prefersMotion()) {
            gsap.to(nextImg, {
              scale: 1,
              duration: 15, // Slow continuous zoom
              ease: "none",
              overwrite: false
            })
          }
        }
        currentImgIndex = index;
      }
    }, containerRef)

    return () => ctx.revert()
  }, [milestones])

  return (
    <div ref={containerRef} className="relative w-full bg-brand-fg">
      <div className="flex flex-col md:flex-row">
        
        {/* Left/Background: Sticky Image Container */}
        <div className="sticky top-0 z-0 h-[60vh] md:h-screen w-full md:w-1/2 overflow-hidden bg-brand-fg">
          {milestones.map((m, i) => (
            <div key={m.period} className="absolute inset-0">
              <Image
                ref={(el) => { imageRefs.current[i] = el }}
                src={m.image}
                alt={m.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-fg/50 via-transparent to-brand-fg/90 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-brand-fg" />
            </div>
          ))}
          {/* Overlay to darken images slightly for text contrast on mobile */}
          <div className="absolute inset-0 bg-brand-fg/30 md:hidden" />
        </div>

        {/* Right/Foreground: Scrolling Text Container */}
        <div className="relative z-10 w-full md:w-1/2 -mt-[20vh] md:mt-0">
          {milestones.map((m, i) => (
            <div
              key={m.period}
              className="flex min-h-[80vh] flex-col justify-center px-4 py-20 sm:px-8 md:min-h-screen md:px-16 lg:px-24"
            >
              <div 
                ref={(el) => { textRefs.current[i] = el }}
                className="max-w-xl rounded-2xl bg-brand-fg/90 p-8 shadow-2xl backdrop-blur-md border border-white/5 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none md:border-none"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/15 font-serif text-lg font-bold text-brand-accent ring-1 ring-brand-accent/30 shadow-[0_0_15px_rgba(192,152,88,0.2)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                    {m.period}
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-semibold text-white md:text-4xl lg:text-5xl mb-6">
                  {m.title}
                </h3>
                <p className="leading-relaxed text-white/70 text-lg md:text-xl">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
          {/* Add some padding at the bottom so the last item can reach the middle of the screen comfortably */}
          <div className="h-[20vh] md:h-[50vh]"></div>
        </div>
        
      </div>
    </div>
  )
}
