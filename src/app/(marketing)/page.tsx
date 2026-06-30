import { Hero } from "@/components/sections/Hero"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, LineChart, Network, Store } from "lucide-react"
import { JsonLd } from "@/components/JsonLd"
import { Reveal, AnimatedText, TiltCard, Parallax, CountUp, FloatingShape, Magnetic } from "@/components/anim"

const services = [
  {
    title: "Thought Leadership",
    audience: "For Startups & VCs",
    icon: LineChart,
    href: "/services/thought-leadership",
    desc: "Elevate your firm's market presence through data-driven insights, financial education content, and strategic positioning.",
  },
  {
    title: "Family Business Consulting",
    audience: "For Traditional Enterprises",
    icon: Network,
    href: "/services/family-business-consulting",
    desc: "Navigate succession planning, establish family constitutions, and bridge the gap between legacy operations and modern growth.",
  },
  {
    title: "D2C Retail Strategy",
    audience: "For Consumer Brands",
    icon: Store,
    href: "/services/d2c-retail-strategy",
    desc: "Accelerate your offline expansion with rigorous financial modeling, unit economics optimization, and proven retail playbooks.",
  },
]

const stats = [
  { value: 250, suffix: "+", label: "Family Businesses Served" },
  { value: 3, suffix: "", label: "VC Investments Led" },
  { value: 120, suffix: "K+", label: "Audience Reached" },
  { value: 6, suffix: "+ yrs", label: "Big 4 & VC Experience" },
]

export default function Home() {
  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RationalIQ",
    "url": "https://rationaliq.in",
    "logo": "https://rationaliq.in/logo.png",
    "founder": { "@type": "Person", "name": "Hitesh Saiswani" },
  }

  return (
    <>
      <JsonLd data={orgData} />
      <Hero />

      {/* Services Section */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 max-w-2xl">
            <Reveal direction="up" distance={14}>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
                What we do
              </span>
            </Reveal>
            <AnimatedText
              as="h2"
              by="word"
              onScroll
              stagger={0.05}
              className="mt-4 font-serif text-3xl tracking-tight text-brand-fg sm:text-4xl md:text-5xl"
            >
              Specialized consulting for every transition.
            </AnimatedText>
            <Reveal direction="up" delay={0.1}>
              <p className="mt-5 text-lg text-brand-fg/70">
                Expert guidance tailored to the unique challenges of modern
                startups and multi-generational enterprises.
              </p>
            </Reveal>
          </div>

          <Reveal stagger={0.12} className="grid gap-8 md:grid-cols-3">
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
                  <h3 className="mt-2 font-serif text-xl font-semibold text-brand-fg">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-brand-fg/75">{s.desc}</p>
                  <Link
                    href={s.href}
                    className="mt-6 inline-flex items-center text-sm font-medium text-brand-primary"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </TiltCard>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* Founder Teaser */}
      <section className="relative overflow-hidden bg-brand-muted/30 py-24 md:py-32">
        <FloatingShape
          className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl"
          amplitude={28}
          duration={10}
        />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center gap-14 md:flex-row">
            <div className="flex-1">
              <Reveal direction="up" distance={14}>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
                  The founder
                </span>
              </Reveal>
              <AnimatedText
                as="h2"
                by="word"
                onScroll
                stagger={0.05}
                className="mt-4 font-serif text-3xl tracking-tight text-brand-fg sm:text-4xl md:text-5xl"
              >
                Expertise rooted in lived experience.
              </AnimatedText>
              <Reveal direction="up" delay={0.1}>
                <p className="mt-6 text-lg text-brand-fg/75">
                  Led by CA Hitesh Saiswani — whose journey spans working in a
                  traditional family retail business at age 13, advising on M&amp;A
                  at Grant Thornton and EY, and investing at Sunicon Venture
                  Capital Fund.
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2} className="mt-9">
                <Magnetic strength={0.3}>
                  <Button className="group" asChild>
                    <Link href="/team">
                      Read the full story
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                </Magnetic>
              </Reveal>
            </div>

            <div className="w-full md:w-2/5">
              <Reveal direction="up" scale distance={30}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-brand-border bg-gradient-to-b from-white to-brand-muted/60">
                  <Parallax speed={-0.12} className="absolute inset-0 flex items-end justify-center">
                    <Image
                      src="/profile-cutout.png"
                      alt="CA Hitesh Saiswani"
                      fill
                      className="object-contain object-bottom"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </Parallax>
                  <div className="absolute bottom-5 left-5 rounded-xl border border-brand-border/70 bg-white/80 px-4 py-3 backdrop-blur-sm">
                    <p className="font-serif text-base font-semibold text-brand-fg">
                      Hitesh Saiswani
                    </p>
                    <p className="text-sm text-brand-primary">Founder &amp; CA</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="relative overflow-hidden bg-brand-fg py-24 text-white md:py-32">
        <FloatingShape
          className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand-primary/30 blur-[100px]"
          amplitude={34}
          duration={12}
        />
        <FloatingShape
          className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-brand-accent/20 blur-[100px]"
          amplitude={28}
          duration={10}
          delay={1}
        />
        <div className="container relative mx-auto px-4 text-center md:px-6">
          <AnimatedText
            as="h2"
            by="word"
            onScroll
            stagger={0.05}
            className="mb-16 font-serif text-3xl tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Proven impact, measurable trust.
          </AnimatedText>
          <Reveal stagger={0.12} className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="font-serif text-5xl font-bold text-brand-accent md:text-6xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-3 text-sm uppercase tracking-wider text-white/70">
                  {s.label}
                </span>
              </div>
            ))}
          </Reveal>
          <Reveal direction="up" delay={0.2} className="mt-16">
            <Magnetic strength={0.3}>
              <Button
                variant="outline"
                className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/impact">View Success Stories</Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal direction="up" scale distance={24}>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-primary px-8 py-16 text-center text-white md:px-16 md:py-24">
              <FloatingShape
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
                amplitude={24}
                duration={9}
              />
              <FloatingShape
                className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-brand-accent/20 blur-3xl"
                amplitude={30}
                duration={11}
                delay={1}
              />
              <h2 className="relative mx-auto max-w-2xl font-serif text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                Let&apos;s build clarity into your next chapter.
              </h2>
              <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/80">
                Whether you&apos;re professionalizing a family business or scaling
                a brand offline — start with a conversation.
              </p>
              <div className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic strength={0.35}>
                  <Button
                    size="lg"
                    className="bg-white text-brand-fg hover:bg-white/90"
                    asChild
                  >
                    <Link href="/contact">Book a Consultation</Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <Link href="/blog">Read the Blog</Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
