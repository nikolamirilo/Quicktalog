import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing/Pricing";
import FAQ from "@/components/home/FAQ";
import Benefits from "@/components/home/Benefits/Benefits";
import Container from "@/components/home/Container";
import Section from "@/components/home/Section";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorks from "@/components/home/HowItWorks";

const HomePage: React.FC = async () => {
  return (
    <div className="font-lora">
      <Navbar />
      <Hero />
      <Container>
      <Benefits />
      <Section
          id="problems"
          title="The Hidden Costs of Traditional Catalogs"
          description="See how outdated methods are costing your business money and opportunities."
        >
          <ProblemSection />
        </Section>

        <Section
          id="how-it-works"
          title="How It Works"
          description="Create your first digital catalog in just 3 simple steps."
        >
          <HowItWorks />
        </Section>

        <Section
          id="pricing"
          title="Start Free, Scale as You Grow"
          description="Choose the plan that fits your business needs. No hidden fees."
        >
          <Pricing />
        </Section>

        <Stats />

        <CTA />
      </Container>

      <Section
        id="faq"
        title="Frequently Asked Questions"
        description="Everything you need to know about digital catalogs and our platform."
      >
        <FAQ />
      </Section>

      <Footer />
    </div>
  );
};

export default HomePage;
