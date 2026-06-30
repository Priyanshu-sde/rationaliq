import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { getMetricsQuery, getTestimonialsQuery, getClientLogosQuery } from "@/sanity/lib/queries"
import { Card, CardContent } from "@/components/ui/Card"
import { urlForImage } from "@/sanity/lib/image"

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
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl md:text-6xl font-serif mb-6">
            Proven Impact
          </h1>
          <p className="text-xl text-brand-fg/80 max-w-2xl mx-auto">
            We measure our success by the clarity we bring and the growth we enable for our clients.
          </p>
        </div>

        {/* Metrics Block */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-32 max-w-4xl mx-auto">
          {displayMetrics.map((metric: any, i: number) => (
             <div key={i} className="flex flex-col items-center text-center p-6 bg-brand-muted/30 rounded-2xl border border-brand-border/50">
               <span className="text-5xl font-serif font-bold text-brand-accent mb-3">{metric.value}</span>
               <span className="text-sm font-medium text-brand-fg/70 uppercase tracking-wider">{metric.label}</span>
             </div>
          ))}
        </div>

        {/* Testimonials Block */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold tracking-tight text-brand-fg sm:text-4xl text-center mb-12">Success Stories</h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {displayTestimonials.map((testimonial: any, i: number) => (
              <Card key={i} className="bg-brand-bg shadow-sm">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="text-brand-primary mb-6 text-4xl font-serif">"</div>
                  <p className="text-lg text-brand-fg/90 mb-8 flex-1 italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    {testimonial.photo ? (
                      <img src={urlForImage(testimonial.photo)?.url()} alt={testimonial.clientName} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-muted flex items-center justify-center text-brand-fg/40 text-xs">Photo</div>
                    )}
                    <div>
                      <p className="font-bold text-brand-fg">{testimonial.clientName || "Anonymous Client"}</p>
                      {testimonial.clientRoleCompany && (
                        <p className="text-sm text-brand-fg/70">{testimonial.clientRoleCompany}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Logos Strip */}
        <div className="text-center max-w-5xl mx-auto">
           <h2 className="text-sm font-bold tracking-widest text-brand-fg/50 uppercase mb-8">Trusted By</h2>
           {logos?.length > 0 ? (
             <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
               {logos.map((logo: any, i: number) => (
                 logo.url ? (
                   <a key={i} href={logo.url} target="_blank" rel="noopener noreferrer">
                     <img src={urlForImage(logo.logo)?.url()} alt={logo.name} className="h-12 w-auto object-contain" />
                   </a>
                 ) : (
                   <img key={i} src={urlForImage(logo.logo)?.url()} alt={logo.name} className="h-12 w-auto object-contain" />
                 )
               ))}
             </div>
           ) : (
             <div className="flex flex-wrap justify-center gap-12 opacity-30">
               {/* Placeholders for launch when no logos are available */}
               <div className="h-8 w-32 bg-brand-fg/20 rounded"></div>
               <div className="h-8 w-24 bg-brand-fg/20 rounded"></div>
               <div className="h-8 w-28 bg-brand-fg/20 rounded"></div>
             </div>
           )}
        </div>

      </div>
    </div>
  )
}
