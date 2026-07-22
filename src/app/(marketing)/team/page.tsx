import { Metadata } from "next"
import Image from "next/image"
import { JsonLd } from "@/components/JsonLd"
import { Reveal, AnimatedText, Parallax, TiltCard, FloatingShape } from "@/components/anim"
import { client } from "@/sanity/lib/client"
import { getTeamMembersQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

export const metadata: Metadata = {
  title: "Team & Founder | RationalIQ",
  description: "Meet CA Hitesh Saiswani and the team behind RationalIQ.",
}

export const revalidate = 3600

interface TeamMember {
  _id: string
  name: string
  role: string
  image?: any
  bio?: string
  linkedin?: string
  twitter?: string
}

export default async function TeamPage() {
  let teamMembers: TeamMember[] = []
  try {
    teamMembers = await client.fetch(getTeamMembersQuery)
  } catch (error) {
    console.warn("Could not fetch team members from Sanity")
  }

  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hitesh Saiswani",
    "jobTitle": "Founder & CA",
    "url": "https://rationaliq.in/team",
    "sameAs": [
      "https://www.linkedin.com/in/hitesh-saiswani/",
      "https://youtube.com/@ca.hiteshsaiswani",
      "https://instagram.com/ca.hiteshsaiswani",
    ],
  }

  return (
    <div>
      <JsonLd data={personData} />

      {/* Intro */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <FloatingShape
          className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#6366f1]/20 blur-3xl"
          amplitude={28}
          duration={10}
        />
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal direction="up" distance={14}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a853]">
                Team & Founder
              </span>
            </Reveal>
            <AnimatedText
              as="h1"
              by="word"
              stagger={0.06}
              className="mt-4 font-serif text-4xl tracking-tight text-[#f1f5f9] sm:text-5xl md:text-6xl"
            >
              The mind behind the model.
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Founder profile + bio */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-12 md:flex-row">
            <div className="w-full md:sticky md:top-28 md:w-1/3">
              <Reveal direction="up" scale distance={24}>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-transparent">
                  <Parallax speed={-0.1} className="absolute inset-0 flex items-end justify-center">
                    <Image
                      src="/profile-cutout.png"
                      alt="CA Hitesh Saiswani"
                      fill
                      className="object-contain object-bottom"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  </Parallax>
                </div>
              </Reveal>
              <Reveal direction="up" delay={0.1} className="mt-6 flex flex-col gap-2">
                <h3 className="font-serif text-xl font-bold text-[#f1f5f9]">Hitesh Saiswani</h3>
                <div className="mt-2 flex gap-5">
                  <a
                    href="https://www.linkedin.com/in/hitesh-saiswani/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-[#94a3b8] hover:text-[#6366f1]"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://youtube.com/@ca.hiteshsaiswani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-[#94a3b8] hover:text-[#6366f1]"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://instagram.com/ca.hiteshsaiswani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-[#94a3b8] hover:text-[#6366f1]"
                  >
                    Instagram
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal stagger={0.1} className="w-full space-y-6 text-lg leading-relaxed text-[#94a3b8] md:w-2/3">
              <p>
                Born and raised in a business family, Hitesh started working part-time in his family's business at the age of 13. Founded by his grandfather in 1974, the business initially sold radios and black-and-white televisions before expanding to become a direct dealer for major brands like LG, Samsung, Blue Star, Godrej, and Panasonic.
              </p>
              <p>
                At 13, he learned the fundamentals of commerce-from interacting with customers and selling electronics, to processing consumer loan forms and managing logistics. Witnessing firsthand the complexities of understanding and managing financial data ultimately inspired his path into Chartered Accountancy.
              </p>
              <p>
                During his CA articleship (2015–2018), he immersed himself in business, legal, and tax practices, approaching them through the dual lens of an accountant and an entrepreneur. Seeking experience beyond the family enterprise, he joined{" "}
                <strong className="text-[#f1f5f9]">Grant Thornton and EY (2019–2022)</strong>, specializing in M&amp;A due diligence and family office investments into high-growth startups.
              </p>
              <p>
                This expertise led him to{" "}
                <strong className="text-[#f1f5f9]">Sunicon Venture Capital Fund</strong> as an early investment team member. There, he facilitated startup funding and gained deep insight into how family business owners invest surplus capital. He also spearheaded content creation to establish the fund's thought leadership and attract top-tier founders.
              </p>
              <p>
                In early 2024, he founded RationalIQ. Partnering with top education companies, he has produced over 100 hours of educational content covering finance, sales, and family business succession, driven by his core belief that content and education are inherently inseparable today.
              </p>
              <p>
                Hitesh is a{" "}
                <strong className="text-[#d4a853]">Certified Family Business Advisor from the Family Firm Institute, USA</strong>, and has trained over 250 family business leaders in live sessions on succession planning, growth strategy, intergenerational conflict resolution, family constitutions, and next-gen coaching.
              </p>
              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 italic text-[#f1f5f9]">
                <p>
                  "Notably, he helped architect the content strategy that grew a finance podcaster's channel from 330K to over 450K subscribers."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team grid - rendered only when team members exist in Sanity */}
      {teamMembers && teamMembers.length > 0 && (
        <section className="bg-white/[0.02] py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedText
              as="h2"
              by="word"
              onScroll
              stagger={0.05}
              className="mb-14 text-center font-serif text-3xl tracking-tight text-[#f1f5f9] sm:text-4xl"
            >
              The team behind the practice.
            </AnimatedText>
            <Reveal stagger={0.12} className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {teamMembers.map((member) => (
                <TiltCard
                  key={member._id}
                  max={6}
                  lift={6}
                  className="relative flex flex-col items-center rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 text-center"
                >
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.05]">
                    {member.image ? (
                      <Image
                        src={urlForImage(member.image)?.url() || ""}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-[#94a3b8]">
                        Photo
                      </div>
                    )}
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#f1f5f9]">{member.name}</h4>
                  <p className="text-sm text-[#94a3b8]">{member.role}</p>
                  {member.bio && (
                    <p className="mt-3 text-xs leading-relaxed text-[#94a3b8]/80">{member.bio}</p>
                  )}
                  {(member.linkedin || member.twitter) && (
                    <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-[#94a3b8] hover:text-[#6366f1]"
                        >
                          LinkedIn
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-[#94a3b8] hover:text-[#6366f1]"
                        >
                          Twitter / X
                        </a>
                      )}
                    </div>
                  )}
                </TiltCard>
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </div>
  )
}
