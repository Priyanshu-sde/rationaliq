'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Mail } from 'lucide-react'
import { Reveal, AnimatedText, FloatingShape } from '@/components/anim'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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
      _gotcha: formData.get('_gotcha') || formData.get('website'),
    }

    try {
      const res = await fetch('https://formspree.io/f/xwvgnodq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (res.ok) {
        setSubmitStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus('error')
        const errText =
          result?.errors?.map((err: { message: string }) => err.message).join(', ') ||
          result?.error ||
          'Something went wrong. Please try again.'
        setErrorMessage(errText)
      }
    } catch {
      setSubmitStatus('error')
      setErrorMessage('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-hidden py-28 md:py-36">
      <FloatingShape
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#6366f1]/20 blur-3xl"
        amplitude={26}
        duration={11}
      />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <Reveal direction="up" distance={14}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4a853]">
                Contact
              </span>
            </Reveal>
            <AnimatedText
              as="h1"
              by="word"
              stagger={0.06}
              className="mt-4 font-serif text-4xl tracking-tight text-[#f1f5f9] sm:text-5xl md:text-6xl"
            >
              Let's get in touch.
            </AnimatedText>
            <Reveal direction="up" delay={0.1}>
              <p className="mt-5 text-lg text-[#94a3b8]">
                Ready to professionalize your business or elevate your firm's
                strategy? Let's talk.
              </p>
            </Reveal>
          </div>

          <div className="grid items-start gap-12 md:grid-cols-2">
            <Reveal direction="up">
              <Card className="border-white/[0.07] bg-white/[0.02]">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#f1f5f9] mb-6">Send a Message</h2>
                  {submitStatus === 'success' ? (
                    <div className="bg-green-900/30 text-green-400 p-4 rounded-md border border-green-800/50">
                      Thank you! Your message has been sent successfully. We will get back to you soon.
                    </div>
                  ) : (
                    <form action="https://formspree.io/f/xwvgnodq" method="POST" onSubmit={onSubmit} className="space-y-4">
                      {/* Honeypot field - hidden from users */}
                      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#f1f5f9] mb-1">Name</label>
                        <Input id="name" name="name" required placeholder="John Doe" className="bg-white/[0.03] border-white/[0.07] text-[#f1f5f9] placeholder:text-[#94a3b8]/50" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#f1f5f9] mb-1">Email</label>
                        <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-white/[0.03] border-white/[0.07] text-[#f1f5f9] placeholder:text-[#94a3b8]/50" />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-[#f1f5f9] mb-1">Service of Interest</label>
                        <select
                          id="service"
                          name="service"
                          className="flex h-10 w-full rounded-md border border-white/[0.07] bg-[#0f111a] px-3 py-2 text-sm text-[#f1f5f9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
                        >
                          <option value="Family Business">Family Business</option>
                          <option value="Education">Education</option>
                          <option value="D2C Startups">D2C Startups</option>
                          <option value="Investors & Personal Brands">Investors & Personal Brands</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[#f1f5f9] mb-1">Message</label>
                        <Textarea id="message" name="message" required placeholder="How can we help you?" rows={5} className="bg-white/[0.03] border-white/[0.07] text-[#f1f5f9] placeholder:text-[#94a3b8]/50" />
                      </div>

                      {submitStatus === 'error' && (
                        <div className="text-red-400 text-sm">{errorMessage}</div>
                      )}

                      <Button type="submit" className="w-full btn-shimmer bg-[#6366f1] text-white hover:bg-[#6366f1]/90" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </Reveal>

            <Reveal direction="up" delay={0.12} className="flex flex-col gap-8">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05]">
                  <Mail className="h-6 w-6 text-[#6366f1]" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-[#f1f5f9]">Direct Contact</h3>
                <p className="mb-6 text-[#94a3b8]">
                  Prefer to reach out directly? Send an email and Hitesh will respond personally.
                </p>
                <div className="space-y-4 text-[#94a3b8]">
                  <p>
                    <strong className="text-[#f1f5f9]">Email:</strong>
                    <br />
                    <a href="mailto:hitesh@rationaliq.in" className="link-underline text-[#6366f1] text-lg font-medium">
                      hitesh@rationaliq.in
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
