import { Metadata } from "next"
import { Network } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Family Business NextGen IQ | RationalIQ",
  description: "Navigate succession planning, establish family constitutions, and bridge the gap between traditional operations and modern growth strategies.",
}

const content: ServiceContent = {
  eyebrow: "STEWARDS",
  title: "Family Business",
  icon: Network,
  lead: "Leverage the experience of a Chartered Accountant and Certified Family Business Advisor from FFI USA who was born in a business family as a one stop solution.",
  challenge:
    "Many successful family businesses struggle when transitioning from the founder to the next generation. Undefined succession plans, lack of formal governance, intergenerational conflict, and outdated wealth management strategies can threaten decades of hard work.",
  approach:
    "With firsthand experience growing up in a family business and having advised over 250+ family business leaders, CA Hitesh Saiswani brings deep empathy and rigorous financial acumen to your enterprise - bridging legacy and modern practices.",
  bullets: [
    { strong: "Succession Planning", text: "Designing clear, actionable roadmaps for leadership and ownership transitions." },
    { strong: "Constitution and Family Board Assistance", text: "Drafting formal agreements to govern family involvement, conflict resolution, and dividend policies, along with family board setup." },
    { strong: "Next Gen Coaching", text: "Mentoring upcoming leaders to take the reins with confidence and competence." },
    { strong: "Professionalisation Exercise", text: "Transitioning from family-run to professionally managed structures while preserving core values." },
    { strong: "Business Advisory", text: "Providing strategic insights for growth, scaling, and operational efficiency." },
    { strong: "Thought Leadership and Personal Branding", text: "Building the public profile of key family members to establish authority and trust in the market." },
    { strong: "Estate and Wealth Planning", text: "Structuring trusts, wills, and wealth preservation mechanisms for seamless intergenerational wealth transfer." },
  ],
  ctaTitle: "Protect your legacy and plan for the future.",
  ctaText: "Let's have a confidential conversation about your family business's unique needs.",
}

export default function FamilyBusinessService() {
  return <ServicePage content={content} />
}
