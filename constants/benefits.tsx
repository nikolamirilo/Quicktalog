import {
  FiBarChart2,
  FiCheck,
  FiClock,
  FiEdit3,
  FiPieChart,
  FiShare2,
  FiSmartphone,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi"

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
  {
    title: "Go from Idea to Live in Minutes",
    description:
      "You don't have time for complicated software. Our platform is designed for speed. Create a beautiful, professional catalog in less time than it takes to make a cup of coffee.",
    bullets: [
      {
        title: "No Learning Curve",
        description: "Our intuitive editor is so simple, you'll feel like a pro in minutes.",
        icon: <FiCheck size={26} />,
      },
      {
        title: "Instant Updates",
        description:
          "Change prices, add new services, or run a promotion in seconds. Your catalog is always up-to-date.",
        icon: <FiClock size={26} />,
      },
      {
        title: "AI-Powered Creation",
        description:
          "Let our AI build your entire catalog for you. Just describe your business and watch the magic happen.",
        icon: <FiZap size={26} />,
      },
    ],
    imageSrc: "/images/mockup-1.svg",
  },
  {
    title: "Look Professional, Build Trust",
    description:
      "Your catalog is often the first impression a customer has of your business. Make it a great one with a beautiful, mobile-friendly design that builds trust and drives sales.",
    bullets: [
      {
        title: "Stunning Templates",
        description:
          "Choose from a variety of professionally designed templates that look great on any device.",
        icon: <FiEdit3 size={26} />,
      },
      {
        title: "Mobile-First Design",
        description:
          "Your catalog will look amazing on smartphones, tablets, and desktops, guaranteed.",
        icon: <FiSmartphone size={26} />,
      },
      {
        title: "Easy Sharing",
        description: "Share your catalog with a simple link or QR code. No app downloads required.",
        icon: <FiShare2 size={26} />,
      },
    ],
    imageSrc: "/images/mockup-2.svg",
  },
  {
    title: "Grow Your Business, Not Your Workload",
    description:
      "Our platform is designed to help you grow your business, without adding to your to-do list. Track your performance, understand your customers, and make smarter decisions.",
    bullets: [
      {
        title: "Real-Time Analytics",
        description: "See what's popular, what's not, and what your customers are looking for.",
        icon: <FiBarChart2 size={26} />,
      },
      {
        title: "Customer Insights",
        description:
          "Understand your customers better and make data-driven decisions to grow your business.",
        icon: <FiPieChart size={26} />,
      },
      {
        title: "Scale with Confidence",
        description:
          "Our secure and reliable platform grows with you, so you can focus on what you do best.",
        icon: <FiTrendingUp size={26} />,
      },
    ],
    imageSrc: "/images/mockup-3.svg",
  },
]
