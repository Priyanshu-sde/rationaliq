'use client'

import { JourneyTimeline, type Milestone } from '@/components/sections/JourneyTimeline'

const MILESTONES: Milestone[] = [
  {
    period: 'Age 13',
    title: 'Born into Business',
    description: 'Growing up in a business family which operates in consumer goods retail electronics, Hitesh began working in sales when he was 13 years old. Watching the business from a young age planted the seed of mastering business operations and Business SOPs while growing up.',
    image: '/journey1.png',
    imageAlt: 'Family retail business shop floor',
  },
  {
    period: '2016–18',
    title: 'Learning the Language of Business',
    description: 'Three years of CA articleship meant late nights, complex filings, and a masterclass in how Indian businesses are actually structured, taxed, and scaled. This is where theory met reality.',
    image: '/journey2.png',
    imageAlt: 'Complex financial documents',
  },
  {
    period: '2019',
    title: 'Chartered Accountant',
    description: 'Qualifying as a CA wasn\'t the destination - it was the credential that opened the door to the country\'s most complex corporate transactions.',
    image: '/journey3.png',
    imageAlt: 'Professional credential and seal',
  },
  {
    period: '2019–22',
    title: 'Inside the Big Four',
    description: 'M&A advisory, family office investments into startups, due diligence on multi-crore deals - three years at the world\'s most respected consulting firms showed Hitesh exactly how high-stakes decisions get made.',
    image: '/journey4.png',
    imageAlt: 'Corporate skyscrapers at night',
  },
  {
    period: '2022',
    title: 'Early Team Member at a VC Fund',
    description: 'As an early team member at a VC fund, Hitesh helped the fund invest in 3 startups and guided founders through fundraising. He learned what separates a compelling investment thesis from a forgettable pitch deck.',
    image: '/journey5.png',
    imageAlt: 'Venture capital meeting room',
  },
  {
    period: '2024',
    title: 'Certified Family Business Advisor',
    description: 'Became a Certified Family Business Advisor from FFI USA to understand international standards of managing family businesses and family business advisory.',
    image: '/journey6.png',
    imageAlt: 'Family Business Advisor Certification',
  },
  {
    period: 'Now',
    title: '250+ Leaders. One Mission.',
    description: 'Today, RationalIQ provides specialized Next Gen Business IQ across four practice areas: Family Businesses, Educational Institutions, D2C Startups, and Brands and IPs—building lasting authority and growth for the next generation.',
    image: '/journey7.jpg',
    imageAlt: 'Strategic compass',
  },
]

export function FounderJourney() {
  return (
    <section className="relative overflow-hidden bg-transparent text-white">
      <div className="container mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-12">
        <div className="mb-8 text-center md:mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            The Origin Story
          </span>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Two decades of
            <br />
            <span className="italic">skin in the game.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Hitesh didn&apos;t study business from the outside. He grew up inside one.
          </p>
        </div>
      </div>

      <JourneyTimeline milestones={MILESTONES} theme="landing" />
    </section>
  )
}
