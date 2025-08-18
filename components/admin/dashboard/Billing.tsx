import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/helpers/client"
import { usePaddlePrices } from "@/hooks/usePaddelPrices"
import { Environments, initializePaddle, Paddle } from "@paddle/paddle-js"
import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  Mail,
  Settings,
  Shield,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react"
import { useEffect, useState } from "react"
import { FiCalendar } from "react-icons/fi"

interface BillingProps {
  pricingPlan: any
  subscriptionStartDate?: string
  subscriptionUpdatedDate?: string
}

export default function Billing({
  pricingPlan,
  subscriptionStartDate,
  subscriptionUpdatedDate,
}: BillingProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getPlanIcon = (planName: string) => {
    const name = planName?.toLowerCase()
    if (name?.includes("pro") || name?.includes("premium") || name?.includes("growth"))
      return <Star className="w-5 h-5" />
    if (name?.includes("enterprise")) return <Shield className="w-5 h-5" />
    return <Zap className="w-5 h-5" />
  }

  const getPlanColor = (planName: string) => {
    const name = planName?.toLowerCase()
    if (name?.includes("pro") || name?.includes("premium") || name?.includes("growth"))
      return "bg-product-primary"
    if (name?.includes("enterprise")) return "bg-product-secondary"
    if (name?.includes("starter")) return "bg-product-primary-accent"
    return "bg-product-primary"
  }

  const getFeatureIcon = (key: string) => {
    const iconMap: { [key: string]: any } = {
      support: Mail,
      catalogues: BarChart3,
      newsletter: Mail,
      customization: Settings,
      ocr_ai_import: Sparkles,
      traffic_limit: Eye,
      custom_features: Star,
      analytics: BarChart3,
      ai_catalogue_generation: Sparkles,
    }
    return iconMap[key] || CheckCircle
  }

  const formatFeatureKey = (key: string) => {
    return key
      .split("_")
      .map((word) => {
        const upperWord = word.toUpperCase()
        if (upperWord === "AI" || upperWord === "OCR") {
          return upperWord
        }
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(" ")
  }

  const formatFeatureValue = (key: string, value: any) => {
    if (value === null || value === 0) return "Not included"
    if (typeof value === "boolean") return value ? "Included" : "Not included"
    if (typeof value === "number") {
      if (key === "traffic_limit") return `${value.toLocaleString()} visits/month`
      if (key === "catalogues") return `${value} catalogue${value !== 1 ? "s" : ""}`
      if (key === "ocr_ai_import") return `${value} OCR AI import${value !== 1 ? "s" : ""}`
      if (key === "ai_catalogue_generation")
        return `${value} AI generation${value !== 1 ? "s" : ""}`
      return value.toString()
    }
    return String(value)
  }

  const isFeatureIncluded = (value: any) => {
    if (value === null || value === false || value === 0) return false
    if (typeof value === "boolean") return value
    if (typeof value === "number") return value > 0
    if (typeof value === "string") return value.toLowerCase() !== "not included"
    return true
  }

  // Get current price from Paddle
  const currentPrice = pricingPlan.priceId ? prices[pricingPlan.priceId] : "0"

  const defaultDate = new Date().toISOString()

  if (!pricingPlan) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card
          className="border-product-border border-2 border-dashed"
          style={{ boxShadow: "var(--product-shadow)" }}>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="w-16 h-16 text-product-foreground-accent mb-4" />
            <h3 className="text-xl font-semibold text-product-foreground mb-2">
              No Billing Plan Found
            </h3>
            <p className="text-product-foreground-accent text-center mb-6">
              You haven't selected a billing plan yet. Choose a plan to get started.
            </p>
            <Button className="bg-product-primary text-product-foreground hover:bg-product-primary-accent">
              View Available Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-5xl space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-product-hover-background rounded mb-6"></div>
          <div className="h-32 bg-product-hover-background rounded mb-6"></div>
          <div className="h-64 bg-product-hover-background rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-6">
      <h2
        className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3"
        style={{ fontFamily: "var(--font-playfair-display), var(--font-inter), serif" }}>
        <FiCalendar className="text-product-icon font-lora w-6 h-6 sm:w-8 sm:h-8" /> Billing Overview
      </h2>

      {/* Action Buttons */}
      <Card style={{ boxShadow: "var(--product-shadow)" }}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-product-border text-product-foreground hover:bg-product-hover-background">
              <CreditCard className="w-4 h-4" />
              Update Payment Method
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-product-border text-product-foreground hover:bg-product-hover-background">
              <Calendar className="w-4 h-4" />
              View Billing History
            </Button>
            <Button
              variant="default"
              className="bg-product-primary text-product-foreground hover:bg-product-primary-accent flex items-center gap-2">
              <Star className="w-4 h-4" />
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Plan Card */}
      <Card
        className="overflow-hidden border-product-border"
        style={{ boxShadow: "var(--product-shadow)" }}>
        <div className={`${getPlanColor(pricingPlan.name)} p-6 text-product-foreground`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getPlanIcon(pricingPlan.name)}
              <div>
                <CardTitle className="text-2xl font-bold text-product-foreground">
                  {pricingPlan.name}
                </CardTitle>
                <p className="text-product-foreground-accent mt-1">{pricingPlan.description}</p>
              </div>
            </div>
            <Badge variant="default" className="bg-product-background">
              Active
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 bg-product-background">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pricing Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-product-icon" />
                <div>
                  <p className="text-sm text-product-foreground-accent">Price</p>
                  <p className="text-2xl font-bold text-product-foreground">
                    {formatPrice(currentPrice)}
                    {currentPrice && parseFloat(currentPrice) > 0 && (
                      <span className="text-base font-normal text-product-foreground-accent ml-1">
                        /{pricingPlan.billingPeriod}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-product-icon" />
                <div>
                  <p className="text-sm text-product-foreground-accent">Billing Cycle</p>
                  <p className="font-semibold text-product-foreground capitalize">
                    {pricingPlan.billingPeriod}ly
                  </p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-product-icon" />
                <div>
                  <p className="text-sm text-product-foreground-accent">Started</p>
                  <p className="font-semibold text-product-foreground">
                    {formatDate(subscriptionStartDate || defaultDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-product-icon" />
                <div>
                  <p className="text-sm text-product-foreground-accent">Last Updated</p>
                  <p className="font-semibold text-product-foreground">
                    {formatDate(subscriptionUpdatedDate || defaultDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card style={{ boxShadow: "var(--product-shadow)" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-product-foreground">
            <Star className="w-5 h-5 text-product-icon" />
            Plan Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(pricingPlan.features).map(([key, value]) => {
              const IconComponent = getFeatureIcon(key)
              const included = isFeatureIncluded(value)

              return (
                <div
                  key={key}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${included
                    ? "bg-product-hover-background border border-product-border"
                    : "bg-product-background border border-product-border"
                    }`}>
                  {included ? (
                    <CheckCircle className="w-5 h-5 text-product-primary flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-product-foreground-accent flex-shrink-0" />
                  )}
                  <IconComponent className="w-4 h-4 text-product-icon flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-product-foreground">{formatFeatureKey(key)}</p>
                    <p
                      className={`text-sm ${included ? "text-product-primary" : "text-product-foreground-accent"
                        }`}>
                      {formatFeatureValue(key, value)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
