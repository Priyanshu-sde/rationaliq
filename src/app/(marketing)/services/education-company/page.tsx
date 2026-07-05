import { Metadata } from "next"
import { BookOpen } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Educational Strategy | RationalIQ",
  description: "Develop comprehensive curricula, optimize learning platforms, and scale educational reach with data-backed methodologies for Education Companies.",
}

const content: ServiceContent = {
  eyebrow: "For Education Companies",
  title: "Educational Strategy & Scaling",
  icon: BookOpen,
  lead: "In the rapidly evolving ed-tech and traditional education sectors, creating scalable, engaging, and outcome-driven learning experiences is critical to standing out.",
  challenge:
    "Education companies often struggle to balance pedagogical rigor with rapid growth. Scaling content creation, maintaining student engagement, and differentiating in a crowded market require specialized expertise.",
  approach:
    "Drawing on extensive experience in the ed-tech ecosystem and curriculum design, RationalIQ partners with education companies to optimize learning outcomes, streamline content delivery, and build robust growth strategies.",
  bullets: [
    { strong: "Curriculum Design", text: "Developing structured, engaging, and outcome-focused educational content." },
    { strong: "Platform Optimization", text: "Enhancing the user experience and instructional delivery on digital platforms." },
    { strong: "Growth & Audience", text: "Strategic positioning and scaling strategies to reach broader student demographics." },
  ],
  ctaTitle: "Ready to scale your educational impact?",
  ctaText: "Let's discuss how we can refine your curriculum and accelerate your growth.",
}

export default function EducationCompanyService() {
  return <ServicePage content={content} />
}
