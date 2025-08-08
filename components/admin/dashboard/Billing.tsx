import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { FiCalendar } from "react-icons/fi"

interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  billing_cycle: string
  features: {
    support?: string
    catalogues?: number
    newsletter?: boolean
    customization?: string
    ocr_ai_import?: string | null
    traffic_limit?: number
    custom_features?: boolean
    advanced_analytics?: boolean
    ai_catalogue_generation?: string | null
    [key: string]: any
  }
  is_active: boolean
  created_at: string
  updated_at: string
  currency?: string
}

export default function Billing({ pricingPlan }: { pricingPlan: PricingPlan }) {
  const formatPrice = (price: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getPlanIcon = (planName: string) => {
    const name = planName?.toLowerCase()
    if (name?.includes("pro") || name?.includes("premium")) return <Star className="w-5 h-5" />
    if (name?.includes("enterprise")) return <Shield className="w-5 h-5" />
    return <Zap className="w-5 h-5" />
  }

  const getPlanColor = (planName: string) => {
    const name = planName?.toLowerCase()
    if (name?.includes("pro") || name?.includes("premium"))
      return "bg-gradient-to-r from-purple-500 to-pink-500"
    if (name?.includes("enterprise")) return "bg-gradient-to-r from-blue-600 to-indigo-600"
    if (name?.includes("starter")) return "bg-gradient-to-r from-green-500 to-emerald-500"
    return "bg-gradient-to-r from-indigo-500 to-blue-500"
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
      advanced_analytics: BarChart3,
      ai_catalogue_generation: Sparkles,
    }
    return iconMap[key] || CheckCircle
  }

  const formatFeatureKey = (key: string) => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatFeatureValue = (key: string, value: any) => {
    if (value === null) return "Not included"
    if (typeof value === "boolean") return value ? "Included" : "Not included"
    if (typeof value === "number") {
      if (key === "traffic_limit") return `${value.toLocaleString()} visits/month`
      if (key === "catalogues") return `${value} catalogue${value !== 1 ? "s" : ""}`
      return value.toString()
    }
    return String(value)
  }

  const isFeatureIncluded = (value: any) => {
    if (value === null || value === false) return false
    if (typeof value === "boolean") return value
    if (typeof value === "number") return value > 0
    if (typeof value === "string") return value.toLowerCase() !== "not included"
    return true
  }

  if (!pricingPlan) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-dashed border-2 border-gray-200 dark:border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Billing Plan Found
            </h3>
            <p className="text-gray-500 text-center mb-6">
              You haven't selected a billing plan yet. Choose a plan to get started.
            </p>
            <Button className="bg-product-primary">View Available Plans</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-6">
      <h2
        className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-4 sm:mb-6 text-product-foreground flex items-center gap-2 sm:gap-3"
        style={{ fontFamily: "var(--font-playfair-display), var(--font-inter), serif" }}>
        <FiCalendar className="text-product-primary w-6 h-6 sm:w-8 sm:h-8" /> Billing Overview
      </h2>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Update Payment Method
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              View Billing History
            </Button>
            <Button
              variant="default"
              className="bg-product-primary text-product-foreground flex items-center gap-2">
              <Star className="w-4 h-4" />
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Plan Card */}
      <Card className="overflow-hidden shadow-xl border-0">
        <div className={`${getPlanColor(pricingPlan.name)} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getPlanIcon(pricingPlan.name)}
              <div>
                <CardTitle className="text-2xl font-bold text-white">{pricingPlan.name}</CardTitle>
                <p className="text-white/90 mt-1">{pricingPlan.description}</p>
              </div>
            </div>
            <Badge
              variant={pricingPlan.is_active ? "default" : "secondary"}
              className={`${
                pricingPlan.is_active
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500 hover:bg-gray-600"
              } text-white text-sm border-0`}>
              {pricingPlan.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pricing Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(pricingPlan.price, pricingPlan.currency)}
                    {pricingPlan.price > 0 && (
                      <span className="text-base font-normal text-gray-500 ml-1">
                        /{pricingPlan.billing_cycle}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Billing Cycle</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {pricingPlan.billing_cycle}
                  </p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Started</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(pricingPlan.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(pricingPlan.updated_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
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
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    included
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}>
                  {included ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatFeatureKey(key)}
                    </p>
                    <p
                      className={`text-sm ${
                        included
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
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
