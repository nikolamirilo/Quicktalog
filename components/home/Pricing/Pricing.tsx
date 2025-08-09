"use client"
import { tiers } from "@/constants/pricing"
import { usePaddlePrices } from "@/hooks/usePaddelPrices"
import { Environments, initializePaddle, Paddle } from "@paddle/paddle-js"
import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"
import PricingColumn from "./PricingColumn"

const containerVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const childVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      bounce: 0.2,
      duration: 0.8,
    },
  },
}

const Pricing: React.FC = () => {
  // const [frequency, setFrequency] = useState<IBillingFrequency>(BillingFrequency[0])
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined)

  const { prices, loading } = usePaddlePrices(paddle, "US")

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
      }).then((paddle) => {
        if (paddle) {
          setPaddle(paddle)
        }
      })
    }
  }, [])
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}>
      {tiers.map((tier, index) => (
        <motion.div key={tier.name} variants={childVariants}>
          <PricingColumn tier={tier} highlight={index === 2} price={prices[tier.priceId.month]} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Pricing
