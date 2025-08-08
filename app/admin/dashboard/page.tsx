import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { currentUser } from "@clerk/nextjs/server"
import Navbar from "@/components/navigation/Navbar"
import Dashboard from "@/components/admin/dashboard/Dashboard"
import type { SupabaseUser, PricingPlan, ServiceCatalogue, Analytics } from "@/types"

export default async function page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Get current user by session (assuming Clerk user id is stored in users table)
  const clerkUser = await currentUser()
  let restaurants: ServiceCatalogue[] = []
  let analytics: Analytics[] = []
  let supabaseUser: SupabaseUser | null = null
  let pricingPlan: PricingPlan | null = null

  if (clerkUser && clerkUser.id) {
    const { data: restaurantData } = await supabase
      .from("service_catalogues")
      .select("*")
      .eq("created_by", clerkUser.id)
    restaurants = restaurantData || []

    // Fetch analytics for all restaurants owned by the user
    const { data: analyticsData } = await supabase
      .from("analytics")
      .select("date, hour, current_url, pageview_count, unique_visitors")
      .eq("user_id", clerkUser.id)
    analytics = analyticsData || []

    console.log(clerkUser.id)
    const { data: supabaseUserData } = await supabase
      .from("users")
      .select("*")
      .eq("id", clerkUser.id)
      .single()
    supabaseUser = supabaseUserData || {}

    const { data: pricingPlanData } = await supabase
      .from("pricing_plans")
      .select("*")
      .eq("id", supabaseUser?.plan_id)
      .single()
    pricingPlan = pricingPlanData || {}
    console.log(pricingPlan)
  }

  const userData = {
    id: clerkUser.id,
    imageUrl: clerkUser.imageUrl,
    firstName: clerkUser.firstName,
    lastName: clerkUser.lastName,
    email: clerkUser.emailAddresses?.[0]?.emailAddress,
  }

  return (
    <div className="product font-lora min-h-screen">
      <Navbar />
      <Dashboard
        restaurants={restaurants}
        user={userData}
        analytics={analytics}
        pricingPlan={pricingPlan}
      />
    </div>
  )
}
