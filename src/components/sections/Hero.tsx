'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AnimatedText, Reveal, Magnetic, FloatingShape, RotatingWords } from "@/components/anim"

const credentials = ["Grant Thornton", "EY", "Sunicon VC", "Chartered Accountant"]

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-brand-bg py-24 md:py-32">
      {/* Aurora / floating background field */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <FloatingShape
          className="aurora absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-brand-primary/10 blur-3xl"
          amplitude={30}
          duration={9}
        />
        <FloatingShape
          className="aurora absolute -bottom-32 -left-24 h-[30rem] w-[30rem] rounded-full bg-brand-accent/10 blur-3xl"
          amplitude={36}
          duration={11}
          delay={1.5}
        />
        <FloatingShape
          className="absolute right-[14%] top-[22%] h-24 w-24 rounded-2xl border border-brand-border/70 bg-white/40 backdrop-blur-sm"
          amplitude={18}
          duration={7}
          rotate={8}
        />
        <FloatingShape
          className="absolute left-[8%] top-[30%] h-12 w-12 rounded-full border border-brand-accent/30 bg-brand-accent/5"
          amplitude={22}
          duration={8}
          delay={0.8}
        />
        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(28,36,52,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,36,52,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <Reveal direction="up" distance={16}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brand-primary backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              Next Gen Business IQ led by a Chartered Accountant
            </span>
          </Reveal>

          <h1 className="mt-7 font-serif text-[2.6rem] leading-[1.05] tracking-tight text-brand-fg sm:text-6xl md:text-7xl">
            <AnimatedText as="span" by="word" stagger={0.06} delay={0.15} className="block">
              Clarity & growth for
            </AnimatedText>
            <span className="mt-1 flex items-baseline gap-x-3">
              <RotatingWords
                interval={2}
                duration={0.6}
                words={[
                  { text: "startups", className: "text-brand-primary" },
                  { text: "VCs", className: "text-brand-accent" },
                  { text: "family businesses", className: "text-brand-primary" },
                ]}
              />
              <span aria-hidden>.</span>
            </span>
          </h1>

          <Reveal direction="up" delay={0.2} className="mt-7 max-w-2xl">
            <p className="text-lg leading-8 text-brand-fg/75 md:text-xl">
              RationalIQ is a Next Gen Business IQ practice led by CA Hitesh
              Saiswani - bringing rigorous professionalization, governance, and
              retail strategy to businesses navigating their most critical
              transitions.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Magnetic strength={0.35}>
              <Button size="lg" className="group" asChild>
                <Link href="/contact">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </Magnetic>
          </Reveal>

          {/* Credential strip */}
          <Reveal direction="up" delay={0.45} className="mt-16">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brand-fg/40">
              Experience forged at
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="font-serif text-lg text-brand-fg/55 transition-colors duration-300 hover:text-brand-fg"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-brand-fg/40">
          Scroll
        </span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-brand-fg/25">
          <span className="mt-1.5 h-1.5 w-1.5 animate-bounce rounded-full bg-brand-accent" />
        </span>
      </div>
    </section>
  )
}
