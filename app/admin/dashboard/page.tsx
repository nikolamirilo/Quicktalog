import Dashboard from "@/components/admin/dashboard/Dashboard"
import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import { tiers } from "@/constants/pricing"
import type { Analytics, ServiceCatalogue, SupabaseUser } from "@/types"
import { createClient } from "@/utils/supabase/server"
import { currentUser } from "@clerk/nextjs/server"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Get current user by session (assuming Clerk user id is stored in users table)
  const clerkUser = await currentUser()
  let restaurants: ServiceCatalogue[] = []
  let analytics: Analytics[] = []
  let supabaseUser: SupabaseUser | null = null
  let pricingPlan = null

  if (clerkUser && clerkUser.id) {
    const { data: restaurantData, error: restaurantError } = await supabase
      .from("service_catalogues")
      .select("*")
      .eq("created_by", clerkUser.id)
    restaurants = restaurantError ? [] : restaurantData || []

    // Fetch analytics for all restaurants owned by the user
    const { data: analyticsData, error: analyticsError } = await supabase
      .from("analytics")
      .select("date, hour, current_url, pageview_count, unique_visitors")
      .eq("user_id", clerkUser.id)
    analytics = analyticsError ? [] : analyticsData || []

    const { data: supabaseUserData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", clerkUser.id)
      .single()
    supabaseUser = userError ? null : supabaseUserData || null

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
    pricingPlan = createPricingPlan(supabaseUserData?.plan_id)
    console.log(pricingPlan)
    const userData = {
      id: clerkUser.id,
      imageUrl: clerkUser.imageUrl || "",
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
    }

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

    return (
      <div className="product font-lora min-h-screen">
        <Navbar />
        <Dashboard
          restaurants={restaurants}
          user={userData}
          analytics={analytics}
          pricingPlan={pricingPlan}
          promptsUsage={promptsUsage?.count || 0}
          ocrUsage={ocrUsage?.count || 0}
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
