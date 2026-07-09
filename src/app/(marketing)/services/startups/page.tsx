import { Metadata } from "next"
import { Store } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Startups | RationalIQ",
  description: "From first hire to Series C — infrastructure, playbooks, and momentum for teams building the next category.",
}

const content: ServiceContent = {
  eyebrow: "FOUNDERS",
  title: "Startups",
  icon: Store,
  lead: "From first hire to Series C — infrastructure, playbooks, and momentum for teams building the next category.",
  challenge:
    "Early stage founders often struggle with the transition to scale. The complexities of building operational infrastructure, managing growth, and navigating the VC ecosystem can quickly become overwhelming.",
  approach:
    "Rooted in deep operational experience and refined by VC diligence frameworks, we provide the foundational architecture required for sustainable, hyper-growth scale.",
  bullets: [
    { strong: "Growth Playbooks", text: "Modeling profitability and growth flywheels." },
    { strong: "Operational Infrastructure", text: "Structuring processes, team topologies, and core workflows." },
    { strong: "Fundraising Narrative", text: "Strategic guidance on positioning, metrics, and investor relations." },
  ],
  ctaTitle: "Ready to accelerate your growth?",
  ctaText: "Ensure your scale-up journey is efficient and structured from day one.",
}

export default function StartupsService() {
  return <ServicePage content={content} />
}
