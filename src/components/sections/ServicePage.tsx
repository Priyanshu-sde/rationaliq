import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Reveal, AnimatedText, Magnetic, FloatingShape, TiltCard } from "@/components/anim"

export interface ServiceContent {
  eyebrow: string
  title: string
  icon: LucideIcon
  lead: string
  challenge: string
  approach: string
  bullets: { strong: string; text: string }[]
  ctaTitle: string
  ctaText: string
}

export function ServicePage({ content }: { content: ServiceContent }) {
  const Icon = content.icon
  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <FloatingShape
          className="pointer-events-none absolute -right-24 -top-10 h-96 w-96 rounded-full bg-[#6366f1]/20 blur-3xl"
          amplitude={30}
          duration={10}
        />
        <FloatingShape
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#d4a853]/20 blur-3xl"
          amplitude={26}
          duration={12}
          delay={1}
        />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Reveal direction="up" distance={14}>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-[#94a3b8] ring-1 ring-white/[0.07]">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="text-sm font-medium uppercase tracking-[0.15em] text-[#d4a853]">
                  {content.eyebrow}
                </span>
              </div>
            </Reveal>
            <AnimatedText
              as="h1"
              by="word"
              stagger={0.05}
              delay={0.1}
              className="mt-6 font-serif text-4xl tracking-tight text-[#f1f5f9] sm:text-5xl md:text-6xl"
            >
              {content.title}
            </AnimatedText>
            <Reveal direction="up" delay={0.2}>
              <p className="mt-8 text-xl leading-relaxed text-[#94a3b8]">
                {content.lead}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Challenge + Approach */}
      <section className="pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-16">
            <Reveal direction="up">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 md:p-10">
                <h2 className="font-serif text-2xl font-bold text-[#f1f5f9]">
                  The Challenge
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[#94a3b8]">
                  {content.challenge}
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal direction="up">
                <h2 className="font-serif text-2xl font-bold text-[#f1f5f9]">
                  Our Approach
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[#94a3b8]">
                  {content.approach}
                </p>
              </Reveal>

              <Reveal stagger={0.1} className="mt-8 grid gap-5 sm:grid-cols-2">
                {content.bullets.map((b) => (
                  <TiltCard
                    key={b.strong}
                    max={5}
                    lift={5}
                    className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-500 hover:border-white/[0.14] hover:bg-white/[0.04]"
                  >
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4a853]/15 text-[#d4a853]">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <p className="text-[#94a3b8]">
                      <strong className="font-semibold text-[#f1f5f9]">
                        {b.strong}:
                      </strong>{" "}
                      {b.text}
                    </p>
                  </TiltCard>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal direction="up" scale distance={24}>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.02] p-10 text-center md:p-16">
              <FloatingShape
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#6366f1]/20 blur-3xl"
                amplitude={22}
                duration={9}
              />
              <h3 className="relative font-serif text-2xl font-bold text-[#f1f5f9] sm:text-3xl">
                {content.ctaTitle}
              </h3>
              <p className="relative mx-auto mt-4 max-w-xl text-[#94a3b8]">
                {content.ctaText}
              </p>
              <div className="relative mt-9 flex justify-center">
                <Magnetic strength={0.35}>
                  <Button size="lg" className="group btn-shimmer bg-[#6366F1] text-white hover:bg-[#6366F1]/90" asChild>
                    <Link href="/contact">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
