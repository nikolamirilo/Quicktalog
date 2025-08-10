import Benefits from "@/components/home/Benefits/Benefits"
import Container from "@/components/home/Container"
import CTA from "@/components/home/CTA"
import FAQ from "@/components/home/FAQ"
import Hero from "@/components/home/Hero"
import HowItWorks from "@/components/home/HowItWorks"
import Pricing from "@/components/home/Pricing/Pricing"
import ProblemSection from "@/components/home/ProblemSection"
import Section from "@/components/home/Section"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"

const HomePage: React.FC = async () => {
  return (
    <div className="font-lora no-tap-highlight" style={{ WebkitTapHighlightColor: "transparent" }}>
      <Navbar />
      <Hero />
      <Container>
        <Benefits />
        <Section
          id="problems"
          title="Stop Losing Customers to Outdated Catalogs"
          description="Replace printed catalogs with an interactive, mobile‑friendly online catalog you can update in real time.">
          <ProblemSection />
        </Section>
        {/* <Stats /> */}
        <Section
          id="how-it-works"
          title="Go Live in Minutes"
          description="Create a digital catalog in a few simple steps—or let AI generate it for you. No design or code required.">
          <HowItWorks />
        </Section>

        <Section
          id="pricing"
          title="Simple, Transparent Pricing"
          description="Start free and upgrade as you grow. No hidden fees. AI generation, OCR import, and analytics on higher tiers.">
          <Pricing />
        </Section>

        <CTA />
      </Container>

      <Section
        id="faq"
        title="Got Questions? We've Got Answers"
        description="Learn how digital catalogs differ from websites, how updates work, and how AI/OCR help you launch faster.">
        <FAQ />
      </Section>

      <Footer />
    </div>
  )
}

export default HomePage
