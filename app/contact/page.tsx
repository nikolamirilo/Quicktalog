import Contact from "@/components/contact/Contact"
import Navbar from "@/components/navigation/Navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Quicktalog - Sales & Support",
  description:
    "Get in touch with Quicktalog sales or support. Ask about our digital catalog builder, plans, AI generation, OCR import, and more. We respond within 1 business day.",
}

const page = () => {
  return (
    <>
      <Navbar />
      <Contact />
    </>
  )
}

export default page
