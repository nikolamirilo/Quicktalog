// LD JSON Schema constants for structured data

import { faqs } from "./details"

// Organization schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Quicktalog",
  url: "https://quicktalog.app",
  logo: "https://quicktalog.app/logo.svg",
  description:
    "Quicktalog empowers businesses to create, manage, and share interactive digital catalogues for products and services.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    email: "quicktalog@outlook.com",
    contactType: "customer service",
  },
  sameAs: ["https://www.linkedin.com/company/quicktalog"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
}

// WebSite schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Quicktalog",
  url: "https://quicktalog.app",
  description:
    "Create stunning digital catalogs in minutes with our free online catalog maker. Perfect for restaurants, salons, gyms, retail & more.",
  publisher: {
    "@type": "Organization",
    name: "Quicktalog",
    logo: "https://quicktalog.app/logo.svg",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://quicktalog.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

// Service schema
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Catalog Creation Service",
  description:
    "Professional digital catalog creation and management service for businesses. Create interactive, mobile-friendly catalogs with AI-powered tools, OCR import, and real-time analytics.",
  provider: {
    "@type": "Organization",
    name: "Quicktalog",
    url: "https://quicktalog.app",
  },
  serviceType: "Digital Catalog Software",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Quicktalog Plans",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Free Plan",
          description: "One digital catalog with basic customization and QR code sharing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pro Plan",
          description: "Multiple catalogs with AI features, OCR import, and advanced analytics",
        },
      },
    ],
  },
}

// Home page schema
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Quicktalog - Create Stunning Digital Catalogs in Minutes",
  description:
    "The best free online catalog maker for businesses. Turn your services, menus, or products into an interactive, mobile-friendly digital catalog. No code or design skills required.",
  url: "https://quicktalog.app",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Quicktalog",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    description: "Free online catalog maker for creating interactive digital catalogs",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free plan available",
    },
    featureList: [
      "AI-powered catalog creation",
      "OCR import from paper catalogs",
      "Mobile-friendly design",
      "QR code sharing",
      "Real-time analytics",
      "Professional templates",
      "Instant updates",
      "No code required",
    ],
  },
}

// Pricing page schema
export const pricingPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pricing - Simple, Transparent Pricing | Quicktalog",
  description:
    "Start with our free online catalog maker and upgrade as you grow. No hidden fees. Access professional catalog templates, AI generation, OCR import, and analytics.",
  url: "https://quicktalog.app/pricing",
  mainEntity: {
    "@type": "Product",
    name: "Quicktalog Digital Catalog Service",
    description: "Digital catalog creation and management service",
    offers: [
      {
        "@type": "Offer",
        name: "Free Plan",
        price: "0",
        priceCurrency: "USD",
        description: "One digital catalog with basic features",
      },
      {
        "@type": "Offer",
        name: "Pro Plan",
        price: "10",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "RecurringPaymentsPriceSpecification",
          billingDuration: "P1M",
        },
        description: "Multiple catalogs with advanced features",
      },
    ],
  },
}

// Contact page schema
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Us - Get Help with Your Digital Catalog | Quicktalog",
  description:
    "Need help creating your digital catalog? Contact our support team for assistance with setup, customization, and getting the most out of Quicktalog.",
  url: "https://quicktalog.app/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Quicktalog",
    contactPoint: {
      "@type": "ContactPoint",
      email: "quicktalog@outlook.com",
      contactType: "customer service",
      availableLanguage: "English",
    },
  },
}

// Playground page schema
export const playgroundPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Try the Playground - Test Our Catalog Maker | Quicktalog",
  description:
    "Try our free online catalog maker in the playground. Create a sample catalog and see how easy it is to build professional digital catalogs.",
  url: "https://quicktalog.app/playground",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Quicktalog Playground",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    description: "Interactive demo of Quicktalog's digital catalog maker",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free to try",
    },
  },
}

// Showcases page schema
export const showcasesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Showcases - See Digital Catalogs in Action | Quicktalog",
  description:
    "Explore real examples of digital catalogs created with Quicktalog. See how businesses use our platform to showcase their products and services.",
  url: "https://quicktalog.app/showcases",
  mainEntity: {
    "@type": "ItemList",
    name: "Digital Catalog Examples",
    description: "Real examples of digital catalogs created with Quicktalog",
  },
}
export const helpPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Help Center - FAQs, Guides & Support | Quicktalog",
  description:
    "Visit the Quicktalog Help Center to find FAQs, step-by-step guides, and support resources to make the most out of your digital catalog.",
  url: "https://quicktalog.app/help",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

// Helper function to get schema for a page
export function getPageSchema(page: string) {
  const schemas = {
    home: homePageSchema,
    pricing: pricingPageSchema,
    contact: contactPageSchema,
    playground: playgroundPageSchema,
    showcases: showcasesPageSchema,
    privacy: organizationSchema,
    terms: organizationSchema,
    refund: organizationSchema,
    help: helpPageSchema,
  }

  return schemas[page as keyof typeof schemas] || websiteSchema
}
