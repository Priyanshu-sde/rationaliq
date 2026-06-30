'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Calendar } from 'lucide-react'
import { Reveal, AnimatedText, Magnetic, FloatingShape } from '@/components/anim'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com'

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      service: formData.get('service'),
      message: formData.get('message'),
      honeypot: formData.get('website'), // honeypot field
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (res.ok) {
        setSubmitStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setSubmitStatus('error')
      setErrorMessage('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-hidden py-28 md:py-36">
      <FloatingShape
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-brand-primary/8 blur-3xl"
        amplitude={26}
        duration={11}
      />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <Reveal direction="up" distance={14}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                Contact
              </span>
            </Reveal>
            <AnimatedText
              as="h1"
              by="word"
              stagger={0.06}
              className="mt-4 font-serif text-4xl tracking-tight text-brand-fg sm:text-5xl md:text-6xl"
            >
              Let's get in touch.
            </AnimatedText>
            <Reveal direction="up" delay={0.1}>
              <p className="mt-5 text-lg text-brand-fg/70">
                Ready to professionalize your business or elevate your firm's
                strategy? Let's talk.
              </p>
            </Reveal>
          </div>

          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal direction="up">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-brand-fg mb-6">Send a Message</h2>
                  {submitStatus === 'success' ? (
                    <div className="bg-green-50 text-green-800 p-4 rounded-md border border-green-200">
                      Thank you! Your message has been sent successfully. We will get back to you soon.
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                      {/* Honeypot field - hidden from users */}
                      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-fg mb-1">Name</label>
                        <Input id="name" name="name" required placeholder="John Doe" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-fg mb-1">Email</label>
                        <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-brand-fg mb-1">Service of Interest</label>
                        <select 
                          id="service" 
                          name="service" 
                          className="flex h-10 w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                        >
                          <option value="Thought Leadership">Thought Leadership</option>
                          <option value="Family Business Consulting">Family Business Consulting</option>
                          <option value="D2C Retail Strategy">D2C Retail Strategy</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-brand-fg mb-1">Message</label>
                        <Textarea id="message" name="message" required placeholder="How can we help you?" rows={5} />
                      </div>
                      
                      {submitStatus === 'error' && (
                        <div className="text-red-500 text-sm">{errorMessage}</div>
                      )}

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </Reveal>

            <Reveal direction="up" delay={0.12} className="flex flex-col gap-8">
              <div className="rounded-2xl border border-brand-border bg-brand-muted/30 p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <Calendar className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-brand-fg">Book a Consultation</h3>
                <p className="mb-6 text-brand-fg/80">
                  Prefer to speak directly? Schedule a discovery call at a time that works best for you.
                </p>
                <Magnetic strength={0.2} className="w-full">
                  <Button variant="outline" className="w-full bg-white hover:bg-white/90" asChild>
                    <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                      Open Calendly
                    </a>
                  </Button>
                </Magnetic>
              </div>

              <div className="p-8">
                <h3 className="mb-4 text-xl font-bold text-brand-fg">Direct Contact</h3>
                <div className="space-y-4 text-brand-fg/80">
                  <p>
                    <strong>Email:</strong>
                    <br />
                    <a href="mailto:hello@rationaliq.in" className="link-underline text-brand-primary">
                      hello@rationaliq.in
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
