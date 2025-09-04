"use client"
import Contact from "@/components/contact/Contact"
import { InlineWidget } from "react-calendly"
import { IoMdHelpCircleOutline } from "react-icons/io"

const Support = ({
  pricingPlanId = 0,
  userEmail,
}: {
  pricingPlanId: number
  userEmail: string
}) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+381604278175"
    const message = `Hello! I need support with my account. My email is: ${userEmail}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="max-w-5xl space-y-8">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3 font-heading">
        <IoMdHelpCircleOutline className="text-product-primary w-6 h-6 sm:w-8 sm:h-8" /> Support
      </h2>
      <p className="text-lg text-product-foreground-accent mb-6">
        We're here to help you get the most out of Quicktalog. Choose your preferred support method below.
      </p>

      {/* Beta Program Notice */}
      <div className="bg-gradient-to-r from-product-primary/10 to-product-primary/5 border border-product-primary rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold text-product-foreground mb-2">
          🚀 Join Our Beta Program
        </h2>
        <p className="text-product-foreground-accent">
          Get priority support and help shape the future of Quicktalog. Share your feedback with us until December 31, 2025.
        </p>
      </div>

      {/* Support Options */}
      <div className="grid gap-8">
        {/* Email Support Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-product-primary rounded-full"></div>
            <h2 className="text-2xl font-semibold text-product-foreground">
              Email Support
            </h2>
          </div>
          <p className="text-product-foreground-accent mb-4">
            Send us a detailed message and we'll respond within 1 business day.
          </p>
          <Contact type="support" />
        </div>

        {/* Meeting Scheduling Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-product-primary rounded-full"></div>
            <h2 className="text-2xl font-semibold text-product-foreground">
              Schedule a Meeting
            </h2>
          </div>
          <p className="text-product-foreground-accent mb-4">
            Book a 30-minute consultation to discuss your needs or get personalized assistance.
          </p>
          <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-product-border">
            <InlineWidget
              url="https://calendly.com/quicktalog/30min"
              styles={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>

        {/* Quick Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-product-primary rounded-full"></div>
            <h2 className="text-2xl font-semibold text-product-foreground">
              Quick Contact
            </h2>
          </div>
          <p className="text-product-foreground-accent mb-4">
            Need immediate assistance? Reach out to us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp Support
            </button>
            <a
              href="mailto:support@quicktalog.com"
              className="flex-1 bg-product-primary hover:bg-product-primary/90 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
