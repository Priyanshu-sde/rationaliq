import { Hero } from "@/components/sections/Hero"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/JsonLd"

export default function Home() {
  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RationalIQ",
    "url": "https://rationaliq.com",
    "logo": "https://rationaliq.com/logo.png",
    "founder": {
      "@type": "Person",
      "name": "Hitesh Saiswani"
    }
  }

  return (
    <>
      <JsonLd data={orgData} />
      <Hero />
      
      {/* Services Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-fg sm:text-4xl">Specialized Consulting Services</h2>
            <p className="mt-4 text-lg text-brand-fg/70 max-w-2xl mx-auto">
              Expert guidance tailored for the unique challenges of modern startups and multi-generational enterprises.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="flex flex-col h-full hover:border-brand-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Thought Leadership</CardTitle>
                <CardDescription>For Startups & VCs</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-brand-fg/80">
                  Elevate your firm's market presence through data-driven insights, financial education content, and strategic positioning.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 group" asChild>
                  <Link href="/services/thought-leadership">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full hover:border-brand-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Family Business Consulting</CardTitle>
                <CardDescription>For Traditional Enterprises</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-brand-fg/80">
                  Navigate succession planning, establish family constitutions, and bridge the gap between traditional operations and modern growth strategies.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 group" asChild>
                  <Link href="/services/family-business-consulting">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full hover:border-brand-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">D2C Retail Strategy</CardTitle>
                <CardDescription>For Consumer Brands</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-brand-fg/80">
                  Accelerate your offline expansion with rigorous financial modeling, unit economics optimization, and proven retail playbooks.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0 group" asChild>
                  <Link href="/services/d2c-retail-strategy">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Teaser */}
      <section className="py-20 bg-brand-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold tracking-tight text-brand-fg sm:text-4xl mb-6">Expertise Rooted in Experience</h2>
              <p className="text-lg text-brand-fg/80 mb-6">
                Led by CA Hitesh Saiswani, whose journey spans from working in a traditional family retail business at age 13, to advising on M&A at Grant Thornton and EY, to investing at Sunicon Venture Capital Fund.
              </p>
              <Button asChild>
                <Link href="/team">Read the full story</Link>
              </Button>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-2xl bg-brand-muted/50 border border-brand-border flex items-end justify-center relative overflow-hidden pt-8">
              <Image 
                src="/profile-cutout.png" 
                alt="CA Hitesh Saiswani" 
                fill 
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Teaser */}
      <section className="py-20 bg-brand-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-white">Proven Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-serif font-bold text-brand-accent mb-2">250+</span>
              <span className="text-sm opacity-90 uppercase tracking-wider">Family Businesses Served</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-serif font-bold text-brand-accent mb-2">3</span>
              <span className="text-sm opacity-90 uppercase tracking-wider">VC Investments Led</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-serif font-bold text-brand-accent mb-2">120K+</span>
              <span className="text-sm opacity-90 uppercase tracking-wider">Audience Reached</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-serif font-bold text-brand-accent mb-2">Big 4</span>
              <span className="text-sm opacity-90 uppercase tracking-wider">M&A Experience</span>
            </div>
          </div>
          <div className="mt-12">
            <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white" asChild>
              <Link href="/impact">View Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
