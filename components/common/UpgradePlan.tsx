import React from "react"
import { Lock, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"

const UpgradePlan = ({
  featureName = "this feature",
  currentPlan = "Starter",
  requiredPlan = "Premium",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-product-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 text-center bg-hero-product-background">
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
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-product-primary">
              <Lock className="w-8 h-8 text-product-secondary" />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2 text-product-foreground">Upgrade Required</h2>
          <p className="text-sm text-product-foreground-accent">
            You need a {requiredPlan} plan to access {featureName}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 p-3 rounded-lg bg-product-hover-background">
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <div className="text-product-foreground-accent">Current plan</div>
                <div className="font-medium text-product-foreground">{currentPlan}</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-product-icon" />
            <div className="flex items-center space-x-3">
              <div className="text-sm text-right">
                <div className="text-product-foreground-accent">Required plan</div>
                <div className="font-medium flex items-center justify-end space-x-1 text-product-secondary">
                  <Crown className="w-4 h-4 text-product-primary" />
                  <span>{requiredPlan}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 w-full flex justify-center items-center">
            <Link
              href="/dashboard"
              className="w-fit py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-3 focus:ring-opacity-20 bg-product-primary text-product-secondary hover:bg-product-primary-accent shadow-sm hover:shadow-md">
              Upgrade to {requiredPlan}
            </Link>
          </div>

          {/* Small print */}
          <p className="text-xs text-center mt-4 px-2 text-product-foreground-accent">
            Unlock this feature and many more with a {requiredPlan} subscription
          </p>
        </div>
      </div>
    </div>
  )
}

export default UpgradePlan
