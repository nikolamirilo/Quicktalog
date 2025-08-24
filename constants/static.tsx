import { FiClock, FiUsers, FiZap } from "react-icons/fi";
import { RiGamepadLine, RiHeartPulseLine, RiScissorsLine, RiStore2Line } from "react-icons/ri";

import { IStats } from "@/types";

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
