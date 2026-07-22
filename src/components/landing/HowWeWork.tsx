'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect, prefersMotion } from '@/components/anim/gsap'

const STEPS = [
  {
    num: '01',
    title: 'Listen',
    body: 'A confidential conversation to understand where you are - no pitch, no pressure.',
    deskX: 15, deskY: 83.33,
    mobX: 15, mobY: 15,
    deskStyle: { top: '30px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' as const },
    mobStyle: { left: '24px', top: '50%', transform: 'translateY(-50%)', textAlign: 'left' as const },
  },
  {
    num: '02',
    title: 'Diagnose',
    body: 'A clear, honest assessment of the gap between where you are and where you want to be.',
    deskX: 45, deskY: 74.26,
    mobX: 26, mobY: 45,
    deskStyle: { top: '30px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' as const },
    mobStyle: { left: '24px', top: '50%', transform: 'translateY(-50%)', textAlign: 'left' as const },
  },
  {
    num: '03',
    title: 'Build',
    body: 'A tailored plan - governance framework, content system, or retail strategy.',
    deskX: 67.5, deskY: 53.11,
    mobX: 49, mobY: 67.5,
    deskStyle: { bottom: '30px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' as const },
    mobStyle: { left: '24px', top: '50%', transform: 'translateY(-50%)', textAlign: 'left' as const },
  },
  {
    num: '04',
    title: 'Sustain',
    body: 'Ongoing support so the system keeps working after the engagement ends.',
    deskX: 90, deskY: 16.66,
    mobX: 85, mobY: 90,
    deskStyle: { right: '30px', top: '50%', transform: 'translateY(-50%)', textAlign: 'right' as const },
    mobStyle: { right: '24px', top: '50%', transform: 'translateY(-50%)', textAlign: 'right' as const },
  },
]

export function HowWeWork() {
  const containerRef = useRef<HTMLElement | null>(null)
  const pathDeskRef = useRef<SVGPathElement>(null)
  const pathMobRef = useRef<SVGPathElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current
    if (!container || !prefersMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      })

      // Paths Animation
      if (pathDeskRef.current) {
        const length = pathDeskRef.current.getTotalLength()
        gsap.set(pathDeskRef.current, { strokeDasharray: length, strokeDashoffset: length })
        tl.to(pathDeskRef.current, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
      }

      if (pathMobRef.current) {
        const length = pathMobRef.current.getTotalLength()
        gsap.set(pathMobRef.current, { strokeDasharray: length, strokeDashoffset: length })
        tl.to(pathMobRef.current, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0)
      }

      // Steps Animation timings mapped loosely to curve progress t
      const timings = [0.05, 0.4, 0.7, 0.95, 0.05, 0.4, 0.7, 0.95]

      stepRefs.current.forEach((step, i) => {
        if (!step) return
        
        gsap.set(step, { opacity: 0.1, scale: 0.8, y: 15 })
        
        tl.to(step, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.15,
          ease: 'back.out(1.5)',
        }, timings[i] - 0.05) 

        const dot = step.querySelector('.graph-dot')
        if (dot) {
          gsap.set(dot, { backgroundColor: 'transparent' })
          tl.to(dot, {
             boxShadow: '0 0 20px 4px rgba(212, 168, 83, 0.5)',
             backgroundColor: '#D4A853',
             borderColor: '#D4A853',
             duration: 0.1
          }, timings[i] - 0.05)
        }
      })

    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-(--bg-base)">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
             style={{ 
               backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
             }} 
        />
        
        <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-12 flex flex-col items-start justify-center h-full">
          
          <div className="mb-10 md:mb-16 shrink-0 relative z-20">
             <p className="text-label text-(--gold)">The Process</p>
             <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 text-(--text-primary)">
                The Exponential<br/> Growth Curve.
             </h2>
          </div>

          <div className="relative w-full aspect-[4/5] md:aspect-[21/9] border-l border-b border-white/10 rounded-bl-sm">
             {/* Axis Labels */}
             <span className="absolute -left-8 top-1/2 -rotate-90 -translate-x-1/2 -translate-y-1/2 text-[10px] tracking-widest text-white/30 uppercase font-mono">Value & Impact</span>
             <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/30 uppercase font-mono">Time & Integration</span>

             {/* SVG Graph Desktop */}
             <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full hidden md:block overflow-visible" preserveAspectRatio="none">
                <defs>
                   <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                     <feGaussianBlur stdDeviation="12" result="blur" />
                     <feMerge>
                       <feMergeNode in="blur" />
                       <feMergeNode in="SourceGraphic" />
                     </feMerge>
                   </filter>
                   <linearGradient id="lineGrad" x1="0" y1="1" x2="1" y2="0">
                     <stop offset="0%" stopColor="#6366F1" />
                     <stop offset="100%" stopColor="#D4A853" />
                   </linearGradient>
                </defs>
                <path 
                  ref={pathDeskRef}
                  d="M 150 500 C 400 500, 650 400, 900 100" 
                  fill="none" 
                  stroke="url(#lineGrad)" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
             </svg>

             {/* SVG Graph Mobile */}
             <svg viewBox="0 0 400 1000" className="absolute inset-0 w-full h-full block md:hidden overflow-visible" preserveAspectRatio="none">
                <path 
                  ref={pathMobRef}
                  d="M 60 150 C 60 400, 150 650, 340 900" 
                  fill="none" 
                  stroke="url(#lineGrad)" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
             </svg>

             {/* Desktop Points */}
             <div className="hidden md:block absolute inset-0">
               {STEPS.map((s, i) => (
                 <div 
                   key={`desk-${s.num}`}
                   ref={el => { if (el) stepRefs.current[i] = el }}
                   className="absolute"
                   style={{ left: `${s.deskX}%`, top: `${s.deskY}%` }}
                 >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 graph-dot w-5 h-5 rounded-full border-2 border-(--text-primary) bg-(--bg-base) z-10" />
                    
                    <div className="absolute w-[220px]" style={s.deskStyle}>
                      <span className="text-xs font-mono text-(--gold) mb-1 block">{s.num}</span>
                      <h3 className="font-display text-xl text-(--text-primary) mb-2">{s.title}</h3>
                      <p className="text-sm text-(--text-secondary) leading-relaxed">{s.body}</p>
                    </div>
                 </div>
               ))}
             </div>

             {/* Mobile Points */}
             <div className="block md:hidden absolute inset-0">
               {STEPS.map((s, i) => (
                 <div 
                   key={`mob-${s.num}`}
                   ref={el => { if (el) stepRefs.current[i + 4] = el }}
                   className="absolute"
                   style={{ left: `${s.mobX}%`, top: `${s.mobY}%` }}
                 >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 graph-dot w-5 h-5 rounded-full border-2 border-(--text-primary) bg-(--bg-base) z-10" />
                    
                    <div className="absolute w-[180px]" style={s.mobStyle}>
                      <span className="text-xs font-mono text-(--gold) mb-1 block">{s.num}</span>
                      <h3 className="font-display text-lg text-(--text-primary) mb-1">{s.title}</h3>
                      <p className="text-xs text-(--text-secondary) leading-relaxed">{s.body}</p>
                    </div>
                 </div>
               ))}
             </div>

          </div>
        </div>
      </div>
    </section>
  )
}
