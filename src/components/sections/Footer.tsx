import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/anim'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-fg py-16 text-brand-bg">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal stagger={0.1} className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-serif text-2xl font-bold">
              Rational<span className="text-brand-accent">IQ</span>
            </h3>
            <p className="max-w-xs text-brand-bg/70">
              Premium consulting for startups, VCs, and traditional family
              businesses navigating complex growth and governance challenges.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-brand-bg/80">
              <li><Link href="/services/thought-leadership" className="link-underline transition-colors hover:text-white">Thought Leadership</Link></li>
              <li><Link href="/services/family-business-consulting" className="link-underline transition-colors hover:text-white">Family Business Consulting</Link></li>
              <li><Link href="/services/d2c-retail-strategy" className="link-underline transition-colors hover:text-white">D2C Retail Strategy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-brand-bg/80">
              <li><Link href="/team" className="link-underline transition-colors hover:text-white">Team & Founder</Link></li>
              <li><Link href="/impact" className="link-underline transition-colors hover:text-white">Impact & Success Stories</Link></li>
              <li><Link href="/blog" className="link-underline transition-colors hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="link-underline transition-colors hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-bg/20 pt-8 text-sm text-brand-bg/60 md:flex-row">
          <p>&copy; {new Date().getFullYear()} RationalIQ. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://youtube.com/@ca.hiteshsaiswani"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              YouTube
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://instagram.com/ca.hiteshsaiswani"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              Instagram
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
