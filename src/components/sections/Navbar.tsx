'use client'

import * as React from 'react'
import Link from 'next/link'
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
  { name: 'Blog', href: '/blog' },
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
      // Hide when scrolling down past the hero, show on scroll up.
      if (y > lastY.current && y > 240) setHidden(true)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (link: (typeof navLinks)[number]) =>
    pathname === link.href ||
    (link.name === 'Services' && pathname.startsWith('/services'))

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 will-change-transform',
        hidden && !isOpen ? '-translate-y-full' : 'translate-y-0',
        scrolled
          ? 'border-b border-brand-border bg-white/80 backdrop-blur-md shadow-[0_1px_20px_rgba(28,36,52,0.05)]'
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
          <Link href="/" className="group flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-fg">
              Rational<span className="text-brand-accent">IQ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center space-x-8 md:flex">
            <div className="flex space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'link-underline text-sm font-medium transition-colors hover:text-brand-primary',
                    isActive(link) ? 'text-brand-primary' : 'text-brand-fg/80'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Magnetic strength={0.3}>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 text-brand-fg md:hidden"
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
          'overflow-hidden border-brand-border bg-white/95 backdrop-blur-md transition-[max-height,opacity] duration-400 md:hidden',
          isOpen ? 'max-h-96 border-t opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-base font-medium transition-colors',
                isActive(link) ? 'text-brand-primary' : 'text-brand-fg/80'
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
