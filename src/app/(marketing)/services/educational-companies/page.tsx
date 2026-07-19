import { Metadata } from "next"
import { BookOpen } from "lucide-react"
import { ServicePage, type ServiceContent } from "@/components/sections/ServicePage"

export const metadata: Metadata = {
  title: "Educational Strategy | RationalIQ",
  description: "Develop comprehensive curricula, optimize learning platforms, and scale educational reach with data-backed methodologies for Education Companies.",
}

const content: ServiceContent = {
  eyebrow: "INSTITUTIONS",
  title: "Education",
  icon: BookOpen,
  lead: "Feel the transformation through education and training initiatives that are always hands-on, directly translate to skills, and change the way you think.",
  challenge:
    "Education often struggles to bridge the gap between theoretical knowledge and practical application. Delivering content that is engaging, actionable, and industry-relevant requires a deep understanding of both pedagogy and market demands.",
  approach:
    "We provide hands-on, goal-based training and curriculum development designed to transform students and teams into execution powerhouses with real-world skills.",
  bullets: [
    { strong: "Industry Readiness Programs", text: "Programs for students covering finance, sales, soft skills and communication, family business management, and startup fundraising." },
    { strong: "Corporate Training", text: "Customized and goal-based training programs to transform your team into an execution powerhouse or become more skilled." },
    { strong: "Curriculum Development", text: "Developing practical and industry-ready educational content and curriculum for your education institute." },
    { strong: "Content Distribution", text: "Distribution of education content on YouTube or learning management systems." },
  ],
  ctaTitle: "Ready to transform your educational impact?",
  ctaText: "Let's discuss how we can build practical, skills-based training for your audience.",
}

export default function EducationCompanyService() {
  return <ServicePage content={content} />
}
