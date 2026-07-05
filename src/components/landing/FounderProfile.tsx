import Image from "next/image"
import { Reveal, Parallax } from "@/components/anim"

export function FounderProfile() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 text-white">
      {/* Background glow or grid */}
      <div className="pointer-events-none absolute inset-0 bg-transparent">
        <div className="absolute top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-indigo/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-16 md:flex-row">
          
          {/* Left: Sticky Image Card */}
          <div className="w-full md:sticky md:top-32 md:w-2/5">
            <Reveal direction="up" distance={30}>
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-white/[0.05]" />
                
                {/* Glow behind the person */}
                <div className="absolute bottom-0 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-gold/20 blur-[60px] transition-opacity duration-700 group-hover:opacity-70" />
                
                <Parallax speed={-0.05} className="absolute inset-0 flex items-end justify-center pb-0">
                  <Image
                    src="/profile-cutout.png"
                    alt="CA Hitesh Saiswani"
                    fill
                    className="object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                </Parallax>
                
                <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10" />
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1} className="mt-8 flex flex-col items-center text-center md:items-start md:text-left">
              <h3 className="font-serif text-3xl font-bold tracking-tight text-white">Hitesh Saiswani</h3>
              <p className="mt-2 text-lg font-medium tracking-wide text-gold">Founder &amp; CA</p>
              
              <div className="mt-6 flex gap-6">
                <a
                  href="https://youtube.com/@ca.hiteshsaiswani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline flex items-center gap-2 text-sm uppercase tracking-widest text-white/60 transition-colors hover:text-gold"
                >
                  YouTube
                </a>
                <a
                  href="https://instagram.com/ca.hiteshsaiswani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline flex items-center gap-2 text-sm uppercase tracking-widest text-white/60 transition-colors hover:text-gold"
                >
                  Instagram
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: The Text Paragraphs */}
          <div className="w-full md:w-3/5 md:pt-12">
            <Reveal stagger={0.1} className="space-y-8 text-xl leading-relaxed text-white/70">
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
                <strong className="font-semibold text-white">Grant Thornton and EY (2019–2022)</strong>,
                where he focused on M&amp;A, due diligence, and facilitating
                family-office investments into high-growth startups.
              </p>
              <p>
                As one of the first employees at{" "}
                <strong className="font-semibold text-white">Sunicon Venture Capital Fund</strong>,
                Hitesh played a pivotal role investing in 3 startups and
                supporting several others through fundraising. His content work
                revealed a broader market need, leading to financial, fundraising,
                and succession-planning content for top ed-tech startups.
              </p>
              <p className="border-l-2 border-gold/40 pl-6 text-2xl italic text-white/90">
                Notably, he helped architect the content strategy that grew a
                finance podcaster's channel from 330K to over 450K subscribers.
              </p>
              <p>
                Today, through RationalIQ, Hitesh has worked with over{" "}
                <strong className="font-semibold text-gold">250+ family business leaders</strong>{" "}
                on succession planning, growth strategy, intergenerational
                conflict resolution, family constitutions, and next-gen coaching —
                while advising D2C startups on offline expansion.
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}
