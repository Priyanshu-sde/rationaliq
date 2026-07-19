import { Metadata } from "next"
import { LineChart } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Thought Leadership & Content Strategy | RationalIQ",
  description: "Elevate your firm's market presence through data-driven insights, financial education content, and strategic positioning for Startups & VCs.",
}

const content: ServiceContent = {
  eyebrow: "ALLOCATORS",
  title: "Venture Capital",
  icon: LineChart,
  lead: "Get seen by top 1% founders through thought leadership IPs. And yes, content creation is not thought leadership.",
  challenge:
    "There are two types of information systems on the internet. The first is clickbaity, hook-heavy, and designed to grab your attention. It's massy. People hire writers to write scripts that will sell. People remember the meme, joke, hook, or script, but rarely the person who spoke it. It gets views, but not followers or believers.",
  approach:
    "Thought leadership is an extension of your IQ and EQ. It forces you to lead your industry by speaking the blunt truth and by expanding the boundaries set by your peers. When you create content that is unique, counter-intuitive, different, and superior, people follow you, believe in you, and remember you by name.",
  bullets: [
    { strong: "Insight-Driven IPs", text: "We do thought leadership for investors with insight. We translate your deep expertise into powerful intellectual properties." },
    { strong: "Attracting the Top 1%", text: "By establishing true authority and trust, everything else follows—including the top 1% of founders preferring you." },
    { strong: "Beyond Content Creation", text: "We don't just write scripts that sell; we build a narrative that fosters long-term believers and followers." },
  ],
  ctaTitle: "Ready to build true thought leadership?",
  ctaText: "Let's translate your insights into an intellectual property that attracts the best founders.",
}

export default function ThoughtLeadershipService() {
  return <ServicePage content={content} />
}
