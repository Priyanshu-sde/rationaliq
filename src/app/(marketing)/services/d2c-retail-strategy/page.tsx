import { Metadata } from "next"
import { Store } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "D2C Retail Strategy | RationalIQ",
  description: "Accelerate your offline expansion with rigorous financial modeling, unit economics optimization, and proven retail playbooks.",
}

const content: ServiceContent = {
  eyebrow: "For Consumer Brands",
  title: "D2C Retail Strategy",
  icon: Store,
  lead: "Digital-first brands eventually hit a ceiling online. The next frontier for scale is offline retail — but the rules of engagement are fundamentally different. Moving from performance marketing to shelf space requires a structural shift in operations, finance, and strategy.",
  challenge:
    "D2C founders often struggle with the transition to omnichannel. The complexities of distributor margins, inventory financing, modern trade negotiations, and store-level unit economics can quickly erode profitability if not modeled and executed correctly.",
  approach:
    "Rooted in deep operational experience in consumer goods retail since a young age, and refined by big-firm M&A and VC diligence frameworks, we provide the financial architecture required for sustainable offline expansion.",
  bullets: [
    { strong: "Unit Economics Optimization", text: "Modeling profitability at the SKU and store level before you scale." },
    { strong: "Omnichannel Financial Planning", text: "Structuring working capital and supply chain finance for distributor networks." },
    { strong: "Retail Playbooks", text: "Strategic guidance on entering general trade vs. modern trade vs. exclusive brand outlets." },
  ],
  ctaTitle: "Ready to conquer the offline market?",
  ctaText: "Ensure your retail expansion is profitable and scalable from day one.",
}

export default function D2CRetailService() {
  return <ServicePage content={content} />
}
