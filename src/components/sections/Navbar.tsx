'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services/thought-leadership' },
  { name: 'Team', href: '/team' },
  { name: 'Impact', href: '/impact' },
  { name: 'Blog', href: '/blog' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-fg">
              RationalIQ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center space-x-8 md:flex">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-brand-primary',
                    pathname === link.href || (link.name === 'Services' && pathname.startsWith('/services'))
                      ? 'text-brand-primary'
                      : 'text-brand-fg/80'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-brand-fg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="border-t border-brand-border bg-white p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-base font-medium transition-colors',
                  pathname === link.href || (link.name === 'Services' && pathname.startsWith('/services'))
                    ? 'text-brand-primary'
                    : 'text-brand-fg/80'
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="w-full mt-4" onClick={() => setIsOpen(false)}>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
