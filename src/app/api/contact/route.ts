import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy')

export async function POST(req: Request) {
  try {
    const { name, email, service, message, honeypot } = await req.json()

    // Basic honeypot check
    if (honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL

    if (!receiverEmail) {
      console.error('CONTACT_RECEIVER_EMAIL is not set')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data, error } = await resend.emails.send({
      from: 'RationalIQ Contact Form <onboarding@resend.dev>', // Should be a verified domain in production
      to: [receiverEmail],
      replyTo: email,
      subject: `New Inquiry from ${name} - ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service of Interest:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
