import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brand-fg text-brand-bg py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">RationalIQ</h3>
            <p className="text-brand-bg/70 max-w-xs">
              Premium consulting for startups, VCs, and traditional family businesses navigating complex growth and governance challenges.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-brand-bg/80 text-sm">
              <li><Link href="/services/thought-leadership" className="hover:text-white transition-colors">Thought Leadership</Link></li>
              <li><Link href="/services/family-business-consulting" className="hover:text-white transition-colors">Family Business Consulting</Link></li>
              <li><Link href="/services/d2c-retail-strategy" className="hover:text-white transition-colors">D2C Retail Strategy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-brand-bg/80 text-sm">
              <li><Link href="/team" className="hover:text-white transition-colors">Team & Founder</Link></li>
              <li><Link href="/impact" className="hover:text-white transition-colors">Impact & Success Stories</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-bg/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-bg/60">
          <p>&copy; {new Date().getFullYear()} RationalIQ. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social placeholders */}
            <a href="https://youtube.com/@ca.hiteshsaiswani" target="_blank" rel="noopener noreferrer" className="hover:text-white">YouTube</a>
            <a href="https://instagram.com/ca.hiteshsaiswani" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
