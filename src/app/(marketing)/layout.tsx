import { Navbar } from "@/components/sections/Navbar"
import { Footer } from "@/components/sections/Footer"
import { SmoothScroll, ScrollProgress } from "@/components/anim"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
