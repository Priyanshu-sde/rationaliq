import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { JsonLd } from "@/components/JsonLd"
import { Reveal, AnimatedText, TiltCard, Magnetic, FloatingShape } from "@/components/anim"
import { SERVICES as services } from "@/data/services"

export const metadata: Metadata = {
  title: "Services | RationalIQ",
  description:
    "Next Gen Business IQ from RationalIQ - thought leadership for startups & investors, family business strategy, and D2C retail strategy.",
}

export default function ServicesPage() {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `https://rationaliq.in${s.href}`,
    })),
  }

  return (
    <div>
      <JsonLd data={serviceData} />

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
          <div className="mx-auto max-w-3xl text-center">
            <Reveal direction="down">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.25em] text-[#d4a853]">
                Practice Areas
              </span>
            </Reveal>
            <AnimatedText
              as="h1"
              by="word"
              stagger={0.05}
              className="mt-4 font-serif text-4xl tracking-tight text-[#f1f5f9] sm:text-5xl md:text-6xl"
            >
              Next Gen Business IQ for every transition.
            </AnimatedText>
            <Reveal direction="up" delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-[#94a3b8]">
                Four focused practices - each grounded in Deep's
                experience across retail, M&amp;A, family business and investments.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal stagger={0.14} className="grid gap-8 md:grid-cols-2">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <TiltCard
                  key={s.title}
                  className="tier-2 group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 transition-colors duration-500 hover:border-white/[0.14] hover:bg-white/[0.04]"
                >
                  <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#6366f1]/5 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.04] text-[#94a3b8] ring-1 ring-white/[0.07] transition-colors duration-500 group-hover:bg-[#6366f1]/20 group-hover:text-[#f1f5f9] group-hover:ring-[#6366f1]/30">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#d4a853]">
                    {s.audience}
                  </span>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#f1f5f9]">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[#94a3b8]">{s.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-[#94a3b8]">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4a853]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.href}
                    className="tier-1 mt-8 inline-flex items-center text-sm font-medium text-[#6366f1] hover:text-[#8b5cf6]"
                  >
                    Explore service
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </TiltCard>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal direction="up" scale distance={24}>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.02] px-8 py-16 text-center text-white md:px-16 md:py-20">
              <FloatingShape
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#6366f1]/20 blur-2xl"
                amplitude={22}
                duration={9}
              />
              <FloatingShape
                className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-[#d4a853]/10 blur-3xl"
                amplitude={26}
                duration={11}
                delay={1}
              />
              <h2 className="relative font-serif text-2xl tracking-tight text-[#f1f5f9] sm:text-3xl md:text-4xl">
                Not sure which fits your situation?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-[#94a3b8]">
                Start with a conversation - we'll point you to the right path.
              </p>
              <div className="relative mt-9 flex justify-center">
                <Magnetic strength={0.35}>
                  <Button
                    size="lg"
                    className="btn-shimmer bg-[#6366F1] text-white hover:bg-[#6366F1]/90"
                    asChild
                  >
                    <Link href="/contact">Book a Consultation</Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
