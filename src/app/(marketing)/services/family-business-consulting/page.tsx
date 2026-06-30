import { Metadata } from "next"
import { Network } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Family Business Consulting | RationalIQ",
  description: "Navigate succession planning, establish family constitutions, and bridge the gap between traditional operations and modern growth strategies.",
}

const content: ServiceContent = {
  eyebrow: "For Traditional Enterprises",
  title: "Family Business Consulting",
  icon: Network,
  lead: "Family businesses form the backbone of the economy, but they face unique challenges. Intergenerational transitions, emotional dynamics, and the need to professionalize without losing core values require a delicate, structured approach.",
  challenge:
    "Many successful family businesses struggle when transitioning from the founder to the next generation. Undefined succession plans, lack of formal governance, intergenerational conflict, and outdated wealth management strategies can threaten decades of hard work.",
  approach:
    "With firsthand experience growing up in a family business and having advised over 250+ family business leaders, CA Hitesh Saiswani brings deep empathy and rigorous financial acumen to your enterprise — bridging legacy and modern practices.",
  bullets: [
    { strong: "Succession Planning", text: "Designing clear, actionable roadmaps for leadership and ownership transitions." },
    { strong: "Family Constitutions", text: "Drafting formal agreements to govern family involvement, conflict resolution, and dividend policies." },
    { strong: "Next-Gen Coaching", text: "Mentoring upcoming leaders to take the reins with confidence and competence." },
    { strong: "Wealth & Investment Strategy", text: "Advising on family office setup and startup investing, drawing on VC experience." },
  ],
  ctaTitle: "Protect your legacy and plan for the future.",
  ctaText: "Let's have a confidential conversation about your family business's unique needs.",
}

export default function FamilyBusinessService() {
  return <ServicePage content={content} />
}
