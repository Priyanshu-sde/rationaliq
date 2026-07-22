import { Metadata } from "next"
import Image from "next/image"
import { JsonLd } from "@/components/JsonLd"
import { JourneyTimeline, type Milestone } from "@/components/sections/JourneyTimeline"
import { Reveal, AnimatedText, Parallax, TiltCard, FloatingShape } from "@/components/anim"

export const metadata: Metadata = {
  title: "Team & Founder | RationalIQ",
  description: "Meet CA Hitesh Saiswani and the team behind RationalIQ.",
}

const milestones: Milestone[] = [
  {
    period: "Age 13",
    title: "Born into business",
    description:
      "Raised in a consumer-goods retail family, Hitesh started working part-time in the family business - learning operations from the ground up.",
  },
  {
    period: "2016 – 2018",
    title: "CA Articleship",
    description:
      "Witnessing the family business's struggle with data inspired his path into chartered accountancy, immersing in business, legal, and tax best practices.",
  },
  {
    period: "2019",
    title: "Qualified Chartered Accountant",
    description:
      "Officially qualified as a CA, combining hands-on retail intuition with rigorous financial discipline.",
  },
  {
    period: "2019 – 2022",
    title: "Grant Thornton & EY",
    description:
      "Focused on M&A, family-office investments into startups, and due diligence - the intersection of traditional wealth and modern venture capital.",
  },
  {
    period: "Sunicon VC",
    title: "Early at a venture fund",
    description:
      "One of the first employees at Sunicon Venture Capital Fund - helped invest in 3 startups and supported many more through fundraising.",
  },
  {
    period: "Content & Education",
    title: "Educator at scale",
    description:
      "Designed finance, fundraising, and succession content for top ed-tech startups, and helped grow a finance channel from 330K to 450K subscribers.",
  },
  {
    period: "Today",
    title: "RationalIQ",
    description:
      "Has worked with 250+ family business leaders on succession, governance, growth strategy, and next-gen coaching - plus D2C retail strategy.",
  },
]

export default function TeamPage() {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hitesh Saiswani",
    "jobTitle": "Founder & CA",
    "url": "https://rationaliq.in/team",
    "sameAs": [
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

      {/* Signature horizontal-scroll journey */}
      <JourneyTimeline milestones={milestones} theme="landing" />

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
                <p className="font-medium text-[#6366f1]">Founder &amp; CA</p>
                <div className="mt-2 flex gap-5">
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
                Born and raised in a business family in consumer goods retail,
                Hitesh started working part-time in the family business at age
                13. Witnessing firsthand the struggles of data management and
                operational inefficiencies inspired his path into chartered
                accountancy.
              </p>
              <p>
                Completing his CA articleship from 2016–2018, he immersed himself
                in business, legal, and tax practices, officially qualifying as a
                Chartered Accountant in 2019.
              </p>
              <p>
                His professional journey accelerated at global giants{" "}
                <strong className="text-[#f1f5f9]">Grant Thornton and EY (2019–2022)</strong>,
                where he focused on M&amp;A, due diligence, and facilitating
                family-office investments into high-growth startups.
              </p>
              <p>
                As one of the first employees at{" "}
                <strong className="text-[#f1f5f9]">Sunicon Venture Capital Fund</strong>,
                Hitesh played a pivotal role investing in 3 startups and
                supporting several others through fundraising. His content work
                revealed a broader market need, leading to financial, fundraising,
                and succession-planning content for top ed-tech startups.
              </p>
              <p>
                Notably, he helped architect the content strategy that grew a
                finance podcaster's channel from 330K to over 450K subscribers.
              </p>
              <p>
                Today, through RationalIQ, Hitesh has worked with over{" "}
                <strong className="text-[#f1f5f9]">250+ family business leaders</strong>{" "}
                on succession planning, growth strategy, intergenerational
                conflict resolution, family constitutions, and next-gen coaching -
                while advising D2C startups on offline expansion.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team grid */}
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
            {[1, 2, 3].map((i) => (
              <TiltCard
                key={i}
                max={6}
                lift={6}
                className="relative flex flex-col items-center rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 text-center"
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/[0.05]">
                  <span className="text-xs text-[#94a3b8]">Photo</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#f1f5f9]">TBD</h4>
                <p className="text-sm text-[#94a3b8]">Role Title</p>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
