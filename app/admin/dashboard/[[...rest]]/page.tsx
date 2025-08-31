import { getUserData } from "@/actions/users"
import Dashboard from "@/components/admin/dashboard/Dashboard"
import FloatingActionMenu from "@/components/admin/dashboard/FloatingActionMenu"
import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import { Button } from "@/components/ui/button"
import type { OverallAnalytics, ServiceCatalogue, UserData } from "@/types"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function page() {
  const supabase = await createClient()
  let catalogues: ServiceCatalogue[] = []
  const userData: UserData = await getUserData()
  if (userData) {
    const { data, error } = await supabase
      .from("service_catalogues")
      .select("*")
      .eq("created_by", userData.id)
    catalogues = error ? [] : data || []

    const { data: analyticsData } = await supabase
      .from("analytics")
      .select("date, hour, current_url, pageview_count, unique_visitors")
      .eq("user_id", userData.id)
    const { count: newsletterCount } = await supabase
      .from("newsletter")
      .select("*", { count: "exact", head: true })
      .eq("owner_id", userData.id)

    const totalPageViews = analyticsData?.reduce((sum, a) => sum + (a.pageview_count || 0), 0) || 0
    const totalUniqueVisitors =
      analyticsData?.reduce((sum, a) => sum + (a.unique_visitors || 0), 0) || 0
    const totalNewsletterSubscriptions = newsletterCount || 0
    const totalServiceCatalogues = catalogues?.length || 0
    const overallAnalytics: OverallAnalytics = {
      totalPageViews,
      totalUniqueVisitors,
      totalServiceCatalogues,
      totalNewsletterSubscriptions,
    }
    const { pricing_plan, usage, ...user } = userData

    return (
      <div className="product font-lora min-h-screen">
        <Navbar />
        <Dashboard
          catalogues={catalogues}
          user={user}
          overallAnalytics={overallAnalytics}
          pricingPlan={userData.pricing_plan}
          usage={userData.usage}
        />
        <FloatingActionMenu />
        <Footer />
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
