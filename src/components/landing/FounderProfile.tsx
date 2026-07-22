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
      const mm = gsap.matchMedia()

      mm.add({
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      }, (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean }

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
          // Initial setup for the image (shifted 30% left)
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
          width: isMobile ? "88vw" : "90vw",
          height: isMobile ? "70vh" : "80vh",
          borderRadius: isMobile ? "1.5rem" : "2rem", // Rounded rectangle
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
          width: isMobile ? "200px" : "50vw",
          height: isMobile ? "140px" : "300px",
          borderRadius: "999px", // 999px creates the perfect pill/half-circle shape
          yPercent: isMobile ? -135 : -80, // Shift up from center to make room for the quote
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
          { opacity: 0, y: isMobile ? 20 : 60 },
          { opacity: 1, y: isMobile ? 0 : 10, ease: "power2.out", duration: 0.15 },
          0.85
        )
      })

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
            src="/ted_talk(1).jpg"
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
            className="absolute left-0 top-[50vh] w-full px-6 md:px-16 lg:px-32 flex flex-col gap-12"
          >
            <div className="space-y-12 text-xl md:text-2xl leading-relaxed text-white/90 pb-[50vh]">
              <p>
                Born and raised in a business family, Hitesh started working part-time in his family's business at the age of 13. Founded by his grandfather in 1974, the business initially sold radios and black-and-white televisions before expanding to become a direct dealer for major brands like LG, Samsung, Blue Star, Godrej, and Panasonic.
              </p>
              <p>
                At 13, he learned the fundamentals of commerce-from interacting with customers and selling electronics, to processing consumer loan forms and managing logistics. Witnessing firsthand the complexities of understanding and managing financial data ultimately inspired his path into Chartered Accountancy.
              </p>
              <p>
                During his CA articleship (2015–2018), he immersed himself in business, legal, and tax practices, approaching them through the dual lens of an accountant and an entrepreneur. Seeking experience beyond the family enterprise, he joined <strong className="font-semibold text-white">Grant Thornton and EY (2019–2022)</strong>, specializing in M&A due diligence and family office investments into high-growth startups.
              </p>
              <p>
                This expertise led him to <strong className="font-semibold text-white">Sunicon Venture Capital Fund</strong> as an early investment team member. There, he facilitated startup funding and gained deep insight into how family business owners invest surplus capital. He also spearheaded content creation to establish the fund's thought leadership and attract top-tier founders.
              </p>
              <p>
                In early 2024, he founded RationalIQ. Partnering with top education companies, he has produced over 100 hours of educational content covering finance, sales, and family business succession, driven by his core belief that content and education are inherently inseparable today.
              </p>
              <p>
                Hitesh is a <strong className="font-semibold text-gold">Certified Family Business Advisor from the Family Firm Institute, USA</strong>, and has trained over 250 family business leaders in live sessions on succession planning, growth strategy, intergenerational conflict resolution, family constitutions, and next-gen coaching.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 3: Quote Section */}
        <div
          ref={quoteRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 md:px-24 flex justify-center z-20 pointer-events-none opacity-0 mt-0 sm:mt-4 md:mt-12"
        >
          <div className="max-w-4xl text-center space-y-3 sm:space-y-4 md:space-y-6">
            <svg className="w-7 h-7 md:w-10 md:h-10 mx-auto text-gold/40 mb-2 md:mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl sm:text-3xl md:text-5xl font-serif italic leading-snug md:leading-tight text-white">
              "Everything that is to be known already exists. We just need to talk to people who know it. Before ideas, comes knowledge. After knowledge, comes execution."
            </p>
          </div>
        </div>

        {/* Moving Strip Marquee */}
        <div className="marquee-container" aria-hidden="true">
          <div className="marquee-track">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex shrink-0">
                {[
                  'Chartered Accountant',
                  'Certified Family Business Advisor',
                  'Educator',
                  'Family Business Expert',
                  'SOP Strategist',
                  'Governance Systems Architect',
                  'Next-Generation Family Business Trainer',
                  'Content Strategist',
                  'Thought Leader',
                  'Fractional CXO',
                  'Growth Advisor',
                  'Entrepreneur',
                ].map((role, j) => (
                  <span key={`${i}-${j}`} className="marquee-item">
                    {role}
                    <span className="marquee-dot">&bull;</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
