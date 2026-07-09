import { PathSelector } from "@/components/sections/PathSelector"
import { JsonLd } from "@/components/JsonLd"
import { client } from "@/sanity/lib/client"
import { getPostsQuery } from "@/sanity/lib/queries"
import { IntroLoader } from "@/components/landing/IntroLoader"
import { LandingHero } from "@/components/landing/LandingHero"
import { TrustBar } from "@/components/landing/TrustBar"
import { ServicesPreview } from "@/components/landing/ServicesPreview"
import { FounderJourney } from "@/components/landing/FounderJourney"
import { FounderProfile } from "@/components/landing/FounderProfile"
import { HowWeWork } from "@/components/landing/HowWeWork"
import { ImpactStats } from "@/components/landing/ImpactStats"
import { Testimonials } from "@/components/landing/Testimonials"
import { BlogPreview, type BlogPreviewPost } from "@/components/landing/BlogPreview"
import { ContactSection } from "@/components/landing/ContactSection"

export const revalidate = 3600

export default async function Home() {
  let posts: BlogPreviewPost[] = []
  try {
    posts = await client.fetch(getPostsQuery)
  } catch {
    console.warn(
      "Could not fetch posts (likely missing Sanity credentials during build)"
    )
  }

  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RationalIQ",
    url: "https://rationaliq.in",
    logo: "https://rationaliq.in/logo.png",
    founder: { "@type": "Person", name: "Hitesh Saiswani" },
  }

  return (
    <>
      <JsonLd data={orgData} />
      <IntroLoader />
      <PathSelector />

      <>
        <LandingHero />
        <TrustBar />
        <ServicesPreview />
        <FounderJourney />
        <FounderProfile />
        <HowWeWork />
        <ImpactStats />
        <Testimonials />
        <BlogPreview posts={posts ?? []} />
        <ContactSection />
      </>
    </>
  )
}
