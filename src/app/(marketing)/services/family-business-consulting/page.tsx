import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Family Business Consulting | RationalIQ",
  description: "Navigate succession planning, establish family constitutions, and bridge the gap between traditional operations and modern growth strategies.",
}

export default function FamilyBusinessService() {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-brand-primary font-medium tracking-wider uppercase text-sm">For Traditional Enterprises</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl md:text-6xl font-serif">Family Business Consulting</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-brand-fg/80 mb-12">
            <p className="lead text-xl text-brand-fg mb-8">
              Family businesses form the backbone of the economy, but they face unique challenges. Intergenerational transitions, emotional dynamics, and the need to professionalize without losing the core values require a delicate, structured approach.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-fg mt-12 mb-4">The Challenge</h2>
            <p>
              Many successful family businesses struggle when transitioning from the founder to the next generation. Issues like undefined succession plans, lack of formal governance, intergenerational conflict, and outdated wealth management strategies can threaten decades of hard work.
            </p>

            <h2 className="text-2xl font-bold text-brand-fg mt-12 mb-4">Our Approach</h2>
            <p>
              With firsthand experience growing up in a family business and having advised over 250+ family business leaders, CA Hitesh Saiswani brings deep empathy and rigorous financial acumen to your enterprise. We help bridge the gap between legacy and modern practices.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Succession Planning:</strong> Designing clear, actionable roadmaps for leadership and ownership transitions.</li>
              <li><strong>Family Constitutions:</strong> Drafting formal agreements to govern family involvement, conflict resolution, and dividend policies.</li>
              <li><strong>Next-Gen Coaching:</strong> Mentoring upcoming leaders to take the reins with confidence and competence.</li>
              <li><strong>Wealth & Investment Strategy:</strong> Advising on family office setup and startup investing (drawing on VC experience).</li>
            </ul>
          </div>

          <div className="bg-brand-muted/50 p-8 rounded-2xl border border-brand-border text-center">
            <h3 className="text-2xl font-bold text-brand-fg mb-4">Protect your legacy and plan for the future.</h3>
            <p className="text-brand-fg/70 mb-8 max-w-xl mx-auto">
              Let's have a confidential conversation about your family business's unique needs.
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
