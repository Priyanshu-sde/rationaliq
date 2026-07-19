import { Metadata } from "next"
import { Store } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Startups | RationalIQ",
  description: "From first hire to Series C — infrastructure, playbooks, and momentum for teams building the next category.",
}

const content: ServiceContent = {
  eyebrow: "FOUNDERS",
  title: "D2C Startups",
  icon: Store,
  lead: "If you've peaked at selling online and want fractional business intelligence for your offline retail strategy, you're at the right place.",
  challenge:
    "Many Direct-to-Consumer (D2C) brands experience a plateau in online customer acquisition. Transitioning from the digital space to physical retail presents entirely new challenges in operations, customer experience, and unit economics.",
  approach:
    "We provide fractional business intelligence and end-to-end operational playbooks to bridge the gap between your online success and a robust, profitable offline retail footprint.",
  bullets: [
    { strong: "Retail Store Design", text: "Crafting physical spaces that reflect your brand identity and optimize customer flow." },
    { strong: "Display Strategy", text: "Visual merchandising to maximize engagement and drive in-store conversions." },
    { strong: "Sales Trainings", text: "Equipping your team with the skills to close sales and enhance the customer experience." },
    { strong: "In-Store Demonstration Staff Training", text: "Training staff for compelling product demonstrations that highlight key value propositions." },
    { strong: "Product and Price Placement", text: "Strategic positioning of SKUs and pricing models to improve basket size and profitability." },
    { strong: "Customer SOP Creation", text: "Standard Operating Procedures (SOPs) designed to ensure a consistent and delightful customer journey." },
    { strong: "In-Store SOP Creation", text: "Comprehensive Standard Operating Procedures to streamline daily store operations and management." },
  ],
  ctaTitle: "Ready to conquer offline retail?",
  ctaText: "Let's build a profitable physical presence for your D2C brand.",
}

export default function StartupsService() {
  return <ServicePage content={content} />
}
