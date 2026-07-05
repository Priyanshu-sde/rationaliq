'use client'

import { useRef, useState, useCallback } from "react"
import Image from "next/image"
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect, prefersMotion } from "@/components/anim/gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin)
}

export interface Milestone {
  period: string
  title: string
  description: string
  image?: string
  imageAlt?: string
}

interface JourneyTimelineProps {
  milestones: Milestone[]
}

interface Geometry {
  w: number
  h: number
  cx: number
  amp: number
  d: string
  dots: { x: number; y: number }[]
}

function buildPath(cx: number, amp: number, ys: number[]): string {
  if (ys.length === 0) return ""
  let d = `M ${cx} ${ys[0]}`
  for (let i = 0; i < ys.length - 1; i++) {
    const y0 = ys[i]
    const y1 = ys[i + 1]
    const dir = i % 2 === 0 ? 1 : -1
    const c1y = y0 + (y1 - y0) * 0.3
    const c2y = y0 + (y1 - y0) * 0.7
    const cxo = cx + dir * amp
    d += ` C ${cxo} ${c1y}, ${cxo} ${c2y}, ${cx} ${y1}`
  }
  return d
}

/**
 * Signature scroll effect: a vertical serpentine line is "drawn" as the
 * user scrolls, while a glowing marker travels along the exact curve and
 * each milestone reveals on alternating sides. Degrades to a fully-drawn,
 * static timeline when reduced motion is requested. No pinning — plays
 * nicely with smooth scrolling.
 */
export function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)
  const trailRef = useRef<SVGPathElement | null>(null)
  const markerRef = useRef<SVGGElement | null>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(SVGCircleElement | null)[]>([])

  const [geo, setGeo] = useState<Geometry | null>(null)

  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const w = wrap.clientWidth
    const h = wrap.offsetHeight
    const isMobile = w < 768
    const cx = isMobile ? 32 : w / 2
    const amp = isMobile ? 18 : Math.min(w * 0.2, 150)

    const ys = nodeRefs.current.map((n) =>
      n ? n.offsetTop + n.offsetHeight / 2 : 0
    )
    const d = buildPath(cx, amp, ys)
    // dots sit on the curve at each milestone (the curve passes through cx)
    const dots = ys.map((y) => ({ x: cx, y }))
    setGeo({ w, h, cx, amp, d, dots })
  }, [])

  // Measure on mount + whenever size changes.
  useIsomorphicLayoutEffect(() => {
    measure()
    const wrap = wrapRef.current
    if (!wrap) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(wrap)
    window.addEventListener("load", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("load", measure)
    }
  }, [measure, milestones.length])

  // Wire up the scroll-driven drawing + marker once geometry is ready.
  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    const marker = markerRef.current
    if (!wrap || !path || !geo) return

    const length = path.getTotalLength()

    // Reduced motion: show everything drawn, marker at end, dots active.
    if (!prefersMotion()) {
      gsap.set(path, { strokeDasharray: "none", strokeDashoffset: 0 })
      if (trailRef.current) gsap.set(trailRef.current, { strokeDashoffset: 0 })
      dotRefs.current.forEach((dot) => dot && gsap.set(dot, { scale: 1, opacity: 1 }))
      if (marker) gsap.set(marker, { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.set(marker, { opacity: 1 })
      gsap.set(dotRefs.current, { transformOrigin: "center", scale: 0.4, opacity: 0.35 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      })

      tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0)

      tl.to(
        marker,
        {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          ease: "none",
        },
        0
      )

      const maxY = geo.dots.length > 0 ? geo.dots[geo.dots.length - 1].y : 1
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        const triggerPoint = geo.dots[i] ? geo.dots[i].y : 0
        const progress = triggerPoint / maxY
        tl.to(dot, { scale: 1, opacity: 1, duration: 0.01 }, progress * tl.duration())
      })

      // Reveal each milestone card.
      nodeRefs.current.forEach((node, i) => {
        if (!node) return
        const fromX = geo.w >= 768 ? (i % 2 === 0 ? -50 : 50) : 30
        gsap.from(node, {
          opacity: 0,
          x: fromX,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 82%" },
        })
      })
    }, wrap)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    const t = setTimeout(() => ScrollTrigger.refresh(), 120)

    return () => {
      window.removeEventListener("load", refresh)
      clearTimeout(t)
      ctx.revert()
    }
  }, [geo])

  return (
    <div className="relative overflow-hidden py-20 md:py-28">
      <div ref={wrapRef} className="relative mx-auto max-w-5xl px-4 md:px-6">
          {/* Serpentine path + marker */}
          {geo && (
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="journeyLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C09858" />
                  <stop offset="100%" stopColor="#345C72" />
                </linearGradient>
                <filter id="markerGlow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* faint full track */}
              <path
                d={geo.d}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={2}
                strokeLinecap="round"
              />
              {/* drawn portion */}
              <path
                ref={pathRef}
                d={geo.d}
                stroke="url(#journeyLine)"
                strokeWidth={3}
                strokeLinecap="round"
              />

              {/* milestone dots on the curve */}
              {geo.dots.map((p, i) => (
                <circle
                  key={i}
                  ref={(el) => {
                    dotRefs.current[i] = el
                  }}
                  cx={p.x}
                  cy={p.y}
                  r={6}
                  fill="#1C2434"
                  stroke="#C09858"
                  strokeWidth={2.5}
                />
              ))}

              {/* travelling marker */}
              <g ref={markerRef} style={{ opacity: 0 }} filter="url(#markerGlow)">
                <circle r={12} fill="#C09858" />
                <circle r={6} fill="#FBFBF9" />
                <circle r={3} fill="#C09858" opacity={0.6} />
              </g>
            </svg>
          )}

          {/* Milestones */}
          <div className="relative z-10">
            {milestones.map((m, i) => {
              const right = i % 2 !== 0
              return (
                <div
                  key={m.period}
                  ref={(el) => {
                    nodeRefs.current[i] = el
                  }}
                  className={[
                    "relative flex py-8 pl-16 md:py-10 md:pl-0",
                    right ? "md:justify-end" : "md:justify-start",
                  ].join(" ")}
                >
                  <article
                    className={[
                      "group w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm md:w-[44%]",
                      right ? "md:ml-auto" : "md:mr-auto",
                    ].join(" ")}
                  >
                    {m.image && (
                      <div className="relative h-48 w-full overflow-hidden md:h-56">
                        <Image
                          src={m.image}
                          alt={m.imageAlt || m.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 44vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-fg/90 via-brand-fg/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-6 md:p-8">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/15 font-serif text-base font-bold text-brand-accent ring-1 ring-brand-accent/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium uppercase tracking-wider text-brand-accent">
                          {m.period}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-white md:text-2xl">
                        {m.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-white/70">
                        {m.description}
                      </p>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </div>
  )
}
