import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "D2C Retail Strategy | RationalIQ",
  description: "Accelerate your offline expansion with rigorous financial modeling, unit economics optimization, and proven retail playbooks.",
}

export default function D2CRetailService() {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-brand-primary font-medium tracking-wider uppercase text-sm">For Consumer Brands</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl md:text-6xl font-serif">D2C Retail Strategy</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-brand-fg/80 mb-12">
            <p className="lead text-xl text-brand-fg mb-8">
              Digital-first brands eventually hit a ceiling online. The next frontier for scale is offline retail, but the rules of engagement are fundamentally different. Moving from performance marketing to shelf space requires a structural shift in operations, finance, and strategy.
            </p>
            
            <h2 className="text-2xl font-bold text-brand-fg mt-12 mb-4">The Challenge</h2>
            <p>
              D2C founders often struggle with the transition to omnichannel. The complexities of distributor margins, inventory financing, modern trade negotiations, and store-level unit economics can quickly erode profitability if not modeled and executed correctly.
            </p>

            <h2 className="text-2xl font-bold text-brand-fg mt-12 mb-4">Our Approach</h2>
            <p>
              Rooted in deep operational experience in consumer goods retail since a young age, and refined by big-firm M&A and VC diligence frameworks, we provide the financial architecture required for sustainable offline expansion.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Unit Economics Optimization:</strong> Modeling profitability at the SKU and store level before you scale.</li>
              <li><strong>Omnichannel Financial Planning:</strong> Structuring working capital and supply chain finance for distributor networks.</li>
              <li><strong>Retail Playbooks:</strong> Strategic guidance on entering general trade (GT) vs. modern trade (MT) vs. exclusive brand outlets (EBO).</li>
            </ul>
          </div>

          <div className="bg-brand-muted/50 p-8 rounded-2xl border border-brand-border text-center">
            <h3 className="text-2xl font-bold text-brand-fg mb-4">Ready to conquer the offline market?</h3>
            <p className="text-brand-fg/70 mb-8 max-w-xl mx-auto">
              Ensure your retail expansion is profitable and scalable from day one.
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
