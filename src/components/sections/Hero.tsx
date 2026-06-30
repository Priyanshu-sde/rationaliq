import { Button } from "@/components/ui/Button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-bg py-20 md:py-32">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl tracking-tight text-brand-fg sm:text-5xl md:text-6xl lg:text-7xl">
            Clarity & Growth for <span className="text-brand-primary">Startups</span>, <span className="text-brand-accent">VCs</span>, and <span className="text-brand-primary">Family Businesses</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-fg/80 md:text-xl">
            RationalIQ is a specialized consulting practice led by CA Hitesh Saiswani. We bring rigorous professionalization, governance, and retail strategy to businesses navigating critical transitions.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services/thought-leadership">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-brand-accent/5 blur-3xl"></div>
    </section>
  )
}
