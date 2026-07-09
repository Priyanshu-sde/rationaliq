"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/components/anim/gsap"

export function FounderProfile() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const textPanelRef = useRef<HTMLDivElement>(null)
  const textScrollRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline linked to the container scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
        },
      })

      const imgTarget = imageWrapperRef.current?.querySelector('img')
      if (imgTarget) {
        // Initial setup for the image (shifted 20% left)
        gsap.set(imgTarget, { objectPosition: "30% 50%" })
      }

      // Phase 1 (0 to 0.5)
      // Text scrolls up
      tl.to(textScrollRef.current, { yPercent: -150, ease: "none", duration: 0.5 }, 0)
      
      // Phase 2 (0.5 to 0.75)
      // Blur fades out & image shrinks to rounded rectangle
      tl.to([textPanelRef.current, nameRef.current], { 
        opacity: 0, 
        ease: "power2.inOut", 
        duration: 0.25 
      }, 0.5)

      tl.to(imageWrapperRef.current, {
        width: "90vw",
        height: "80vh",
        borderRadius: "2rem", // Rounded rectangle
        ease: "power2.inOut",
        duration: 0.25,
      }, 0.5)

      if (imgTarget) {
        tl.to(imgTarget, {
          objectPosition: "50% 50%", // Re-center image
          ease: "power2.inOut",
          duration: 0.25
        }, 0.5)
      }

      // Phase 3 (0.75 to 1)
      // Pill shape (rectangle with half circle on sides), staying centered (but shifted up for quote)
      tl.to(imageWrapperRef.current, {
        width: "50vw",
        height: "300px",
        borderRadius: "999px", // 999px creates the perfect pill/half-circle shape
        yPercent: -80, // Shift up from center to make room for the quote
        ease: "power2.inOut",
        duration: 0.25,
      }, 0.75)

      if (imgTarget) {
        tl.to(imgTarget, {
          objectPosition: "50% 25%", // Crop to founder's face
          ease: "power2.inOut",
          duration: 0.25
        }, 0.75)
      }

      // Quote fades in centered below the pill
      tl.fromTo(
        quoteRef.current, 
        { opacity: 0, y: 100 }, 
        { opacity: 1, y: 50, ease: "power2.out", duration: 0.15 }, 
        0.85
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#07080F]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Animated Background Image Container */}
        <div
          ref={imageWrapperRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] overflow-hidden z-0 bg-zinc-900"
          style={{ borderRadius: "0px" }}
        >
          <Image
            src="/ted_talk.jpg"
            alt="CA Hitesh Saiswani Ted Talk"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
          />
          {/* Slight overlay for contrast */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>

        {/* Phase 1: Name and Designation (Bottom Left) */}
        <div
          ref={nameRef}
          className="absolute bottom-12 left-12 md:bottom-16 md:left-16 z-20 pointer-events-none"
        >
          <h3 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-white mb-2">
            Hitesh Saiswani
          </h3>
          <p className="text-2xl font-medium tracking-wide text-gold">Founder & CA</p>
        </div>

        {/* Phase 1: Right Text Panel */}
        <div
          ref={textPanelRef}
          // The smooth mask for the blur transition
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 250px)",
            maskImage: "linear-gradient(to right, transparent, black 250px)"
          }}
          className="absolute right-0 top-0 h-full w-full md:w-[60vw] bg-[#07080F]/40 backdrop-blur-2xl z-10 overflow-hidden"
        >
          {/* Scrollable text container */}
          <div 
            ref={textScrollRef}
            className="absolute left-0 top-[50vh] w-full px-16 md:px-24 lg:px-32 flex flex-col gap-12"
          >
            <div className="space-y-12 text-xl md:text-2xl leading-relaxed text-white/90 pb-[50vh]">
              <p>
                Born and raised in a business family in consumer goods retail,
                Hitesh started working part-time in the family business at age
                13. Witnessing firsthand the struggles of data management and
                operational inefficiencies inspired his path into chartered
                accountancy.
              </p>
              <p>
                Completing his CA articleship from 2016–2018, he immersed himself
                in business, legal, and tax practices, officially qualifying as a
                Chartered Accountant in 2019.
              </p>
              <p>
                His professional journey accelerated at global giants{" "}
                <strong className="font-semibold text-white">Grant Thornton and EY (2019–2022)</strong>,
                where he focused on M&A, due diligence, and facilitating
                family-office investments into high-growth startups.
              </p>
              <p>
                As one of the first employees at{" "}
                <strong className="font-semibold text-white">Sunicon Venture Capital Fund</strong>,
                Hitesh played a pivotal role investing in 3 startups and
                supporting several others through fundraising. His content work
                revealed a broader market need, leading to financial, fundraising,
                and succession-planning content for top ed-tech startups.
              </p>
              <p>
                Today, through RationalIQ, Hitesh has worked with over{" "}
                <strong className="font-semibold text-gold">250+ family business leaders</strong>{" "}
                on succession planning, growth strategy, intergenerational
                conflict resolution, family constitutions, and next-gen coaching —
                while advising D2C startups on offline expansion.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 3: Quote Section */}
        <div
          ref={quoteRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 md:px-24 flex justify-center z-20 pointer-events-none opacity-0 mt-32"
        >
          <div className="max-w-4xl text-center space-y-6 pt-12 md:pt-0">
            <svg className="w-10 h-10 mx-auto text-gold/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-3xl md:text-5xl font-serif italic leading-tight text-white">
              "Notably, he helped architect the content strategy that grew a finance podcaster's channel from 330K to over 450K subscribers."
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
