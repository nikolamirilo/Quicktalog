"use client"
import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion"
import Link from "next/link"
import React, { useState } from "react"
import { FiArrowRight, FiCheck, FiClock, FiDollarSign, FiSmartphone, FiX } from "react-icons/fi"

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
      staggerChildren: 0.15,
    },
  },
}

const cardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.3,
      duration: 0.8,
    },
  },
}

interface FlipCardProps {
  metric: string
  metricLabel: string
  problem: string
  solution: string
  ctaText: string
  impactMetric: string
  icon: React.ReactNode
  isReversed?: boolean
  index: number
}

const CARD_STYLES = {
  minHeight: "min-h-[180px] sm:min-h-[200px] md:min-h-[220px]",
  padding: "p-4 sm:p-6",
  gap: "gap-4 sm:gap-6 lg:gap-8",
  rounded: "rounded-3xl",
  transition: "transition-all duration-300",
} as const

const FlipCard: React.FC<FlipCardProps> = ({
  metric,
  metricLabel,
  problem,
  solution,
  ctaText,
  impactMetric,
  icon,
  isReversed = false,
  index,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  // Enhanced metric card with better visual hierarchy
  const MetricCard = ({ isBack = false }: { isBack?: boolean }) => (
    <div
      className={`${
        isBack
          ? "bg-product-primary border border-product-primary"
          : "bg-product-background border border-product-border"
      } ${CARD_STYLES.rounded} ${CARD_STYLES.padding} ${CARD_STYLES.minHeight} ${CARD_STYLES.transition} relative overflow-hidden hover:shadow-[var(--product-hover-shadow)] hover:scale-[var(--product-hover-scale)] flex flex-col w-full`}
      style={{ boxShadow: "var(--product-shadow)" }}>
      <div className="relative z-10 flex flex-col justify-center h-full">
        <div
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-lora ${isBack ? "text-product-background" : "text-product-foreground"}`}>
          {isBack ? "✓" : metric}
        </div>
        <div
          className={`text-sm sm:text-base font-medium font-lora ${isBack ? "text-product-background/90" : "text-product-foreground-accent"}`}>
          {isBack ? impactMetric : metricLabel}
        </div>
        {isBack && (
          <div className="mt-3 inline-flex items-center gap-2 bg-product-background/20 text-product-background px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
            <div className="w-3 h-3 bg-product-background rounded-full flex items-center justify-center">
              <FiCheck className="w-2 h-2 text-product-primary" />
            </div>
            <span>Proven Solution</span>
          </div>
        )}
      </div>
      <div
        className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 opacity-10 text-4xl sm:text-5xl md:text-6xl ${isBack ? "text-product-background" : "text-product-foreground-accent"}`}>
        {icon}
      </div>
    </div>
  )

  // Enhanced content card with clearer CTAs
  const ContentCard = ({ isBack = false }: { isBack?: boolean }) => (
    <div
      className={`bg-product-background ${CARD_STYLES.rounded} ${CARD_STYLES.minHeight} ${CARD_STYLES.padding} ${CARD_STYLES.transition} hover:scale-[var(--product-hover-scale)] hover:shadow-[var(--product-hover-shadow)] border border-product-border ${
        isBack ? "hover:bg-product-hover-background" : ""
      } flex flex-col w-full`}
      style={{ boxShadow: "var(--product-shadow)" }}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
              isBack
                ? "bg-product-primary/10 text-product-primary"
                : "bg-[var(--problem-card-bg)] text-[var(--problem-card-text)] border border-[var(--problem-card-border)]"
            }`}>
            {isBack ? (
              <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-product-foreground font-lora">
            {isBack ? "Our Solution" : "Current Reality"}
          </h3>
        </div>
        <p className="text-product-foreground-accent text-xs sm:text-sm leading-relaxed mb-4 flex-1 font-lora">
          {isBack ? solution : problem}
        </p>

        {isBack ? (
          <Link href="/auth?mode=signup">
            <Button
              variant="solution"
              size="sm"
              className="no-tap-highlight"
              style={{
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none",
              }}>
              <span>{ctaText}</span>
              <FiArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-product-foreground-accent opacity-70 font-lora">
              <span className="hidden sm:inline">Hover</span>
              <span className="sm:hidden">Tap</span> to see solution →
            </span>
            <div className="bg-[var(--problem-tag-bg)] text-[var(--problem-tag-text)] px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border border-[var(--problem-tag-border)] font-lora">
              Problem
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // Shared grid layout
  const GridRow = ({ isBack = false }: { isBack?: boolean }) => (
    <div
      className={`grid grid-cols-1 lg:grid-cols-3 ${CARD_STYLES.gap} items-stretch`}
      style={{ minHeight: "inherit" }}>
      {isReversed ? (
        <>
          <div className="lg:col-span-2 order-2 lg:order-1 flex">
            <ContentCard isBack={isBack} />
          </div>
          <div className="lg:col-span-1 order-1 lg:order-2 flex">
            <MetricCard isBack={isBack} />
          </div>
        </>
      ) : (
        <>
          <div className="lg:col-span-1 flex">
            <MetricCard isBack={isBack} />
          </div>
          <div className="lg:col-span-2 flex">
            <ContentCard isBack={isBack} />
          </div>
        </>
      )}
    </div>
  )

  return (
    <motion.div
      className="cursor-pointer group focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent rounded-3xl touch-manipulation problem-card no-tap-highlight"
      variants={cardVariants}
      style={{
        perspective: "1000px",
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`${isFlipped ? "View problem" : "View solution"} for ${metricLabel}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setIsFlipped(!isFlipped)
        }
      }}>
      <div
        className="relative w-full min-h-[180px] sm:min-h-[200px] md:min-h-[220px]"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transformOrigin: "center center",
          willChange: "transform",
          opacity: 1,
        }}>
        {/* Front side */}
        <div
          className="w-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(0deg)",
          }}>
          <GridRow />
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 w-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}>
          <GridRow isBack={true} />
        </div>
      </div>
    </motion.div>
  )
}

const ProblemSection: React.FC = () => {
  const problems = [
    {
      metric: "No Code",
      metricLabel: "No design skills required",
      problem:
        "You want a beautiful, professional-looking catalog, but you're not a designer. Hiring one is expensive, and DIY tools are clunky and time-consuming.",
      solution:
        "Create a stunning, mobile-first catalog in minutes with our easy-to-use templates. No design or coding skills needed. Your business will look professional and polished.",
      ctaText: "Explore Templates",
      impactMetric: "Designer-quality results",
      icon: <FiSmartphone />,
    },
    {
      metric: "< 5 Mins",
      metricLabel: "to update your catalog",
      problem:
        "Your menu or service list changes frequently, but updating it is a nightmare. You have to call your designer, wait for them to make the changes, and then pay them for their time.",
      solution:
        "Update your catalog in real-time, anytime, from any device. Add new services, change prices, and mark items as sold out with a single click. No more waiting, no more extra costs.",
      ctaText: "See How It Works",
      impactMetric: "Instant updates, zero cost",
      icon: <FiClock />,
      isReversed: true,
    },
    {
      metric: "Zero",
      metricLabel: "printing costs, ever",
      problem:
        "You spend a fortune on printing and reprinting menus and catalogs. Every time you make a change, you have to throw away the old ones and print new ones. It's wasteful and expensive.",
      solution:
        "Go green and save money with a digital-first catalog. Share your catalog via a link or QR code, and never worry about printing costs again. Plus, you'll be doing your part for the environment.",
      ctaText: "Calculate Your Savings",
      impactMetric: "Eco-friendly and cost-effective",
      icon: <FiDollarSign />,
    },
  ]

  return (
    <motion.div
      className="max-w-6xl mx-auto space-y-12 lg:space-y-20 px-4 lg:px-0 no-tap-highlight"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      style={{
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
        outline: "none",
      }}>
      {problems.map((problem, index) => (
        <FlipCard key={index} {...problem} isReversed={index % 2 === 1} index={index} />
      ))}
    </motion.div>
  )
}

export default ProblemSection
