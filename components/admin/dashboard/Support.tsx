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
    <div className="max-w-5xl space-y-6">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3 font-heading">
        <IoMdHelpCircleOutline className="text-product-primary w-6 h-6 sm:w-8 sm:h-8" /> Support
      </h2>
      <h2 className="text-4xl font-semibold">
        🎉 Beta Launch Special! Enjoy full support while we gather your feedback. This promotion
        runs until <strong>31.12.2025</strong>.
      </h2>
      <div className="flex flex-col gap-5">
        <h2>Email support</h2>
        <Contact type="support" />
      </div>
      <div className="flex flex-col gap-5">
        <h2>Schedule a meeting</h2>
        <div className="h-screen w-full">
          <InlineWidget
            url="https://calendly.com/quicktalog/30min"
            styles={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  )
}

export default Support
