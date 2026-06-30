import { Metadata } from "next"
import { LineChart } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Thought Leadership & Content Strategy | RationalIQ",
  description: "Elevate your firm's market presence through data-driven insights, financial education content, and strategic positioning for Startups & VCs.",
}

const content: ServiceContent = {
  eyebrow: "For Startups & VCs",
  title: "Thought Leadership & Content Strategy",
  icon: LineChart,
  lead: "In an increasingly crowded market, capital alone is no longer a differentiator. Startups and Venture Capital firms must establish authority, articulate their thesis, and build trust through high-quality, data-driven content.",
  challenge:
    "Founders and partners often have deep industry insights but lack the time or the structural framework to translate that knowledge into compelling narratives. Generic content fails to capture the nuance required to attract top-tier deal flow or premium LPs.",
  approach:
    "Leveraging experience from creating financial and fundraising content for top ed-tech startups and growing finance audiences to over 450K subscribers, RationalIQ helps you codify your expertise.",
  bullets: [
    { strong: "Thesis Articulation", text: "Distilling complex investment philosophies into clear, engaging content pieces." },
    { strong: "Educational Architecture", text: "Designing structured financial and fundraising content for your audience or portfolio companies." },
    { strong: "Platform Growth", text: "Strategic advising on audience building across platforms like YouTube and LinkedIn." },
  ],
  ctaTitle: "Ready to elevate your firm's voice?",
  ctaText: "Let's discuss how we can build a content engine that drives real business outcomes.",
}

export default function ThoughtLeadershipService() {
  return <ServicePage content={content} />
}
