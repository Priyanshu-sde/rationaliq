import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getMetricsQuery, getTestimonialsQuery, getClientLogosQuery } from "@/sanity/lib/queries"
import { Quote } from "lucide-react"
import { urlForImage } from "@/sanity/lib/image"
import { Reveal, AnimatedText, TiltCard, FloatingShape } from "@/components/anim"

export const metadata: Metadata = {
  title: "Impact & Success Stories | RationalIQ",
  description: "See the measurable impact RationalIQ has delivered for family businesses and startups.",
}

// Revalidate this page every hour, or rely on ISR
export const revalidate = 3600

export default async function ImpactPage() {
  let metrics = [], testimonials = [], logos = []
  
  try {
    const data = await Promise.all([
      client.fetch(getMetricsQuery),
      client.fetch(getTestimonialsQuery),
      client.fetch(getClientLogosQuery)
    ])
    metrics = data[0]
    testimonials = data[1]
    logos = data[2]
  } catch (error) {
    console.warn('Could not fetch impact data (likely missing Sanity credentials during build)')
  }

  // Fallback placeholder data if Sanity is empty
  const displayMetrics = metrics?.length > 0 ? metrics : [
    { label: "Family business leaders served", value: "250+" },
    { label: "VC Investments Led", value: "3" },
    { label: "Audience Reached", value: "120K+" }
  ]

  const displayTestimonials = testimonials?.length > 0 ? testimonials : [
    { quote: "Helped a 3rd-generation manufacturing family resolve a succession dispute, paving the way for sustainable growth.", clientName: "Anonymous", clientRoleCompany: "3rd-Gen Manufacturing Leader" },
    { quote: "RationalIQ provided the exact unit economics modeling we needed before expanding our D2C brand into offline retail.", clientName: "Founder", clientRoleCompany: "D2C Retail Brand" }
  ]

  return (
    <div className="relative overflow-hidden py-28 md:py-36">
      <FloatingShape
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#d4a853]/20 blur-3xl"
        amplitude={28}
        duration={11}
      />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <Reveal direction="up" distance={14}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a853]">
              Impact & Success Stories
            </span>
          </Reveal>
          <AnimatedText
            as="h1"
            by="word"
            stagger={0.06}
            className="mt-4 font-serif text-4xl tracking-tight text-[#f1f5f9] sm:text-5xl md:text-6xl"
          >
            Proven impact.
          </AnimatedText>
          <Reveal direction="up" delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-xl text-[#94a3b8]">
              We measure our success by the clarity we bring and the growth we
              enable for our clients.
            </p>
          </Reveal>
        </div>

        {/* Metrics Block */}
        <Reveal stagger={0.12} className="mx-auto mb-32 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-3">
          {displayMetrics.map((metric: any, i: number) => (
            <TiltCard
              key={i}
              max={6}
              lift={6}
              className="flex flex-col items-center rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-center"
            >
              <span className="mb-3 font-serif text-5xl font-bold text-[#d4a853]">
                {metric.value}
              </span>
              <span className="text-sm font-medium uppercase tracking-wider text-[#94a3b8]">
                {metric.label}
              </span>
            </TiltCard>
          ))}
        </Reveal>

        {/* Testimonials Block */}
        <div className="mb-32">
          <AnimatedText
            as="h2"
            by="word"
            onScroll
            stagger={0.05}
            className="mb-12 text-center font-serif text-3xl tracking-tight text-[#f1f5f9] sm:text-4xl"
          >
            Success Stories
          </AnimatedText>
          <Reveal stagger={0.14} className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {displayTestimonials.map((testimonial: any, i: number) => (
              <TiltCard
                key={i}
                max={5}
                lift={6}
                className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8"
              >
                <Quote className="mb-5 h-9 w-9 text-[#6366f1]/50" />
                <p className="mb-8 flex-1 text-lg italic text-[#f1f5f9]">
                  {testimonial.quote}
                </p>
                <div className="mt-auto flex items-center gap-4">
                  {testimonial.photo ? (
                    <img
                      src={urlForImage(testimonial.photo)?.url()}
                      alt={testimonial.clientName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05] text-xs text-[#94a3b8]">
                      Photo
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#f1f5f9]">
                      {testimonial.clientName || "Anonymous Client"}
                    </p>
                    {testimonial.clientRoleCompany && (
                      <p className="text-sm text-[#94a3b8]">
                        {testimonial.clientRoleCompany}
                      </p>
                    )}
                  </div>
                </div>
              </TiltCard>
            ))}
          </Reveal>
        </div>

        {/* Client Logos Strip */}
        <Reveal direction="up" className="mx-auto max-w-5xl text-center">
          <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-[#94a3b8]">
            Trusted By
          </h2>
          {logos?.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-100">
              {logos.map((logo: any, i: number) =>
                logo.url ? (
                  <a key={i} href={logo.url} target="_blank" rel="noopener noreferrer">
                    <img src={urlForImage(logo.logo)?.url()} alt={logo.name} className="h-12 w-auto object-contain" />
                  </a>
                ) : (
                  <img key={i} src={urlForImage(logo.logo)?.url()} alt={logo.name} className="h-12 w-auto object-contain" />
                )
              )}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-12 opacity-30">
              <div className="h-8 w-32 rounded bg-white/[0.1]"></div>
              <div className="h-8 w-24 rounded bg-white/[0.1]"></div>
              <div className="h-8 w-28 rounded bg-white/[0.1]"></div>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  )
}
