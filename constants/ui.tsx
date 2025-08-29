import { IBenefit } from "@/types/components"
import { JSX } from "react"
import { BsGlobe2 } from "react-icons/bs"
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaTwitter,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6"
import {
  FiBarChart2,
  FiCheck,
  FiClock,
  FiEdit3,
  FiPieChart,
  FiShare2,
  FiSmartphone,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi"
import { RiGamepadLine, RiHeartPulseLine, RiScissorsLine, RiStore2Line } from "react-icons/ri"

import { IStats } from "@/types/components"

export const stats: IStats[] = [
  {
    title: "5 Minutes",
    icon: <FiClock size={34} className="text-product-primary" />,
    description: "Average time to create your first digital catalog.",
  },
  {
    title: "Any Industry",
    icon: <FiUsers size={34} className="text-product-primary" />,
    description: "Perfect for any business that needs to showcase products or services.",
  },
  {
    title: "OCR Import",
    icon: <FiZap size={34} className="text-product-primary" />,
    description: "Convert existing paper catalogs instantly with AI technology.",
  },
]

export const examplePrompts = [
  {
    icon: <RiStore2Line size={18} />,
    category: "Restaurant",
    prompt:
      "A cozy Italian restaurant with fresh pasta, wood-fired pizzas, and wine pairings in a warm, family-friendly atmosphere",
  },
  {
    icon: <RiScissorsLine size={18} />,
    category: "Beauty Salon",
    prompt:
      "A modern beauty salon offering haircuts, coloring, styling, manicures, and facial treatments with premium products",
  },
  {
    icon: <RiHeartPulseLine size={18} />,
    category: "Fitness Gym",
    prompt:
      "A fitness center with personal training, group classes, weight training, and cardio equipment for all fitness levels",
  },
  {
    icon: <RiGamepadLine size={18} />,
    category: "Entertainment",
    prompt:
      "A bowling alley with lane rentals, birthday parties, arcade games, and food service for families and groups",
  },
  {
    icon: <RiStore2Line size={18} />,
    category: "Café",
    prompt:
      "A specialty coffee shop with artisan drinks, fresh pastries, light meals, and a cozy workspace atmosphere",
  },
]

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

export const getPlatformIconByName = (platformName: string): JSX.Element | null => {
  switch (platformName) {
    case "facebook": {
      return <FaFacebook size={24} className="min-w-fit" />
    }
    case "github": {
      return <FaGithub size={24} className="min-w-fit" />
    }
    case "instagram": {
      return <FaInstagram size={24} className="min-w-fit" />
    }
    case "linkedin": {
      return <FaLinkedin size={24} className="min-w-fit" />
    }
    case "threads": {
      return <FaThreads size={24} className="min-w-fit" />
    }
    case "website": {
      return <BsGlobe2 size={24} className="min-w-fit" />
    }
    case "twitter": {
      return <FaTwitter size={24} className="min-w-fit" />
    }
    case "youtube": {
      return <FaYoutube size={24} className="min-w-fit" />
    }
    case "x": {
      return <FaXTwitter size={24} className="min-w-fit" />
    }
    default:
      console.log("Platform name not supported, no icon is returned:", platformName)
      return null
  }
}
