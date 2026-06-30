import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, LineChart, Network, Store } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { JsonLd } from "@/components/JsonLd"
import { Reveal, AnimatedText, TiltCard, Magnetic, FloatingShape } from "@/components/anim"

export const metadata: Metadata = {
  title: "Services | RationalIQ",
  description:
    "Specialized consulting from RationalIQ — thought leadership for startups & VCs, family business consulting, and D2C retail strategy.",
}

const services = [
  {
    title: "Thought Leadership",
    audience: "For Startups & VCs",
    icon: LineChart,
    href: "/services/thought-leadership",
    desc: "Establish authority and attract premium deal flow through data-driven insights, financial education content, and strategic positioning.",
    points: ["Thesis articulation", "Educational content architecture", "Platform & audience growth"],
  },
  {
    title: "Family Business Consulting",
    audience: "For Traditional Enterprises",
    icon: Network,
    href: "/services/family-business-consulting",
    desc: "Professionalize with confidence — succession planning, family constitutions, governance, and next-generation coaching.",
    points: ["Succession planning", "Family constitutions", "Next-gen coaching"],
  },
  {
    title: "D2C Retail Strategy",
    audience: "For Consumer Brands",
    icon: Store,
    href: "/services/d2c-retail-strategy",
    desc: "Take your brand offline profitably with rigorous unit economics, omnichannel financial planning, and proven retail playbooks.",
    points: ["Unit economics modeling", "Omnichannel planning", "Retail go-to-market"],
  },
]

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
          className="pointer-events-none absolute -right-24 -top-10 h-96 w-96 rounded-full bg-brand-primary/8 blur-3xl"
          amplitude={30}
          duration={10}
        />
        <FloatingShape
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-accent/8 blur-3xl"
          amplitude={26}
          duration={12}
          delay={1}
        />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal direction="up" distance={14}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                What we do
              </span>
            </Reveal>
            <AnimatedText
              as="h1"
              by="word"
              stagger={0.05}
              className="mt-4 font-serif text-4xl tracking-tight text-brand-fg sm:text-5xl md:text-6xl"
            >
              Consulting built for every transition.
            </AnimatedText>
            <Reveal direction="up" delay={0.15}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-fg/70">
                Three focused practices — each grounded in CA Hitesh Saiswani's
                experience across retail, M&amp;A, and venture capital.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal stagger={0.14} className="grid gap-8 md:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <TiltCard
                  key={s.title}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-8 shadow-sm transition-shadow duration-500 hover:shadow-xl"
                >
                  <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-primary/5 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary/8 text-brand-primary ring-1 ring-brand-primary/10 transition-colors duration-500 group-hover:bg-brand-primary group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
                    {s.audience}
                  </span>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-brand-fg">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-brand-fg/75">{s.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm text-brand-fg/80">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.href}
                    className="mt-8 inline-flex items-center text-sm font-medium text-brand-primary"
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
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-brand-primary px-8 py-16 text-center text-white md:px-16 md:py-20">
              <FloatingShape
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
                amplitude={22}
                duration={9}
              />
              <FloatingShape
                className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl"
                amplitude={26}
                duration={11}
                delay={1}
              />
              <h2 className="relative font-serif text-2xl tracking-tight text-white sm:text-3xl md:text-4xl">
                Not sure which fits your situation?
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-white/80">
                Start with a conversation — we'll point you to the right path.
              </p>
              <div className="relative mt-9 flex justify-center">
                <Magnetic strength={0.35}>
                  <Button
                    size="lg"
                    className="bg-white text-brand-fg hover:bg-white/90"
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
