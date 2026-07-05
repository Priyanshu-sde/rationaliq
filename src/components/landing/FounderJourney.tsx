'use client'

import { CinematicJourney, type Milestone } from '@/components/sections/CinematicJourney'

const MILESTONES: Milestone[] = [
  {
    period: 'Age 13',
    title: 'Born into Business',
    description: 'Growing up in a consumer goods retail family, Hitesh began working the floor at 13. Watching the business struggle with messy data management planted a seed: understanding numbers wasn\'t optional — it was survival.',
    image: '/milestones/milestone_1_retail_1783281440492.png',
    imageAlt: 'Family retail business shop floor',
  },
  {
    period: '2016–18',
    title: 'Learning the Language of Business',
    description: 'Three years of CA articleship meant late nights, complex filings, and a masterclass in how Indian businesses are actually structured, taxed, and scaled. This is where theory met reality.',
    image: '/milestones/milestone_2_finance_1783281449243.png',
    imageAlt: 'Complex financial documents',
  },
  {
    period: '2019',
    title: 'Chartered Accountant',
    description: 'Qualifying as a CA wasn\'t the destination — it was the credential that opened the door to the country\'s most complex corporate transactions.',
    image: '/milestones/milestone_3_credential_1783281459086.png',
    imageAlt: 'Professional credential and seal',
  },
  {
    period: '2019–22',
    title: 'Inside the Big Four',
    description: 'M&A advisory, family office investments into startups, due diligence on multi-crore deals — three years at two of the world\'s most respected consulting firms showed Hitesh exactly how high-stakes decisions get made.',
    image: '/milestones/milestone_4_corporate_1783281480287.png',
    imageAlt: 'Corporate skyscrapers at night',
  },
  {
    period: '2022',
    title: 'First Employee, Sunicon VC',
    description: 'Joining Sunicon as an early hire, Hitesh helped the fund invest in 3 startups and guided founders through fundraising. He learned what separates a compelling investment thesis from a forgettable pitch deck.',
    image: '/milestones/milestone_5_vc_1783281490110.png',
    imageAlt: 'Venture capital meeting room',
  },
  {
    period: '2023',
    title: '330K → 450K',
    description: 'Content work for the fund opened doors with top education startups and a finance podcaster. Hitesh grew the channel by 120,000 subscribers — proving that the right content strategy is a measurable business lever.',
    image: '/milestones/milestone_6_growth_1783281498936.png',
    imageAlt: 'Digital growth network',
  },
  {
    period: 'Now',
    title: '250+ Leaders. One Mission.',
    description: 'Today, RationalIQ advises family businesses, startups, and VC-backed companies on the governance, content, and strategy that build lasting authority. Not just for right now — for the next generation.',
    image: '/milestones/milestone_7_consulting_1783281508192.png',
    imageAlt: 'Strategic compass',
  },
]

export function FounderJourney() {
  return (
    <section className="relative overflow-hidden bg-brand-fg text-white">
      <div className="container mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-12">
        <div className="mb-8 text-center md:mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
            The Origin Story
          </span>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Two decades of
            <br />
            <span className="italic">skin in the game.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Hitesh didn\'t study business from the outside. He grew up inside one.
          </p>
        </div>
      </div>

      <CinematicJourney milestones={MILESTONES} />
    </section>
  )
}
