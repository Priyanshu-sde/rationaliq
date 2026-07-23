import { Metadata } from "next"
import { LineChart } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Investors & Personal Brands Thought Leadership | RationalIQ",
  description: "Build genuine thought leadership IPs for investors to attract top 1% founders through blunt truth, unique insight, and strategic positioning.",
}

const content: ServiceContent = {
  eyebrow: "INVESTORS",
  title: "Investors & Personal Brands",
  icon: LineChart,
  lead: "Get seen by top 1% founders through thought leadership IPs. And yes, content creation is not thought leadership.",
  challenge:
    "There are 2 types of information systems on the internet. The first is clickbaity, hook heavy and designed to grab your attention. This is not bad. But it's massy. People hire writers to write scripts that will sell. And that's what happens. People remember the meme, joke, hook, script but rarely the person who spoke it. It gets views but not followers or believers.",
  approach:
    "Thought leadership is an extension of your IQ and EQ. It may not get you the most impressions. But it forces you to lead your industry by speaking the blunt truth and by expanding the boundaries that are set by your peers. When you create content which is unique, counter intuitive, different and superior to your peers.. People follow you, believe in you and remember you by name. We do thought leadership for investors with insight. Everything else, including top 1% founders preferring you, follows.",
  bullets: [
    { strong: "Thought Leadership vs Mass Content", text: "Moving beyond clickbaity, hook-heavy content scripts to build genuine authority that creates believers, not just casual viewers." },
    { strong: "Unique & Counter-Intuitive IPs", text: "Creating intellectual properties that expand industry boundaries and showcase your deep IQ and EQ." },
    { strong: "Attracting Top 1% Founders", text: "Positioning investors with insight so top 1% founders naturally prefer and seek out your firm." },
    { strong: "Blunt Truth Authority", text: "Leading your industry by speaking the blunt truth with superior, differentiated perspectives." },
  ],
  ctaTitle: "Ready to build true thought leadership?",
  ctaText: "Let's translate your insights into an intellectual property that attracts the best founders.",
}

export default function ThoughtLeadershipService() {
  return <ServicePage content={content} />
}
