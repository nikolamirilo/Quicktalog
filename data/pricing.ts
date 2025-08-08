import { IPricing } from "@/types"

export const tiers: IPricing[] = [
  {
    name: "Basic",
    price: "0",
    description: "Perfect for individuals and small businesses getting started.",
    features: [
      "1 digital catalogue",
      "Basic customization",
      "Email support",
      "1,000 monthly views",
    ],
  },
  {
    name: "Pro",
    price: "10",
    description: "Ideal for growing businesses with multiple services.",
    features: [
      "Up to 5 catalogues",
      "AI catalogue generation (up to 5)",
      "Advanced customization",
      "Email support",
      "5,000 monthly views",
    ],
  },
  {
    name: "Growth",
    price: "25",
    description: "Built for teams that need advanced features and analytics.",
    features: [
      "Up to 10 catalogues",
      "AI catalogue generation (up to 10)",
      "OCR import & AI (up to 5)",
      "Advanced analytics",
      "15,000 monthly views",
      "Newsletter features",
      "Chat support",
    ],
  },
  {
    name: "Premium",
    price: "50",
    description: "Enterprise-grade solution with unlimited possibilities.",
    features: [
      "Unlimited catalogues",
      "AI catalogue generation (up to 20)",
      "OCR import & AI (up to 10)",
      "Advanced analytics",
      "50,000 monthly views",
      "Custom features",
      "Priority Support (Email, Chat, Call)",
    ],
  },
]
