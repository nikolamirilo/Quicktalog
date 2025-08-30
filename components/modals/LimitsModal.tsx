import { ArrowRight, Crown, Lock, Zap } from "lucide-react"
import Link from "next/link"

type LimitType = "traffic" | "ai" | "ocr" | "catalogues"

const LimitsModal = ({
  type,
  currentPlan = "Starter",
  requiredPlan = "Pro",
}: {
  type: LimitType
  currentPlan?: string
  requiredPlan?: string
}) => {
  const isTraffic = type === "traffic"

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-product-background rounded-lg shadow-lg max-w-md w-[95vw] sm:w-full mx-auto overflow-hidden">
        {/* Header */}
        <div className="relative p-4 sm:p-6 text-center bg-hero-product-background">
          <Link
            href="/"
            className="absolute top-4 right-4 text-product-foreground-accent hover:text-product-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>

          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-product-primary">
              {isTraffic ? (
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-product-secondary" />
              ) : (
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-product-secondary" />
              )}
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-product-foreground">
            {isTraffic ? "Traffic Limit Reached" : "Upgrade Required"}
          </h2>
          <p className="text-sm text-product-foreground-accent">
            {isTraffic
              ? "Your catalogue has reached the maximum monthly visitors for your plan."
              : `You’ve used all available ${type} for your plan.`}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {isTraffic ? (
            <>
              {/* Traffic Promo */}
              <div className="p-3 sm:p-4 rounded-lg bg-product-hover-background mb-4 sm:mb-6">
                <h3 className="text-base font-medium text-product-foreground mb-1">
                  Quicktalog Premium
                </h3>
                <p className="text-sm text-product-foreground-accent">
                  Keep your catalogue online, unlock higher traffic, advanced analytics, and more
                  customization.
                </p>
              </div>

              <div className="flex justify-center">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-fit py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-opacity-20 bg-product-primary text-product-secondary hover:bg-product-primary-accent shadow-sm hover:shadow-md">
                  Upgrade & Boost Traffic
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Generic feature lock */}
              <div className="flex items-center justify-between my-4 sm:my-6 p-3 rounded-lg bg-product-hover-background">
                <div className="text-sm">
                  <div className="text-product-foreground-accent">Current plan</div>
                  <div className="font-medium text-product-foreground">{currentPlan}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-product-icon" />
                <div className="text-sm text-right">
                  <div className="text-product-foreground-accent">Required plan</div>
                  <div className="font-medium flex items-center justify-end space-x-1 text-product-secondary">
                    <Crown className="w-4 h-4 text-product-primary" />
                    <span>{requiredPlan}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Link
                  href="/pricing-plans"
                  className="w-full sm:w-fit py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-opacity-20 bg-product-primary text-product-secondary hover:bg-product-primary-accent shadow-sm hover:shadow-md">
                  Upgrade to {requiredPlan}
                </Link>
              </div>
            </>
          )}

          {/* Small print */}
          <p className="text-xs text-center mt-3 sm:mt-4 px-2 text-product-foreground-accent">
            {isTraffic
              ? "Unlock more visitors, advanced analytics, and premium features with an upgraded plan."
              : `Unlock more ${type} and additional features with a ${requiredPlan} subscription.`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LimitsModal
