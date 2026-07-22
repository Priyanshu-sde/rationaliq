import Link from 'next/link'
import { Calendar, Mail } from 'lucide-react'

/* lucide-react v1 removed brand icons - inline SVGs instead. */
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

const QUICK_LINKS = [
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#07080F] py-12 md:py-16 text-[#94A3B8]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1 - brand */}
          <div>
            <Link href="/" className="tier-1 font-display inline-block text-2xl text-[#F1F5F9]">
              Rational<span className="italic text-[#D4A853]">IQ</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              The governance, content, and strategy practice for leaders who
              intend to stay leaders.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://youtube.com/@ca.hiteshsaiswani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RationalIQ on YouTube"
                className="tier-2 press flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] text-[#94A3B8] hover:border-white/[0.14] hover:text-[#F1F5F9]"
              >
                <YoutubeIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://instagram.com/ca.hiteshsaiswani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RationalIQ on Instagram"
                className="tier-2 press flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] text-[#94A3B8] hover:border-white/[0.14] hover:text-[#F1F5F9]"
              >
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2 - quick links */}
          <div>
            <h3 className="text-label text-[#F1F5F9]">Quick links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="tier-1 hover:text-[#F1F5F9]">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - work with us */}
          <div>
            <h3 className="text-label text-[#F1F5F9]">Work with us</h3>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              One conversation is enough to know whether we can help.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="tier-2 press inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6366F1] px-5 text-sm font-semibold text-white hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book a call
              </Link>
              <Link
                href="/contact"
                className="tier-2 press inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.07] px-5 text-sm font-medium hover:border-white/[0.14] hover:text-[#F1F5F9]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Send a message
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-xs text-[rgba(148,163,184,0.5)] md:flex-row">
          <p>&copy; {new Date().getFullYear()} RationalIQ &middot; All rights reserved</p>
          <Link href="/privacy" className="tier-1 hover:text-[#F1F5F9]">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
