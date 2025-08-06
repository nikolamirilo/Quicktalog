import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Shield,
  Star,
  Zap,
} from "lucide-react"

export default function Billing({ pricingPlan }: { pricingPlan: any }) {
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
    return "bg-gradient-to-r from-indigo-700 to-indigo-100"
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
      {/* Main Plan Card */}

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex items-center">
              <CreditCard size={20} />
              <span>Update Payment Method</span>
            </Button>
            <Button variant="outline" className="flex items-center">
              <Calendar size={20} />
              <span>View Billing History</span>
            </Button>
            <Button variant="default" className="bg-product-primary text-product-foreground">
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>
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
              className={`${pricingPlan.is_active ? "bg-green-500" : "bg-gray-500"} text-white text-sm`}>
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
              {pricingPlan.created_at && (
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Started</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatDate(pricingPlan.created_at)}
                    </p>
                  </div>
                </div>
              )}

              {pricingPlan.updated_at && (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatDate(pricingPlan.updated_at)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Card */}
      {pricingPlan.features && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold flex items-center">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Plan Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Array.isArray(pricingPlan.features) ? (
                pricingPlan.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-900 dark:text-white">{String(feature)}</span>
                  </div>
                ))
              ) : typeof pricingPlan.features === "object" && pricingPlan.features !== null ? (
                Object.values(pricingPlan.features).map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-900 dark:text-white">{String(feature)}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white">
                    {String(pricingPlan.features)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
