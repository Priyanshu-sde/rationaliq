import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | RationalIQ",
  description: "How RationalIQ handles the information you share with us.",
}

export default function PrivacyPage() {
  return (
    <div className="py-28 md:py-36">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl tracking-tight text-[#f1f5f9] sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-8 space-y-6 text-[#94a3b8]">
            <p>
              RationalIQ collects only the information you choose to share with
              us — typically your name, email address, and the details of your
              enquiry submitted through our contact form.
            </p>
            <p>
              We use this information solely to respond to your enquiry and to
              discuss a potential engagement. We do not sell, rent, or share
              your personal information with third parties for marketing
              purposes.
            </p>
            <p>
              Enquiry emails are delivered and stored through our email
              provider. If you would like the information you have shared with
              us deleted, write to us and we will remove it.
            </p>
            <p>
              For any privacy-related questions, contact us through the{" "}
              <a href="/contact" className="text-[#6366f1] underline underline-offset-4">
                contact page
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
