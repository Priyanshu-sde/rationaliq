'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Calendar } from 'lucide-react'

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
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl font-serif">Get in Touch</h1>
            <p className="mt-4 text-lg text-brand-fg/70">
              Ready to professionalize your business or elevate your firm's strategy? Let's talk.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 items-start">
            <div>
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
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-brand-muted/30 p-8 rounded-2xl border border-brand-border">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Calendar className="text-brand-primary h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-brand-fg mb-4">Book a Consultation</h3>
                <p className="text-brand-fg/80 mb-6">
                  Prefer to speak directly? Schedule a discovery call at a time that works best for you.
                </p>
                <Button variant="outline" className="w-full bg-white hover:bg-white/90" asChild>
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    Open Calendly
                  </a>
                </Button>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-brand-fg mb-4">Direct Contact</h3>
                <div className="space-y-4 text-brand-fg/80">
                  <p>
                    <strong>Email:</strong><br />
                    <a href="mailto:hello@rationaliq.com" className="text-brand-primary hover:underline">hello@rationaliq.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
