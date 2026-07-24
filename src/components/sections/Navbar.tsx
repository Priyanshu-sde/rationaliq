'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/anim'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Team', href: '/team' },
  { name: 'Impact', href: '/impact' },
  { name: 'Blogs & Case Studies', href: '/blog' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const pathname = usePathname()
  const lastY = React.useRef(0)

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)

      if (pathname === '/') {
        const wh = window.innerHeight
        if (y < wh * 0.5) {
          // Hide while in PathSelector
          setHidden(true)
        } else if (y < wh * 1.2) {
          // Show when Hero is in view
          setHidden(false)
        } else {
          // Normal behavior past Hero
          if (y > lastY.current) setHidden(true)
          else setHidden(false)
        }
      } else {
        // Normal behavior for other pages
        if (y > lastY.current && y > 240) setHidden(true)
        else setHidden(false)
      }

      lastY.current = y
    }

    // Initial check
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (link: (typeof navLinks)[number]) =>
    pathname === link.href ||
    (link.name === 'Services' && pathname.startsWith('/services'))

  // The whole site is dark theme now.
  const dark = true

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 will-change-transform',
        hidden && !isOpen ? '-translate-y-full' : 'translate-y-0',
        scrolled
          ? dark
            ? 'border-b border-white/[0.07] bg-[#07080F]/80 backdrop-blur-md'
            : 'border-b border-brand-border bg-white/80 backdrop-blur-md shadow-[0_1px_20px_rgba(28,36,52,0.05)]'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-500',
            scrolled ? 'h-16' : 'h-20'
          )}
        >
          <Link href="/" className="group flex items-center">
            <Image
              src="/light_logo_text.png"
              alt="RationalIQ"
              width={200}
              height={50}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center space-x-8 md:flex">
            <div className="flex space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'link-underline text-sm font-medium transition-colors',
                    dark
                      ? isActive(link)
                        ? 'text-[#F1F5F9]'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                      : isActive(link)
                        ? 'text-brand-primary'
                        : 'text-brand-fg/80 hover:text-brand-primary'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Magnetic strength={0.3}>
              <Button
                asChild
                className={cn(dark && 'bg-[#6366F1] text-white hover:bg-[#6366F1]/90')}
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn('p-2 md:hidden', dark ? 'text-[#F1F5F9]' : 'text-brand-fg')}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          'overflow-y-auto transition-[max-height,opacity] duration-400 md:hidden',
          dark
            ? 'border-white/[0.07] bg-[#07080F]/95 backdrop-blur-md'
            : 'border-brand-border bg-white/95 backdrop-blur-md',
          isOpen ? 'max-h-[100vh] border-t opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-base font-medium transition-colors',
                dark
                  ? isActive(link)
                    ? 'text-[#F1F5F9]'
                    : 'text-[#94A3B8]'
                  : isActive(link)
                    ? 'text-brand-primary'
                    : 'text-brand-fg/80'
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="mt-2 w-full" onClick={() => setIsOpen(false)}>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
