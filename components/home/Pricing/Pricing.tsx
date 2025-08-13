"use client"
import { Button } from "@/components/ui/button"
import { tiers } from "@/constants/pricing"
import { usePaddlePrices } from "@/hooks/usePaddelPrices"
import { Environments, initializePaddle, Paddle } from "@paddle/paddle-js"
import { motion, Variants } from "framer-motion"
import { useEffect, useState } from "react"
import PricingColumn from "./PricingColumn"

const containerVariants: Variants = {
  offscreen: { opacity: 0, y: 100 },
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
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, bounce: 0.2, duration: 0.8 },
  },
}

type BillingCycle = "monthly" | "yearly"

const Pricing: React.FC = () => {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")

  const { prices } = usePaddlePrices(paddle, "US")

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
      }).then((paddle) => {
        if (paddle) setPaddle(paddle)
      })
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Segmented toggle */}
      <div className="flex items-center justify-center">
        <div className="relative inline-flex w-[260px] bg-product-background border border-product-border rounded-full p-1 shadow-sm">
          {/* Sliding thumb */}
          <span
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-product-primary transition-transform duration-300 ease-out ${
              billingCycle === "yearly" ? "translate-x-full" : "translate-x-0"
            }`}
            aria-hidden="true"
          />
          <button
            type="button"
            className={`relative z-10 flex-1 px-4 py-1.5 text-sm rounded-full transition-colors ${
              billingCycle === "monthly"
                ? "text-product-foreground font-bold"
                : "text-product-foreground/60 font-medium"
            }`}
            onClick={() => setBillingCycle("monthly")}>
            Monthly
          </button>
          <button
            type="button"
            className={`relative z-10 flex-1 px-4 py-1.5 text-sm  rounded-full transition-colors ${
              billingCycle === "yearly"
                ? "text-product-foreground font-bold"
                : "text-product-foreground/60 font-medium"
            }`}
            onClick={() => setBillingCycle("yearly")}>
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}>
        {tiers.map((tier, index) => (
          <motion.div key={tier.name} variants={childVariants}>
            <PricingColumn
              tier={tier}
              highlight={index === 2}
              price={prices[billingCycle === "monthly" ? tier.priceId.month : tier.priceId.year]}
              billingCycle={billingCycle}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA under pricing */}
      <div className="text-center pt-2">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3">
          <span className="text-product-foreground-accent text-sm">Need a custom plan?</span>
          <Button asChild variant="default" size="sm">
            <a href="/contact">Contact us</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pricing
