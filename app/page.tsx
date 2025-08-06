import Benefits from "@/components/home/Benefits/Benefits";
import Container from "@/components/home/Container";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing/Pricing";
import ProblemSection from "@/components/home/ProblemSection";
import Section from "@/components/home/Section";
import Stats from "@/components/home/Stats";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

const HomePage: React.FC = async () => {
  return (
    <div className="font-lora no-tap-highlight" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <Navbar />
      <Hero />
      <Container>
        <Benefits />
        <Section
          id="problems"
          title="Stop Losing Customers to Outdated Catalogs"
          description="You're losing time and money with outdated, printed catalogs. Here's how a digital-first approach can help you grow your business."
        >
          <ProblemSection />
        </Section>
        <Stats />
        <Section
          id="how-it-works"
          title="Go Live in Minutes"
          description="Create a stunning digital catalog in just a few simple steps. No design or technical skills required."
        >
          <HowItWorks />
        </Section>

        <Section
          id="pricing"
          title="Simple, Transparent Pricing"
          description="Choose the plan that's right for you. No hidden fees, no surprises. Start for free and upgrade as you grow."
        >
          <Pricing />
        </Section>



        <CTA />
      </Container>

      <Section
        id="faq"
        title="Got Questions? We've Got Answers"
        description="Here are some of the most common questions we get from customers. If you don't see your question here, just ask!"
      >
        <FAQ />
      </Section>

      <Footer />
    </div>
  );
};

export default HomePage;
