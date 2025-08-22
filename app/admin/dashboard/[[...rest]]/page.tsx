import Dashboard from "@/components/admin/dashboard/Dashboard"
import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import { tiers } from "@/constants/pricing"
import type { Analytics, ServiceCatalogue, User } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"

export default async function page() {

  const supabase = await createClient()

  // Get current user by session (assuming Clerk user id is stored in users table)
  const clerkUser = await currentUser()
  let catalogues: ServiceCatalogue[] = []
  let analytics: Analytics[] = []
  let User: User | null = null
  let pricingPlan = null

  if (clerkUser && clerkUser.id) {
    const { data: restaurantData, error: restaurantError } = await supabase
      .from("service_catalogues")
      .select("*")
      .eq("created_by", clerkUser.id)
    catalogues = restaurantError ? [] : restaurantData || []

    // Fetch analytics for all catalogues owned by the user
    const { data: analyticsData, error: analyticsError } = await supabase
      .from("analytics")
      .select("date, hour, current_url, pageview_count, unique_visitors")
      .eq("user_id", clerkUser.id)
    analytics = analyticsError ? [] : analyticsData || []

    const { data: UserData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", clerkUser.id)
      .single()
    User = userError ? null : UserData || null

    function createPricingPlan(planId?: string) {
      if (!planId) {
        return {
          name: "Free",
          description: "Free plan with basic features",
          priceId: null,
          billingPeriod: null,
        }
      }

      const matchedTier = tiers.find((tier) => Object.values(tier.priceId).includes(planId))

      if (!matchedTier) {
        return {
          name: "Free",
          description: "Free plan with basic features",
          priceId: null,
          billingPeriod: null,
        }
      }

      const billingPeriod = Object.entries(matchedTier.priceId).find(
        ([_, id]) => id === planId
      )?.[0] as "month" | "year"

      return {
        ...matchedTier,
        priceId: planId, // flatten to just string
        billingPeriod,
      }
    }
    pricingPlan = createPricingPlan(UserData?.plan_id)

    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("id", clerkUser.id)
      .single()
    const { data: promptsUsage } = await supabase
      .from("prompts")
      .select("count")
      .eq("user_id", clerkUser.id)
      .single()
    const { data: ocrUsage } = await supabase
      .from("ocr")
      .select("count")
      .eq("user_id", clerkUser.id)
      .single()
    const { data: subscriptionsData } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("customer_id", userData.customer_id)

    return (
      <div className="product font-lora min-h-screen">
        <Navbar />
        <Dashboard
          catalogues={catalogues}
          user={userData}
          analytics={analytics}
          pricingPlan={pricingPlan}
          promptsUsage={promptsUsage?.count || 0}
          ocrUsage={ocrUsage?.count || 0}
          subscriptionsData={subscriptionsData}
        />
      </div>
    )
  }

  // Fallback with error message
  return (
    <div className="product font-lora min-h-screen">
      <Navbar />
      <div className="text-center text-black text-2xl h-screen flex flex-col gap-5 items-center justify-center">
        <p>Something went wrong. Please try again later.</p>
        <Button size="lg">
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  )
}
