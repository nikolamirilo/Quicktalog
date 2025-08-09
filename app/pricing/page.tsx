import Pricing from "@/components/home/Pricing/Pricing"
import Section from "@/components/home/Section"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose right pricing plan for your business. Explore our flexible pricing plans designed to fit your needs.",
}

const page = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto h-fit flex flex-col items-center justify-center py-24 max-w-[1400px]">
        <Section
          id="pricing"
          title="Simple, Transparent Pricing"
          description="Choose the plan that's right for you. No hidden fees, no surprises. Start for free and upgrade as you grow.">
          <Pricing />
        </Section>
      </div>
      <Footer />
    </>
  )
}

export default page
