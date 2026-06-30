import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/Card"
import Image from "next/image"
import { JsonLd } from "@/components/JsonLd"

export const metadata: Metadata = {
  title: "Team & Founder | RationalIQ",
  description: "Meet CA Hitesh Saiswani and the team behind RationalIQ.",
}

export default function TeamPage() {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hitesh Saiswani",
    "jobTitle": "Founder & CA",
    "url": "https://rationaliq.com/team",
    "sameAs": [
      "https://youtube.com/@ca.hiteshsaiswani",
      "https://instagram.com/ca.hiteshsaiswani"
    ]
  }

  return (
    <div className="py-20 md:py-32">
      <JsonLd data={personData} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl md:text-6xl font-serif text-center mb-16">
            The Mind Behind the Model
          </h1>
          
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="aspect-[3/4] w-full rounded-2xl bg-brand-muted/50 border border-brand-border flex items-end justify-center overflow-hidden relative">
                <Image 
                  src="/profile-cutout.png" 
                  alt="CA Hitesh Saiswani" 
                  fill 
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-xl font-bold">Hitesh Saiswani</h3>
                <p className="text-brand-primary font-medium">Founder & CA</p>
                <div className="flex gap-4 mt-2">
                  <a href="https://youtube.com/@ca.hiteshsaiswani" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-fg/70 hover:text-brand-primary underline underline-offset-4">YouTube</a>
                  <a href="https://instagram.com/ca.hiteshsaiswani" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-fg/70 hover:text-brand-primary underline underline-offset-4">Instagram</a>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 prose prose-lg max-w-none text-brand-fg/80">
              <p>
                Born and raised in a business family in consumer goods retail, Hitesh started working part-time in the family business at age 13. Witnessing firsthand the struggles of data management and operational inefficiencies inspired his path into chartered accountancy.
              </p>
              <p>
                Completing his CA articleship from 2016–2018, he immersed himself in business, legal, and tax practices, officially qualifying as a Chartered Accountant in 2019. 
              </p>
              <p>
                His professional journey accelerated at global giants <strong>Grant Thornton and EY (2019–2022)</strong>, where he focused on M&A, due diligence, and facilitating family office investments into high-growth startups. This unique intersection of traditional wealth and modern venture capital laid the foundation for his future advisory work.
              </p>
              <p>
                As one of the first employees at <strong>Sunicon Venture Capital Fund</strong>, Hitesh played a pivotal role in investing in 3 startups and supporting several others through their fundraising journeys. His content work for the fund revealed a broader need in the market, leading to opportunities designing financial, fundraising, and succession-planning education content for top ed-tech startups. 
              </p>
              <p>
                Notably, he helped architect the content strategy that grew a finance podcaster's channel from 330K to over 450K subscribers.
              </p>
              <p>
                Today, through RationalIQ, Hitesh has worked with over <strong>250+ family business leaders</strong> on succession planning, growth strategy, intergenerational conflict resolution, family constitutions, and next-gen coaching. He also advises D2C startups, leveraging his deep roots in consumer retail to craft winning offline expansion strategies.
              </p>
            </div>
          </div>
          
          <div className="mt-32">
            <h2 className="text-3xl font-bold tracking-tight text-brand-fg sm:text-4xl text-center mb-12">The Team</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-brand-bg border-brand-border/50 shadow-none">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-brand-muted/50 mb-4 flex items-center justify-center">
                       <span className="text-xs text-brand-fg/40">Photo</span>
                    </div>
                    <h4 className="font-serif font-bold text-lg">TBD</h4>
                    <p className="text-brand-fg/70 text-sm">Role Title</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
