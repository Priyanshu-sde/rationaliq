import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thought Leadership & Content Strategy | RationalIQ",
  description: "Elevate your firm's market presence through data-driven insights, financial education content, and strategic positioning for Startups & VCs.",
}

export default function ThoughtLeadershipService() {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-brand-primary font-medium tracking-wider uppercase text-sm">For Startups & VCs</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl md:text-6xl font-serif">Thought Leadership & Content Strategy</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-brand-fg/80 mb-12">
            <p className="lead text-xl text-brand-fg mb-8">
              In an increasingly crowded market, capital alone is no longer a differentiator. Startups and Venture Capital firms must establish authority, articulate their thesis, and build trust through high-quality, data-driven content.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-fg mt-12 mb-4">The Challenge</h2>
            <p>
              Founders and partners often have deep industry insights but lack the time or the structural framework to translate that knowledge into compelling narratives. Generic content fails to capture the nuance required to attract top-tier deal flow or premium LPs.
            </p>

            <h2 className="text-2xl font-bold text-brand-fg mt-12 mb-4">Our Approach</h2>
            <p>
              Leveraging experience from creating financial and fundraising content for top ed-tech startups and growing finance audiences to over 450K subscribers, RationalIQ helps you codify your expertise.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Thesis Articulation:</strong> Distilling complex investment philosophies into clear, engaging content pieces.</li>
              <li><strong>Educational Architecture:</strong> Designing structured financial and fundraising content for your audience or portfolio companies.</li>
              <li><strong>Platform Growth:</strong> Strategic advising on audience building across platforms like YouTube and LinkedIn.</li>
            </ul>
          </div>

          <div className="bg-brand-muted/50 p-8 rounded-2xl border border-brand-border text-center">
            <h3 className="text-2xl font-bold text-brand-fg mb-4">Ready to elevate your firm's voice?</h3>
            <p className="text-brand-fg/70 mb-8 max-w-xl mx-auto">
              Let's discuss how we can build a content engine that drives real business outcomes.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
